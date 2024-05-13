import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, switchMap, } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { CharacterService } from 'src/app/core/services/character/character.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

   character!: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
  ) { }

  gotoCharacters() {
    this.router.navigate(['/character']);
  }


  getCharacterById(id: number) {
    this.characterService.getCharacterById(id).subscribe(
      character => {
        this.character = character;
      });
  }


  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.characterService.getCharacterById(+params.get('id')!))
    ).subscribe(character => {
      this.character = character;
    });
  }

}
