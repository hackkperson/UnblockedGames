
export const Category = {
  ALL: 'All',
  ARCADE: 'Arcade',
  PUZZLE: 'Puzzle',
  ACTION: 'Action',
  SPORTS: 'Sports',
  STRATEGY: 'Strategy',
  DRIVING: 'Driving'
};

// Added Game interface to facilitate proper typing across components
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  tags: string[];
  isHot?: boolean;
}
