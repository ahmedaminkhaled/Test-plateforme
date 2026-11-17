export type TestCaseType = 'positive' | 'negative';

export type TestCaseReviewStatus = 'approved' | 'needs_review' | 'edited' | 'rejected';

export interface TestCaseStep {
  order: number;
  action: string;
}

export interface TestCase {
  id: string; // e.g. "TC-014"
  user_story: string; // e.g. "US-07"
  user_story_title?: string; // e.g. "submit an abstract"
  objective: string;
  preconditions: string[];
  test_data?: Record<string, string | number | boolean | null>;
  steps: TestCaseStep[];
  expected_result: string;
  type: TestCaseType;
  design_technique: string; // e.g. "Equivalence partitioning"
  acceptance_criterion_covered: string;
  status: TestCaseReviewStatus;
  title: string;
  attachment_note?: string;
}
