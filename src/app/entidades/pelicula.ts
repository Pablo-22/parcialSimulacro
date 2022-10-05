import { Timestamp } from '@angular/fire/firestore';
import { Actor } from './actor';

export class Pelicula {
	id:string = '';
	nombre:string = '';
	tipo:'terror'|'comedia'|'amor'|'otros'|'' = '';
	fechaEstreno:Timestamp = new Timestamp(0, 0);
	cantidadPublico:number = 0;
	fotoPelicula:string = '';
	actor:Actor = new Actor();


	obtenerFechaEstrenoFormateada(){
		if (this.fechaEstreno) {
			return this.fechaEstreno.toDate();
		}
		return '';
	}
}
