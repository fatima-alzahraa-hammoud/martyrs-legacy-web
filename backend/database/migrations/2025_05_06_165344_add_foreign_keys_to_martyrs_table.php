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
        Schema::table('martyrs', callback: function (Blueprint $table) {
            $table->foreignId('user_id_publish')->constrained('users');
            $table->foreignId('image_id')->nullable()->constrained('medias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('martyrs', function (Blueprint $table) {
            //
        });
    }
};
