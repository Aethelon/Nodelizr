import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@core/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenerateService {
  private readonly apiUrl = `${environment.apiUrl}/generate`;

  constructor(private http: HttpClient) {}

  generateProject(data: any): Observable<Blob> {
    return this.http.post(this.apiUrl, data, {
      responseType: 'blob',
    });
  }
}
