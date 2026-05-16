# RepresentOfficials SDK utility: feature_add
module RepresentOfficialsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
