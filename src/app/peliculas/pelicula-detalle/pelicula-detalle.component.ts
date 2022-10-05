import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/entidades/pelicula';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
	selector: 'app-pelicula-detalle',
	templateUrl: './pelicula-detalle.component.html',
	styleUrls: ['./pelicula-detalle.component.css']
})
export class PeliculaDetalleComponent implements OnInit {

	@Input('pelicula')
	pelicula:Pelicula = new Pelicula();

	constructor(private _peliculasService:PeliculasService) { }

	ngOnInit(): void {
	}

	formatearFechaEstreno(pelicula:Pelicula){
		if (pelicula.fechaEstreno) {
			return pelicula.fechaEstreno.toDate();
		}
		return '';
	}

	obtenerFotoPelicula(pelicula:Pelicula):string {
		return `linear-gradient(to left, rgba(0, 0, 0, 0.027), rgba(0, 0, 0, 0.838)), url('${pelicula.fotoPelicula}')`
	}

	onDelete(){
		console.log(this.pelicula);
		this._peliculasService.delete(this.pelicula.id);
		this.pelicula = new Pelicula();
	}

	onModify(){
		this._peliculasService.update(this.pelicula);
	}

}
