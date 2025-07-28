import { Component, inject } from '@angular/core';
import { MetadataSectionComponent } from '@features/home/components/metadata-section/metadata-section.component';
import { DependenciesSectionComponent } from '@features/home/components/dependencies-section/dependencies-section.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    MetadataSectionComponent,
    DependenciesSectionComponent,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
  ],
})
export class MainComponent {
  private fb = inject(FormBuilder);

  filterForm!: FormGroup;
  constructor() {
    this.filterForm = this.fb.group({
      description: [''],
      author: [''],
      version: [''],
      libraries: this.fb.array([]),
    });
  }
}
