-- Typed models for the RepresentOfficials SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Boundary
---@field boundary_set_name? string
---@field external_id? string
---@field meta? table
---@field metadata? table
---@field name? string
---@field objects? table
---@field url? string

---@class BoundaryLoadMatch
---@field id string

---@class BoundaryListMatch
---@field boundary_set_name? string
---@field external_id? string
---@field meta? table
---@field metadata? table
---@field name? string
---@field objects? table
---@field url? string

---@class BoundarySet
---@field domain? string
---@field name? string
---@field url? string

---@class BoundarySetLoadMatch
---@field id string

---@class BoundarySetListMatch
---@field domain? string
---@field name? string
---@field url? string

---@class Candidate
---@field meta? table
---@field objects? table

---@class CandidateListMatch
---@field meta? table
---@field objects? table

---@class Election
---@field meta? table
---@field objects? table

---@class ElectionListMatch
---@field meta? table
---@field objects? table

---@class PostalCode
---@field boundaries_centroid? table
---@field boundaries_concordance? table
---@field centroid? table
---@field city? string
---@field code? string
---@field province? string
---@field representatives_centroid? table
---@field representatives_concordance? table

---@class PostalCodeLoadMatch
---@field postal_code string

---@class Representatif
---@field district_id? string
---@field district_name string
---@field elected_office string
---@field email? string
---@field extra? table
---@field first_name? string
---@field gender? string
---@field last_name? string
---@field meta? table
---@field name string
---@field objects? table
---@field offices? table
---@field party_name? string
---@field personal_url? string
---@field photo_url? string
---@field source_url? string
---@field url? string

---@class RepresentatifLoadMatch
---@field id string

---@class RepresentatifListMatch
---@field district_id? string
---@field district_name? string
---@field elected_office? string
---@field email? string
---@field extra? table
---@field first_name? string
---@field gender? string
---@field last_name? string
---@field meta? table
---@field name? string
---@field objects? table
---@field offices? table
---@field party_name? string
---@field personal_url? string
---@field photo_url? string
---@field source_url? string
---@field url? string

---@class RepresentativeSet
---@field name? string
---@field url? string

---@class RepresentativeSetLoadMatch
---@field id string

---@class RepresentativeSetListMatch
---@field name? string
---@field url? string

local M = {}

return M
