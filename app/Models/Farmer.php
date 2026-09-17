<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Farmer extends Model
{
    protected $fillable = [
        'user_id',
        'bir_registered',
        'bir_registration_number',
        'farm_name',
        'farm_location',
        'bir_verified',
    ];

    protected function casts(): array
    {
        return [
            'bir_registered' => 'boolean',
            'bir_verified' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}