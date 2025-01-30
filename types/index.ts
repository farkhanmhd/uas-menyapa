export interface IEventCard {
  id: string;
  title: string;
  posterUrl: string;
  venue: string;
  city: string;
  startTime: Date;
  endTime: Date;
}

export interface FAQ {
  answer: string;
  question: string;
}

export interface IEvent {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  venue: string;
  city: string;
  gmapUrl: string;
  startTime: Date;
  endTime: Date;
  vipAvailability: number;
  regulerAvailability: number;
  orderedVip: number;
  orderedReguler: number;
  vipPrice: number;
  regulerPrice: number;
  questions: string[];
  answers: string[];
}
