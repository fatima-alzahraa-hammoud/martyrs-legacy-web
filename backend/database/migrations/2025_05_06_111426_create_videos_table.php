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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('martyr_id')->nullable()->constrained('martyrs')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('video_path')->nullable();
            $table->string('video_name')->nullable();
            $table->enum('video_type',['interviews', 'personal'])->nullable();
            $table->string('video_description')->nullable();
            $table->date('video_date')->nullable();
            $table->string('video_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
