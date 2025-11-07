import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Cliente, ClienteCreate, ClienteUpdate } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = `${environment.apiBaseUrl}/clientes`;
  constructor(private http: HttpClient) { }
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  obtener(id: number) {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  crear(data: ClienteCreate) {
    return this.http.post<Cliente>(this.baseUrl, data);
  }

  actualizar(id: number, data: ClienteUpdate) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
