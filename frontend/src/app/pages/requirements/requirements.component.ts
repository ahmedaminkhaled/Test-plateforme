import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequirementService } from '../../services/requirement.service';
import { UserStory, TechniqueOption } from '../../models/requirement.model';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent {
  readonly service = inject(RequirementService);

  readonly isEditingStory = signal<boolean>(false);
  readonly isAddingCriterion = signal<boolean>(false);
  readonly newCriterionText = signal<string>('');
  readonly notificationMessage = signal<string>('');

  editModel = {
    title: '',
    storyText: '',
    businessRulesText: ''
  };

  get stories(): UserStory[] {
    return this.service.stories();
  }

  get selectedStory(): UserStory {
    return this.service.selectedStory();
  }

  get selectedStoryId(): string {
    return this.service.selectedStoryId();
  }

  get lastSaved(): string {
    return this.service.lastSaved();
  }

  get techniques(): TechniqueOption[] {
    return this.service.techniques();
  }

  select(id: string): void {
    this.service.selectStory(id);
    this.isEditingStory.set(false);
    this.isAddingCriterion.set(false);
  }

  toggleTechnique(id: TechniqueOption['id']): void {
    this.service.toggleTechnique(id);
  }

  onGenerate(): void {
    const count = this.service.generateCasesForSelectedStory();
    this.showNotification(`Generated ${count} black-box test cases for ${this.selectedStory.id} based on selected ISTQB techniques!`);
  }

  startAddCriterion(): void {
    this.newCriterionText.set('');
    this.isAddingCriterion.set(true);
  }

  confirmAddCriterion(): void {
    const text = this.newCriterionText().trim();
    if (text) {
      this.service.addCriterion(this.selectedStoryId, text);
      this.newCriterionText.set('');
      this.isAddingCriterion.set(false);
      this.showNotification('Acceptance criterion added and saved.');
    }
  }

  cancelAddCriterion(): void {
    this.isAddingCriterion.set(false);
    this.newCriterionText.set('');
  }

  removeCriterion(index: number): void {
    this.service.removeCriterion(this.selectedStoryId, index);
  }

  startEditStory(): void {
    const story = this.selectedStory;
    this.editModel = {
      title: story.title,
      storyText: story.storyText,
      businessRulesText: story.businessRules.join('\n')
    };
    this.isEditingStory.set(true);
  }

  saveStoryEdit(): void {
    const rules = this.editModel.businessRulesText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    this.service.updateStory(this.selectedStoryId, {
      title: this.editModel.title,
      storyText: this.editModel.storyText,
      businessRules: rules
    });
    this.isEditingStory.set(false);
    this.showNotification('User story details updated.');
  }

  cancelStoryEdit(): void {
    this.isEditingStory.set(false);
  }

  private showNotification(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => {
      this.notificationMessage.set('');
    }, 3500);
  }
}
