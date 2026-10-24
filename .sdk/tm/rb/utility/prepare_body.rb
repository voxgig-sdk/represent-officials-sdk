# RepresentOfficials SDK utility: prepare_body
require_relative 'media'
module RepresentOfficialsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return RepresentOfficialsUtilities.raw_body(ctx.reqdata) if RepresentOfficialsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
