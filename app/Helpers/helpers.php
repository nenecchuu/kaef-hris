<?php

use App\Helpers\ApiResponseDefaultHelper;
use Carbon\Carbon;
use Illuminate\Http\Response;

if (! function_exists('apiResponse')) {
    function apiResponse(int $status = Response::HTTP_OK, string $message = '', $data = null, $meta = null)
    {
        $response = (new ApiResponseDefaultHelper($data))
            ->setStatus($status)
            ->setMessage($message)
            ->setMeta($meta)
            ->make();

        return response()->json($response, $status);
    }
}

if (! function_exists('isAssoc')) {
    function isAssoc($arr)
    {
        return is_array($arr) && ! array_is_list($arr);
    }
}

if (! function_exists('arrayFilter')) {
    function arrayFilter(array $arr, ?callable $callback = null, int $mode = 0)
    {
        return array_values((array_filter($arr, $callback, $mode)));
    }
}

const PHONE_NUMBER_REGEX = '/^[\+]?[0-9]+$/';
if (! function_exists('phoneNumberRegex')) {
    function phoneNumberRegex()
    {
        return PHONE_NUMBER_REGEX;
    }
}

if (! function_exists('formatRangeDateInput')) {
    function formatRangeDateInput($start_date = null, $end_date = null)
    {
        // init start date to the start of the day of the earliest time (1 Jan 1970)
        $startDate = Carbon::createFromTimestamp(0)->startOfDay();
        // init end date to the end of the day of today
        $endDate = Carbon::now()->endOfDay();

        if ($start_date) {
            $startDate = Carbon::createFromFormat(
                'Y-m-d',
                $start_date
            )->startOfDay();
        }

        if ($end_date) {
            $endDate = Carbon::createFromFormat('Y-m-d', $end_date)->endOfDay();
        }

        return [$startDate, $endDate];
    }
}
