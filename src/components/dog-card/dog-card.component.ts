import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCard {
  @Input() image: string | undefined;
  @Input() name: string | undefined;
  @Input() bred_for: string | undefined;
  @Input() temperament: string | undefined;
  @Input() origin: string | undefined;
}
