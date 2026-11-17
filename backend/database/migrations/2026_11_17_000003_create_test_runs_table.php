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
        Schema::create('test_runs', function (Blueprint $table) {
            $table->id(); // run ID, e.g. 14, 13
            $table->string('title')->nullable(); // e.g. "Run 14"
            $table->string('timestamp_label')->nullable(); // e.g. "Finished today at 10:42 on Chrome and Firefox"
            $table->json('browsers'); // array of browser names e.g. ["Chrome 122", "Firefox 123"]
            $table->unsignedInteger('total_tests')->default(0);
            $table->unsignedInteger('passed_tests')->default(0);
            $table->unsignedInteger('failed_tests')->default(0);
            $table->unsignedInteger('skipped_tests')->default(0);
            $table->json('suites'); // array of suite progress objects (Functional, Cross-browser, Responsive, Performance)
            $table->json('anomalies'); // array of anomaly objects
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_runs');
    }
};
