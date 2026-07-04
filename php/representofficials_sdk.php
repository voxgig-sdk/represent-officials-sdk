<?php
declare(strict_types=1);

// RepresentOfficials SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class RepresentOfficialsSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new RepresentOfficialsUtility();
        $this->_utility = $utility;

        $config = RepresentOfficialsConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = RepresentOfficialsHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = RepresentOfficialsHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, RepresentOfficialsFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return RepresentOfficialsUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = RepresentOfficialsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = RepresentOfficialsHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = RepresentOfficialsHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new RepresentOfficialsSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = RepresentOfficialsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = RepresentOfficialsHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_boundary = null;

    // Idiomatic facade: $client->boundary()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Boundary() (PHP method
    // names are case-insensitive).
    public function boundary($data = null)
    {
        require_once __DIR__ . '/entity/boundary_entity.php';
        if ($data === null) {
            if ($this->_boundary === null) {
                $this->_boundary = new BoundaryEntity($this, null);
            }
            return $this->_boundary;
        }
        return new BoundaryEntity($this, $data);
    }


    private $_boundary_set = null;

    // Idiomatic facade: $client->boundary_set()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias BoundarySet() (PHP method
    // names are case-insensitive).
    public function boundary_set($data = null)
    {
        require_once __DIR__ . '/entity/boundary_set_entity.php';
        if ($data === null) {
            if ($this->_boundary_set === null) {
                $this->_boundary_set = new BoundarySetEntity($this, null);
            }
            return $this->_boundary_set;
        }
        return new BoundarySetEntity($this, $data);
    }


    private $_candidate = null;

    // Idiomatic facade: $client->candidate()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Candidate() (PHP method
    // names are case-insensitive).
    public function candidate($data = null)
    {
        require_once __DIR__ . '/entity/candidate_entity.php';
        if ($data === null) {
            if ($this->_candidate === null) {
                $this->_candidate = new CandidateEntity($this, null);
            }
            return $this->_candidate;
        }
        return new CandidateEntity($this, $data);
    }


    private $_election = null;

    // Idiomatic facade: $client->election()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Election() (PHP method
    // names are case-insensitive).
    public function election($data = null)
    {
        require_once __DIR__ . '/entity/election_entity.php';
        if ($data === null) {
            if ($this->_election === null) {
                $this->_election = new ElectionEntity($this, null);
            }
            return $this->_election;
        }
        return new ElectionEntity($this, $data);
    }


    private $_postal_code = null;

    // Idiomatic facade: $client->postal_code()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias PostalCode() (PHP method
    // names are case-insensitive).
    public function postal_code($data = null)
    {
        require_once __DIR__ . '/entity/postal_code_entity.php';
        if ($data === null) {
            if ($this->_postal_code === null) {
                $this->_postal_code = new PostalCodeEntity($this, null);
            }
            return $this->_postal_code;
        }
        return new PostalCodeEntity($this, $data);
    }


    private $_representatif = null;

    // Idiomatic facade: $client->representatif()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Representatif() (PHP method
    // names are case-insensitive).
    public function representatif($data = null)
    {
        require_once __DIR__ . '/entity/representatif_entity.php';
        if ($data === null) {
            if ($this->_representatif === null) {
                $this->_representatif = new RepresentatifEntity($this, null);
            }
            return $this->_representatif;
        }
        return new RepresentatifEntity($this, $data);
    }


    private $_representative_set = null;

    // Idiomatic facade: $client->representative_set()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias RepresentativeSet() (PHP method
    // names are case-insensitive).
    public function representative_set($data = null)
    {
        require_once __DIR__ . '/entity/representative_set_entity.php';
        if ($data === null) {
            if ($this->_representative_set === null) {
                $this->_representative_set = new RepresentativeSetEntity($this, null);
            }
            return $this->_representative_set;
        }
        return new RepresentativeSetEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new RepresentOfficialsSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
