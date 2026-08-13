// Typed models for the RepresentOfficials SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/represent-officials-sdk/go/core"
)

// Boundary is the typed data model for the boundary entity.
type Boundary struct {
	BoundarySetName *string `json:"boundary_set_name,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name *string `json:"name,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BoundaryLoadMatch is the typed request payload for Boundary.LoadTyped.
type BoundaryLoadMatch struct {
	Id *string `json:"id,omitempty"`
	Boundary *string `json:"boundary,omitempty"`
	BoundarySet *string `json:"boundary_set,omitempty"`
}

// BoundaryListMatch is the typed request payload for Boundary.ListTyped.
type BoundaryListMatch struct {
	BoundarySetName *string `json:"boundary_set_name,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name *string `json:"name,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BoundarySet is the typed data model for the boundary_set entity.
type BoundarySet struct {
	Domain *string `json:"domain,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// BoundarySetLoadMatch is the typed request payload for BoundarySet.LoadTyped.
type BoundarySetLoadMatch struct {
	Id string `json:"id"`
}

// BoundarySetListMatch is the typed request payload for BoundarySet.ListTyped.
type BoundarySetListMatch struct {
	Domain *string `json:"domain,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Candidate is the typed data model for the candidate entity.
type Candidate struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
}

// CandidateListMatch is the typed request payload for Candidate.ListTyped.
type CandidateListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
}

// Election is the typed data model for the election entity.
type Election struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
}

// ElectionListMatch is the typed request payload for Election.ListTyped.
type ElectionListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Objects *[]any `json:"objects,omitempty"`
}

// PostalCode is the typed data model for the postal_code entity.
type PostalCode struct {
	BoundariesCentroid *[]any `json:"boundaries_centroid,omitempty"`
	BoundariesConcordance *[]any `json:"boundaries_concordance,omitempty"`
	Centroid *map[string]any `json:"centroid,omitempty"`
	City *string `json:"city,omitempty"`
	Code *string `json:"code,omitempty"`
	Province *string `json:"province,omitempty"`
	RepresentativesCentroid *[]any `json:"representatives_centroid,omitempty"`
	RepresentativesConcordance *[]any `json:"representatives_concordance,omitempty"`
}

// PostalCodeLoadMatch is the typed request payload for PostalCode.LoadTyped.
type PostalCodeLoadMatch struct {
	PostalCode string `json:"postal_code"`
}

// Representatif is the typed data model for the representatif entity.
type Representatif struct {
	DistrictId *string `json:"district_id,omitempty"`
	DistrictName string `json:"district_name"`
	ElectedOffice string `json:"elected_office"`
	Email *string `json:"email,omitempty"`
	Extra *map[string]any `json:"extra,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	Gender *string `json:"gender,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	Name string `json:"name"`
	Objects *[]any `json:"objects,omitempty"`
	Offices *[]any `json:"offices,omitempty"`
	PartyName *string `json:"party_name,omitempty"`
	PersonalUrl *string `json:"personal_url,omitempty"`
	PhotoUrl *string `json:"photo_url,omitempty"`
	SourceUrl *string `json:"source_url,omitempty"`
	Url *string `json:"url,omitempty"`
}

// RepresentatifLoadMatch is the typed request payload for Representatif.LoadTyped.
type RepresentatifLoadMatch struct {
	Id string `json:"id"`
}

// RepresentatifListMatch is the typed request payload for Representatif.ListTyped.
type RepresentatifListMatch struct {
	Boundary *string `json:"boundary,omitempty"`
	BoundarySet *string `json:"boundary_set,omitempty"`
}

// RepresentativeSet is the typed data model for the representative_set entity.
type RepresentativeSet struct {
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// RepresentativeSetLoadMatch is the typed request payload for RepresentativeSet.LoadTyped.
type RepresentativeSetLoadMatch struct {
	Id string `json:"id"`
}

// RepresentativeSetListMatch is the typed request payload for RepresentativeSet.ListTyped.
type RepresentativeSetListMatch struct {
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
