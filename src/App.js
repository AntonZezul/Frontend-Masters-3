import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import Background from './components/Background';
import { CategoryPageProvider } from './pages/categoryPage/CategoryPageContext';
import './App.scss';
const CategoryPage = lazy(() => import('./pages/categoryPage/CategoryPage'));
const PhotoPage = lazy(() => import('./pages/photoPage/PhotoPage'));

function App() {
  return (
    <BrowserRouter>
      <CategoryPageProvider>
        <div className='App'>
          <Background />
          <div className='bottom'>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path={'/'} exact component={CategoryPage} />
                <Route path={'/:tag'} component={PhotoPage} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </CategoryPageProvider>
    </BrowserRouter>
  );
}
export default App;
