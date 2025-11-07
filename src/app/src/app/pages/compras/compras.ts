import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../../models/cliente.model';
import { Articulo } from '../../models/articulo.model';
import { Compra, CompraCreate } from '../../models/compra.model';

import { ClienteService } from '../../services/cliente.service';
import { ArticuloService } from '../../services/articulo.service';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.scss'
})
export class ComprasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientesSvc = inject(ClienteService);
  private articulosSvc = inject(ArticuloService);
  private comprasSvc = inject(CompraService);

  clientes: Cliente[] = [];
  articulos: Articulo[] = [];
  compras: any[] = [];

  loading = false;
  errorMsg = '';
  successMsg = '';

  form = this.fb.group({
    clienteId: [null, Validators.required],
    articuloId: [null, Validators.required],
    fecha: [new Date().toISOString().substring(0,10), Validators.required],
    descontarStock: [true]
  });

  ngOnInit(): void {
    this.loadRefs();
    this.loadCompras();
  }

  loadRefs(): void {
    this.clientesSvc.listar().subscribe({ next: r => this.clientes = r });
    this.articulosSvc.getAll().subscribe({ next: r => this.articulos = r });
  }

  loadCompras(): void {
    this.loading = true;
    this.comprasSvc.getAll().subscribe({
      next: r => { this.compras = r; this.loading = false; },
      error: _ => { this.loading = false; this.errorMsg = 'Error al cargar compras'; }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const payload: CompraCreate = {
      clienteId: Number(v.clienteId),
      articuloId: Number(v.articuloId),
      fecha: `${v.fecha}T00:00:00`,
      descontarStock: true
    };

    this.errorMsg = ''; this.successMsg = '';
    this.comprasSvc.create(payload).subscribe({
      next: _ => { this.successMsg = 'Compra registrada'; this.loadCompras(); },
      error: err => {
        if (typeof err?.error === 'string') this.errorMsg = err.error;
        else if (err?.error?.message) this.errorMsg = err.error.message;
        else this.errorMsg = 'No se pudo registrar la compra';
      }
    });
  }
}
