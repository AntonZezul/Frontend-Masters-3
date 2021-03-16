import "./App.scss";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Loading from "./components/Loading";
import Background from "./components/Background";
import { url_gallery, url_images } from "./utils/Url";
import {
  ERROR_GALLERY_MESSAGE,
  ERROR_BACKGROUND_MESSAGE,
} from "./utils/util_const";
const CategoryContent = lazy(() => import("./pages/CategoryContent"));
const PhotoContent = lazy(() => import("./pages/PhotoContent"));

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [background, setBackground] = useState("");
  const [categoryImages, setCategoryImages] = useState([]);
  const [childData, setChildData] = useState([]);

  const backgroundArray = [];

  useEffect(() => {
    let cleanUp = false;
    fetch(url_gallery(""))
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
          // galleries.forEach((el) => {
          //   if (el !== undefined)
          //     fetch(url_gallery(`/${el.name}`))
          //       .then((response) => {
          //         if (response.ok) {
          //           return response.json()
          //         }
          //         throw new Error('Err' + response.status)
          //       })
          //       .then((json) => setCategoryImages(json.images[0]))
          //       .catch(err=>{console.log(err)})
          // });
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
    fetch(url_gallery(""))
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
        setBackground(url_images("1125x750", backgroundArray[0]));
      })
      .catch((err) => {
        console.info(err);
      });
  }, []); //todo

  // useEffect(()=>{
  //   fetch(url_gallery("/Car")).then(response => response.json().then(json => setCategoryImages(json.images.map(el=>el.fullpath))))
  // },[])

  const handleCallback = (childData) => {
    if (childData) setBackground(childData);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Background background={background}></Background>
        <div id="bottom">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route
                path={"/"}
                exact
                component={() => (
                  <CategoryContent
                    dataCategory={categoryData}
                    categoryImages={categoryImages}
                    onMouseEnter={setBackground}
                  />
                )}
              />
              <Route
                path={"/:tag"}
                component={() => (
                  <PhotoContent
                    bg={background}
                    parentCallback={handleCallback}
                  />
                )}
              ></Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
