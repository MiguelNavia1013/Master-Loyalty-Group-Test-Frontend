import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss']
})
export class ClientesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ClienteService);

  clientes: Cliente[] = [];
  editId: number | null = null;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    apellidos: ['', [Validators.required, Validators.maxLength(120)]],
    direccion: ['']
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.api.listar().subscribe({
      next: res => this.clientes = res,
      error: () => alert('Error al cargar clientes')
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const value = this.form.value as any;

    if (this.editId) {
      this.api.actualizar(this.editId, value).subscribe({
        next: () => {
          this.cancelar();
          this.cargar();
        },
        error: () => alert('Error al actualizar')
      });
    } else {
      this.api.crear(value).subscribe({
        next: () => {
          this.form.reset();
          this.cargar();
        },
        error: () => alert('Error al crear')
      });
    }
  }

  editar(c: Cliente) {
    this.editId = c.id;
    this.form.patchValue({
      nombre: c.nombre,
      apellidos: c.apellidos,
      direccion: c.direccion ?? ''
    });
  }

  cancelar() {
    this.editId = null;
    this.form.reset();
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar cliente?')) return;
    this.api.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar')
    });
  }
}
