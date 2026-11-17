export interface UserStory {
  id: string; // e.g. "US-07"
  title: string; // e.g. "Submit an abstract"
  storyText: string; // "As a speaker, I can submit an abstract..."
  acceptanceCriteria: string[];
  businessRules: string[];
  testCaseCount: number;
  isGenerated: boolean;
}

export type DesignTechnique =
  | 'equivalence_partitioning'
  | 'boundary_value_analysis'
  | 'decision_table'
  | 'state_transition';

export interface TechniqueOption {
  id: DesignTechnique;
  label: string;
  enabled: boolean;
}
