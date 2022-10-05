import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, setDoc, updateDoc, where, query, getDocs, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pelicula } from '../../entidades/pelicula';

@Injectable({
  	providedIn: 'root'
})
export class PeliculasService {

	private peliculasCollection: CollectionReference<DocumentData>;

  	constructor(private _firestore: Firestore) {
		this.peliculasCollection = collection(this._firestore, 'peliculas');

	}

	
	getAll() {
		return collectionData(this.peliculasCollection, {
		  idField: 'id',
		}) as Observable<Pelicula[]>;
	}

	get(id: string) {
		const peliculasDocumentReference = doc(this.peliculasCollection, id);
		return docData(peliculasDocumentReference, { idField: 'id' })  as Observable<Pelicula>;
	}

	async getPeliculaPorNombre(nombre: string) {
		const q = query(this.peliculasCollection, where("nombre", "==", nombre));
		const querySnapshot = await getDocs(q);
		let documents:DocumentData[] = [];
		querySnapshot.docs.forEach(doc => {
			let docData = doc.data();
			documents.push(docData);
		})
		return documents;
	}

	create(pelicula: Pelicula) {
		let newUserDocRef = doc(this.peliculasCollection);
		setDoc(newUserDocRef, {
			id: newUserDocRef.id,
			nombre: pelicula.nombre,
			tipo: pelicula.tipo,
			fechaEstreno: pelicula.fechaEstreno,
			cantidadPublico: pelicula.cantidadPublico,
			fotoPelicula: pelicula.fotoPelicula,
		})
		
		
		return newUserDocRef;
	}


	update(pelicula: Pelicula) {
		console.log('UPDATE');
		let id:string = pelicula.id;
		const peliculaDocumentReference = doc(this.peliculasCollection, id);
		updateDoc(peliculaDocumentReference, {
			id: pelicula.id,
			nombre: pelicula.nombre,
			tipo: pelicula.tipo,
			fechaEstreno: pelicula.fechaEstreno,
			cantidadPublico: pelicula.cantidadPublico,
			fotoPelicula: pelicula.fotoPelicula,
		} );
	}


	delete(id: string) {
		const peliculaDocumentReference = doc(this._firestore, `peliculas/${id}`);
		return deleteDoc(peliculaDocumentReference);
	}
}
