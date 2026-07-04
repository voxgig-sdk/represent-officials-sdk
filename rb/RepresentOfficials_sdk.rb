# RepresentOfficials SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'RepresentOfficials_types'


class RepresentOfficialsSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = RepresentOfficialsUtility.new
    @_utility = utility

    config = RepresentOfficialsConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = RepresentOfficialsHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = RepresentOfficialsHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, RepresentOfficialsFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    RepresentOfficialsUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = RepresentOfficialsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = RepresentOfficialsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = RepresentOfficialsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = RepresentOfficialsSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue RepresentOfficialsError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = RepresentOfficialsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = RepresentOfficialsHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.boundary.list / client.boundary.load({ "id" => ... })
  def boundary
    require_relative 'entity/boundary_entity'
    @boundary ||= BoundaryEntity.new(self, nil)
  end

  # Deprecated: use client.boundary instead.
  def Boundary(data = nil)
    require_relative 'entity/boundary_entity'
    BoundaryEntity.new(self, data)
  end


  # Idiomatic facade: client.boundary_set.list / client.boundary_set.load({ "id" => ... })
  def boundary_set
    require_relative 'entity/boundary_set_entity'
    @boundary_set ||= BoundarySetEntity.new(self, nil)
  end

  # Deprecated: use client.boundary_set instead.
  def BoundarySet(data = nil)
    require_relative 'entity/boundary_set_entity'
    BoundarySetEntity.new(self, data)
  end


  # Idiomatic facade: client.candidate.list / client.candidate.load({ "id" => ... })
  def candidate
    require_relative 'entity/candidate_entity'
    @candidate ||= CandidateEntity.new(self, nil)
  end

  # Deprecated: use client.candidate instead.
  def Candidate(data = nil)
    require_relative 'entity/candidate_entity'
    CandidateEntity.new(self, data)
  end


  # Idiomatic facade: client.election.list / client.election.load({ "id" => ... })
  def election
    require_relative 'entity/election_entity'
    @election ||= ElectionEntity.new(self, nil)
  end

  # Deprecated: use client.election instead.
  def Election(data = nil)
    require_relative 'entity/election_entity'
    ElectionEntity.new(self, data)
  end


  # Idiomatic facade: client.postal_code.list / client.postal_code.load({ "id" => ... })
  def postal_code
    require_relative 'entity/postal_code_entity'
    @postal_code ||= PostalCodeEntity.new(self, nil)
  end

  # Deprecated: use client.postal_code instead.
  def PostalCode(data = nil)
    require_relative 'entity/postal_code_entity'
    PostalCodeEntity.new(self, data)
  end


  # Idiomatic facade: client.representatif.list / client.representatif.load({ "id" => ... })
  def representatif
    require_relative 'entity/representatif_entity'
    @representatif ||= RepresentatifEntity.new(self, nil)
  end

  # Deprecated: use client.representatif instead.
  def Representatif(data = nil)
    require_relative 'entity/representatif_entity'
    RepresentatifEntity.new(self, data)
  end


  # Idiomatic facade: client.representative_set.list / client.representative_set.load({ "id" => ... })
  def representative_set
    require_relative 'entity/representative_set_entity'
    @representative_set ||= RepresentativeSetEntity.new(self, nil)
  end

  # Deprecated: use client.representative_set instead.
  def RepresentativeSet(data = nil)
    require_relative 'entity/representative_set_entity'
    RepresentativeSetEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = RepresentOfficialsSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
