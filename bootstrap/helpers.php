<?php

use App\Helpers\APIResponseHelper;
use Carbon\Carbon;

if (! function_exists('api_response')) {
    function api_response(...$args)
    {
        if (func_num_args() === 0) {
            return new APIResponseHelper;
        }

        return response()->json(...$args);
    }
}

if (! function_exists('is_friday')) {
    function is_friday()
    {
        return Carbon::now()->dayOfWeek === Carbon::FRIDAY;
    }
}

if (! function_exists('format_range_date_input')) {
    function format_range_date_input($start_date = null, $end_date = null)
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
