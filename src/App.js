import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import { CategoryPageProvider } from './pages/category-page-context/CategoryPageContext';
import Header from './components/header/Header';
import './App.scss';
const CategoryPage = lazy(() => import('./pages/categoryPage/CategoryPage'));
const PhotoPage = lazy(() => import('./pages/photoPage/PhotoPage'));

function App() {
  
  return (
    <BrowserRouter>
      <CategoryPageProvider>
        <div className='main-page'>
          <Header headerName={'KATEGÓRIE'} icon={true} />
          <div className='main-page-content'>
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
