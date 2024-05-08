import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CharacterComponent } from './features/character/character.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:
    [
      {
        path: 'character', component: CharacterComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
