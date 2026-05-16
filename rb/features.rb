# RepresentOfficials SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RepresentOfficialsFeatures
  def self.make_feature(name)
    case name
    when "base"
      RepresentOfficialsBaseFeature.new
    when "test"
      RepresentOfficialsTestFeature.new
    else
      RepresentOfficialsBaseFeature.new
    end
  end
end
