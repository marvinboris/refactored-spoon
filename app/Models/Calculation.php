<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calculation extends Model
{
    use HasFactory;

    protected $fillable = [
        'pack_id', 'date', 'result', 'email', 'phone',
    ];

    public function pack()
    {
        return $this->belongsTo('App\Models\Pack');
    }
}
