import { Component, inject } from '@angular/core';
import { MetadataSectionComponent } from '@features/home/components/metadata-section/metadata-section.component';
import { DependenciesSectionComponent } from '@features/home/components/dependencies-section/dependencies-section.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { GenerateService } from '@core/services/generate.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    ToastModule
  ],
})

export class MainComponent {
  private fb = inject(FormBuilder);
  private generateService = inject(GenerateService);
  private messageService: MessageService = inject(MessageService);

  filterForm!: FormGroup;
  constructor() {
    this.filterForm = this.fb.group({
      description: [''],
      author: [''],
      version: [''],
      libraries: this.fb.array([]),
    });
  }
  onGenerate() {
    if (this.filterForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulário inválido',
        detail: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    this.generateService.generateProject(this.filterForm.value).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `project.zip`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.messageService.add({
          severity: 'success',
          summary: 'Projeto gerado',
          detail: 'O arquivo ZIP foi baixado com sucesso!',
        });
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao gerar',
          detail: 'Houve um problema ao gerar o projeto.',
        });
      },
    });
  }
}
