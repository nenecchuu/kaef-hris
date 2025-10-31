<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }} - Authorization</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 flex items-center justify-center min-h-screen">

    <!-- Main Container -->
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <img src="{{ asset('app-logo.svg') }}" alt="Logo" class="h-32">
        </div>

        <!-- Form -->
        <div class="text-center text-xl font-medium mb-6">
            Authorization Request
        </div>
        <div class="text-center mb-6">
            <p><strong>{{ $client->name }}</strong><br /> is requesting permission to access your account.</p>
        </div>
        @if (count($scopes) > 0)
        <div class="scopes mt-5">
            <p><strong>This application will be able to:</strong></p>

            <ul class="list-disc list-inside">
                @foreach ($scopes as $scope)
                <li>{{ $scope->description }}</li>
                @endforeach
            </ul>
        </div>
        @endif
        <form method="post" action="{{ route('passport.authorizations.approve') }}">
            @csrf

            <input type="hidden" name="state" value="{{ $request->state }}">
            <input type="hidden" name="client_id" value="{{ $client->getKey() }}">
            <input type="hidden" name="auth_token" value="{{ $authToken }}">
            <button
                type="submit"
                class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
                Authorize
            </button>
        </form>
        <form method="post" action="{{ route('passport.authorizations.deny') }}">
            @csrf
            @method('DELETE')
            <input type="hidden" name="state" value="{{ $request->state }}">
            <input type="hidden" name="client_id" value="{{ $client->getKey() }}">
            <input type="hidden" name="auth_token" value="{{ $authToken }}">
            <button
                type="submit"
                class="w-full bg-white text-red-600 font-medium py-2 rounded-lg hover:bg-red-700 transition mt-2">
                Cancel
            </button>
        </form>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-4 text-center w-full text-gray-500 text-sm">
        SMI-UMS (User Management System)
    </footer>

</body>

</html>
