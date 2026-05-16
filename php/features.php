<?php
declare(strict_types=1);

// RepresentOfficials SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RepresentOfficialsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RepresentOfficialsBaseFeature();
            case "test":
                return new RepresentOfficialsTestFeature();
            default:
                return new RepresentOfficialsBaseFeature();
        }
    }
}
