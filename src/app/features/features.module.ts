import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { DetailsComponent } from './details/details.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AbrevtextPipe } from '../shared/abrevtext.pipe';


@NgModule({
  declarations: [
    CharacterComponent,
    DetailsComponent,
    EpisodesComponent,
    HomeComponent,
    AbrevtextPipe,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  exports: [
    CharacterComponent,
    DetailsComponent,
    EpisodesComponent,
    HomeComponent
  ]
})
export class FeaturesModule { }
