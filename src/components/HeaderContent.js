import { Link } from 'react-router-dom';
import './HeaderContent.scss';

export default function HeaderContent(props) {
  if (props.icon) {
    return (
      <div className='header-content'>
        <h1 style={{ fontSize: 25, paddingBottom: 20 }}>FOTOGALÉRIA</h1>
        <div className='back_icon_div'>
          <Link to={'/'}>
            <img
              id='back_icon'
              src={process.env.PUBLIC_URL + '/icons/back-icon.svg'}
              style={{ width: 30, height: 30 }}
              alt={'back_icon'}
            />
          </Link>
          <h2 style={{ fontSize: 15, marginTop: 5, marginBottom: 15 }}>
            {props.headerName}
          </h2>
        </div>
        <div className='line'></div>
      </div>
    );
  } else
    return (
      <div className='header-content'>
        <h1 style={{ fontSize: 25, paddingBottom: 20 }}>FOTOGALÉRIA</h1>
        <h2 style={{ fontSize: 15, marginTop: 5, marginBottom: 15 }}>
          {props.headerName}
        </h2>
        <div className='line'></div>
      </div>
    );
}
