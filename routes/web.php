<?php

use App\Models\Pack;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('pdf', function () {
    $dates = [];
    for ($i = 0; $i < 52; $i++) {
        $date = (new Carbon('2020-05-20'))->addWeeks($i + 1)->format('Y-m-d');
        $dates[] = $date;
    }

    $pack = Pack::find(1);

    $data = [
        'payout' => $pack->payout,
        'dates' => $dates
    ];

    $dates = [];
    foreach ($data['dates'] as $date) {
        $dateInstance = new Carbon($date);
        $periodDate = $dateInstance->timestamp < Carbon::now()->timestamp ? 'Upcoming' : (Carbon::now()->timestamp < $dateInstance->timestamp + 86400000 ? "Today's" : 'Earned');
        $monthDay = $dateInstance->day;
        $dayOfWeek = $dateInstance->dayOfWeek;
        $monthName = $dateInstance->monthName;

        $dates[] = [
            'periodDate' => $periodDate,
            'monthDay' => $monthDay,
            'dayOfWeek' => $dayOfWeek,
            'monthName' => $monthName,
        ];
    }

    $data['dates'] = $dates;

    $pdf = PDF::loadView('pdf.print', $data);

    return $pdf->stream();
});

Route::view('{any}', 'app')->where('any', '^(?!api).*$');
