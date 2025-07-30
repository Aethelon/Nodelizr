import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Library, LibrariesService } from '@core/services/libraries.service';

@Component({
  selector: 'app-dependencies-section',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './dependencies-section.component.html',
  styleUrls: ['./dependencies-section.component.scss'],
})
export class DependenciesSectionComponent implements OnInit {
  @Input() filterForm!: FormGroup;

  libraries: Library[] = [];
  grouped: Record<string, Library[]> = {};

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
    });
  }

  get categories(): string[] {
    return Object.keys(this.grouped);
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
