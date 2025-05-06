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
        Schema::create('martyr_wills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('martyr_id')->constrained('martyrs')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->string('title');
            $table->text('description');
            $table->enum('document_type', ['will', 'letter', 'audio_message', 'video_message']);
            $table->foreignId('video_id')->constrained('videos');
            $table->string('file_path'); // For documents/audio
            $table->text('content')->nullable(); // For text transcription
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wills');
    }
};
