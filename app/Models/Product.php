<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'farmer_id',
        'name',
        'category',
        'description',
        'price',
        'quantity',
        'unit',
        'is_available',
    ];

    public function farmer(): BelongsTo
    {
        return $this->belongsTo(Farmer::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function priceComplaints(): HasMany
    {
        return $this->hasMany(PriceComplaint::class);
    }
}