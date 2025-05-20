import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailPage } from './pokemon-detail/pokemon-detail.page';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'pokemon/:name', loadComponent: () => import('./pokemon-detail/pokemon-detail.page').then(m => m.PokemonDetailPage) }
];

