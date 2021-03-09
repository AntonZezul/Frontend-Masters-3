import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

  const backgroundArray = [];

  useEffect(() => {
    let cleanUp = false;
    console.log(url_gallery(""));
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
        galleries.map((el) => {
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
  }, []);

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
                    onMouseEnter={setBackground}
                  />
                )}
              />
              <Route
                path={"/:tag"}
                component={() => <PhotoContent bg={setBackground} />}
              ></Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
