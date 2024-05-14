import { Component, OnDestroy, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterInfo } from 'src/app/core/models/characterInfo';
import { CharacterService } from 'src/app/core/services/character/character.service';
import { SearchStateService } from 'src/app/core/services/states/search-state.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy{

  private searchSubscription: Subscription;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    private searchStateService: SearchStateService

  ) {
    this.searchSubscription = this.searchStateService.searchTerm$.subscribe((term) => {
      this.searchCharacter = term;
      this.search(term);
      this.allCharacter(this.page);
    });
   }

   getCharacterModel!: CharacterInfo;
   pages: number[] = [];
   page = 1;
   searchCharacter: string = "";
   isLoading = false;


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

  search(term: string) {    
    term = term.trim();
    const currentUrl = this.router.url;
    const newUrl = `character/?page=${this.page}&name=${term}`;
    if (currentUrl !== newUrl) {
      this.router.navigate(['character'], { queryParams: { page: this.page, name: term } });
    }        
}

ngOnDestroy(): void {
  this.searchSubscription.unsubscribe();
}

private allCharacter(page: number = 1) {
    this.isLoading = true;
    this.characterService.getAllCharacter(page, this.searchCharacter).subscribe((characters) => {
      this.getCharacterModel = characters;
      this.getArrayPages(characters.info.pages);
      this.page = page;
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



