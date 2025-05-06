<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('martyr_id')->nullable()->constrained('martyrs')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('photo_path')->nullable();
            $table->string('photo_name')->nullable();
            $table->enum('photo_type',['interviews', 'identity', 'personal'])->nullable();
            $table->string('photo_description')->nullable();
            $table->date('photo_date')->nullable();
            $table->string('photo_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
