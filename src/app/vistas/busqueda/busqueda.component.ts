import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/entidades/pelicula';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PeliculasService } from 'src/app/peliculas/servicios/peliculas.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

	pelicula:Pelicula = new Pelicula();
	form: FormGroup;
	errorTipoInvalido:boolean = false;
	errorEliminacion:boolean = false;

	constructor(fb:FormBuilder, private _peliculas:PeliculasService) {
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required] ),
			tipo: new FormControl('', [Validators.required]),
			fechaEstreno: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
			cantidadPublico: new FormControl('', Validators.min(0)),
		});
	}

	ngOnInit(): void {
		
	}

	onPeliculaSeleccionada($event:any):void {
		this.limpiarFormulario();
		this.pelicula = $event;
		this.form.controls['nombre'].setValue(this.pelicula.nombre);
		this.form.controls['tipo'].setValue(this.pelicula.tipo);
		this.form.controls['fechaEstreno'].setValue(this.obtenerFechaEstrenoFormateada(this.pelicula));
		this.form.controls['cantidadPublico'].setValue(this.pelicula.cantidadPublico);
	}

	obtenerFechaEstrenoFormateada(pelicula:Pelicula){
		if (pelicula.fechaEstreno) {
			return pelicula.fechaEstreno.toDate().toISOString().split('T')[0];
		}
		return '';
	}

	modificarPelicula(){
		if (!this.validarTipo(this.form.controls['tipo'].value) 
			|| this.form.status == 'INVALID') {
			return;
		}

		let pelicula = new Pelicula();
		pelicula.id = this.pelicula.id;
		pelicula.nombre = this.form.controls['nombre'].value;
		pelicula.tipo = this.form.controls['tipo'].value;
		pelicula.fotoPelicula = this.pelicula.fotoPelicula;
		
		let fecha = new Date(this.form.controls['fechaEstreno'].value);
		fecha.setMinutes( fecha.getMinutes() + fecha.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		fecha.setHours(0,0,0,0); // Setea el tiempo en 0

		pelicula.fechaEstreno = Timestamp.fromDate(fecha);

		pelicula.cantidadPublico = this.form.controls['cantidadPublico'].value;

		this._peliculas.update(pelicula);
		this.limpiarPelicula();
		this.limpiarFormulario();
	}

	eliminarPelicula():boolean{
		if (this.pelicula.id) {
			this._peliculas.delete(this.pelicula.id);
			this.limpiarPelicula();
			this.limpiarFormulario();
			return true;
		} else {
			this.errorEliminacion = true;
			return false;
		}
	}

	limpiarPelicula(){
		this.pelicula = new Pelicula();
	}

	limpiarFormulario(){
		this.errorTipoInvalido = false;
		this.errorEliminacion = false;
		this.form.controls['nombre'].setValue('');
		this.form.controls['tipo'].setValue('');
		this.form.controls['fechaEstreno'].setValue(new Date());
		this.form.controls['cantidadPublico'].setValue(0);
		this.form.reset();
	}

	validarTipo(tipo:string):boolean{
		let tiposValidos = [ 'terror','comedia','amor','otros' ]
		if (tiposValidos.includes(tipo)) {
			this.errorTipoInvalido = false;
			return true;
		} 
		this.errorTipoInvalido = true;
		return false;
	}

}
