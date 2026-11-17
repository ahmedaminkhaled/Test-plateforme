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
        Schema::create('user_stories', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. "US-05", "US-07"
            $table->string('title');
            $table->text('story_text');
            $table->json('acceptance_criteria'); // array of strings
            $table->json('business_rules'); // array of strings
            $table->boolean('is_generated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_stories');
    }
};
