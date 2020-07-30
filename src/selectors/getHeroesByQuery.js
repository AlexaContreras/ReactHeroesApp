import { heroes } from '../data/heroes';

export const getHeroesByQuery = (query = '') => {
  if (query === '') {
    return [];
  }

  query = query.toLocaleLowerCase();
  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(query)
  );
};
