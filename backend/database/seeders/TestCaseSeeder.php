<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestCase;

class TestCaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cases = [
            [
                'id' => 'TC-012',
                'user_story_id' => 'US-07',
                'title' => 'Submit with all required fields',
                'objective' => 'Verify that a participant can submit an abstract when all mandatory fields are provided.',
                'preconditions' => [
                    'A call for abstracts is open',
                    'The participant is logged in with valid credentials',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Navigate to the event page and open Call for Abstracts.'],
                    ['order' => 2, 'action' => 'Enter "Machine Learning in Particle Physics" in the Title field.'],
                    ['order' => 3, 'action' => 'Enter a valid description and select primary track.'],
                    ['order' => 4, 'action' => 'Click the Submit button.'],
                ],
                'expected_result' => 'The abstract is created, a success banner appears, and the status is "Submitted".',
                'type' => 'positive',
                'design_technique' => 'Equivalence partitioning',
                'acceptance_criterion_covered' => 'Criterion 1: A logged-in participant can submit while the call is open.',
                'status' => 'approved',
            ],
            [
                'id' => 'TC-013',
                'user_story_id' => 'US-07',
                'title' => 'Submit with the longest allowed title',
                'objective' => 'Check title field accepts maximum allowed length (300 characters).',
                'preconditions' => [
                    'A call for abstracts is open and participant is logged in.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Open the call for abstracts.'],
                    ['order' => 2, 'action' => 'Fill in a title of exactly 300 characters.'],
                    ['order' => 3, 'action' => 'Fill in required fields and click Submit.'],
                ],
                'expected_result' => 'Abstract is successfully submitted without truncation.',
                'type' => 'positive',
                'design_technique' => 'Boundary value analysis',
                'acceptance_criterion_covered' => 'Criterion 1: A logged-in participant can submit while the call is open.',
                'status' => 'approved',
            ],
            [
                'id' => 'TC-014',
                'user_story_id' => 'US-07',
                'title' => 'Reject an empty title',
                'objective' => 'Check that a participant cannot submit an abstract without a title.',
                'preconditions' => [
                    'A call for abstracts is open and the participant is logged in.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Open the call for abstracts.'],
                    ['order' => 2, 'action' => 'Leave the title empty.'],
                    ['order' => 3, 'action' => 'Enter "Pilot results from the first campaign" as the description.'],
                    ['order' => 4, 'action' => 'Select Submit.'],
                ],
                'expected_result' => 'The form stays open, a message at the title field asks for a title, and the description is still filled in.',
                'type' => 'negative',
                'design_technique' => 'Equivalence partitioning',
                'acceptance_criterion_covered' => 'Criterion 2: A title is required, and the other fields are kept after an error.',
                'status' => 'needs_review',
            ],
            [
                'id' => 'TC-015',
                'user_story_id' => 'US-07',
                'title' => 'Reject a title above the maximum',
                'objective' => 'Verify that titles exceeding 300 characters trigger validation error.',
                'preconditions' => [
                    'Call for abstracts is open.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Open the submission form.'],
                    ['order' => 2, 'action' => 'Enter a 301-character string in the title.'],
                    ['order' => 3, 'action' => 'Submit the form.'],
                ],
                'expected_result' => 'Submission blocked with error: "Title exceeds maximum length of 300 characters".',
                'type' => 'negative',
                'design_technique' => 'Boundary value analysis',
                'acceptance_criterion_covered' => 'Criterion 2: Validation errors preserve other fields and block invalid input.',
                'status' => 'needs_review',
            ],
            [
                'id' => 'TC-016',
                'user_story_id' => 'US-07',
                'title' => 'Reject an oversized attachment',
                'objective' => 'Ensure attachments larger than 25MB are refused.',
                'preconditions' => [
                    'Submission form open, valid metadata filled.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Attach a file larger than 25MB.'],
                    ['order' => 2, 'action' => 'Attempt submission.'],
                ],
                'expected_result' => 'An inline error indicates file size exceeds limit, upload rejected.',
                'type' => 'negative',
                'design_technique' => 'Boundary value analysis',
                'acceptance_criterion_covered' => 'Criterion 2: File attachments must follow size constraints.',
                'status' => 'needs_review',
            ],
            [
                'id' => 'TC-017',
                'user_story_id' => 'US-07',
                'title' => 'Edit an abstract before the deadline',
                'objective' => 'Author can modify abstract details while deadline is still in future.',
                'preconditions' => [
                    'Abstract is in Submitted status, call deadline is open.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Open existing abstract.'],
                    ['order' => 2, 'action' => 'Modify title and add author.'],
                    ['order' => 3, 'action' => 'Save changes.'],
                ],
                'expected_result' => 'Updates are saved, version timestamp increments.',
                'type' => 'positive',
                'design_technique' => 'State transition',
                'acceptance_criterion_covered' => 'Criterion 1: Participant can modify submitted abstract while the call is open.',
                'status' => 'edited',
            ],
            [
                'id' => 'TC-018',
                'user_story_id' => 'US-07',
                'title' => 'Edit an abstract after the deadline',
                'objective' => 'Prevent modifications once call deadline has passed.',
                'preconditions' => [
                    'Call deadline is passed.',
                ],
                'test_data' => [],
                'steps' => [
                    ['order' => 1, 'action' => 'Attempt to open edit mode on submitted abstract.'],
                ],
                'expected_result' => 'Edit button is disabled or access denied page returned.',
                'type' => 'negative',
                'design_technique' => 'State transition',
                'acceptance_criterion_covered' => 'Criterion 3: Nobody can submit or modify after the deadline.',
                'status' => 'needs_review',
            ],
        ];

        foreach ($cases as $case) {
            TestCase::updateOrCreate(['id' => $case['id']], $case);
        }
    }
}
