import yoga from '../assets/yoga.png';
import bodyjam from '../assets/bodyjam.png';

export interface FitnessClass {
  name: string;
  type: string;
  description: string;
  date: string;
  time: string;
  coach: string;
  image: string; // URL to the image
  maxParticipants: number; // maximum number of participants
  currentParticipants: number; // current number of participants
}



