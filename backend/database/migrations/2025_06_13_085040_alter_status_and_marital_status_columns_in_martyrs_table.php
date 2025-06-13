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
        Schema::table('martyrs', function (Blueprint $table) {
            $table->string('status')->default('martyr')->change();
            $table->string('marital_status')->default('single')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('martyrs', function (Blueprint $table) {
            $table->enum('status', ['martyr', 'missing', 'detained'])->default('martyr')->change();
            $table->enum('marital_status', ['single', 'engaged', 'married', 'widowed'])->default('single')->change();
        });
    }
};
