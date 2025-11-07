import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Compra, CompraCreate } from '../models/compra.model';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private baseUrl = `${environment.apiBaseUrl}/compras`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.baseUrl);
  }

  create(payload: CompraCreate): Observable<Compra> {
    return this.http.post<Compra>(this.baseUrl, payload);
  }
}
