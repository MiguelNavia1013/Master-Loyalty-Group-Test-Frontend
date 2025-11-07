import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Tienda, TiendaCreate } from '../../models/tienda.model';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tiendas.html',
  styleUrl: './tiendas.scss'
})
export class TiendasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tiendaSvc = inject(TiendaService);

  tiendas: Tienda[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';
  editId: number | null = null;

  form: FormGroup = this.fb.group({
    sucursal: ['', [Validators.required, Validators.maxLength(80)]],
    direccion: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.tiendaSvc.getAll().subscribe({
      next: r => { this.tiendas = r; this.loading = false; },
      error: _ => { this.loading = false; this.errorMsg = 'Error al cargar tiendas'; }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload: TiendaCreate = { ...this.form.value };

    if (this.editId != null) {
      this.tiendaSvc.update(this.editId, payload).subscribe({
        next: () => { this.successMsg = 'Tienda actualizada'; this.cancelEdit(); this.load(); },
        error: _ => this.errorMsg = 'No se pudo actualizar'
      });
    } else {
      this.tiendaSvc.create(payload).subscribe({
        next: _ => { this.successMsg = 'Tienda creada'; this.cancelEdit(); this.load(); },
        error: _ => this.errorMsg = 'No se pudo crear'
      });
    }
  }

  edit(t: Tienda): void {
    this.editId = t.id;
    this.form.reset({ sucursal: t.sucursal, direccion: t.direccion });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editId = null;
    this.form.reset({ sucursal: '', direccion: '' });
  }

  remove(t: Tienda): void {
    if (!confirm(`¿Eliminar sucursal "${t.sucursal}"?`)) return;
    this.tiendaSvc.delete(t.id).subscribe({
      next: () => { this.successMsg = 'Tienda eliminada'; this.load(); },
      error: _ => this.errorMsg = 'No se pudo eliminar'
    });
  }
}
