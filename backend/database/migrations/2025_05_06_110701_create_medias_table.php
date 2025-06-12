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
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('martyr_id')->constrained('martyrs')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->string('file_path');
            $table->string('file_name');
            $table->enum('file_type',['photo', 'video', 'audio']);
            $table->string('file_description');
            $table->date('file_date');
            $table->string('file_location')->nullable();
            $table->number('views')->default(0);
            $table->string('likes')->default(0);
            $table->boolean('featured')->default(false);
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
