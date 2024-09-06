// models/dog.ts

export interface Dog {
  id: string;
  name: string;
  bred_for: string;
  breed_group?: string; // Propriedades opcionais
  life_span?: string;
  temperament: string;
  origin: string;
  reference_image?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
}

export interface DogImage {
  id: string;
  url: string;
  width: number;
  height: number;
}
