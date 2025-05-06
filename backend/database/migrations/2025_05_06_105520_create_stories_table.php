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
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('martyr_id')->nullable()->constrained('martyrs')->onDelete('cascade');
            $table->foreignId('image_id')->constrained('photos');
            $table->foreignId('video_id')->constrained('videos');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->boolean('updating')->default(false);
            $table->boolean('isUpdated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};
