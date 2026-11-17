import { Injectable, signal, computed, inject } from '@angular/core';
import { UserStory, TechniqueOption } from '../models/requirement.model';
import { TestCaseService } from './test-case.service';
import { TestCase } from '../models/test-case.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private testCaseService = inject(TestCaseService);

  private initialStories: UserStory[] = [
    {
      id: 'US-05',
      title: 'Register for an event',
      storyText: 'As an attendee, I can submit the registration form and select registration tiers.',
      acceptanceCriteria: [
        'Registration is available while registration window is open.',
        'Required participant details must be validated.',
        'Confirmation email is triggered upon completion.'
      ],
      businessRules: [
        'Each email address can register only once per event.',
        'Capacity limits block further registrations when reached.'
      ],
      testCaseCount: 11,
      isGenerated: true
    },
    {
      id: 'US-06',
      title: 'Book a room',
      storyText: 'As an event organizer, I can search available CERN meeting rooms and place a booking.',
      acceptanceCriteria: [
        'Available rooms match requested time slots and capacity.',
        'Recurring bookings block conflicting single bookings.',
        'Booking requires approval if room is designated restricted.'
      ],
      businessRules: [
        'Bookings cannot be made more than 6 months in advance.',
        'Overlapping reservations for the same room are prevented.'
      ],
      testCaseCount: 9,
      isGenerated: true
    },
    {
      id: 'US-07',
      title: 'Submit an abstract',
      storyText: 'As a speaker, I can submit an abstract so that the committee can review it.',
      acceptanceCriteria: [
        'A logged-in participant can submit while the call is open.',
        'A title is required, and the other fields are kept after an error.',
        'Nobody can submit after the deadline.'
      ],
      businessRules: [
        'One speaker can submit several abstracts.',
        'The committee sees only submitted abstracts.'
      ],
      testCaseCount: 7,
      isGenerated: true
    },
    {
      id: 'US-08',
      title: 'Review an abstract',
      storyText: 'As a reviewer, I can rate submitted abstracts and leave confidential feedback.',
      acceptanceCriteria: [
        'Reviewers only see abstracts assigned to their track.',
        'Scores must be on the 1-5 rubric with mandatory comments.',
        'Review state transitions to Completed once finalized.'
      ],
      businessRules: [
        'Authors cannot review their own submissions (conflict of interest).',
        'Review comments are hidden from authors until decision dispatch.'
      ],
      testCaseCount: 14,
      isGenerated: true
    },
    {
      id: 'US-09',
      title: 'Export event timetable',
      storyText: 'As a participant, I can download the event schedule in PDF, iCal, and Excel formats.',
      acceptanceCriteria: [
        'Export reflects current schedule including ongoing adjustments.',
        'Timezones are preserved accurately.',
        'Parallel sessions are mapped cleanly in calendar exports.'
      ],
      businessRules: [
        'Draft sessions are excluded from public timetable export.'
      ],
      testCaseCount: 4,
      isGenerated: true
    },
    {
      id: 'US-10',
      title: 'Badge printing setup',
      storyText: 'As an event manager, I can generate participant badges with QR codes.',
      acceptanceCriteria: [
        'Badge layout aligns with chosen template (A4 / label roll).',
        'QR code encodes check-in token for mobile scan.',
        'Custom fields (affiliation, dietary restrictions) appear properly.'
      ],
      businessRules: [
        'Only approved attendees receive valid check-in badges.'
      ],
      testCaseCount: 3,
      isGenerated: true
    }
  ];

  readonly stories = signal<UserStory[]>(this.initialStories);
  readonly selectedStoryId = signal<string>('US-07');
  readonly lastSaved = signal<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  readonly techniques = signal<TechniqueOption[]>([
    { id: 'equivalence_partitioning', label: 'Equivalence partitioning', enabled: true },
    { id: 'boundary_value_analysis', label: 'Boundary value analysis', enabled: true },
    { id: 'decision_table', label: 'Decision table', enabled: false },
    { id: 'state_transition', label: 'State transition', enabled: false }
  ]);

  readonly totalStoriesCount = computed(() => this.stories().length);

  readonly selectedStory = computed(() => {
    const list = this.stories();
    return list.find((s) => s.id === this.selectedStoryId()) || list[0];
  });

  selectStory(id: string): void {
    this.selectedStoryId.set(id);
  }

  toggleTechnique(id: TechniqueOption['id']): void {
    this.techniques.update((list) =>
      list.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
    this.touchSaved();
  }

  addCriterion(storyId: string, criterion: string): void {
    const trimmed = criterion.trim();
    if (!trimmed) return;
    this.stories.update((list) =>
      list.map((s) =>
        s.id === storyId
          ? { ...s, acceptanceCriteria: [...s.acceptanceCriteria, trimmed] }
          : s
      )
    );
    this.touchSaved();
  }

  removeCriterion(storyId: string, index: number): void {
    this.stories.update((list) =>
      list.map((s) =>
        s.id === storyId
          ? {
              ...s,
              acceptanceCriteria: s.acceptanceCriteria.filter((_, i) => i !== index)
            }
          : s
      )
    );
    this.touchSaved();
  }

  updateStory(storyId: string, updates: Partial<UserStory>): void {
    this.stories.update((list) =>
      list.map((s) => (s.id === storyId ? { ...s, ...updates } : s))
    );
    this.touchSaved();
  }

  private touchSaved(): void {
    const now = new Date();
    this.lastSaved.set(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  generateCasesForSelectedStory(): number {
    const story = this.selectedStory();
    const enabledTechniques = this.techniques()
      .filter((t) => t.enabled)
      .map((t) => t.label);

    const generated: TestCase[] = [
      {
        id: `TC-${story.id}-01`,
        title: `Positive path: ${story.title}`,
        user_story: story.id,
        user_story_title: story.title.toLowerCase(),
        objective: `Validate standard end-to-end user flow for ${story.title}.`,
        preconditions: [`User is authenticated and permissions for ${story.id} are active.`],
        steps: [
          { order: 1, action: `Open the feature screen for ${story.title}.` },
          { order: 2, action: `Fill all valid inputs according to criteria: "${story.acceptanceCriteria[0] || 'Default criterion'}".` },
          { order: 3, action: `Submit the request and observe confirmation.` }
        ],
        expected_result: `Request is successfully processed and state is persisted.`,
        type: 'positive',
        design_technique: enabledTechniques[0] || 'Equivalence partitioning',
        acceptance_criterion_covered: story.acceptanceCriteria[0] || 'Criterion 1',
        status: 'needs_review'
      },
      {
        id: `TC-${story.id}-02`,
        title: `Boundary constraint check: ${story.title}`,
        user_story: story.id,
        user_story_title: story.title.toLowerCase(),
        objective: `Verify system handles edge value boundaries gracefully for ${story.title}.`,
        preconditions: [`User is authenticated.`],
        steps: [
          { order: 1, action: `Navigate to form input.` },
          { order: 2, action: `Provide boundary data (maximum boundary limit).` },
          { order: 3, action: `Trigger validation action.` }
        ],
        expected_result: `Boundary conditions are enforced with clean validation feedback without crash.`,
        type: 'negative',
        design_technique: enabledTechniques[1] || 'Boundary value analysis',
        acceptance_criterion_covered: story.acceptanceCriteria[1] || 'Criterion 2',
        status: 'needs_review'
      }
    ];

    this.testCaseService.addGeneratedCases(generated);

    this.stories.update((list) =>
      list.map((s) =>
        s.id === story.id
          ? {
              ...s,
              isGenerated: true,
              testCaseCount: s.testCaseCount + generated.length
            }
          : s
      )
    );

    this.touchSaved();
    return generated.length;
  }
}
