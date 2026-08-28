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
---@field id? string
---@field meta? table
---@field metadata? table
---@field name? string
---@field objects? table
---@field url? string

---@class BoundaryLoadMatch
---@field id string
---@field callback? string
---@field contain? string
---@field external_id? string
---@field format? string
---@field limit? number
---@field name? string
---@field offset? number
---@field pretty? number

---@class BoundaryListMatch
---@field callback? string
---@field contain? string
---@field external_id? string
---@field format? string
---@field intersect? string
---@field limit? number
---@field name? string
---@field offset? number
---@field pretty? number
---@field set? string
---@field touch? string

---@class BoundarySet
---@field domain? string
---@field id? string
---@field name? string
---@field url? string

---@class BoundarySetLoadMatch
---@field id string
---@field callback? string
---@field format? string
---@field pretty? number

---@class BoundarySetListMatch
---@field callback? string
---@field domain? string
---@field format? string
---@field limit? number
---@field name? string
---@field offset? number
---@field pretty? number

---@class Candidate
---@field meta? table
---@field objects? table

---@class CandidateListMatch
---@field callback? string
---@field format? string
---@field limit? number
---@field offset? number
---@field pretty? number

---@class Election
---@field meta? table
---@field objects? table

---@class ElectionListMatch
---@field callback? string
---@field format? string
---@field limit? number
---@field offset? number
---@field pretty? number

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
---@field callback? string
---@field format? string
---@field pretty? number
---@field set? string

---@class Representatif
---@field district_id? string
---@field district_name string
---@field elected_office string
---@field email? string
---@field extra? table
---@field first_name? string
---@field gender? string
---@field id? string
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
---@field callback? string
---@field district_name? string
---@field elected_office? string
---@field first_name? string
---@field format? string
---@field gender? string
---@field last_name? string
---@field limit? number
---@field name? string
---@field offset? number
---@field party_name? string
---@field point? string
---@field pretty? number

---@class RepresentatifListMatch
---@field callback? string
---@field district? string
---@field district_name? string
---@field elected_office? string
---@field first_name? string
---@field format? string
---@field gender? string
---@field last_name? string
---@field limit? number
---@field name? string
---@field offset? number
---@field party_name? string
---@field point? string
---@field pretty? number

---@class RepresentativeSet
---@field id? string
---@field name? string
---@field url? string

---@class RepresentativeSetLoadMatch
---@field id string
---@field callback? string
---@field format? string
---@field pretty? number

---@class RepresentativeSetListMatch
---@field callback? string
---@field format? string
---@field limit? number
---@field offset? number
---@field pretty? number

local M = {}

return M
