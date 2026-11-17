<?php

namespace Tests\Feature;

use App\Models\TestCase as TestCaseModel;
use Tests\TestCase;

class TestCaseTest extends TestCase
{
    public function test_can_list_test_cases(): void
    {
        $response = $this->getJson('/api/test-cases');

        $response->assertStatus(200)
            ->assertJsonIsArray();
    }

    public function test_can_filter_test_cases(): void
    {
        $response = $this->getJson('/api/test-cases?user_story_id=US-07&type=positive');

        $response->assertStatus(200);
        foreach ($response->json() as $item) {
            $this->assertEquals('US-07', $item['user_story_id']);
            $this->assertEquals('positive', $item['type']);
        }
    }

    public function test_can_create_valid_test_case_matching_json_schema(): void
    {
        $payload = [
            'id' => 'TC-TEST-99',
            'user_story_id' => 'US-07',
            'title' => 'Sample test for schema validation',
            'objective' => 'Verify successful submission with valid parameters.',
            'preconditions' => ['User is authenticated on test project platform'],
            'test_data' => ['sample_key' => 'sample_value'],
            'steps' => [
                ['order' => 1, 'action' => 'Open test target URL'],
                ['order' => 2, 'action' => 'Fill required form values'],
                ['order' => 3, 'action' => 'Click confirmation button'],
            ],
            'expected_result' => 'Operation completes with 200 HTTP code and UI confirmation banner.',
            'type' => 'positive',
            'design_technique' => 'Equivalence partitioning',
            'acceptance_criterion_covered' => 'Criterion 1: Submissions with valid data succeed.',
            'status' => 'approved',
        ];

        $response = $this->postJson('/api/test-cases', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 'TC-TEST-99']);

        $this->assertDatabaseHas('test_cases', ['id' => 'TC-TEST-99']);
    }

    public function test_rejects_test_case_violating_canonical_json_schema(): void
    {
        // Missing steps, invalid type (not positive/negative), invalid id pattern
        $invalidPayload = [
            'id' => 'invalid-id-without-tc-prefix',
            'user_story_id' => 'US-07',
            'title' => 'Invalid case',
            'objective' => 'Test invalid payload',
            'preconditions' => ['Precondition 1'],
            'test_data' => [],
            'steps' => [], // Empty steps violates minItems: 1
            'expected_result' => 'Something',
            'type' => 'not-a-valid-type',
            'design_technique' => 'Unknown',
            'acceptance_criterion_covered' => 'None',
        ];

        $response = $this->postJson('/api/test-cases', $invalidPayload);

        // Should be rejected by request validation or schema validator with 422
        $response->assertStatus(422);
    }

    public function test_can_show_test_case(): void
    {
        $response = $this->getJson('/api/test-cases/TC-012');

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => 'TC-012']);
    }

    public function test_can_update_test_case(): void
    {
        $response = $this->putJson('/api/test-cases/TC-TEST-99', [
            'title' => 'Updated title for schema test',
            'status' => 'needs_review',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated title for schema test', 'status' => 'needs_review']);

        $this->assertDatabaseHas('test_cases', [
            'id' => 'TC-TEST-99',
            'title' => 'Updated title for schema test',
        ]);
    }

    public function test_can_delete_test_case(): void
    {
        $response = $this->deleteJson('/api/test-cases/TC-TEST-99');

        $response->assertStatus(204);
        $this->assertDatabaseMissing('test_cases', ['id' => 'TC-TEST-99']);
    }
}
