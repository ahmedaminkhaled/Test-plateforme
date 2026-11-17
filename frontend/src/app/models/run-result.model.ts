export type SuiteName = 'Functional' | 'Cross-browser' | 'Responsive' | 'Performance';

export interface SuiteProgress {
  name: SuiteName;
  passed: number;
  total: number;
  percentage: number;
}

export type AnomalySeverity = 'bad' | 'wn';

export interface RunAnomaly {
  testId: string;
  testTitle: string;
  description: string;
  suite: SuiteName;
  badgeText: string;
  badgeType: AnomalySeverity;
}

export interface RunSummary {
  runId: number;
  timestamp: string;
  browsers: string[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  suites: SuiteProgress[];
  anomalies: RunAnomaly[];
}
