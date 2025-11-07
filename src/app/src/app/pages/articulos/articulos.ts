import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Articulo, ArticuloCreate } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.scss']
})
export class ArticulosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private articuloSvc = inject(ArticuloService);

  articulos: Articulo[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  editId: number | null = null;

  form: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.maxLength(30)]],
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    imagen: [''],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  searchText = '';

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.errorMsg = '';
    this.articuloSvc.search(this.searchText, 1, 50).subscribe({
      next: res => { this.articulos = res; this.loading = false; },
      error: err => { this.loading = false; this.errorMsg = this.pickError(err); }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload: ArticuloCreate = { ...this.form.value };

    this.errorMsg = '';
    this.successMsg = '';

    if (this.editId != null) {
      this.articuloSvc.update(this.editId, payload).subscribe({
        next: () => {
          this.successMsg = `Artículo ${this.editId} actualizado`;
          this.cancelEdit();
          this.load();
        },
        error: err => this.errorMsg = this.pickError(err)
      });
    } else {
      this.articuloSvc.create(payload).subscribe({
        next: created => {
          this.successMsg = `Artículo creado: ${created.codigo}`;
          this.form.reset({ codigo: '', descripcion: '', precio: 0, imagen: '', stock: 0 });
          this.load();
        },
        error: err => this.errorMsg = this.pickError(err)
      });
    }
  }

  edit(a: Articulo): void {
    this.editId = a.id;
    this.form.reset({
      codigo: a.codigo,
      descripcion: a.descripcion,
      precio: a.precio,
      imagen: a.imagen,
      stock: a.stock
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editId = null;
    this.form.reset({ codigo: '', descripcion: '', precio: 0, imagen: '', stock: 0 });
  }

  remove(a: Articulo): void {
    const ok = confirm(`¿Eliminar artículo ${a.codigo}?`);
    if (!ok) return;
    this.articuloSvc.delete(a.id).subscribe({
      next: () => { this.successMsg = `Artículo ${a.codigo} eliminado`; this.load(); },
      error: err => this.errorMsg = this.pickError(err)
    });
  }

  onSearchChange(): void { this.load(); }

  private pickError(err: any): string {
    if (err?.error?.message) return err.error.message;
    if (typeof err?.error === 'string') return err.error;
    return 'Ocurrió un error. Intenta de nuevo.';
  }
}
