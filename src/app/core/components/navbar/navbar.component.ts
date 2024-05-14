import { Component, OnInit } from '@angular/core';
import { SearchStateService } from '../../services/states/search-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  image: string = 'assets/img/ReM_1.png';
 
  constructor(private searchStateService: SearchStateService) { }

  ngOnInit(): void {

  }

  search(term: string) {
    this.searchStateService.updateSearchTerm(term);
  }



}
