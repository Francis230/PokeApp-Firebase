# **PokeFinder - README**

## Descripción

¡Bienvenido a **PokeFinder**! Una aplicación móvil diseñada para los amantes de Pokémon. Con **PokeFinder**, podrás explorar los detalles de tus Pokémon favoritos, como sus estadísticas, habilidades, imágenes y más, directamente desde tu móvil. Además, tendrás la capacidad de guardar tus Pokémon preferidos junto con reseñas personalizadas utilizando **Firebase**.

Desarrollada con **Ionic** y **Angular Standalone**, y respaldada por **Firebase** para almacenar la información, esta aplicación es perfecta tanto para entrenadores Pokémon novatos como para los más experimentados. ¡Atrévete a descubrirlos todos!

---

## Características Principales

* **Búsqueda de Pokémon**: Los usuarios pueden buscar cualquier Pokémon por su nombre y obtener información detallada.
* **Vista Detallada**: Al seleccionar un Pokémon, podrás ver su imagen, altura, peso, estadísticas y habilidades.
* **Reseñas Personalizadas**: Los usuarios pueden agregar reseñas y comentarios sobre cada Pokémon y guardarlos en Firebase.
* **Guardado en Firebase**: La aplicación permite almacenar los Pokémon que te gustan junto con tus reseñas para que puedas acceder a ellos en cualquier momento.
* **Interfaz Adaptativa**: Gracias a **Ionic**, la app se adapta a dispositivos móviles de cualquier tamaño y resolución.

---

## Tecnologías Utilizadas

* **Ionic**: Framework híbrido para desarrollar aplicaciones móviles con una sola base de código.
* **Angular**: Framework de JavaScript que permite el desarrollo de aplicaciones web modernas y de alto rendimiento.
* **Firebase**: Servicio de base de datos en tiempo real que se utiliza para guardar y recuperar la información de los Pokémon y reseñas.
* **PokeAPI**: API que ofrece información pública sobre los Pokémon, que es utilizada para obtener datos detallados sobre cada Pokémon.

---

## Estructura del Proyecto

### **1. Rutas (app.routes.ts)**

El archivo de rutas define dos páginas principales: la página de inicio (`HomePage`) y la página de detalles del Pokémon (`PokemonDetailPage`).

```typescript
import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailPage } from './pokemon-detail/pokemon-detail.page';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'pokemon/:name', loadComponent: () => import('./pokemon-detail/pokemon-detail.page').then(m => m.PokemonDetailPage) }
];
```

### **2. Componente Principal (app.component.ts)**

El componente principal de la aplicación es el punto de entrada, y contiene un `RouterOutlet` para manejar las rutas y vistas dinámicas.

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

### **3. Página de Detalle de Pokémon (pokemon-detail.page.ts)**

Esta página muestra los detalles completos de un Pokémon seleccionado. Permite también agregar reseñas y guardarlas en Firebase.

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

### **4. Servicio de Pokémon (pokemon.service.ts)**

Este servicio se encarga de obtener los datos de los Pokémon desde **PokeAPI**.

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

### **5. Servicio de Firebase (firebase.service.ts)**

Este servicio permite guardar la información del Pokémon junto con la reseña del usuario en **Firestore**.

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

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/pokefinder.git
   cd pokefinder
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   ```

3. **Configurar Firebase**:

   * Crea un proyecto en [Firebase](https://firebase.google.com/) y obtiene las credenciales de tu base de datos de Firestore.
   * Agrega las credenciales en el archivo `src/environments/environment.ts`.

4. **Ejecutar la Aplicación**:

   ```bash
   ionic serve
   ```

---

## Galería de Imágenes

A continuación se muestran algunas capturas de pantalla de la aplicación en funcionamiento:

### 1. **Pantalla de Búsqueda de Pokémon**
![image](https://github.com/user-attachments/assets/8ea73928-b11f-4def-bdcf-c0f52b28594c)



### 2. **Página de Detalles del Pokémon**

![image](https://github.com/user-attachments/assets/7734eb62-a584-4d66-a728-268f9e07d552)


### 3. **Formulario de Reseña de Pokémon**
![image](https://github.com/user-attachments/assets/98980e67-683c-4cd8-87f5-5bd9675ba56f)



---

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún error o deseas agregar nuevas características, puedes hacer un **fork** del repositorio, realizar tus cambios y enviar un **pull request**.

---

## Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes usarlo, modificarlo y distribuirlo libremente bajo los términos de esta licencia.

---

¡Gracias por usar **PokeFinder**! ¡Sigue explorando y coleccionando todos los Pokémon! 🐾🎮

