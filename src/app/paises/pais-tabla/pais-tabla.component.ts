import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pais } from 'src/app/entidades/pais';
import { PaisesService } from '../servicios/paises.service';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.css']
})
export class PaisTablaComponent implements OnInit {

	data:any[] = [];
	pageData:any[] = [];
	
	itemsPerPage:number = 5;
	totalItems:number = 0;
	currentPage:number = 0;

	@Output('paisSeleccionado')
	paisSeleccionado = new EventEmitter<Pais>();

	constructor(private _paisesService:PaisesService) {
	}

	ngOnInit(): void {
		this.obtenerPaises();
	}

	obtenerPaises(){
		this._paisesService.paises$.subscribe(data => { 
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

	onPaisSeleccionado(pais:Pais){
		this.paisSeleccionado.emit(pais);
	}

}
