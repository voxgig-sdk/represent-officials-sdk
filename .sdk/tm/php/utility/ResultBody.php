<?php
declare(strict_types=1);

// RepresentOfficials SDK utility: result_body

class RepresentOfficialsResultBody
{
    public static function call(RepresentOfficialsContext $ctx): ?RepresentOfficialsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
