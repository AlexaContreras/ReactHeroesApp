import React, { useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getHeroesById } from '../../selectors/getHeroeById';

export const HeroScreen = ({ history }) => {
  const { heroId } = useParams();

  const hero = useMemo(() => getHeroesById(heroId), [heroId]);

  if (!hero) {
    return <Redirect to='/' />;
  }

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  const handleReturn = (publisher) => {
    if (history.length <= 2) {
      if (publisher === 'DC Comics') {
        history.push('/dc');
      } else {
        history.push('/');
      }
    } else {
      history.goBack();
    }
  };

  return (
    <div className='row mt-5 animate__animated animate__fadeIn animate__fast'>
      <div className='col-4'>
        <img
          src={`https://raw.githubusercontent.com/AlexaContreras/ReactHeroesApp/master/public/assets/heroes/${heroId}.jpg`}
          alt={superhero}
          className='img-thumbnail  '
        ></img>
      </div>
      <div className='col-8'>
        <h3>{superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <b>Alter ego: </b> {alter_ego}
          </li>
          <li className='list-group-item'>
            <b>Publisher: </b> {publisher}
          </li>
          <li className='list-group-item'>
            <b>First Appearance: </b> {first_appearance}
          </li>
        </ul>
        <li className='list-group-item'>
          <h5>Characters</h5>
          <p>{characters}</p>
        </li>

        <button
          onClick={() => handleReturn(publisher)}
          className='mt-3 btn btn-outline-info'
        >
          Return
        </button>
      </div>
    </div>
  );
};
