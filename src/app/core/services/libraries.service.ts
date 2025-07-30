import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@core/environments/environment';
import { Observable } from 'rxjs';

export interface Library {
  name: string;
  description: string;
  category: string;
  version: string;
}

@Injectable({ providedIn: 'root' })
export class LibrariesService {
  private readonly apiUrl = `${environment.apiUrl}/libraries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Library[]> {
    return this.http.get<Library[]>(this.apiUrl);
  }
}
