<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_complaints', function (Blueprint $table) {
            $table->id();

            $table->foreignId('buyer_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('product_id')
                ->constrained()
                ->onDelete('cascade');

            $table->decimal('reported_price', 10, 2);

            $table->text('reason');

            $table->string('status')
                ->default('pending');

            $table->text('admin_notes')
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('price_complaints');
    }
};