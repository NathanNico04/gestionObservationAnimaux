import { Animal } from './animal';
import { User } from './user';

export interface Observation {
  id: number;
  date: string;
  latitude: number;
  longitude: number;
  description: string;
  animal: string | Animal; // parfois c'est un IRI (string), parfois un objet
  user?: User; // <-- AJOUTER CECI
  animalName?: string; // pour l'affichage dans la liste
}
