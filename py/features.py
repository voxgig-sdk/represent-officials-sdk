# RepresentOfficials SDK feature factory

from feature.base_feature import RepresentOfficialsBaseFeature
from feature.test_feature import RepresentOfficialsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RepresentOfficialsBaseFeature(),
        "test": lambda: RepresentOfficialsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
