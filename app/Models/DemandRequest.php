<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DemandRequest extends Model
{
    protected $fillable = [
        'buyer_id',
        'product_name',
        'category',
        'quantity',
        'unit',
        'target_price',
        'needed_by',
        'status',
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(Buyer::class);
    }
}