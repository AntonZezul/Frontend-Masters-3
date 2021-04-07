import React, { useContext} from 'react';
import { MainContext } from '../../pages/context/MainContext';
import useProgressiveImg from '../../custom-hooks/ProgressiveImg';

export default function Background() {
  const backContext = useContext(MainContext);
  // const [src, { blur }] = useProgressiveImg('', backContext.getBackground());

  return (
    <img
      src={backContext.getBackground()}
      className='background'
      alt=''
      style={{
        filter: blur ? 'blur(20px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-out',
      }}
    />
  );
}
