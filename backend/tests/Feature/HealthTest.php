<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_health_endpoint_returns_ok_and_connected_database(): void
    {
        $response = $this->getJson('/api/health');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'timestamp',
                'database',
            ])
            ->assertJson([
                'status' => 'ok',
                'database' => 'connected',
            ]);
    }
}
