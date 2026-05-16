<?php
declare(strict_types=1);

// RepresentOfficials SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RepresentOfficialsMakeContext
{
    public static function call(array $ctxmap, ?RepresentOfficialsContext $basectx): RepresentOfficialsContext
    {
        return new RepresentOfficialsContext($ctxmap, $basectx);
    }
}
