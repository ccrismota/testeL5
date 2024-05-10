import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeInfo } from 'src/app/core/models/episodeInfo';
import { CharacterService } from 'src/app/core/services/character.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) { this.allCharacter(); }

  currentText: any;
  getCharacterModel?: EpisodeInfo;
  pages: number[] = [];
  page = 1;
  isLoading = false;

  allCharacter(page: number = 1) {
    this.isLoading = true;
    this.characterService.getAllCharacter(page).subscribe((characters) => {
      this.getCharacterModel = characters;
      this.getArrayPages(characters.info.pages);
      this.page = page;
      this.page++;
      this.isLoading = false;
    },
      (error) => {
        console.error('Error: ', error);
        this.isLoading = false;
      });
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
      this.allCharacter(this.page + 1);
    }
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.allCharacter(this.page);
    });
  }


}
