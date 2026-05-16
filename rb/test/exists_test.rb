# RepresentOfficials SDK exists test

require "minitest/autorun"
require_relative "../RepresentOfficials_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RepresentOfficialsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
