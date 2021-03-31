import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Background from '../background/Background';
import './Header.scss';

export default function HeaderContent() {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <div className='main-page-header'>
      <Background />
      <div className='description'>
        <h1>FOTOGALÉRIA</h1>
        {match && !match.isExact ? (
          <div className='category-name-body'>
            <Link to={'/'}>
              <img
                id='back_icon'
                src={'/icons/back-icon.svg'}
                style={{ width: 30, height: 'auto' }}
                alt={'back_icon'}
              />
            </Link>
            <h2>{history.location.pathname.replace('/', '')}</h2>
          </div>
        ) : (
          <h2>KATEGÓRIE</h2>
        )}
        <div className='line'></div>
      </div>
    </div>
  );
}
