# frozen_string_literal: true

# Typed models for the RepresentOfficials SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Boundary entity data model.
#
# @!attribute [rw] boundary_set_name
#   @return [String, nil]
#
# @!attribute [rw] external_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] objects
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Boundary = Struct.new(
  :boundary_set_name,
  :external_id,
  :id,
  :meta,
  :metadata,
  :name,
  :objects,
  :url,
  keyword_init: true
)

# Request payload for Boundary#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] contain
#   @return [String, nil]
#
# @!attribute [rw] external_id
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
BoundaryLoadMatch = Struct.new(
  :id,
  :callback,
  :contain,
  :external_id,
  :format,
  :limit,
  :name,
  :offset,
  :pretty,
  keyword_init: true
)

# Request payload for Boundary#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] contain
#   @return [String, nil]
#
# @!attribute [rw] external_id
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] intersect
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] touch
#   @return [String, nil]
BoundaryListMatch = Struct.new(
  :callback,
  :contain,
  :external_id,
  :format,
  :intersect,
  :limit,
  :name,
  :offset,
  :pretty,
  :set,
  :touch,
  keyword_init: true
)

# BoundarySet entity data model.
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
BoundarySet = Struct.new(
  :domain,
  :id,
  :name,
  :url,
  keyword_init: true
)

# Request payload for BoundarySet#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
BoundarySetLoadMatch = Struct.new(
  :id,
  :callback,
  :format,
  :pretty,
  keyword_init: true
)

# Request payload for BoundarySet#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
BoundarySetListMatch = Struct.new(
  :callback,
  :domain,
  :format,
  :limit,
  :name,
  :offset,
  :pretty,
  keyword_init: true
)

# Candidate entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] objects
#   @return [Array, nil]
Candidate = Struct.new(
  :meta,
  :objects,
  keyword_init: true
)

# Request payload for Candidate#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
CandidateListMatch = Struct.new(
  :callback,
  :format,
  :limit,
  :offset,
  :pretty,
  keyword_init: true
)

# Election entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] objects
#   @return [Array, nil]
Election = Struct.new(
  :meta,
  :objects,
  keyword_init: true
)

# Request payload for Election#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
ElectionListMatch = Struct.new(
  :callback,
  :format,
  :limit,
  :offset,
  :pretty,
  keyword_init: true
)

# PostalCode entity data model.
#
# @!attribute [rw] boundaries_centroid
#   @return [Array, nil]
#
# @!attribute [rw] boundaries_concordance
#   @return [Array, nil]
#
# @!attribute [rw] centroid
#   @return [Hash, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] province
#   @return [String, nil]
#
# @!attribute [rw] representatives_centroid
#   @return [Array, nil]
#
# @!attribute [rw] representatives_concordance
#   @return [Array, nil]
PostalCode = Struct.new(
  :boundaries_centroid,
  :boundaries_concordance,
  :centroid,
  :city,
  :code,
  :province,
  :representatives_centroid,
  :representatives_concordance,
  keyword_init: true
)

# Request payload for PostalCode#load.
#
# @!attribute [rw] postal_code
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
PostalCodeLoadMatch = Struct.new(
  :postal_code,
  :callback,
  :format,
  :pretty,
  :set,
  keyword_init: true
)

# Representatif entity data model.
#
# @!attribute [rw] district_id
#   @return [String, nil]
#
# @!attribute [rw] district_name
#   @return [String]
#
# @!attribute [rw] elected_office
#   @return [String]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] extra
#   @return [Hash, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] objects
#   @return [Array, nil]
#
# @!attribute [rw] offices
#   @return [Array, nil]
#
# @!attribute [rw] party_name
#   @return [String, nil]
#
# @!attribute [rw] personal_url
#   @return [String, nil]
#
# @!attribute [rw] photo_url
#   @return [String, nil]
#
# @!attribute [rw] source_url
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Representatif = Struct.new(
  :district_id,
  :district_name,
  :elected_office,
  :email,
  :extra,
  :first_name,
  :gender,
  :id,
  :last_name,
  :meta,
  :name,
  :objects,
  :offices,
  :party_name,
  :personal_url,
  :photo_url,
  :source_url,
  :url,
  keyword_init: true
)

# Request payload for Representatif#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] district_name
#   @return [String, nil]
#
# @!attribute [rw] elected_office
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] party_name
#   @return [String, nil]
#
# @!attribute [rw] point
#   @return [String, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
RepresentatifLoadMatch = Struct.new(
  :id,
  :callback,
  :district_name,
  :elected_office,
  :first_name,
  :format,
  :gender,
  :last_name,
  :limit,
  :name,
  :offset,
  :party_name,
  :point,
  :pretty,
  keyword_init: true
)

# Request payload for Representatif#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] district
#   @return [String, nil]
#
# @!attribute [rw] district_name
#   @return [String, nil]
#
# @!attribute [rw] elected_office
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] gender
#   @return [String, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] party_name
#   @return [String, nil]
#
# @!attribute [rw] point
#   @return [String, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
RepresentatifListMatch = Struct.new(
  :callback,
  :district,
  :district_name,
  :elected_office,
  :first_name,
  :format,
  :gender,
  :last_name,
  :limit,
  :name,
  :offset,
  :party_name,
  :point,
  :pretty,
  keyword_init: true
)

# RepresentativeSet entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
RepresentativeSet = Struct.new(
  :id,
  :name,
  :url,
  keyword_init: true
)

# Request payload for RepresentativeSet#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
RepresentativeSetLoadMatch = Struct.new(
  :id,
  :callback,
  :format,
  :pretty,
  keyword_init: true
)

# Request payload for RepresentativeSet#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] pretty
#   @return [Integer, nil]
RepresentativeSetListMatch = Struct.new(
  :callback,
  :format,
  :limit,
  :offset,
  :pretty,
  keyword_init: true
)

