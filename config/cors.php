<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => ['#.*localhost.*#'],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['Authorization'],
    'max_age' => 86400,
    'supports_credentials' => false, // false when using Bearer token (not cookie)
];
