import { Link } from 'react-router-dom';
import Background from '../background/Background';
import './Header.scss';

export default function HeaderContent(props) {
  if (props.icon) {
    return (
      <div className='main-page-header'>
        <Background />
        <div className='description'>
          <h1>FOTOGALÉRIA</h1>
          <div className='category-name-body'>
            <Link to={'/'}>
              <img
                id='back_icon'
                src={process.env.PUBLIC_URL + '/icons/back-icon.svg'}
                style={{ width: 30, height: 'auto' }}
                alt={'back_icon'}
              />
            </Link>
            <h2>{props.headerName}</h2>
          </div>
          <div className='line'></div>
        </div>
      </div>
    );
  } else
    return (
      <div className='main-page-header'>
        <Background />
        <div className='description'>
          <h1>FOTOGALÉRIA</h1>
          <h2>{props.headerName}</h2>
          <div className='line'></div>
        </div>
      </div>
    );
}
