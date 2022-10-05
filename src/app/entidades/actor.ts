import { Timestamp } from "@angular/fire/firestore";
import { Pais } from "./pais";

export class Actor {
	id:string = '';
	nombre:string = '';
	apellido:string = '';
	fechaNacimiento:Timestamp = new Timestamp(0, 0);
	nacionalidad:Pais = new Pais();
	ciudadNatal:string = '';
}