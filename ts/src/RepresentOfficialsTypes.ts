// Typed models for the RepresentOfficials SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Boundary {
  boundary_set_name?: string
  external_id?: string
  meta?: Record<string, any>
  metadata?: Record<string, any>
  name?: string
  object?: any[]
  url?: string
}

export interface BoundaryLoadMatch {
  id: string
  boundary: string
  boundary_set: string
}

export interface BoundaryListMatch {
  boundary_set_name?: string
  external_id?: string
  meta?: Record<string, any>
  metadata?: Record<string, any>
  name?: string
  object?: any[]
  url?: string
}

export interface BoundarySet {
  domain?: string
  name?: string
  url?: string
}

export interface BoundarySetLoadMatch {
  id: string
}

export interface BoundarySetListMatch {
  domain?: string
  name?: string
  url?: string
}

export interface Candidate {
  meta?: Record<string, any>
  object?: any[]
}

export interface CandidateListMatch {
  meta?: Record<string, any>
  object?: any[]
}

export interface Election {
  meta?: Record<string, any>
  object?: any[]
}

export interface ElectionListMatch {
  meta?: Record<string, any>
  object?: any[]
}

export interface PostalCode {
  boundaries_centroid?: any[]
  boundaries_concordance?: any[]
  centroid?: Record<string, any>
  city?: string
  code?: string
  province?: string
  representatives_centroid?: any[]
  representatives_concordance?: any[]
}

export interface PostalCodeLoadMatch {
  postal_code: string
}

export interface Representatif {
  district_id?: string
  district_name: string
  elected_office: string
  email?: string
  extra?: Record<string, any>
  first_name?: string
  gender?: string
  last_name?: string
  meta?: Record<string, any>
  name: string
  object?: any[]
  office?: any[]
  party_name?: string
  personal_url?: string
  photo_url?: string
  source_url?: string
  url?: string
}

export interface RepresentatifLoadMatch {
  id: string
}

export interface RepresentatifListMatch {
  boundary: string
  boundary_set: string
}

export interface RepresentativeSet {
  name?: string
  url?: string
}

export interface RepresentativeSetLoadMatch {
  id: string
}

export interface RepresentativeSetListMatch {
  name?: string
  url?: string
}

