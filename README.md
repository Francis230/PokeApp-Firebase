# PokeFinder - README

## Descripción

**PokeFinder** es una aplicación móvil interactiva creada con **Ionic** y **Angular** que permite a los usuarios buscar información detallada sobre sus Pokémon favoritos. Gracias a la integración con la **PokeAPI**, los usuarios pueden explorar las estadísticas, habilidades y características de cada Pokémon. Además, los usuarios pueden guardar sus Pokémon favoritos en **Firebase** y añadir una reseña personal.

Con **PokeFinder**, los entrenadores Pokémon pueden disfrutar de una experiencia divertida y educativa mientras exploran el mundo de los Pokémon, almacenando sus favoritos y compartiendo sus opiniones con la comunidad.

---

## Características Principales

* **Búsqueda de Pokémon**: Los usuarios pueden buscar Pokémon por nombre para ver detalles como su altura, peso, estadísticas de combate y habilidades.
* **Vista Detallada**: Una página dedicada con información completa sobre un Pokémon, que incluye una imagen y estadísticas.
* **Reseñas Personalizadas**: Los usuarios pueden escribir reseñas personales sobre cada Pokémon y guardarlas en Firebase.
* **Guardado en Firebase**: Cada Pokémon guardado en la aplicación puede almacenarse en **Firebase Firestore**, permitiendo que las reseñas y la información se persistan.
* **Interfaz Amigable y Adaptativa**: Utiliza **Ionic** para garantizar una experiencia fluida en dispositivos móviles.

---

## Tecnologías Utilizadas

* **Ionic**: Framework para crear aplicaciones móviles nativas híbridas.
* **Angular**: Framework para el desarrollo web basado en componentes.
* **Firebase**: Base de datos en tiempo real para almacenar los datos de los Pokémon guardados por el usuario.
* **PokeAPI**: API que proporciona información sobre los Pokémon de manera dinámica.
* **Firestore**: Servicio de almacenamiento en la nube proporcionado por Firebase.

---

## Estructura del Proyecto

### Rutas (app.routes.ts)

La aplicación cuenta con dos rutas principales:

1. **HomePage**: Pantalla inicial donde se puede buscar y ver una lista de Pokémon.
2. **PokemonDetailPage**: Página que muestra los detalles completos de un Pokémon, incluidas sus estadísticas y una opción para guardar una reseña.

```typescript
import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailPage } from './pokemon-detail/pokemon-detail.page';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'pokemon/:name', loadComponent: () => import('./pokemon-detail/pokemon-detail.page').then(m => m.PokemonDetailPage) }
];
```

### Componente Principal (app.component.ts)

Este componente sirve como punto de entrada a la aplicación, con el `RouterOutlet` de Angular para cargar las vistas correspondientes.

```typescript
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`
})
export class AppComponent {}
```

### Página de Detalle de Pokémon (pokemon-detail.page.ts)

Esta página muestra la información detallada de un Pokémon, incluyendo una opción para añadir reseñas personales. Los datos se obtienen de la **PokeAPI** y se almacenan en **Firebase**.

```typescript
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
```

### Servicio de Pokémon (pokemon.service.ts)

Este servicio se encarga de obtener los datos de los Pokémon desde la **PokeAPI**.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
```

### Servicio de Firebase (firebase.service.ts)

Este servicio permite almacenar los datos de los Pokémon guardados en **Firebase Firestore**.

```typescript
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
```

---

## Instrucciones de Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/pokefinder.git
   cd pokefinder
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura Firebase**:

   * Crea un proyecto en Firebase y obtiene las credenciales de tu base de datos de Firestore.
   * Agrega estas credenciales en tu archivo `src/environments/environment.ts`.

4. **Ejecuta la aplicación**:

   ```bash
   ionic serve
   ```

---

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras algún error o deseas agregar nuevas características, puedes hacer un **fork** del repositorio, realizar tus cambios y enviar un **pull request**.

---

## Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes usarlo, modificarlo y distribuirlo libremente bajo los términos de esta licencia.

---

¡Esperamos que disfrutes de tu aventura Pokémon con **PokeFinder**! ¡Sigue explorando y coleccionando todos los Pokémon! 🐾🎮
