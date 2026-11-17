<?php

namespace Tests\Feature;

use App\Models\UserStory;
use Tests\TestCase;

class UserStoryTest extends TestCase
{
    public function test_can_list_user_stories(): void
    {
        $response = $this->getJson('/api/user-stories');

        $response->assertStatus(200)
            ->assertJsonIsArray();
    }

    public function test_can_create_user_story(): void
    {
        $payload = [
            'id' => 'US-TEST-99',
            'title' => 'Dynamic project test story',
            'story_text' => 'As a user I want to configure custom modules so that tests run dynamically.',
            'acceptance_criteria' => ['AC-1: Modules are selectable', 'AC-2: Runs persist per project'],
            'business_rules' => ['Rule 1: Name must be non-empty'],
            'is_generated' => false,
        ];

        $response = $this->postJson('/api/user-stories', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['id' => 'US-TEST-99', 'title' => 'Dynamic project test story']);

        $this->assertDatabaseHas('user_stories', ['id' => 'US-TEST-99']);
    }

    public function test_can_show_user_story(): void
    {
        $response = $this->getJson('/api/user-stories/US-07');

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => 'US-07']);
    }

    public function test_can_update_user_story(): void
    {
        $response = $this->putJson('/api/user-stories/US-TEST-99', [
            'title' => 'Updated dynamic title',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated dynamic title']);

        $this->assertDatabaseHas('user_stories', [
            'id' => 'US-TEST-99',
            'title' => 'Updated dynamic title',
        ]);
    }

    public function test_can_delete_user_story(): void
    {
        $response = $this->deleteJson('/api/user-stories/US-TEST-99');

        $response->assertStatus(204);
        $this->assertDatabaseMissing('user_stories', ['id' => 'US-TEST-99']);
    }

    public function test_creation_validation_fails_when_fields_missing(): void
    {
        $response = $this->postJson('/api/user-stories', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['id', 'title', 'story_text', 'acceptance_criteria', 'business_rules']);
    }
}
