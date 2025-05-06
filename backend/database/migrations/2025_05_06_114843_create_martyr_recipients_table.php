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
        Schema::create('martyr_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('will_id')->constrained('martyr_wills')->cascadeOnDelete();
            $table->enum('recipient_type', [
                'mother', 'father',
                'wife', 'husband',
                'son', 'daughter',
                'brother', 'sister',
                'uncle', 'aunt',
                'general_public'
            ]);
            $table->text('specific_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('martyr_recipients');
    }
};
