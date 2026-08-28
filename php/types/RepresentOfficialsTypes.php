<?php
declare(strict_types=1);

// Typed models for the RepresentOfficials SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Boundary entity data model. */
class Boundary
{
    public ?string $boundary_set_name = null;
    public ?string $external_id = null;
    public ?string $id = null;
    public ?array $meta = null;
    public ?array $metadata = null;
    public ?string $name = null;
    public ?array $objects = null;
    public ?string $url = null;
}

/** Request payload for Boundary#load. */
class BoundaryLoadMatch
{
    public string $id;
    public ?string $callback = null;
    public ?string $contain = null;
    public ?string $external_id = null;
    public ?string $format = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?int $pretty = null;
}

/** Request payload for Boundary#list. */
class BoundaryListMatch
{
    public ?string $callback = null;
    public ?string $contain = null;
    public ?string $external_id = null;
    public ?string $format = null;
    public ?string $intersect = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?int $pretty = null;
    public ?string $set = null;
    public ?string $touch = null;
}

/** BoundarySet entity data model. */
class BoundarySet
{
    public ?string $domain = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for BoundarySet#load. */
class BoundarySetLoadMatch
{
    public string $id;
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $pretty = null;
}

/** Request payload for BoundarySet#list. */
class BoundarySetListMatch
{
    public ?string $callback = null;
    public ?string $domain = null;
    public ?string $format = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?int $pretty = null;
}

/** Candidate entity data model. */
class Candidate
{
    public ?array $meta = null;
    public ?array $objects = null;
}

/** Request payload for Candidate#list. */
class CandidateListMatch
{
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $pretty = null;
}

/** Election entity data model. */
class Election
{
    public ?array $meta = null;
    public ?array $objects = null;
}

/** Request payload for Election#list. */
class ElectionListMatch
{
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $pretty = null;
}

/** PostalCode entity data model. */
class PostalCode
{
    public ?array $boundaries_centroid = null;
    public ?array $boundaries_concordance = null;
    public ?array $centroid = null;
    public ?string $city = null;
    public ?string $code = null;
    public ?string $province = null;
    public ?array $representatives_centroid = null;
    public ?array $representatives_concordance = null;
}

/** Request payload for PostalCode#load. */
class PostalCodeLoadMatch
{
    public string $postal_code;
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $pretty = null;
    public ?string $set = null;
}

/** Representatif entity data model. */
class Representatif
{
    public ?string $district_id = null;
    public string $district_name;
    public string $elected_office;
    public ?string $email = null;
    public ?array $extra = null;
    public ?string $first_name = null;
    public ?string $gender = null;
    public ?string $id = null;
    public ?string $last_name = null;
    public ?array $meta = null;
    public string $name;
    public ?array $objects = null;
    public ?array $offices = null;
    public ?string $party_name = null;
    public ?string $personal_url = null;
    public ?string $photo_url = null;
    public ?string $source_url = null;
    public ?string $url = null;
}

/** Request payload for Representatif#load. */
class RepresentatifLoadMatch
{
    public string $id;
    public ?string $callback = null;
    public ?string $district_name = null;
    public ?string $elected_office = null;
    public ?string $first_name = null;
    public ?string $format = null;
    public ?string $gender = null;
    public ?string $last_name = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?string $party_name = null;
    public ?string $point = null;
    public ?int $pretty = null;
}

/** Request payload for Representatif#list. */
class RepresentatifListMatch
{
    public ?string $callback = null;
    public ?string $district = null;
    public ?string $district_name = null;
    public ?string $elected_office = null;
    public ?string $first_name = null;
    public ?string $format = null;
    public ?string $gender = null;
    public ?string $last_name = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?string $party_name = null;
    public ?string $point = null;
    public ?int $pretty = null;
}

/** RepresentativeSet entity data model. */
class RepresentativeSet
{
    public ?string $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for RepresentativeSet#load. */
class RepresentativeSetLoadMatch
{
    public string $id;
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $pretty = null;
}

/** Request payload for RepresentativeSet#list. */
class RepresentativeSetListMatch
{
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $pretty = null;
}

