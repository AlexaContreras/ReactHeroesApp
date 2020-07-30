import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByQuery } from '../../selectors/getHeroesByQuery';

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { query = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: query,
  });

  const { searchText } = formValues;

  const heroesFilter = useMemo(() => getHeroesByQuery(query), [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?query=${searchText}`);
  };

  return (
    <div>
      <div className='row'>
        <div className='col-12'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Find hero'
              className='form-control'
              name='searchText'
              value={searchText}
              onChange={handleInputChange}
            />
            <button type='submit' className='btn btn-block btn-outline-info'>
              Search...
            </button>
          </form>
        </div>
      </div>
      <div className='animate__animated animate__fadeIn animate__fast'>
        <hr />
        {query === '' && (
          <div className='alert alert-info block'>Search a hero</div>
        )}
        {query !== '' && heroesFilter.length === 0 && (
          <div className='alert alert-info block'>
            No results found for "{searchText}
          </div>
        )}

        <div className='divSearchResult'>
          {heroesFilter.map((hero) => (
            <div key={hero.id} className='searchResultItems'>
              <HeroCard key={hero.id} {...hero} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
