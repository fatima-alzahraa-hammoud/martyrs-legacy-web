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
        Schema::create('martyrs', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('mother_name');
            $table->string('father_name');
            $table->date('birth_date');
            $table->string('place_of_birth');
            $table->date('martyrdom_date');
            $table->string('burial_place');
            $table->string('description');
            $table->string('bio');
            $table->string('famous_quote');
            $table->enum('status', ['martyr', 'missing', 'detained'])->default('martyr');
            $table->enum('marital_status', ['single', 'engaged', 'married', 'widowed'])->default('single');
            $table->integer('nb_of_children')->nullable();
            $table->string('related_phone_nb');
            $table->boolean('is_published');
            $table->boolean('updating');
            $table->boolean('is_updated');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('martyrs');
    }
};
