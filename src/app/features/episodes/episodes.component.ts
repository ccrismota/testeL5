import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EpisodeInfo } from 'src/app/core/models/episodeInfo';
import { EpisodeService } from 'src/app/core/services/episode/episode.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent {

  constructor(
    private episodeService: EpisodeService,
    private route: ActivatedRoute
  ) { this.allEpisode(); }

  currentText: any;
  getEpisodeModel?: EpisodeInfo;
  pages: number[] = [];
  page = 1;
  isLoading = false;

  allEpisode(page: number = 1) {
    this.isLoading = true;
    this.episodeService.allEpisodes(page).subscribe((episodes) => {
      this.getEpisodeModel = episodes;
      this.getArrayPages(episodes.info.pages);
      this.page = page;
      this.page++;
      this.isLoading = false;
    },
      (error) => {
        console.error('Error: Error loading items', error);
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
      this.allEpisode(this.page + 1);
    }
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.allEpisode(this.page);
    });
    
  }


}
