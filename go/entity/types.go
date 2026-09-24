// Typed models for the RepresentOfficials SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/represent-officials-sdk/go/core"
)

// Boundary is the typed data model for the boundary entity.
type Boundary struct {
}

// BoundaryLoadMatch is the typed request payload for Boundary.LoadTyped.
type BoundaryLoadMatch struct {
	Id string `json:"id"`
	Callback *string `json:"callback,omitempty"`
	Contain *string `json:"contain,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	Format *string `json:"format,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// BoundaryListMatch is the typed request payload for Boundary.ListTyped.
type BoundaryListMatch struct {
	Callback *string `json:"callback,omitempty"`
	Contain *string `json:"contain,omitempty"`
	ExternalId *string `json:"external_id,omitempty"`
	Format *string `json:"format,omitempty"`
	Intersect *string `json:"intersect,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
	Set *string `json:"set,omitempty"`
	Touch *string `json:"touch,omitempty"`
}

// BoundarySet is the typed data model for the boundary_set entity.
type BoundarySet struct {
}

// BoundarySetLoadMatch is the typed request payload for BoundarySet.LoadTyped.
type BoundarySetLoadMatch struct {
	Id string `json:"id"`
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// BoundarySetListMatch is the typed request payload for BoundarySet.ListTyped.
type BoundarySetListMatch struct {
	Callback *string `json:"callback,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Format *string `json:"format,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// Candidate is the typed data model for the candidate entity.
type Candidate struct {
}

// CandidateListMatch is the typed request payload for Candidate.ListTyped.
type CandidateListMatch struct {
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// Election is the typed data model for the election entity.
type Election struct {
}

// ElectionListMatch is the typed request payload for Election.ListTyped.
type ElectionListMatch struct {
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// PostalCode is the typed data model for the postal_code entity.
type PostalCode struct {
}

// PostalCodeLoadMatch is the typed request payload for PostalCode.LoadTyped.
type PostalCodeLoadMatch struct {
	PostalCode string `json:"postal_code"`
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
	Set *string `json:"set,omitempty"`
}

// Representative is the typed data model for the representative entity.
type Representative struct {
}

// RepresentativeLoadMatch is the typed request payload for Representative.LoadTyped.
type RepresentativeLoadMatch struct {
	Id string `json:"id"`
	Callback *string `json:"callback,omitempty"`
	DistrictName *string `json:"district_name,omitempty"`
	ElectedOffice *string `json:"elected_office,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	Format *string `json:"format,omitempty"`
	Gender *string `json:"gender,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	PartyName *string `json:"party_name,omitempty"`
	Point *string `json:"point,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// RepresentativeListMatch is the typed request payload for Representative.ListTyped.
type RepresentativeListMatch struct {
	Callback *string `json:"callback,omitempty"`
	District *string `json:"district,omitempty"`
	DistrictName *string `json:"district_name,omitempty"`
	ElectedOffice *string `json:"elected_office,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	Format *string `json:"format,omitempty"`
	Gender *string `json:"gender,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	PartyName *string `json:"party_name,omitempty"`
	Point *string `json:"point,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// RepresentativeSet is the typed data model for the representative_set entity.
type RepresentativeSet struct {
}

// RepresentativeSetLoadMatch is the typed request payload for RepresentativeSet.LoadTyped.
type RepresentativeSetLoadMatch struct {
	Id string `json:"id"`
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
}

// RepresentativeSetListMatch is the typed request payload for RepresentativeSet.ListTyped.
type RepresentativeSetListMatch struct {
	Callback *string `json:"callback,omitempty"`
	Format *string `json:"format,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Pretty *int `json:"pretty,omitempty"`
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
