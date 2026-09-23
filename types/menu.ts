export type MenuCategory = 
  | 'cafe-chaud' 
  | 'the-infusions' 
  | 'boissons-fraiches' 
  | 'jus-naturels' 
  | 'petit-dejeuner' 
  | 'snacks-patisserie';

export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  descriptionFr?: string;
  priceMAD: number;
  category: MenuCategory;
  isPopular?: boolean;
  tags?: ('signature' | 'morning' | 'cold')[];
}

export interface CafeSchedule {
  dayOfWeek: number; // 0-6 (Sun-Sat)
  openTime: string;  // "05:00"
  closeTime: string; // "01:00"
}

export interface MatchBroadcast {
  id: string;
  tournament: string;
  teams: [string, string];
  kickoffTime: string;
  date: string;
  isToday: boolean;
  channel?: string;
  venueComment?: string;
}

export interface CategoryInfo {
  id: MenuCategory;
  labelFr: string;
  labelAr: string;
  subtitleFr: string;
  iconName: string;
}
