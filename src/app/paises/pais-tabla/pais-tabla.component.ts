import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../servicios/paises.service';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.css']
})
export class PaisTablaComponent implements OnInit {

	paises:any = [];
	limite:number = 20;
	index:number = 0;

	constructor(private _paisesService:PaisesService) {
	}

	ngOnInit(): void {
		this.loadPage(true);
	}

	loadPage(next:boolean){
		this.paises = [];
		this._paisesService.paises$.subscribe(x => {
			if (!next && this.index > 0) { // PREVIOUS PAGE
				this.limite -= 20;
				this.index -= 20;
			}

			console.log(this.index);

			while( this.index < this.limite) {
				const element = x[this.index];
				this.paises.push(element);
				this.index++;
			}
			this.limite += 20;
		});
	}
}
