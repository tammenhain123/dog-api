import { Routes } from '@angular/router';
import { DogListComponent } from '../components/dog-list/dog-list.component';
export const routes: Routes = [  { path: '', component: DogListComponent }, // Define o novo componente como a página inicial
  { path: '**', redirectTo: '' } ];
