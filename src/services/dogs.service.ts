// dog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog, DogImage } from '../models/dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'https://api.thedogapi.com/v1';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.apiUrl}/breeds`);
  }

  getImageDetails(): Observable<DogImage[]> {
    return this.http.get<DogImage[]>(`${this.apiUrl}/images/search`);
  }
}
