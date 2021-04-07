import React, { useContext} from 'react';
import { MainContext } from '../../pages/context/MainContext';

export default function Background() {
  const backContext = useContext(MainContext);

  return (
    <img src={backContext.getBackground()} className='background' alt='' />
  );
}
