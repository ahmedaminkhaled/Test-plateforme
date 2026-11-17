import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementService } from '../../services/requirement.service';
import { UserStory, TechniqueOption } from '../../models/requirement.model';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent {
  readonly service = inject(RequirementService);

  get stories(): UserStory[] {
    return this.service.stories();
  }

  get selectedStory(): UserStory {
    return this.service.selectedStory();
  }

  get selectedStoryId(): string {
    return this.service.selectedStoryId();
  }

  get techniques(): TechniqueOption[] {
    return this.service.techniques();
  }

  select(id: string): void {
    this.service.selectStory(id);
  }

  toggleTechnique(id: TechniqueOption['id']): void {
    this.service.toggleTechnique(id);
  }

  onGenerate(): void {
    alert(`Triggering test case generation for ${this.selectedStory.id} (${this.selectedStory.title}) using selected ISTQB techniques.`);
  }

  addCriterion(): void {
    const text = prompt('Enter new acceptance criterion:');
    if (text) {
      this.service.addCriterion(this.selectedStoryId, text);
    }
  }
}
