<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} - Bind MFA</title>
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
    <!-- Bootstrap CSS CDN -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light min-vh-100 d-flex justify-content-center align-items-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-4 w-100" style="max-width: 500px;">

        <div class="text-center">
            <h2 class="h5 font-weight-normal mb-3">Scan QR Code untuk mengaktifkan MFA</h2>
            <center>
            <div id="qrcode" class="mx-auto mb-4"></div>
            </center>
        </div>

        <form method="POST" action="{{ route('authorizations.mfaconfirm') }}" class="text-center">
            @csrf
            <div class="form-group">
                <label for="otp" class="font-weight-medium">Enter OTP Code</label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    maxlength="6"
                    pattern="\d{6}"
                    required
                    class="form-control text-center"
                >
                @error('otp')
                    <div class="text-danger small">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2">
                Bind MFA
            </button>
        </form>
    </div>

    <script>
        const qrUrl = @json($qrCodeUrl);
        new QRCode(document.getElementById("qrcode"), {
            text: qrUrl,
            width: 200,
            height: 200,
        });
    </script>

    <!-- Bootstrap JS CDN (for modal, tooltips, etc.) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
