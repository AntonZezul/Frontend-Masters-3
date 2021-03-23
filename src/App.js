import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Loading from './components/Loading';
import Background from './components/Background';
import { url_gallery, url_images } from './utils/url-util';
import {
  ERROR_GALLERY_MESSAGE,
  ERROR_BACKGROUND_MESSAGE,
} from './constants/util-const';
import './App.scss';
const CategoryPage = lazy(() => import('./pages/categoryPage/CategoryPage'));
const PhotoPage = lazy(() => import('./pages/photoPage/PhotoPage'));

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [background, setBackground] = useState('');
  // const [categoryImages, setCategoryImages] = useState([]);

  useEffect(() => {
    let cleanUp = false;
    fetch(url_gallery(''))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(ERROR_GALLERY_MESSAGE + response.status);
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        if (!cleanUp) {
          setCategoryData(galleries);
        }
      })
      .catch((err) => {
        console.info(err);
      });
    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    const backgroundArray = [];
    fetch(url_gallery(''))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(ERROR_BACKGROUND_MESSAGE + response.status);
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        galleries.forEach((el) => {
          if (el.image === undefined) {
            return null;
          } else {
            return backgroundArray.push(el.image.fullpath);
          }
        });
        setBackground(url_images('1125x750', backgroundArray[0]));
      })
      .catch((err) => {
        console.info(err);
      });
  }, []); //todo

  // useEffect(()=>{
  //   fetch(url_gallery("/Car")).then(response => response.json().then(json => setCategoryImages(json.images.map(el=>el.fullpath))))
  // },[])

  return (
    <BrowserRouter>
      <div className='App'>
        <Background background={background}></Background>
        <div className='bottom'>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                path={'/'}
                exact
                component={() => (
                  <CategoryPage
                    dataCategory={categoryData}
                    // categoryImages={categoryImages}
                    onMouseEnter={setBackground}
                  />
                )}
              />
              <Route
                path={'/:tag'}
                component={() => <PhotoPage bg={background} />}></Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
