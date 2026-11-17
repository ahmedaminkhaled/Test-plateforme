<?php

namespace Tests\Feature;

use App\Models\TestRun;
use Tests\TestCase;

class TestRunTest extends TestCase
{
    public function test_can_list_test_runs(): void
    {
        $response = $this->getJson('/api/test-runs');

        $response->assertStatus(200)
            ->assertJsonIsArray();
    }

    public function test_can_create_test_run(): void
    {
        $payload = [
            'title' => 'Run 15 (E2E Test Run)',
            'timestamp_label' => 'Just now on Chrome and Firefox',
            'browsers' => ['Chrome 122', 'Firefox 123'],
            'total_tests' => 50,
            'passed_tests' => 48,
            'failed_tests' => 2,
            'skipped_tests' => 0,
            'suites' => [
                ['name' => 'Functional', 'passed' => 20, 'total' => 20, 'percentage' => 100],
                ['name' => 'Cross-browser', 'passed' => 12, 'total' => 12, 'percentage' => 100],
                ['name' => 'Responsive', 'passed' => 9, 'total' => 10, 'percentage' => 90],
                ['name' => 'Performance', 'passed' => 7, 'total' => 8, 'percentage' => 88],
            ],
            'anomalies' => [
                [
                    'testId' => 'TC-022',
                    'testTitle' => 'Submit button check',
                    'description' => 'Minor viewport alignment notice',
                    'suite' => 'Responsive',
                    'badgeText' => 'Warning',
                    'badgeType' => 'wn',
                ]
            ],
        ];

        $response = $this->postJson('/api/test-runs', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'Run 15 (E2E Test Run)']);

        $createdId = $response->json('id');
        $this->assertDatabaseHas('test_runs', ['id' => $createdId]);
    }

    public function test_can_show_test_run(): void
    {
        $response = $this->getJson('/api/test-runs/14');

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Run 14']);
    }
}
