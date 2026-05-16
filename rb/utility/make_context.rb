# RepresentOfficials SDK utility: make_context
require_relative '../core/context'
module RepresentOfficialsUtilities
  MakeContext = ->(ctxmap, basectx) {
    RepresentOfficialsContext.new(ctxmap, basectx)
  }
end
