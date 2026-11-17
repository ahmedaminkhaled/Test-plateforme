<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserStory;

class UserStorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stories = [
            [
                'id' => 'US-05',
                'title' => 'User Story 5',
                'story_text' => 'As a tester, I want to view event details so that I can verify information.',
                'acceptance_criteria' => [
                    'Event page shows title, date, and location.',
                ],
                'business_rules' => [
                    'All events must have a title.',
                ],
                'is_generated' => false,
            ],
            [
                'id' => 'US-06',
                'title' => 'User Story 6',
                'story_text' => 'As a tester, I want to register for an event so that I can attend it.',
                'acceptance_criteria' => [
                    'Registration form validates required fields.',
                ],
                'business_rules' => [
                    'Registration closes 24h before the event.',
                ],
                'is_generated' => false,
            ],
            [
                'id' => 'US-07',
                'title' => 'User Story 7',
                'story_text' => 'As a tester, I want to search events by keyword.',
                'acceptance_criteria' => [
                    'Search returns matching events.',
                ],
                'business_rules' => [
                    'Search is case‑insensitive.',
                ],
                'is_generated' => false,
            ],
            [
                'id' => 'US-08',
                'title' => 'User Story 8',
                'story_text' => 'As a tester, I want to edit event details to fix mistakes.',
                'acceptance_criteria' => [
                    'Only admins can edit events.',
                ],
                'business_rules' => [
                    'Edited events keep original timestamp.',
                ],
                'is_generated' => false,
            ],
            [
                'id' => 'US-09',
                'title' => 'User Story 9',
                'story_text' => 'As a tester, I want to delete an event after it has passed.',
                'acceptance_criteria' => [
                    'Deleted events are removed from listings.',
                ],
                'business_rules' => [
                    'Deletion is irreversible.',
                ],
                'is_generated' => false,
            ],
            [
                'id' => 'US-10',
                'title' => 'User Story 10',
                'story_text' => 'As a tester, I want to export event data to CSV.',
                'acceptance_criteria' => [
                    'CSV includes all event fields.',
                ],
                'business_rules' => [
                    'Export respects privacy settings.',
                ],
                'is_generated' => false,
            ],
        ];

        foreach ($stories as $story) {
            UserStory::updateOrCreate(['id' => $story['id']], $story);
        }
    }
}
