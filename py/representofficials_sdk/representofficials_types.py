# Typed models for the RepresentOfficials SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Boundary(TypedDict, total=False):
    boundary_set_name: str
    external_id: str
    id: str
    meta: dict
    metadata: dict
    name: str
    objects: list
    url: str


class BoundaryLoadMatchRequired(TypedDict):
    id: str


class BoundaryLoadMatch(BoundaryLoadMatchRequired, total=False):
    callback: str
    contain: str
    external_id: str
    format: str
    limit: int
    name: str
    offset: int
    pretty: int


class BoundaryListMatch(TypedDict, total=False):
    callback: str
    contain: str
    external_id: str
    format: str
    intersect: str
    limit: int
    name: str
    offset: int
    pretty: int
    set: str
    touch: str


class BoundarySet(TypedDict, total=False):
    domain: str
    id: str
    name: str
    url: str


class BoundarySetLoadMatchRequired(TypedDict):
    id: str


class BoundarySetLoadMatch(BoundarySetLoadMatchRequired, total=False):
    callback: str
    format: str
    pretty: int


class BoundarySetListMatch(TypedDict, total=False):
    callback: str
    domain: str
    format: str
    limit: int
    name: str
    offset: int
    pretty: int


class Candidate(TypedDict, total=False):
    meta: dict
    objects: list


class CandidateListMatch(TypedDict, total=False):
    callback: str
    format: str
    limit: int
    offset: int
    pretty: int


class Election(TypedDict, total=False):
    meta: dict
    objects: list


class ElectionListMatch(TypedDict, total=False):
    callback: str
    format: str
    limit: int
    offset: int
    pretty: int


class PostalCode(TypedDict, total=False):
    boundaries_centroid: list
    boundaries_concordance: list
    centroid: dict
    city: str
    code: str
    province: str
    representatives_centroid: list
    representatives_concordance: list


class PostalCodeLoadMatchRequired(TypedDict):
    postal_code: str


class PostalCodeLoadMatch(PostalCodeLoadMatchRequired, total=False):
    callback: str
    format: str
    pretty: int
    set: str


class RepresentatifRequired(TypedDict):
    district_name: str
    elected_office: str
    name: str


class Representatif(RepresentatifRequired, total=False):
    district_id: str
    email: str
    extra: dict
    first_name: str
    gender: str
    id: str
    last_name: str
    meta: dict
    objects: list
    offices: list
    party_name: str
    personal_url: str
    photo_url: str
    source_url: str
    url: str


class RepresentatifLoadMatchRequired(TypedDict):
    id: str


class RepresentatifLoadMatch(RepresentatifLoadMatchRequired, total=False):
    callback: str
    district_name: str
    elected_office: str
    first_name: str
    format: str
    gender: str
    last_name: str
    limit: int
    name: str
    offset: int
    party_name: str
    point: str
    pretty: int


class RepresentatifListMatch(TypedDict, total=False):
    callback: str
    district: str
    district_name: str
    elected_office: str
    first_name: str
    format: str
    gender: str
    last_name: str
    limit: int
    name: str
    offset: int
    party_name: str
    point: str
    pretty: int


class RepresentativeSet(TypedDict, total=False):
    id: str
    name: str
    url: str


class RepresentativeSetLoadMatchRequired(TypedDict):
    id: str


class RepresentativeSetLoadMatch(RepresentativeSetLoadMatchRequired, total=False):
    callback: str
    format: str
    pretty: int


class RepresentativeSetListMatch(TypedDict, total=False):
    callback: str
    format: str
    limit: int
    offset: int
    pretty: int
