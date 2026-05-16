<?php
declare(strict_types=1);

// RepresentOfficials SDK utility: prepare_body

class RepresentOfficialsPrepareBody
{
    public static function call(RepresentOfficialsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
