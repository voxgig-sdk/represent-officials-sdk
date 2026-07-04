# RepresentOfficials SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import RepresentOfficialsUtility
from core.spec import RepresentOfficialsSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import RepresentOfficialsBaseFeature
from features import _make_feature


class RepresentOfficialsSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = RepresentOfficialsUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return RepresentOfficialsUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = RepresentOfficialsSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def boundary(self):
        """Idiomatic facade: client.boundary.list() / client.boundary.load({"id": ...})."""
        from entity.boundary_entity import BoundaryEntity
        cached = getattr(self, "_boundary", None)
        if cached is None:
            cached = BoundaryEntity(self, None)
            self._boundary = cached
        return cached

    def Boundary(self, data=None):
        # Deprecated: use client.boundary instead.
        from entity.boundary_entity import BoundaryEntity
        return BoundaryEntity(self, data)


    @property
    def boundary_set(self):
        """Idiomatic facade: client.boundary_set.list() / client.boundary_set.load({"id": ...})."""
        from entity.boundary_set_entity import BoundarySetEntity
        cached = getattr(self, "_boundary_set", None)
        if cached is None:
            cached = BoundarySetEntity(self, None)
            self._boundary_set = cached
        return cached

    def BoundarySet(self, data=None):
        # Deprecated: use client.boundary_set instead.
        from entity.boundary_set_entity import BoundarySetEntity
        return BoundarySetEntity(self, data)


    @property
    def candidate(self):
        """Idiomatic facade: client.candidate.list() / client.candidate.load({"id": ...})."""
        from entity.candidate_entity import CandidateEntity
        cached = getattr(self, "_candidate", None)
        if cached is None:
            cached = CandidateEntity(self, None)
            self._candidate = cached
        return cached

    def Candidate(self, data=None):
        # Deprecated: use client.candidate instead.
        from entity.candidate_entity import CandidateEntity
        return CandidateEntity(self, data)


    @property
    def election(self):
        """Idiomatic facade: client.election.list() / client.election.load({"id": ...})."""
        from entity.election_entity import ElectionEntity
        cached = getattr(self, "_election", None)
        if cached is None:
            cached = ElectionEntity(self, None)
            self._election = cached
        return cached

    def Election(self, data=None):
        # Deprecated: use client.election instead.
        from entity.election_entity import ElectionEntity
        return ElectionEntity(self, data)


    @property
    def postal_code(self):
        """Idiomatic facade: client.postal_code.list() / client.postal_code.load({"id": ...})."""
        from entity.postal_code_entity import PostalCodeEntity
        cached = getattr(self, "_postal_code", None)
        if cached is None:
            cached = PostalCodeEntity(self, None)
            self._postal_code = cached
        return cached

    def PostalCode(self, data=None):
        # Deprecated: use client.postal_code instead.
        from entity.postal_code_entity import PostalCodeEntity
        return PostalCodeEntity(self, data)


    @property
    def representatif(self):
        """Idiomatic facade: client.representatif.list() / client.representatif.load({"id": ...})."""
        from entity.representatif_entity import RepresentatifEntity
        cached = getattr(self, "_representatif", None)
        if cached is None:
            cached = RepresentatifEntity(self, None)
            self._representatif = cached
        return cached

    def Representatif(self, data=None):
        # Deprecated: use client.representatif instead.
        from entity.representatif_entity import RepresentatifEntity
        return RepresentatifEntity(self, data)


    @property
    def representative_set(self):
        """Idiomatic facade: client.representative_set.list() / client.representative_set.load({"id": ...})."""
        from entity.representative_set_entity import RepresentativeSetEntity
        cached = getattr(self, "_representative_set", None)
        if cached is None:
            cached = RepresentativeSetEntity(self, None)
            self._representative_set = cached
        return cached

    def RepresentativeSet(self, data=None):
        # Deprecated: use client.representative_set instead.
        from entity.representative_set_entity import RepresentativeSetEntity
        return RepresentativeSetEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
