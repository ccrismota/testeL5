import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { DetailsComponent } from './details/details.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CharacterComponent,
    DetailsComponent,
    EpisodesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CharacterComponent,
    DetailsComponent,
    EpisodesComponent,
    HomeComponent
  ]
})
export class FeaturesModule { }
