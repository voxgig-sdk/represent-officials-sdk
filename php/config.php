<?php
declare(strict_types=1);

// RepresentOfficials SDK configuration

class RepresentOfficialsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "RepresentOfficials",
                "slug" => "represent-officials",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://represent.opennorth.ca",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "boundary" => [],
                    "boundary_set" => [],
                    "candidate" => [],
                    "election" => [],
                    "postal_code" => [],
                    "representative" => [],
                    "representative_set" => [],
                ],
            ],
            "entity" => [
        'boundary' => [
          'fields' => [
            [
              'name' => 'boundary_set_name',
              'title' => 'Boundary Set Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'external_id',
              'title' => 'External Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meta',
              'title' => 'Meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'metadata',
              'title' => 'Metadata',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objects',
              'title' => 'Objects',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'boundary',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'contain',
                        'orig' => 'contain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'external_id',
                        'orig' => 'external_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'intersect',
                        'orig' => 'intersect',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'set',
                        'orig' => 'set',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'touch',
                        'orig' => 'touch',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'contain',
                      'external_id',
                      'format',
                      'intersect',
                      'limit',
                      'name',
                      'offset',
                      'pretty',
                      'set',
                      'touch',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'contain',
                        'orig' => 'contain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'external_id',
                        'orig' => 'external_id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'contain',
                      'external_id',
                      'format',
                      'id',
                      'limit',
                      'name',
                      'offset',
                      'pretty',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'var' => 'boundary',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    '{boundary}',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.metadata`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                      'pretty',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/centroid',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'var' => 'boundary',
                    ],
                    [
                      'lit' => 'centroid',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    '{boundary}',
                    'centroid',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'centroid',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/shape',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'var' => 'boundary',
                    ],
                    [
                      'lit' => 'shape',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    '{boundary}',
                    'shape',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'shape',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/simple_shape',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'var' => 'boundary',
                    ],
                    [
                      'lit' => 'simple_shape',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    '{boundary}',
                    'simple_shape',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'simple_shape',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/centroid',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'lit' => 'centroid',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    'centroid',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'centroid',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/shape',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'lit' => 'shape',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    'shape',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'shape',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/simple_shape',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'lit' => 'simple_shape',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    'simple_shape',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'simple_shape',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'boundary_set' => [
          'fields' => [
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'boundary_set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundary-sets/',
                  'segments' => [
                    [
                      'lit' => 'boundary-sets',
                    ],
                  ],
                  'parts' => [
                    'boundary-sets',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'domain',
                      'format',
                      'limit',
                      'name',
                      'offset',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundary-sets/{boundarySet}/',
                  'segments' => [
                    [
                      'lit' => 'boundary-sets',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'boundary-sets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'id',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'candidate' => [
          'fields' => [
            [
              'name' => 'meta',
              'title' => 'Meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'objects',
              'title' => 'Objects',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'candidate',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/candidates/',
                  'segments' => [
                    [
                      'lit' => 'candidates',
                    ],
                  ],
                  'parts' => [
                    'candidates',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'limit',
                      'offset',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'election' => [
          'fields' => [
            [
              'name' => 'meta',
              'title' => 'Meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'objects',
              'title' => 'Objects',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'election',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/elections/',
                  'segments' => [
                    [
                      'lit' => 'elections',
                    ],
                  ],
                  'parts' => [
                    'elections',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'limit',
                      'offset',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'postal_code' => [
          'fields' => [
            [
              'name' => 'boundaries_centroid',
              'title' => 'Boundaries Centroid',
              'type' => '`$ARRAY`',
              'short' => 'Boundaries containing the postal code\'s centroid',
            ],
            [
              'name' => 'boundaries_concordance',
              'title' => 'Boundaries Concordance',
              'type' => '`$ARRAY`',
              'short' => 'Boundaries linked to postal code via official data',
            ],
            [
              'name' => 'centroid',
              'title' => 'Centroid',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
              'short' => 'City name',
            ],
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'short' => 'The postal code',
            ],
            [
              'name' => 'province',
              'title' => 'Province',
              'type' => '`$STRING`',
              'short' => 'Province code',
            ],
            [
              'name' => 'representatives_centroid',
              'title' => 'Representatives Centroid',
              'type' => '`$ARRAY`',
              'short' => 'Representatives for boundaries containing centroid',
            ],
            [
              'name' => 'representatives_concordance',
              'title' => 'Representatives Concordance',
              'type' => '`$ARRAY`',
              'short' => 'Representatives for boundaries via concordance',
            ],
          ],
          'name' => 'postal_code',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/postcodes/{postalCode}/',
                  'segments' => [
                    [
                      'lit' => 'postcodes',
                    ],
                    [
                      'var' => 'postal_code',
                    ],
                  ],
                  'parts' => [
                    'postcodes',
                    '{postal_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'postalCode' => 'postal_code',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'set',
                        'orig' => 'set',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'postal_code',
                      'pretty',
                      'set',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'representative' => [
          'fields' => [
            [
              'name' => 'district_id',
              'title' => 'District Id',
              'type' => '`$STRING`',
              'short' => 'District identifier if available',
            ],
            [
              'name' => 'district_name',
              'title' => 'District Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Name of the electoral district',
            ],
            [
              'name' => 'elected_office',
              'title' => 'Elected Office',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'short' => 'Email address',
              'format' => 'email',
            ],
            [
              'name' => 'extra',
              'title' => 'Extra',
              'type' => '`$OBJECT`',
              'short' => 'Additional data not covered by standard fields',
            ],
            [
              'name' => 'first_name',
              'title' => 'First Name',
              'type' => '`$STRING`',
              'short' => 'First name',
            ],
            [
              'name' => 'gender',
              'title' => 'Gender',
              'type' => '`$STRING`',
              'short' => 'Gender',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'last_name',
              'title' => 'Last Name',
              'type' => '`$STRING`',
              'short' => 'Last name',
            ],
            [
              'name' => 'meta',
              'title' => 'Meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Full name of the representative',
            ],
            [
              'name' => 'objects',
              'title' => 'Objects',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'offices',
              'title' => 'Offices',
              'type' => '`$ARRAY`',
              'short' => 'Contact information for representative\'s offices',
            ],
            [
              'name' => 'party_name',
              'title' => 'Party Name',
              'type' => '`$STRING`',
              'short' => 'Political party name',
            ],
            [
              'name' => 'personal_url',
              'title' => 'Personal Url',
              'type' => '`$STRING`',
              'short' => 'Personal website not on official legislature site',
            ],
            [
              'name' => 'photo_url',
              'title' => 'Photo Url',
              'type' => '`$STRING`',
              'short' => 'URL to representative\'s photo',
            ],
            [
              'name' => 'source_url',
              'title' => 'Source Url',
              'type' => '`$STRING`',
              'short' => 'URL where the data is scraped from',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'short' => 'Representative\'s page on official legislature site',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'representative',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representatives/',
                  'segments' => [
                    [
                      'lit' => 'representatives',
                    ],
                  ],
                  'parts' => [
                    'representatives',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'district',
                        'orig' => 'district',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'district_name',
                        'orig' => 'district_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'elected_office',
                        'orig' => 'elected_office',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'first_name',
                        'orig' => 'first_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'gender',
                        'orig' => 'gender',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'last_name',
                        'orig' => 'last_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'party_name',
                        'orig' => 'party_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'point',
                        'orig' => 'point',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'district',
                      'district_name',
                      'elected_office',
                      'first_name',
                      'format',
                      'gender',
                      'last_name',
                      'limit',
                      'name',
                      'offset',
                      'party_name',
                      'point',
                      'pretty',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/representatives/',
                  'segments' => [
                    [
                      'lit' => 'boundaries',
                    ],
                    [
                      'var' => 'boundary_set',
                    ],
                    [
                      'var' => 'boundary',
                    ],
                    [
                      'lit' => 'representatives',
                    ],
                  ],
                  'parts' => [
                    'boundaries',
                    '{boundary_set}',
                    '{boundary}',
                    'representatives',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'boundary_set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objects`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representatives/{representativeSet}/',
                  'segments' => [
                    [
                      'lit' => 'representatives',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'representatives',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'representativeSet' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'representative_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'district_name',
                        'orig' => 'district_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'elected_office',
                        'orig' => 'elected_office',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'first_name',
                        'orig' => 'first_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'gender',
                        'orig' => 'gender',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'last_name',
                        'orig' => 'last_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'party_name',
                        'orig' => 'party_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'point',
                        'orig' => 'point',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'district_name',
                      'elected_office',
                      'first_name',
                      'format',
                      'gender',
                      'id',
                      'last_name',
                      'limit',
                      'name',
                      'offset',
                      'party_name',
                      'point',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.boundary',
              ],
            ],
          ],
        ],
        'representative_set' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'representative_set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representative-sets/',
                  'segments' => [
                    [
                      'lit' => 'representative-sets',
                    ],
                  ],
                  'parts' => [
                    'representative-sets',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'limit',
                      'offset',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representative-sets/{representativeSet}/',
                  'segments' => [
                    [
                      'lit' => 'representative-sets',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'representative-sets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'representativeSet' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'representative_set',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'format',
                      'id',
                      'pretty',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RepresentOfficialsFeatures::make_feature($name);
    }
}
