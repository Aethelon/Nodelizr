import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { LibrariesService, Library } from '@core/services/libraries.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dependencies-section',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, FormsModule],
  templateUrl: './dependencies-section.component.html',
  styleUrls: ['./dependencies-section.component.scss'],
})
export class DependenciesSectionComponent implements OnInit {
  @Input() filterForm!: FormGroup;

  libraries: Library[] = [];
  grouped: Record<string, Library[]> = {};
  search = '';
  filteredGrouped: Record<string, Library[]> = {};

  get librariesForm(): FormArray {
    return this.filterForm.get('libraries') as FormArray;
  }

  constructor(private librariesService: LibrariesService) {}

  ngOnInit() {
    this.librariesService.getAll().subscribe((libs) => {
      this.libraries = libs;
      this.grouped = libs.reduce((acc, lib) => {
        acc[lib.category] = acc[lib.category] || [];
        acc[lib.category].push(lib);
        return acc;
      }, {} as Record<string, Library[]>);
      this.filteredGrouped = { ...this.grouped };
    });
  }

  onSearch() {
    const term = this.search.trim().toLowerCase();
    if (!term) {
      this.filteredGrouped = { ...this.grouped };
      return;
    }
    this.filteredGrouped = {};
    for (const category of Object.keys(this.grouped)) {
      const filtered = this.grouped[category].filter(
        (lib) =>
          lib.name.toLowerCase().includes(term) ||
          (lib.description && lib.description.toLowerCase().includes(term))
      );
      if (filtered.length) {
        this.filteredGrouped[category] = filtered;
      }
    }
  }

  get categories(): string[] {
    return Object.keys(this.filteredGrouped);
  }

  isSelected(lib: Library): boolean {
    return this.librariesForm.value.some((l: any) => l.name === lib.name);
  }

  toggle(lib: Library) {
    const index = this.librariesForm.value.findIndex(
      (l: any) => l.name === lib.name
    );
    if (index > -1) {
      this.librariesForm.removeAt(index);
    } else {
      this.librariesForm.push(
        new FormControl({ name: lib.name, version: lib.version })
      );
    }
  }
}
