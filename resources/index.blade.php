<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <title>Kimia Farma HRIS - Human Resource Information System</title>
    <meta name="description" content="Sistem Informasi Manajemen Sumber Daya Manusia PT Kimia Farma">
    <meta name="author" content="PT Kimia Farma">
    <meta name="theme-color" content="#00A651">

    <!-- favicon -->
    <link
        rel="shortcut icon"
        href="{{ asset('favicons/favicon.ico') }}"
        sizes="any" />
    <link
        rel="shortcut icon"
        href="{{ asset('favicons/favicon.svg') }}"
        type="image/svg+xml" />
    <link
        rel="shortcut apple-touch-icon"
        href="{{ asset('favicons/apple-touch-icon.png') }}" />
    <link
        rel="manifest"
        href="{{ asset('favicons/manifest.webmanifest') }}" />

    <!-- font -->
    <link
        rel="preload"
        href="{{ asset('/fonts/InterVariable.woff2') }}"
        as="font"
        type="font/woff2"
        crossorigin />
    <link
        rel="preload"
        href="{{ asset('/fonts/InterVariable-Italic.woff2') }}"
        as="font"
        type="font/woff2"
        crossorigin />
</head>

<body>
    <div id="root"></div>

    @viteReactRefresh
    @vite(['resources/root.tsx'])
</body>

</html>
