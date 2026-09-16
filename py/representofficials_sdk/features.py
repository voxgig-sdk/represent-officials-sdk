# RepresentOfficials SDK feature factory

from representofficials_sdk.feature.base_feature import RepresentOfficialsBaseFeature
from representofficials_sdk.feature.ratelimit_feature import RepresentOfficialsRatelimitFeature
from representofficials_sdk.feature.retry_feature import RepresentOfficialsRetryFeature
from representofficials_sdk.feature.test_feature import RepresentOfficialsTestFeature
from representofficials_sdk.feature.timeout_feature import RepresentOfficialsTimeoutFeature


_FEATURES = {
    "base": lambda: RepresentOfficialsBaseFeature(),
    "ratelimit": lambda: RepresentOfficialsRatelimitFeature(),
    "retry": lambda: RepresentOfficialsRetryFeature(),
    "test": lambda: RepresentOfficialsTestFeature(),
    "timeout": lambda: RepresentOfficialsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
