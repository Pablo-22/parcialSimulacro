import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, setDoc, updateDoc, where, query, getDocs, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/entidades/actor';

@Injectable({
  	providedIn: 'root'
})
export class ActoresService {

	private actoresCollection: CollectionReference<DocumentData>;

	constructor(private _firestore: Firestore) {
		this.actoresCollection = collection(this._firestore, 'actores');
	}

	getAll() {
		return collectionData(this.actoresCollection, {
		  idField: 'id',
		}) as Observable<Actor[]>;
	}

	get(id: string) {
		const actoresDocumentReference = doc(this.actoresCollection, id);
		return docData(actoresDocumentReference, { idField: 'id' })  as Observable<Actor>;
	}

	async getActorPorNombre(nombre: string) {
		const q = query(this.actoresCollection, where("nombre", "==", nombre));
		const querySnapshot = await getDocs(q);
		let documents:DocumentData[] = [];
		querySnapshot.docs.forEach(doc => {
			let docData = doc.data();
			documents.push(docData);
		})
		return documents;
	}

	create(actor: Actor) {
		let newUserDocRef = doc(this.actoresCollection);
		setDoc(newUserDocRef, {
			id: newUserDocRef.id,
			nombre: actor.nombre,
			apellido: actor.apellido,
			fechaNacimiento: actor.fechaNacimiento,
			nacionalidad: actor.nacionalidad,
			ciudadNatal: actor.ciudadNatal,
		})
		
		return newUserDocRef;
	}


	update(actor: Actor) {
		console.log('UPDATE');
		let id:string = actor.id;
		const actorDocumentReference = doc(this.actoresCollection, id);
		updateDoc(actorDocumentReference, {
			id: actor.id,
			nombre: actor.nombre,
			apellido: actor.apellido,
			fechaNacimiento: actor.fechaNacimiento,
			nacionalidad: actor.nacionalidad,
			ciudadNatal: actor.ciudadNatal,
		} );
	}


	delete(id: string) {
		const actorDocumentReference = doc(this._firestore, `actores/${id}`);
		return deleteDoc(actorDocumentReference);
	}
}
