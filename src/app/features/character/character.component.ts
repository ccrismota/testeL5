import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterInfo } from 'src/app/core/models/characterInfo';
import { CharacterService } from 'src/app/core/services/character/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  getCharacterModel!: CharacterInfo;
  pages: number[] = [];
  page = 1;
  searchCharacter: any;
  isLoading = false;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) { this.allCharacter(); }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? +params['page'] : 1;
      this.searchCharacter = params['name'] || '';

      const queryParams: any = {};
      if (!isNaN(this.page)) {
        queryParams['page'] = this.page;
      }
      if (this.searchCharacter) {
        queryParams['name'] = this.searchCharacter;
      }
      this.allCharacter(this.page);
    });

  }

  allCharacter(page: number = 1) {
    this.isLoading = true;
    this.characterService.getAllCharacter(page, this.searchCharacter).subscribe((characters) => {
      this.getCharacterModel = characters;
      this.getArrayPages(characters.info.pages);
      this.page = page;
      this.page++;
      this.isLoading = false;
    },);
  }


  getArrayPages(totalPages: number): void {
    this.pages = [] as number[];
    for (let counter: number = 1; counter <= totalPages; counter++) {
      this.pages.push(counter);
    }
  }

  @HostListener('window:scroll', ['event'])
  onScrollInfinity(): void {
    if (window.innerHeight + window.scrollY >= document
      .body.offsetHeight && !this.isLoading) {
      this.allCharacter(this.page++);
    }
  }

}



