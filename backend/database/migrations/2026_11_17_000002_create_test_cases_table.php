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
        Schema::create('test_cases', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. "TC-014", pattern ^TC-[A-Z0-9-]+$
            $table->string('user_story_id');
            $table->string('user_story_title')->nullable();
            $table->string('title');
            $table->text('objective');
            $table->json('preconditions'); // array of strings
            $table->json('test_data'); // key-value map
            $table->json('steps'); // array of {order: int, action: string}
            $table->text('expected_result');
            $table->string('type'); // "positive" or "negative"
            $table->string('design_technique'); // e.g. "Equivalence partitioning"
            $table->text('acceptance_criterion_covered');
            $table->string('status')->default('needs_review'); // "needs_review", "approved", "edited", "rejected"
            $table->timestamps();

            $table->foreign('user_story_id')
                ->references('id')
                ->on('user_stories')
                ->onDelete('cascade');

            $table->index('user_story_id');
            $table->index('status');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_cases');
    }
};
