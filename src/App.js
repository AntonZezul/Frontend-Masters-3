import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Loading from "./components/Loading";
const Background = lazy(() => import("./components/Background"));
const CategoryContent = lazy(() => import("./pages/CategoryContent"));
const PhotoContent = lazy(() => import("./pages/PhotoContent"));

function App() {
  const url_gallery = "http://api.programator.sk/gallery";
  const url_images = "http://api.programator.sk/images/1125x750/";
  const [galleryData, setGalleryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const req = require("./storage/CategoryJSON");
 
  // console.log(backgroundArray);
  const [background, setBackground] = useState('');

  const backgroundArray = [];
  useEffect(() => {
    fetch(url_gallery)
      .then((response) => {
        if(response.ok){
          return response.json()
        }else{
          throw new Error("Response in Background in NOT okej. Response status is " +
          response.status)
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        galleries.map((el)=>{
          if(el.image === undefined){
            return null
          }else{
            return backgroundArray.push(el.image.fullpath);
            // console.log(backgroundArray)
          }
        })
        setBackground(`http://api.programator.sk/images/1125x750/${backgroundArray[0]}`)
        // console.log(backgroundArray)
      }).catch(err=>{console.info(err)})
  },[]);

  useEffect(() => {
    fetch(url_gallery)
      .then((response) => {
        if(response.ok){
          return response.json()
        }else{
          throw new Error("Response in Gallery in NOT okej. Response status is " +
          response.status)
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        setGalleryData(galleries);
        setCategoryData(galleries);
      }).catch(err=>{console.info(err)})
  }, []);

  const onClick = (name) => {
    return fetch(`http://api.programator.sk/gallery/${name}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Response in Gallery/{path} in NOT okej. Response status is " +
              response.status
          );
        }
      })
      .then((json) => json.images)
      .then((image) => {
        return image;
      })
      .then((data) => {
        data.map((element, i) => {
          return fetch(
            `http://api.programator.sk/images/1125x750/${element.fullpath}`
          )
            .then((img) => {
              if (img.ok) {
                if (data.length - i === 1) {
                  setPhotoData(data);
                }
              } else {
                data.splice(i, 1);
                throw new Error(
                  "Response in Images/{WxH}/fullpath in NOT okej. Response status is " +
                    img.status
                );
              }
            })
            .catch((err) => console.info(err));
        });
      })
      .catch((err) => console.info(err));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Background background={background}></Background>
          <div id="bottom">
            <Switch>
              <Route
                path={"/"}
                exact
                component={() => (
                  <CategoryContent
                    // dataPhotoLength={photoData}
                    dataCategory={categoryData}
                    onMouseEnter={setBackground}
                    onClick={onClick}
                  />
                )}
              />
              <Route path={"/album/:tag"}>
                <PhotoContent
                  dataPhotos={photoData}
                  galleryData={galleryData}
                  bg={setBackground}
                />
              </Route>
            </Switch>
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
