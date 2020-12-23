<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        html,
        body {
            width: 210mm;
            height: 297mm;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body {
            padding: 15px;
            padding-top: 100px;
            padding-left: 100px;
            font-size: 1rem;
            background: white;
        }
        
        .row, .d-flex {
            display: -webkit-box; /* wkhtmltopdf uses this one */
            display: -webkit-flex;
            -webkit-box-pack: start; /* wkhtmltopdf uses this one */
        }

        .justify-content-end {
            -webkit-justify-content: end;
            -webkit-box-pack: end;
            justify-content: flex-end;
        }

        .align-items-center {
            -webkit-align-items: center;
            align-items: center;
        }
    </style>
</head>

<body>
    <div class="bg-white mx-auto">
        <div class="row">
            @foreach ($dates as $date)
                <div class="col-3">
                    <div class="embed-responsive embed-responsive-1by1 position-relative" style="background: url('{{ asset('images/Group 825@2x.png') }}') no-repeat center; background-size: 107% 107%;">
                        <div class="w-100 h-100 d-flex flex-column justify-content-center text-center py-3 px-4 position-absolute" style="top: 0; left: 0;">
                            <div class="d-flex justify-content-between pt-3 pr-3 text-small text-dark mb-auto">
                                <div class="text-blue text-700">{{ $date['monthName'] }}</div>
                                <div>{{ $date['periodDate'] }} payout</div>
                            </div>

                            <div class="mt-auto pb-4">
                                <div class="text-green display-4 text-500">{{ $date['monthDay'] }}</div>
                                <div class="text-secondary text-x-large text-500">{{ $date['dayOfWeek'] }}</div>
                                <div class="text-dark">${{ $payout }} Limo</div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</body>

</html>