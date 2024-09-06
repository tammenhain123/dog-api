import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogCard } from './dog-card.component';
import { CommonModule } from '@angular/common';

describe('DogCardComponent', () => {
  let component: DogCard;
  let fixture: ComponentFixture<DogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogCard],
      imports: [CommonModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dog image', () => {
    component.image = 'https://example.com/image.jpg';
    fixture.detectChanges();

    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toBe('https://example.com/image.jpg');
  });

  it('should display the dog name', () => {
    component.name = 'Bulldog';
    fixture.detectChanges();

    const h3Element: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3Element.textContent).toContain('Bulldog');
  });

  it('should display the bred_for if provided', () => {
    component.bred_for = 'Guard';
    fixture.detectChanges();

    const pElement: HTMLParagraphElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('Raça: Guard');
  });

  it('should not display the bred_for if not provided', () => {
    component.bred_for = undefined;
    fixture.detectChanges();

    const pElements: HTMLParagraphElement[] = fixture.nativeElement.querySelectorAll('p');
    expect(pElements.length).toBe(0);
  });

  it('should display the temperament if provided', () => {
    component.temperament = 'Friendly';
    fixture.detectChanges();

    const pElement: HTMLParagraphElement = fixture.nativeElement.querySelectorAll('p')[1];
    expect(pElement.textContent).toContain('Temperamento: Friendly');
  });

  it('should not display the temperament if not provided', () => {
    component.temperament = undefined;
    fixture.detectChanges();

    const pElements: HTMLParagraphElement[] = fixture.nativeElement.querySelectorAll('p');
    expect(pElements.length).toBe(1); // Only the "Raça" paragraph should be present
  });

  it('should display the origin if provided', () => {
    component.origin = 'England';
    fixture.detectChanges();

    const pElement: HTMLParagraphElement = fixture.nativeElement.querySelectorAll('p')[2];
    expect(pElement.textContent).toContain('Origem: England');
  });

  it('should not display the origin if not provided', () => {
    component.origin = undefined;
    fixture.detectChanges();

    const pElements: HTMLParagraphElement[] = fixture.nativeElement.querySelectorAll('p');
    expect(pElements.length).toBe(2); // Only the "Raça" and "Temperamento" paragraphs should be present
  });
});
