import { environment } from '../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda, TiendaCreate } from '../models/tienda.model';

@Injectable({ providedIn: 'root' })
export class TiendaService {
  private baseUrl = `${environment.apiBaseUrl}/tiendas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(this.baseUrl);
  }

  getById(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.baseUrl}/${id}`);
  }

  create(payload: TiendaCreate): Observable<Tienda> {
    return this.http.post<Tienda>(this.baseUrl, payload);
  }

  update(id: number, payload: TiendaCreate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
