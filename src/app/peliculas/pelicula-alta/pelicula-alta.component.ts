import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/entidades/actor';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/entidades/pelicula';
import { Timestamp } from '@angular/fire/firestore';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent implements OnInit {

	pelicula:Pelicula = new Pelicula();
	actor:Actor = new Actor();
	form: FormGroup;

	constructor(private _peliculas:PeliculasService) {
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required] ),
			cantidadPublico: new FormControl('', [Validators.required]),
			fechaEstreno: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
			tipo: new FormControl('', Validators.required),
			fotoPelicula: new FormControl('', Validators.required),
		});
	}

	ngOnInit(): void {
	}

	actorSeleccionado($event:Actor){
		this.actor = $event;
	}

	guardarPelicula(){
		let pelicula = new Pelicula();
		pelicula.nombre = this.form.controls['nombre'].value;
		pelicula.cantidadPublico = this.form.controls['cantidadPublico'].value;
		pelicula.fotoPelicula = this.form.controls['fotoPelicula'].value;
		pelicula.tipo = this.form.controls['tipo'].value;
		
		let fecha = new Date(this.form.controls['fechaEstreno'].value);
		fecha.setMinutes( fecha.getMinutes() + fecha.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		fecha.setHours(0,0,0,0); // Setea el tiempo en 0

		pelicula.fechaEstreno = Timestamp.fromDate(fecha);

		pelicula.actor = this.actor;

		console.log(pelicula);
		this._peliculas.create(pelicula);
	}

}
