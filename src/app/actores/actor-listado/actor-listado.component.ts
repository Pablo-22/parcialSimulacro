import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/entidades/actor';
import { ActoresService } from '../servicios/actores.service';

@Component({
	selector: 'app-actor-listado',
	templateUrl: './actor-listado.component.html',
	styleUrls: ['./actor-listado.component.css']
})
export class ActorListadoComponent implements OnInit {

	data:Actor[] = [];
	pageData:Actor[] = [];
	
	itemsPerPage:number = 5;
	totalItems:number = 0;
	currentPage:number = 0;

	indexSelectedRow:number|undefined = undefined

	@Output('actorSeleccionado')
	actorSeleccionado = new EventEmitter<Actor>();

	constructor(private _actores:ActoresService) {
		this.obtenerActores();
	}

	ngOnInit(): void {
	}

	onActorSeleccionada(actor:Actor) {
		this.actorSeleccionado.emit(actor);
	}

	formatearFechaNacimiento(actor:Actor){
		if (actor.fechaNacimiento) {
			return actor.fechaNacimiento.toDate();
		}
		return '';
	}

	obtenerActores(){
		this._actores.getAll().subscribe(data => { 
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

	rowStatus(index:number){
		if (index == this.indexSelectedRow) {
			return 'active-row';
		}
		return '';
	}

	onActorSeleccionado(actor:Actor, index:number){
		this.actorSeleccionado.emit(actor);
		this.indexSelectedRow = index;
	}

}
