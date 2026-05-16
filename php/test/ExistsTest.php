<?php
declare(strict_types=1);

// RepresentOfficials SDK exists test

require_once __DIR__ . '/../representofficials_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = RepresentOfficialsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
