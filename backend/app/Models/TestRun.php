<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestRun extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'timestamp_label',
        'browsers',
        'total_tests',
        'passed_tests',
        'failed_tests',
        'skipped_tests',
        'suites',
        'anomalies',
    ];

    protected $casts = [
        'browsers' => 'array',
        'suites' => 'array',
        'anomalies' => 'array',
        'total_tests' => 'integer',
        'passed_tests' => 'integer',
        'failed_tests' => 'integer',
        'skipped_tests' => 'integer',
    ];
}
