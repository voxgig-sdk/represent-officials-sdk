// Typed models for the RepresentOfficials SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Boundary {
  boundary_set_name?: string
  external_id?: string
  id?: string
  meta?: Record<string, any>
  metadata?: Record<string, any>
  name?: string
  objects?: any[]
  url?: string
}

export interface BoundaryLoadMatch {
  id: string
  callback?: string
  contain?: string
  external_id?: string
  format?: string
  limit?: number
  name?: string
  offset?: number
  pretty?: number

  // Selects a custom action instead of the plain load:
  //   'centroid' | 'centroid' | 'shape' | 'shape' | 'simple_shape' | 'simple_shape'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BoundaryListMatch {
  callback?: string
  contain?: string
  external_id?: string
  format?: string
  intersect?: string
  limit?: number
  name?: string
  offset?: number
  pretty?: number
  set?: string
  touch?: string
}

export interface BoundarySet {
  domain?: string
  id?: string
  name?: string
  url?: string
}

export interface BoundarySetLoadMatch {
  id: string
  callback?: string
  format?: string
  pretty?: number
}

export interface BoundarySetListMatch {
  callback?: string
  domain?: string
  format?: string
  limit?: number
  name?: string
  offset?: number
  pretty?: number
}

export interface Candidate {
  meta?: Record<string, any>
  objects?: any[]
}

export interface CandidateListMatch {
  callback?: string
  format?: string
  limit?: number
  offset?: number
  pretty?: number
}

export interface Election {
  meta?: Record<string, any>
  objects?: any[]
}

export interface ElectionListMatch {
  callback?: string
  format?: string
  limit?: number
  offset?: number
  pretty?: number
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
  callback?: string
  format?: string
  pretty?: number
  set?: string
}

export interface Representatif {
  district_id?: string
  district_name: string
  elected_office: string
  email?: string
  extra?: Record<string, any>
  first_name?: string
  gender?: string
  id?: string
  last_name?: string
  meta?: Record<string, any>
  name: string
  objects?: any[]
  offices?: any[]
  party_name?: string
  personal_url?: string
  photo_url?: string
  source_url?: string
  url?: string
}

export interface RepresentatifLoadMatch {
  id: string
  callback?: string
  district_name?: string
  elected_office?: string
  first_name?: string
  format?: string
  gender?: string
  last_name?: string
  limit?: number
  name?: string
  offset?: number
  party_name?: string
  point?: string
  pretty?: number
}

export interface RepresentatifListMatch {
  callback?: string
  district?: string
  district_name?: string
  elected_office?: string
  first_name?: string
  format?: string
  gender?: string
  last_name?: string
  limit?: number
  name?: string
  offset?: number
  party_name?: string
  point?: string
  pretty?: number
}

export interface RepresentativeSet {
  id?: string
  name?: string
  url?: string
}

export interface RepresentativeSetLoadMatch {
  id: string
  callback?: string
  format?: string
  pretty?: number
}

export interface RepresentativeSetListMatch {
  callback?: string
  format?: string
  limit?: number
  offset?: number
  pretty?: number
}

