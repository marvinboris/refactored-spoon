<?php

namespace Database\Seeders;

use App\Models\Pack;
use Illuminate\Database\Seeder;

class PackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $packs = [
            [
                'name' => 'Abidjan',
                'amount' => 100,
                'payout' => 3.07,
            ],
            [
                'name' => 'Porto-Novo',
                'amount' => 200,
                'payout' => 6.53,
            ],
            [
                'name' => 'Libreville',
                'amount' => 400,
                'payout' => 13.84,
            ],
            [
                'name' => 'Ndjaména',
                'amount' => 800,
                'payout' => 29.23,
            ],
            [
                'name' => 'Malabo',
                'amount' => 1600,
                'payout' => 61.53,
            ],
            [
                'name' => 'Yaoundé',
                'amount' => 3200,
                'payout' => 126.15,
            ],
            [
                'name' => 'Pretoria',
                'amount' => 6400,
                'payout' => 258.46,
            ],
            [
                'name' => 'Le Caire',
                'amount' => 12800,
                'payout' => 529.23,
            ],
            [
                'name' => 'Abuja',
                'amount' => 25600,
                'payout' => 1083.07,
            ],
            [
                'name' => 'Dubaï',
                'amount' => 51200,
                'payout' => 2205.5,
            ],
            [
                'name' => 'Ouaga 2000',
                'amount' => 100000,
                'payout' => 4326,
            ],
        ];

        foreach ($packs as $pack) {
            Pack::create($pack);
        }
    }
}
