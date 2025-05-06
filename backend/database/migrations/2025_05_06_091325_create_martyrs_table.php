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
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('father_name')->nullable();
            $table->date('birth_date')->nullable();
            $table->date('martyrdom_date')->nullable();
            $table->string('burial_place');
            $table->enum('status', ['martyr', 'missing', 'detained'])->default('martyr')->nullable();
            $table->enum('marital_status', ['single', 'engaged', 'married', 'widowed'])->default('single')->nullable();
            $table->number('nb_of_children');
            $table->foreignId('image_id')->constrained('photos');
            $table->string('related_phone_nb');
            $table->foreignId('user_id_publish')->nullable()->constrained('users');
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
