import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  savePokemon(data: any) {
    const pokemonCollection = collection(this.firestore, 'pokemones');
    return addDoc(pokemonCollection, data);
  }
}

