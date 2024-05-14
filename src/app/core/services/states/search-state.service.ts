import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService { 


  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor() { }


  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

}
