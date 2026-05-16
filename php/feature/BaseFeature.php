<?php
declare(strict_types=1);

// RepresentOfficials SDK base feature

class RepresentOfficialsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RepresentOfficialsContext $ctx, array $options): void {}
    public function PostConstruct(RepresentOfficialsContext $ctx): void {}
    public function PostConstructEntity(RepresentOfficialsContext $ctx): void {}
    public function SetData(RepresentOfficialsContext $ctx): void {}
    public function GetData(RepresentOfficialsContext $ctx): void {}
    public function GetMatch(RepresentOfficialsContext $ctx): void {}
    public function SetMatch(RepresentOfficialsContext $ctx): void {}
    public function PrePoint(RepresentOfficialsContext $ctx): void {}
    public function PreSpec(RepresentOfficialsContext $ctx): void {}
    public function PreRequest(RepresentOfficialsContext $ctx): void {}
    public function PreResponse(RepresentOfficialsContext $ctx): void {}
    public function PreResult(RepresentOfficialsContext $ctx): void {}
    public function PreDone(RepresentOfficialsContext $ctx): void {}
    public function PreUnexpected(RepresentOfficialsContext $ctx): void {}
}
