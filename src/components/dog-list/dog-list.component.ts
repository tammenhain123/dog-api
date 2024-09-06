import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, from, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DogService } from './../../services/dogs.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { DogDetail } from '../dog-detail/dog-detail.component';
import { DogCard } from '../dog-card/dog-card.component';
import { Dog, DogImage } from '../../models/dog';

@Component({
  standalone: true,
  selector: 'app-dog-list',
  imports: [MatPaginatorModule, MatGridListModule, CommonModule, DogCard],
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  dogs: Dog[] = [];
  paginatedDogs: Dog[] = [];
  pageIndex = 0;
  pageSize = 12;
  isLoading = true;

  constructor(private dogService: DogService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDogs();
  }

  loadDogs(): void {
    this.dogService.getBreeds().pipe(
      tap(() => this.isLoading = true), // Mostra o loading
      switchMap((dogs: Dog[]) => {
        this.dogs = dogs;
        this.adjustPageSize(); // Ajusta o tamanho da página
        return this.paginateAndFetchImages(); 
      }),
      tap(() => this.isLoading = false) // Remove o loading após carregar
    ).subscribe();
  }

  openDetails(dog: Dog): void {
    this.dialog.open(DogDetail, {
      width: '400px',
      data: dog
    });
  }

  setImageUrl(): Observable<string> {
    return this.dogService.getImageDetails().pipe(
      map(data => data ? data[0].url : '') // Trata o erro de imagens
    );
  }

  paginateAndFetchImages(): Observable<Dog[]> {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedDogs = this.dogs.slice(start, end);

    // Combina a lista paginada com as imagens, evitando múltiplas chamadas assíncronas
    return combineLatest(
      this.paginatedDogs.map(dog => this.setImageUrl().pipe(
        map(url => ({ ...dog, reference_image: url })) // Mapeia cada dog com a imagem
      ))
    ).pipe(
      tap((dogsWithImages: Dog[]) => {
        this.paginatedDogs = dogsWithImages;
      })
    );
  }

  onPageChange(event: any): void {
    // Atualiza o índice da página
    if (this.pageIndex !== event.pageIndex || this.pageSize !== event.pageSize) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.paginateAndFetchImages().subscribe(); // Faz a paginação e busca as imagens
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustPageSize();
  }

  adjustPageSize(): void {
    const newPageSize = window.innerWidth < 768 ? 6 : 12;
    
    // Somente atualiza se o pageSize mudar
    if (this.pageSize !== newPageSize) {
      this.pageSize = newPageSize;
      this.pageIndex = 0;  // Reinicia o índice da página ao mudar o tamanho da página
      this.paginateAndFetchImages().subscribe();
    }
  }
}
