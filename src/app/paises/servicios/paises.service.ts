import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

	paises$:Observable<any>

	constructor(private _http:HttpClient) {
		this.paises$ = this.fetchPaises();
	}

	ngOnInit(): void {
		this.paises$.subscribe(x => {
			console.log(x);
		})
	}

	fetchPaises() {
		return this._http.get<any>('https://restcountries.com/v2/all?fields=name,capital,flags')
	}
}
