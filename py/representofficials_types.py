# Typed models for the RepresentOfficials SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Boundary:
    boundary_set_name: Optional[str] = None
    external_id: Optional[str] = None
    meta: Optional[dict] = None
    metadata: Optional[dict] = None
    name: Optional[str] = None
    object: Optional[list] = None
    url: Optional[str] = None


@dataclass
class BoundaryLoadMatch:
    id: str
    boundary: str
    boundary_set: str


@dataclass
class BoundaryListMatch:
    boundary_set_name: Optional[str] = None
    external_id: Optional[str] = None
    meta: Optional[dict] = None
    metadata: Optional[dict] = None
    name: Optional[str] = None
    object: Optional[list] = None
    url: Optional[str] = None


@dataclass
class BoundarySet:
    domain: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class BoundarySetLoadMatch:
    id: str


@dataclass
class BoundarySetListMatch:
    domain: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Candidate:
    meta: Optional[dict] = None
    object: Optional[list] = None


@dataclass
class CandidateListMatch:
    meta: Optional[dict] = None
    object: Optional[list] = None


@dataclass
class Election:
    meta: Optional[dict] = None
    object: Optional[list] = None


@dataclass
class ElectionListMatch:
    meta: Optional[dict] = None
    object: Optional[list] = None


@dataclass
class PostalCode:
    boundaries_centroid: Optional[list] = None
    boundaries_concordance: Optional[list] = None
    centroid: Optional[dict] = None
    city: Optional[str] = None
    code: Optional[str] = None
    province: Optional[str] = None
    representatives_centroid: Optional[list] = None
    representatives_concordance: Optional[list] = None


@dataclass
class PostalCodeLoadMatch:
    postal_code: str


@dataclass
class Representatif:
    district_name: str
    elected_office: str
    name: str
    district_id: Optional[str] = None
    email: Optional[str] = None
    extra: Optional[dict] = None
    first_name: Optional[str] = None
    gender: Optional[str] = None
    last_name: Optional[str] = None
    meta: Optional[dict] = None
    object: Optional[list] = None
    office: Optional[list] = None
    party_name: Optional[str] = None
    personal_url: Optional[str] = None
    photo_url: Optional[str] = None
    source_url: Optional[str] = None
    url: Optional[str] = None


@dataclass
class RepresentatifLoadMatch:
    id: str


@dataclass
class RepresentatifListMatch:
    boundary: str
    boundary_set: str


@dataclass
class RepresentativeSet:
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class RepresentativeSetLoadMatch:
    id: str


@dataclass
class RepresentativeSetListMatch:
    name: Optional[str] = None
    url: Optional[str] = None

