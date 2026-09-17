<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demand_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('buyer_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('product_name');

            $table->string('category')
                ->nullable();

            $table->decimal('quantity', 10, 2);

            $table->string('unit');

            $table->decimal('target_price', 10, 2)
                ->nullable();

            $table->date('needed_by')
                ->nullable();

            $table->string('status')
                ->default('open');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demand_requests');
    }
};