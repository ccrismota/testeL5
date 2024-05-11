import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { CharacterInfo } from '../../models/characterInfo';

@Injectable({
  providedIn: 'root'
})
export class CharacterService  {


  constructor(
    private http: HttpClient ) { }


getAllCharacter(page = 1): Observable<CharacterInfo>{
  return this.http.get<CharacterInfo>(`${API_CONFIG.characterUrl}/?page=${page}`);
  }

}

