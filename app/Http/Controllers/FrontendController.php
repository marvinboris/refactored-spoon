<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use App\Models\Pack;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    private $rules = [
        'pack_id' => 'required|exists:packs,id',
        'date' => 'required|date',
        'email' => 'required|string|email',
        'phone' => 'required|string',
    ];

    public function info()
    {
        $packs = Pack::all();

        return response()->json([
            'packs' => $packs,
        ]);
    }

    public function calculate(Request $request)
    {
        $request->validate($this->rules);

        $dates = [];
        for ($i = 0; $i < 52; $i++) {
            $date = (new Carbon($request->date))->addWeeks($i + 1)->format('Y-m-d');
            $dates[] = $date;
        }

        Calculation::create([
            'pack_id' => $request->pack_id,
            'date' => $request->date,
            'email' => $request->email,
            'phone' => $request->phone,
            'result' => json_encode($dates),
        ]);

        $pack = Pack::find($request->pack_id);

        return response()->json([
            'calculation' => [
                'pack_id' => $request->pack_id,
                'date' => $request->date,
                'email' => $request->email,
                'phone' => $request->phone,
                'result' => $dates,
                'pack' => $pack,
                'exportableData' => json_encode([
                    'payout' => $pack->payout,
                    'dates' => $dates
                ]),
            ]
        ]);
    }

    public function pdf(Request $request)
    {
        $name = $request->name;
        $data = json_decode($request->data, true);

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

        $pdf = \PDF::loadView('pdf.print', $data);

        return $pdf->download($name);
    }
}
