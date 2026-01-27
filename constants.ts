
import { Game, Category } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: 'basket-hoop',
    title: 'Basket Hoop',
    description: 'Test your aim and score as many hoops as possible in this addictive basketball challenge.',
    thumbnail: 'https://picsum.photos/seed/basket/400/300',
    iframeUrl: 'https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html',
    category: Category.SPORTS,
    tags: ['Basketball', 'Sports', 'Skill'],
    isHot: true
  }
];
