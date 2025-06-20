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
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('martyr_id')->constrained('martyrs')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->text('content');
            $table->string('author');
            $table->string('category');
            $table->string('readTime');
            $table->integer('likes')->default(0);
            $table->boolean('featured')->default(false);
            $table->boolean('updating')->default(false);
            $table->boolean('isUpdated')->default(false);
            $table->boolean('isPublished')->default(false);
            $table->string('date');
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
