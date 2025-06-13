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
        Schema::table('stories', function (Blueprint $table) {
            $table->foreignId('image_id')->nullable()->constrained('medias');
            $table->foreignId('video_id')->nullable()->constrained('medias');
            $table->foreignId('audio_id')->nullable()->constrained('medias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropForeign(['image_id']);
            $table->dropForeign(['video_id']);
            $table->dropForeign(['audio_id']);
            $table->dropColumn(['image_id', 'video_id', 'audio_id']);
        });
    }
};
