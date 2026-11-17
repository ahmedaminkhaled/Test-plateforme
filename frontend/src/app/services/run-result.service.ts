import { Injectable, signal } from '@angular/core';
import { RunSummary } from '../models/run-result.model';

@Injectable({
  providedIn: 'root'
})
export class RunResultService {
  private initialRun: RunSummary = {
    runId: 14,
    timestamp: 'Finished today at 10:42 on Chrome and Firefox',
    browsers: ['Chrome 122', 'Firefox 123'],
    totalTests: 48,
    passedTests: 41,
    failedTests: 5,
    skippedTests: 2,
    suites: [
      { name: 'Functional', passed: 19, total: 20, percentage: 95 },
      { name: 'Cross-browser', passed: 9, total: 12, percentage: 75 },
      { name: 'Responsive', passed: 8, total: 9, percentage: 89 },
      { name: 'Performance', passed: 5, total: 7, percentage: 71 }
    ],
    anomalies: [
      {
        testId: 'TC-014',
        testTitle: 'Reject an empty title',
        description: 'Expected a message at the title field. Found the form reloaded with no message.',
        suite: 'Functional',
        badgeText: 'Firefox only',
        badgeType: 'bad'
      },
      {
        testId: 'TC-022',
        testTitle: 'Submit button reachable at 1024 px',
        description: 'The button sits below the visible area.',
        suite: 'Responsive',
        badgeText: 'Failed',
        badgeType: 'bad'
      },
      {
        testId: 'TC-031',
        testTitle: 'Abstract list loads in time',
        description: 'Load took longer than the agreed limit.',
        suite: 'Performance',
        badgeText: 'Slow',
        badgeType: 'wn'
      }
    ]
  };

  readonly currentRun = signal<RunSummary>(this.initialRun);
}
