import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;
  review: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemon(name).subscribe(data => {
        this.pokemon = data;
      });
    }
  }

  guardar() {
    const data = {
      name: this.pokemon.name,
      imageUrl: this.pokemon.sprites.front_default,
      height: this.pokemon.height,
      weight: this.pokemon.weight,
      review: this.review
    };
    this.firebaseService.savePokemon(data)
      .then(() => {
        alert('¡Guardado en Firebase!');
        this.review = '';
      })
      .catch(err => {
        console.error('Error al guardar:', err);
        alert('Ocurrió un error al guardar.');
      });
  }
}


