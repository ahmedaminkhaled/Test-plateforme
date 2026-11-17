import { Injectable, signal, computed } from '@angular/core';
import { TestCase } from '../models/test-case.model';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private initialCases: TestCase[] = [
    {
      id: 'TC-012',
      title: 'Submit with all required fields',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Verify that a participant can submit an abstract when all mandatory fields are provided.',
      preconditions: ['A call for abstracts is open', 'The participant is logged in with valid credentials'],
      steps: [
        { order: 1, action: 'Navigate to the event page and open Call for Abstracts.' },
        { order: 2, action: 'Enter "Machine Learning in Particle Physics" in the Title field.' },
        { order: 3, action: 'Enter a valid description and select primary track.' },
        { order: 4, action: 'Click the Submit button.' }
      ],
      expected_result: 'The abstract is created, a success banner appears, and the status is "Submitted".',
      type: 'positive',
      design_technique: 'Equivalence partitioning',
      acceptance_criterion_covered: 'Criterion 1: A logged-in participant can submit while the call is open.',
      status: 'approved'
    },
    {
      id: 'TC-013',
      title: 'Submit with the longest allowed title',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Check title field accepts maximum allowed length (300 characters).',
      preconditions: ['A call for abstracts is open and participant is logged in.'],
      steps: [
        { order: 1, action: 'Open the call for abstracts.' },
        { order: 2, action: 'Fill in a title of exactly 300 characters.' },
        { order: 3, action: 'Fill in required fields and click Submit.' }
      ],
      expected_result: 'Abstract is successfully submitted without truncation.',
      type: 'positive',
      design_technique: 'Boundary value analysis',
      acceptance_criterion_covered: 'Criterion 1: A logged-in participant can submit while the call is open.',
      status: 'approved'
    },
    {
      id: 'TC-014',
      title: 'Reject an empty title',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Check that a participant cannot submit an abstract without a title.',
      preconditions: ['A call for abstracts is open and the participant is logged in.'],
      steps: [
        { order: 1, action: 'Open the call for abstracts.' },
        { order: 2, action: 'Leave the title empty.' },
        { order: 3, action: 'Enter “Pilot results from the first campaign” as the description.' },
        { order: 4, action: 'Select Submit.' }
      ],
      expected_result: 'The form stays open, a message at the title field asks for a title, and the description is still filled in.',
      type: 'negative',
      design_technique: 'Equivalence partitioning',
      acceptance_criterion_covered: 'Criterion 2: A title is required, and the other fields are kept after an error.',
      status: 'needs_review'
    },
    {
      id: 'TC-015',
      title: 'Reject a title above the maximum',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Verify that titles exceeding 300 characters trigger validation error.',
      preconditions: ['Call for abstracts is open.'],
      steps: [
        { order: 1, action: 'Open the submission form.' },
        { order: 2, action: 'Enter a 301-character string in the title.' },
        { order: 3, action: 'Submit the form.' }
      ],
      expected_result: 'Submission blocked with error: "Title exceeds maximum length of 300 characters".',
      type: 'negative',
      design_technique: 'Boundary value analysis',
      acceptance_criterion_covered: 'Criterion 2: Validation errors preserve other fields and block invalid input.',
      status: 'needs_review'
    },
    {
      id: 'TC-016',
      title: 'Reject an oversized attachment',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Ensure attachments larger than 25MB are refused.',
      preconditions: ['Submission form open, valid metadata filled.'],
      steps: [
        { order: 1, action: 'Attach a file larger than 25MB.' },
        { order: 2, action: 'Attempt submission.' }
      ],
      expected_result: 'An inline error indicates file size exceeds limit, upload rejected.',
      type: 'negative',
      design_technique: 'Boundary value analysis',
      acceptance_criterion_covered: 'Criterion 2: File attachments must follow size constraints.',
      status: 'needs_review'
    },
    {
      id: 'TC-017',
      title: 'Edit an abstract before the deadline',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Author can modify abstract details while deadline is still in future.',
      preconditions: ['Abstract is in Submitted status, call deadline is open.'],
      steps: [
        { order: 1, action: 'Open existing abstract.' },
        { order: 2, action: 'Modify title and add author.' },
        { order: 3, action: 'Save changes.' }
      ],
      expected_result: 'Updates are saved, version timestamp increments.',
      type: 'positive',
      design_technique: 'State transition',
      acceptance_criterion_covered: 'Criterion 1: Participant can modify submitted abstract while call is open.',
      status: 'edited'
    },
    {
      id: 'TC-018',
      title: 'Edit an abstract after the deadline',
      user_story: 'US-07',
      user_story_title: 'submit an abstract',
      objective: 'Prevent modifications once call deadline has passed.',
      preconditions: ['Call deadline is passed.'],
      steps: [
        { order: 1, action: 'Attempt to open edit mode on submitted abstract.' }
      ],
      expected_result: 'Edit button is disabled or access denied page returned.',
      type: 'negative',
      design_technique: 'State transition',
      acceptance_criterion_covered: 'Criterion 3: Nobody can submit or modify after the deadline.',
      status: 'needs_review'
    }
  ];

  readonly cases = signal<TestCase[]>(this.initialCases);
  readonly selectedCaseId = signal<string>('TC-014');
  readonly searchQuery = signal<string>('');
  readonly filterStatus = signal<string | null>(null);
  readonly filterStory = signal<string | null>(null);

  readonly totalCount = computed(() => this.cases().length);

  readonly reviewedCount = computed(() => {
    return this.cases().filter((c) => c.status !== 'needs_review').length;
  });

  readonly uniqueStoriesCount = computed(() => {
    const stories = new Set(this.cases().map((c) => c.user_story));
    return Math.max(stories.size, 1);
  });

  readonly selectedCase = computed(() => {
    const list = this.cases();
    return list.find((c) => c.id === this.selectedCaseId()) || list[0];
  });

  readonly filteredCases = computed(() => {
    let list = this.cases();
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.filterStatus();
    const story = this.filterStory();

    if (query) {
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          c.objective.toLowerCase().includes(query) ||
          c.design_technique.toLowerCase().includes(query)
      );
    }
    if (status) {
      list = list.filter((c) => c.status === status);
    }
    if (story) {
      list = list.filter((c) => c.user_story === story);
    }
    return list;
  });

  selectCase(id: string): void {
    this.selectedCaseId.set(id);
  }

  updateStatus(id: string, newStatus: TestCase['status']): void {
    this.cases.update((items) =>
      items.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  }

  updateCaseDetails(id: string, updates: Partial<TestCase>): void {
    this.cases.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...updates, status: 'edited' } : item))
    );
  }

  approveCurrent(): void {
    const curr = this.selectedCase();
    if (curr) {
      this.updateStatus(curr.id, 'approved');
      this.moveNext();
    }
  }

  rejectCurrent(): void {
    const curr = this.selectedCase();
    if (curr) {
      this.updateStatus(curr.id, 'rejected');
      this.moveNext();
    }
  }

  moveNext(): void {
    const list = this.filteredCases();
    const idx = list.findIndex((c) => c.id === this.selectedCaseId());
    if (idx >= 0 && idx < list.length - 1) {
      this.selectedCaseId.set(list[idx + 1].id);
    }
  }

  movePrevious(): void {
    const list = this.filteredCases();
    const idx = list.findIndex((c) => c.id === this.selectedCaseId());
    if (idx > 0) {
      this.selectedCaseId.set(list[idx - 1].id);
    }
  }

  clearStatusFilter(): void {
    this.filterStatus.set(null);
  }

  clearStoryFilter(): void {
    this.filterStory.set(null);
  }

  setStatusFilter(status: string | null): void {
    this.filterStatus.set(status);
  }

  setStoryFilter(story: string | null): void {
    this.filterStory.set(story);
  }

  addGeneratedCases(newCases: TestCase[]): void {
    this.cases.update((all) => [...all, ...newCases]);
    if (newCases.length > 0) {
      this.selectedCaseId.set(newCases[0].id);
    }
  }
}
