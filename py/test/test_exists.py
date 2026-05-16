# ProjectName SDK exists test

import pytest
from representofficials_sdk import RepresentOfficialsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RepresentOfficialsSDK.test(None, None)
        assert testsdk is not None
