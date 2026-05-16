<?php
declare(strict_types=1);

// RepresentOfficials SDK utility: feature_add

class RepresentOfficialsFeatureAdd
{
    public static function call(RepresentOfficialsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
