import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/entidades/pelicula';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
	selector: 'app-pelicula-listado',
	templateUrl: './pelicula-listado.component.html',
	styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent implements OnInit {

	data:Pelicula[] = [];
	pageData:Pelicula[] = [];
	
	itemsPerPage:number = 4;
	totalItems:number = 0;
	currentPage:number = 0;


	@Output('peliculaSeleccionada')
	peliculaSeleccionada = new EventEmitter<Pelicula>();


	constructor(private _peliculas:PeliculasService) {
		this.obtenerPeliculas();
	}

	ngOnInit(): void {
	}

	onPeliculaSeleccionada(pelicula:Pelicula) {
		this.peliculaSeleccionada.emit(pelicula);
	}

	formatearFechaEstreno(pelicula:Pelicula){
		if (pelicula.fechaEstreno) {
			return pelicula.fechaEstreno.toDate();
		}
		return '';
	}

	obtenerPeliculas(){
		this._peliculas.getAll().subscribe(data => { 
			this.data = data; 
			this.totalItems = data.length;

			this.nextPage();
		});
	}

	nextPage(){
		if (this.currentPage * this.itemsPerPage < this.totalItems) {
			this.loadPage();
			this.currentPage++;
		}
	}

	loadPage(){
		let inicio = this.currentPage * this.itemsPerPage;
		let fin = inicio + this.itemsPerPage;
		this.pageData = [];
		for (let i = inicio; i < fin; i++) {
			if (this.data[i]) {
				const item = this.data[i];
				this.pageData.push(item); 
			}else {
				break;
			}
		}
	}

	previousPage(){
		if ( (this.currentPage - 1) * this.itemsPerPage > 0) {
			this.currentPage -= 2;
			this.loadPage();
			this.currentPage++;
		}
	}

}
