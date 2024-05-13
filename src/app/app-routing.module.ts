import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CharacterComponent } from './features/character/character.component';
import { EpisodesComponent } from './features/episodes/episodes.component';
import { DetailsComponent } from './features/details/details.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'character', component: CharacterComponent,    
  },
  {
    path: 'character/:id', component: DetailsComponent
  },
  {
    path: 'episodes', component: EpisodesComponent
  },
  {
    path: '**', redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
