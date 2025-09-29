<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\MimeType;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    /**
     * Get file from GCS and return the file.
     * @param string $subpath File path to GCS bucket.
     *
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory|void
     */
    public function redirect(string $subpath)
    {
        $splittedSubPath = explode('/', $subpath);
        $fileName = end($splittedSubPath);

        if (Storage::exists($subpath)) {
            return response(Storage::get($subpath), 200, [
                'filename' => $fileName,
                'disposition' => 'attachment',
                'Content-Type' => MimeType::fromFilename($fileName),
            ]);
        }

        return abort(404, 'File has been removed/deleted from system');
    }
}
