import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import { MainProvider } from './pages/context/MainContext';
import Header from './components/header/Header';
import './App.scss';
const CategoryPage = lazy(() => import('./pages/categoryPage/CategoryPage'));
const PhotoPage = lazy(() => import('./pages/photoPage/PhotoPage'));

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <div className='main-page'>
          <Header />
          <div className='main-page-content'>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={'/'} exact component={CategoryPage} />
                <Route path={'/:tag'} component={PhotoPage} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </MainProvider>
  );
}
export default App;
