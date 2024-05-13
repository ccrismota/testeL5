import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character/character.service';
import { CharacterInfo } from '../../models/characterInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  image: string = 'assets/img/ReM_1.png';
  getCharacterModel!: CharacterInfo;
  pages: number[] = [];
  page = 1;
  searchCharacter: string = "";
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {  }

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
      const newUrl = `/character?page=${this.page}&name=${term}`;
    
      if (currentUrl !== newUrl) {
        this.router.navigate(['character'], { queryParams: { page: this.page, name: term } });
      }        
  }


  allCharacter(page: number = 1) {
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.allCharacter(this.page++);
    }
  }

}
