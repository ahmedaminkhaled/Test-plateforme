import { Injectable, signal, computed } from '@angular/core';
import { RunSummary, RunAnomaly } from '../models/run-result.model';

@Injectable({
  providedIn: 'root'
})
export class RunResultService {
  private initialRuns: RunSummary[] = [
    {
      runId: 14,
      timestamp: 'Today at 10:42 on Chrome and Firefox',
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
          badgeType: 'bad',
          browser: 'Firefox'
        },
        {
          testId: 'TC-022',
          testTitle: 'Submit button reachable at 1024 px',
          description: 'The button sits below the visible area on tablet viewport.',
          suite: 'Responsive',
          badgeText: 'Failed',
          badgeType: 'bad',
          browser: 'All viewports <= 1024px'
        },
        {
          testId: 'TC-031',
          testTitle: 'Abstract list loads in time',
          description: 'Page response took 4.2s (SLA limit: 2.0s under moderate load).',
          suite: 'Performance',
          badgeText: 'Slow',
          badgeType: 'wn',
          browser: 'Chrome / Firefox'
        }
      ]
    },
    {
      runId: 13,
      timestamp: 'Yesterday at 17:15 on Chrome',
      browsers: ['Chrome 122'],
      totalTests: 45,
      passedTests: 42,
      failedTests: 3,
      skippedTests: 0,
      suites: [
        { name: 'Functional', passed: 20, total: 20, percentage: 100 },
        { name: 'Cross-browser', passed: 10, total: 11, percentage: 91 },
        { name: 'Responsive', passed: 7, total: 8, percentage: 88 },
        { name: 'Performance', passed: 5, total: 6, percentage: 83 }
      ],
      anomalies: [
        {
          testId: 'TC-022',
          testTitle: 'Submit button reachable at 1024 px',
          description: 'The button sits below the visible area.',
          suite: 'Responsive',
          badgeText: 'Failed',
          badgeType: 'bad'
        }
      ]
    }
  ];

  readonly runs = signal<RunSummary[]>(this.initialRuns);
  readonly selectedRunId = signal<number>(14);
  readonly isExecuting = signal<boolean>(false);
  readonly executionStatusMessage = signal<string>('');

  readonly currentRun = computed(() => {
    const list = this.runs();
    return list.find((r) => r.runId === this.selectedRunId()) || list[0];
  });

  readonly reportsCount = computed(() => this.runs().length);

  selectRun(runId: number): void {
    this.selectedRunId.set(runId);
  }

  triggerRun(callback?: () => void): void {
    this.isExecuting.set(true);
    this.executionStatusMessage.set('Initializing Selenium WebDriver and Grid nodes...');

    setTimeout(() => {
      this.executionStatusMessage.set('Executing Functional suite on Chrome & Firefox...');
    }, 800);

    setTimeout(() => {
      this.executionStatusMessage.set('Executing Cross-browser and Responsive tests...');
    }, 1600);

    setTimeout(() => {
      const nextId = Math.max(...this.runs().map((r) => r.runId)) + 1;
      const now = new Date();
      const timeStr = `Today at ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} on Chrome and Firefox`;

      const newRun: RunSummary = {
        runId: nextId,
        timestamp: timeStr,
        browsers: ['Chrome 122', 'Firefox 123'],
        totalTests: 48,
        passedTests: 43,
        failedTests: 3,
        skippedTests: 2,
        suites: [
          { name: 'Functional', passed: 20, total: 20, percentage: 100 },
          { name: 'Cross-browser', passed: 11, total: 12, percentage: 92 },
          { name: 'Responsive', passed: 8, total: 9, percentage: 89 },
          { name: 'Performance', passed: 4, total: 7, percentage: 57 }
        ],
        anomalies: [
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
            description: 'Load took 3.8s (limit 2.0s).',
            suite: 'Performance',
            badgeText: 'Slow',
            badgeType: 'wn'
          }
        ]
      };

      this.runs.update((all) => [newRun, ...all]);
      this.selectedRunId.set(nextId);
      this.isExecuting.set(false);
      this.executionStatusMessage.set('');
      if (callback) callback();
    }, 2500);
  }

  exportCurrentRunJson(): void {
    const run = this.currentRun();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(run, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `testgen-run-${run.runId}-report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
