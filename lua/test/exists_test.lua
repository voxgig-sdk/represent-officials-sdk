-- RepresentOfficials SDK exists test

local sdk = require("represent-officials_sdk")

describe("RepresentOfficialsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
