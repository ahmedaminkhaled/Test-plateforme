import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestCaseService } from '../../services/test-case.service';
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

  get cases(): TestCase[] {
    return this.service.filteredCases();
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

  select(id: string): void {
    this.service.selectCase(id);
  }

  approve(): void {
    this.service.approveCurrent();
  }

  reject(): void {
    this.service.rejectCurrent();
  }

  edit(): void {
    const curr = this.selectedCase;
    if (curr) {
      this.service.updateStatus(curr.id, 'edited');
    }
  }

  clearStatus(): void {
    this.service.clearStatusFilter();
  }

  clearStory(): void {
    this.service.clearStoryFilter();
  }

  // Keyboard navigation for review workflow
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Ignore when typing inside input
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

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
