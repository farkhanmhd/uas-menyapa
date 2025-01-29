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

export interface Variant {
  vip: number;
  reguler: number;
}

export interface IEvent {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  venue: string;
  city: string;
  startTime: Date;
  endTime: Date;
  ticketStock: Variant;
  purchasedTickets: Variant;
  price: Variant;
  gmapUrl: string;
  faqs: FAQ[];
  createdAt: Date;
  updatedAt: Date;
}
