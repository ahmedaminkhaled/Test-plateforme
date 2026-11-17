import { Component, HostListener, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestCaseService } from '../../services/test-case.service';
import { RequirementService } from '../../services/requirement.service';
import { TestCase } from '../../models/test-case.model';

@Component({
  selector: 'app-test-cases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss']
})
export class TestCasesComponent {
  readonly service = inject(TestCaseService);
  private reqService = inject(RequirementService);

  readonly showFilterMenu = signal<boolean>(false);
  readonly isEditing = signal<boolean>(false);
  readonly showGenerateDialog = signal<boolean>(false);

  // Edit form model
  editModel = {
    title: '',
    objective: '',
    preconditions: '',
    expected_result: ''
  };

  get cases(): TestCase[] {
    return this.service.filteredCases();
  }

  get totalCases(): number {
    return this.service.totalCount();
  }

  get reviewedCount(): number {
    return this.service.reviewedCount();
  }

  get totalStories(): number {
    return this.service.uniqueStoriesCount();
  }

  get selectedCase(): TestCase | undefined {
    return this.service.selectedCase();
  }

  get selectedCaseId(): string {
    return this.service.selectedCaseId();
  }

  get searchQuery(): string {
    return this.service.searchQuery();
  }

  set searchQuery(val: string) {
    this.service.searchQuery.set(val);
  }

  get filterStatus(): string | null {
    return this.service.filterStatus();
  }

  get filterStory(): string | null {
    return this.service.filterStory();
  }

  readonly availableStories = computed(() => {
    return this.reqService.stories();
  });

  statusLabel(): string {
    const s = this.filterStatus;
    if (s === 'needs_review') return 'Needs review';
    if (s === 'approved') return 'Approved';
    if (s === 'edited') return 'Edited';
    if (s === 'rejected') return 'Rejected';
    return s || '';
  }

  storyLabel(): string {
    const storyId = this.filterStory;
    const story = this.availableStories().find((s) => s.id === storyId);
    return story ? `${story.id} (${story.title})` : storyId || '';
  }

  toggleFilterMenu(): void {
    this.showFilterMenu.update((v) => !v);
  }

  setStatusFilter(status: string | null): void {
    this.service.setStatusFilter(status);
    this.showFilterMenu.set(false);
  }

  setStoryFilter(storyId: string | null): void {
    this.service.setStoryFilter(storyId);
    this.showFilterMenu.set(false);
  }

  resetAllFilters(): void {
    this.service.clearStatusFilter();
    this.service.clearStoryFilter();
    this.service.searchQuery.set('');
  }

  select(id: string): void {
    this.service.selectCase(id);
    this.isEditing.set(false);
  }

  approve(): void {
    this.service.approveCurrent();
  }

  reject(): void {
    this.service.rejectCurrent();
  }

  startEdit(): void {
    const curr = this.selectedCase;
    if (curr) {
      this.editModel = {
        title: curr.title,
        objective: curr.objective,
        preconditions: curr.preconditions.join('\n'),
        expected_result: curr.expected_result
      };
      this.isEditing.set(true);
    }
  }

  saveEdit(): void {
    const curr = this.selectedCase;
    if (curr) {
      this.service.updateCaseDetails(curr.id, {
        title: this.editModel.title,
        objective: this.editModel.objective,
        preconditions: this.editModel.preconditions.split('\n').filter((l) => l.trim().length > 0),
        expected_result: this.editModel.expected_result
      });
      this.isEditing.set(false);
    }
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  clearStatus(): void {
    this.service.clearStatusFilter();
  }

  clearStory(): void {
    this.service.clearStoryFilter();
  }

  openGenerateDialog(): void {
    this.showGenerateDialog.set(true);
  }

  closeGenerateDialog(): void {
    this.showGenerateDialog.set(false);
  }

  generateForStory(storyId: string): void {
    this.reqService.selectStory(storyId);
    const count = this.reqService.generateCasesForSelectedStory();
    this.showGenerateDialog.set(false);
    this.service.setStoryFilter(storyId);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    if (this.isEditing()) return;

    if (event.key === 'a' || event.key === 'A') {
      this.approve();
    } else if (event.key === 'r' || event.key === 'R') {
      this.reject();
    } else if (event.key === 'j' || event.key === 'J' || event.key === 'ArrowDown') {
      this.service.moveNext();
    } else if (event.key === 'k' || event.key === 'K' || event.key === 'ArrowUp') {
      this.service.movePrevious();
    }
  }
}
