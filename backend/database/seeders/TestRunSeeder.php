<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestRun;

class TestRunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $runs = [
            [
                'id' => 14,
                'title' => 'Run 14',
                'timestamp_label' => 'Today at 10:42 on Chrome and Firefox',
                'browsers' => ['Chrome 122', 'Firefox 123'],
                'total_tests' => 48,
                'passed_tests' => 41,
                'failed_tests' => 5,
                'skipped_tests' => 2,
                'suites' => [
                    ['name' => 'Functional', 'passed' => 19, 'total' => 20, 'percentage' => 95],
                    ['name' => 'Cross-browser', 'passed' => 9, 'total' => 12, 'percentage' => 75],
                    ['name' => 'Responsive', 'passed' => 8, 'total' => 9, 'percentage' => 89],
                    ['name' => 'Performance', 'passed' => 5, 'total' => 7, 'percentage' => 71],
                ],
                'anomalies' => [
                    [
                        'testId' => 'TC-014',
                        'testTitle' => 'Reject an empty title',
                        'description' => 'Expected a message at the title field. Found the form reloaded with no message.',
                        'suite' => 'Functional',
                        'badgeText' => 'Firefox only',
                        'badgeType' => 'bad',
                        'browser' => 'Firefox',
                    ],
                    [
                        'testId' => 'TC-022',
                        'testTitle' => 'Submit button reachable at 1024 px',
                        'description' => 'The button sits below the visible area on tablet viewport.',
                        'suite' => 'Responsive',
                        'badgeText' => 'Failed',
                        'badgeType' => 'bad',
                        'browser' => 'All viewports <= 1024px',
                    ],
                    [
                        'testId' => 'TC-031',
                        'testTitle' => 'Abstract list loads in time',
                        'description' => 'Page response took 4.2s (SLA limit: 2.0s under moderate load).',
                        'suite' => 'Performance',
                        'badgeText' => 'Slow',
                        'badgeType' => 'wn',
                        'browser' => 'Chrome / Firefox',
                    ],
                ],
            ],
            [
                'id' => 13,
                'title' => 'Run 13',
                'timestamp_label' => 'Yesterday at 17:15 on Chrome',
                'browsers' => ['Chrome 122'],
                'total_tests' => 45,
                'passed_tests' => 42,
                'failed_tests' => 3,
                'skipped_tests' => 0,
                'suites' => [
                    ['name' => 'Functional', 'passed' => 20, 'total' => 20, 'percentage' => 100],
                    ['name' => 'Cross-browser', 'passed' => 10, 'total' => 11, 'percentage' => 91],
                    ['name' => 'Responsive', 'passed' => 7, 'total' => 8, 'percentage' => 88],
                    ['name' => 'Performance', 'passed' => 5, 'total' => 6, 'percentage' => 83],
                ],
                'anomalies' => [
                    [
                        'testId' => 'TC-022',
                        'testTitle' => 'Submit button reachable at 1024 px',
                        'description' => 'The button sits below the visible area.',
                        'suite' => 'Responsive',
                        'badgeText' => 'Failed',
                        'badgeType' => 'bad',
                    ],
                ],
            ],
        ];

        foreach ($runs as $run) {
            TestRun::updateOrCreate(['id' => $run['id']], $run);
        }
    }
}
