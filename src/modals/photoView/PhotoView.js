import React from 'react';
import './PhotoView.scss';

export default function PhotoView(props) {
  return (
    <div
      className='modal fade'
      id='photo-modal'
      tabIndex='-1'
      aria-hidden='true'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button
              type='button'
              className='close p-0'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>
                <img
                  style={{ paddingRight: 5 }}
                  src={'/icons/close-icon.svg'}
                  alt='close-icon'
                />
                ZAVRIEŤ
              </span>
            </button>
          </div>
          <div className='modal-body p-md-0'>
            <img className='img-fluid' src={props.image} alt={''} />
            <div className='modal-nav'>
              <div id='prev-icon'>
                <img
                  onClick={props.prevIcon}
                  src={'/icons/prev-icon.svg'}
                  alt='prev-icon'
                />
              </div>
              <div id='next-icon'>
                <img
                  onClick={props.nextIcon}
                  src={'/icons/next-icon.svg'}
                  alt='next-icon'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
