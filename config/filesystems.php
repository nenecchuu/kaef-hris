<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been set up for each driver as an example of the required values.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        'avatars' => [
            'driver' => env('FILESYSTEM_DISK', 'local'),
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'auto'),
            'bucket' => env('AWS_BUCKET'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', true),

            'root' => env('FILESYSTEM_DISK') === 's3' ? 'avatars' : storage_path('app/public/avatars'),
            'url' => env('FILESYSTEM_DISK') === 's3' ? env('AWS_ENDPOINT') . env('S3_BASE_PATH', 'ums') . '/avatars' : env('APP_URL') . '/storage/avatars',
            'visibility' => env('FILESYSTEM_DISK') === 's3' ? null : 'public',
            'throw' => true,
        ],

        'archive' => [
            'driver' => env('FILESYSTEM_DISK', 'local'),
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'auto'),
            'bucket' => env('AWS_BUCKET'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', true),

            'root' => env('FILESYSTEM_DISK') === 's3' ? 'archive' : storage_path('app/public/archive'),
            'url' => env('FILESYSTEM_DISK') === 's3' ? env('AWS_ENDPOINT') . '/' . env('S3_BASE_PATH', 'ums') . '/archive' : env('APP_URL') . '/storage/archive',
            'visibility' => env('FILESYSTEM_DISK') === 's3' ? null : 'public',
            'throw' => false,
        ],

        'expenses' => [
            'driver' => env('FILESYSTEM_DISK', 'local'),
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'auto'),
            'bucket' => env('AWS_BUCKET'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', true),

            'root' => env('FILESYSTEM_DISK') === 's3' ? 'expenses' : storage_path('app/public/expenses'),
            'url' => env('FILESYSTEM_DISK') === 's3' ? env('AWS_ENDPOINT') . '/' . env('S3_BASE_PATH', 'ums') . '/expenses' : env('APP_URL') . '/storage/expenses',
            'visibility' => 'public',
            'visibility' => env('FILESYSTEM_DISK') === 's3' ? null : 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_ENDPOINT'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'root' => env('AWS_PROJECT_PATH'),
            'throw' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],
];
