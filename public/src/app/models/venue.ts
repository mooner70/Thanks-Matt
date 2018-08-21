export class Venue {
  _id: any;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  minAmmount: number;
  maxAmmount: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
  pic_url: string;
  tour_url: string;
  tourPicURL: string;
  video_url: string;
  facebook_url: string;
  instagram_url: string;
  _category: { 
    name: string; 
  };
  amenities: [{name: string}];
  gallery: [{ name: string }];
  reviews: [{ 
    email: string; 
    subject: string; 
    content: string; 
    rating: number; 
    approved: boolean 
  }];
  avg: number;
  createdAt: any;
  updatedAt: any;
}
