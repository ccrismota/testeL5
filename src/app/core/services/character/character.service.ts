import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { CharacterInfo } from '../../models/characterInfo';
import { Character } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  constructor(
    private http: HttpClient) { }


  getAllCharacter(page = 1): Observable<CharacterInfo> {
    return this.http.get<CharacterInfo>(`${API_CONFIG.characterUrl}/?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${API_CONFIG.characterUrl}/${id}`);
  }
}