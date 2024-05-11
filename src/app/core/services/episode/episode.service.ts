import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { EpisodeInfo } from '../../models/episodeInfo';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient) { }

allEpisodes(page = 1): Observable<EpisodeInfo>{
  return this.http.get<EpisodeInfo>(`${API_CONFIG.episodeUrl}?page=${page}`);
  }


}
