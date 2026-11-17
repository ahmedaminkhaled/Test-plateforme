import { Injectable, signal, computed } from '@angular/core';
import { UserStory, TechniqueOption } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
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
      testCaseCount: 0,
      isGenerated: false
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
    }
  ];

  readonly stories = signal<UserStory[]>(this.initialStories);
  readonly selectedStoryId = signal<string>('US-07');

  readonly techniques = signal<TechniqueOption[]>([
    { id: 'equivalence_partitioning', label: 'Equivalence partitioning', enabled: true },
    { id: 'boundary_value_analysis', label: 'Boundary value analysis', enabled: true },
    { id: 'decision_table', label: 'Decision table', enabled: false },
    { id: 'state_transition', label: 'State transition', enabled: false }
  ]);

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
  }

  addCriterion(storyId: string, criterion: string): void {
    this.stories.update((list) =>
      list.map((s) =>
        s.id === storyId
          ? { ...s, acceptanceCriteria: [...s.acceptanceCriteria, criterion] }
          : s
      )
    );
  }
}
