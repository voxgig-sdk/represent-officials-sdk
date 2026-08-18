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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                    "representatif" => [],
                    "representative_set" => [],
                ],
            ],
            "entity" => [
        'boundary' => [
          'fields' => [
            [
              'name' => 'boundary_set_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'external_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'metadata',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objects',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'boundary',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'contain',
                        'orig' => 'contain',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'external_id',
                        'orig' => 'external_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'intersect',
                        'orig' => 'intersect',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'set',
                        'orig' => 'set',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'touch',
                        'orig' => 'touch',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/',
                  'parts' => [
                    'boundaries',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'contain',
                        'orig' => 'contain',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'external_id',
                        'orig' => 'external_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/',
                  'parts' => [
                    'boundaries',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'id',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/',
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
                  'select' => [
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                      'pretty',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.metadata`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/centroid',
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
                  'select' => [
                    '$action' => 'centroid',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/shape',
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
                  'select' => [
                    '$action' => 'shape',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/simple_shape',
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
                  'select' => [
                    '$action' => 'simple_shape',
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/centroid',
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
                  'select' => [
                    '$action' => 'centroid',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/shape',
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
                  'select' => [
                    '$action' => 'shape',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/simple_shape',
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
                  'select' => [
                    '$action' => 'simple_shape',
                    'exist' => [
                      'boundary_set',
                      'callback',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'boundary',
              ],
            ],
          ],
        ],
        'boundary_set' => [
          'fields' => [
            [
              'name' => 'domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'boundary_set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundary-sets/',
                  'parts' => [
                    'boundary-sets',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundary-sets/{boundarySet}/',
                  'parts' => [
                    'boundary-sets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boundarySet' => 'id',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'objects',
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
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/candidates/',
                  'parts' => [
                    'candidates',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'objects',
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
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/elections/',
                  'parts' => [
                    'elections',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'boundaries_concordance',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'centroid',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'province',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'representatives_centroid',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'representatives_concordance',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'postal_code',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'set',
                        'orig' => 'set',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/postcodes/{postalCode}/',
                  'parts' => [
                    'postcodes',
                    '{postal_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'postalCode' => 'postal_code',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'postcode',
              ],
            ],
          ],
        ],
        'representatif' => [
          'fields' => [
            [
              'name' => 'district_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'district_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'elected_office',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'extra',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'first_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'gender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'last_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meta',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objects',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'offices',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'party_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'personal_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'photo_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'representatif',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'district',
                        'orig' => 'district',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'district_name',
                        'orig' => 'district_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'elected_office',
                        'orig' => 'elected_office',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'first_name',
                        'orig' => 'first_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'gender',
                        'orig' => 'gender',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'last_name',
                        'orig' => 'last_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'party_name',
                        'orig' => 'party_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'point',
                        'orig' => 'point',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representatives/',
                  'parts' => [
                    'representatives',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'boundary',
                        'orig' => 'boundary',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'boundary_set',
                        'orig' => 'boundary_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boundaries/{boundarySet}/{boundary}/representatives/',
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
                  'select' => [
                    'exist' => [
                      'boundary',
                      'boundary_set',
                      'callback',
                      'format',
                      'pretty',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objects`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'representative_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'district_name',
                        'orig' => 'district_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'elected_office',
                        'orig' => 'elected_office',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'first_name',
                        'orig' => 'first_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'gender',
                        'orig' => 'gender',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'last_name',
                        'orig' => 'last_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'name',
                        'orig' => 'name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'party_name',
                        'orig' => 'party_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'point',
                        'orig' => 'point',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representatives/{representativeSet}/',
                  'parts' => [
                    'representatives',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'representativeSet' => 'id',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'boundary',
              ],
            ],
          ],
        ],
        'representative_set' => [
          'fields' => [
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'representative_set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representative-sets/',
                  'parts' => [
                    'representative-sets',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'representative_set',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'pretty',
                        'orig' => 'pretty',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/representative-sets/{representativeSet}/',
                  'parts' => [
                    'representative-sets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'representativeSet' => 'id',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
