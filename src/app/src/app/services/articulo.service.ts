import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Articulo, ArticuloCreate } from '../models/articulo.model';

@Injectable({ providedIn: 'root' })
export class ArticuloService {
  private baseUrl = `${environment.apiBaseUrl}/articulos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.baseUrl);
  }

  search(q = '', page = 1, pageSize = 10): Observable<Articulo[]> {
    const params = new HttpParams()
      .set('q', q)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<Articulo[]>(`${this.baseUrl}/search`, { params });
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.baseUrl}/${id}`);
  }

  create(payload: ArticuloCreate): Observable<Articulo> {
    return this.http.post<Articulo>(this.baseUrl, payload);
  }

  update(id: number, payload: ArticuloCreate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
