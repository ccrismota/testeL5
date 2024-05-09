import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CharacterComponent } from './features/character/character.component';
import { EpisodesComponent } from './features/episodes/episodes.component';
import { DetailsComponent } from './features/details/details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:
    [
      {
        path: 'character', component: CharacterComponent
      },
      {
        path: 'episodes', component: EpisodesComponent
      },
      {
       path: 'details', component: DetailsComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
