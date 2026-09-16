# RepresentOfficials SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RepresentOfficialsFeatures
  def self.make_feature(name)
    case name
    when "base"
      RepresentOfficialsBaseFeature.new
    when "ratelimit"
      RepresentOfficialsRatelimitFeature.new
    when "retry"
      RepresentOfficialsRetryFeature.new
    when "test"
      RepresentOfficialsTestFeature.new
    when "timeout"
      RepresentOfficialsTimeoutFeature.new
    else
      RepresentOfficialsBaseFeature.new
    end
  end
end
