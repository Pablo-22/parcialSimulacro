import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/entidades/pais';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Actor } from 'src/app/entidades/actor';
import { Timestamp } from '@angular/fire/firestore';
import { ActoresService } from '../servicios/actores.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent implements OnInit {

	pais:Pais = new Pais();
	actor:Actor = new Actor()
	form: FormGroup;

	constructor(private _actores:ActoresService) {
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required] ),
			apellido: new FormControl('', [Validators.required]),
			fechaNacimiento: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
			ciudadNatal: new FormControl('', Validators.required),
		});
	}

	ngOnInit(): void {
	}

	paisSeleccionado($event:Pais){
		this.pais = $event;
	}

	guardarActor(){
		let actor = new Actor();
		actor.nombre = this.form.controls['nombre'].value;
		actor.apellido = this.form.controls['apellido'].value;
		actor.ciudadNatal = this.form.controls['ciudadNatal'].value;
		
		let fecha = new Date(this.form.controls['fechaNacimiento'].value);
		fecha.setMinutes( fecha.getMinutes() + fecha.getTimezoneOffset() ); // Para corregir problemas de zona horaria
		fecha.setHours(0,0,0,0); // Setea el tiempo en 0

		actor.fechaNacimiento = Timestamp.fromDate(fecha);

		actor.nacionalidad = this.pais;

		console.log(actor);
		this._actores.create(actor);
	}

}
