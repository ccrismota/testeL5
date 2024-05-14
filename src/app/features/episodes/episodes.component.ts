import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpisodeInfo } from 'src/app/core/models/episodeInfo';
import { EpisodeService } from 'src/app/core/services/episode/episode.service';
import { SearchStateService } from 'src/app/core/services/states/search-state.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit, OnDestroy {

    private searchSubscription: Subscription;

  constructor(
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private router: Router,
    private searchStateService: SearchStateService
  ) { 
    this.searchSubscription = this.searchStateService.searchTerm$.subscribe((term) => {
      this.searchEpisode = term;
      this.search(term);
      this.allEpisode(this.page);
    });
  }

  currentText: any;
  getEpisodeModel!: EpisodeInfo;
  pages: number[] = [];
  page = 1;
  isLoading = false;
  searchEpisode: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? +params['page'] : 1;
      this.searchEpisode = params['name'] || '';

      const queryParams: any = {};
      if (!isNaN(this.page)) {
        queryParams['page'] = this.page;
      }
      if (this.searchEpisode) {
        queryParams['name'] = this.searchEpisode;
      }
      this.allEpisode(this.page);
    });
  }

  search(term: string) {     
    term = term.trim();
    const currentUrl = this.router.url;
    const newUrl = `episode/?page=${this.page}&name=${term}`;
    if (currentUrl !== newUrl) {
      this.router.navigate(['episode'], { queryParams: { page: this.page, name: term } });
    }        
}

ngOnDestroy(): void {
  this.searchSubscription.unsubscribe();
}


 private allEpisode(page: number = 1) {
    this.isLoading = true;
    this.episodeService.allEpisodes(page, this.searchEpisode).subscribe((episodes) => {
      this.getEpisodeModel = episodes;
      this.getArrayPages(episodes.info.pages);
      this.page = page;
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
      this.allEpisode(++this.page);
    }
  }


}
