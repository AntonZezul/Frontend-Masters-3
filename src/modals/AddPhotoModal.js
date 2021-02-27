import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./AddPhotoModal.scss";

export default function AddPhotoModal() {
  const previewRef = useRef(null);
  const [fileArr, setFileArr] = useState([]);
  const [image, setImage] = useState([]);
  const uploadButton = (selector) => {
    const input = document.querySelector(selector);

    const preview = React.createElement("div", {
      className: "preview",
    });

    const open = React.createElement(
      "button",
      {
        id: "openButton",
        className: "upload_button",
        onClick: () => {
          input.click();
        },
      },
      "VYBERTE SÚBORY"
    );
    return open;
  };

  const uploadPreview = () => {
    const preview = React.createElement("div", {
      className: "preview-image",
    });

    return preview;
  };

  const onChangeInput = (event) => {
    if (!event.target.files.length) {
      return 
    }
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      if (!file.type.match("image")) {
        return 
      }
      setFileArr(files);
      const reader = new FileReader()

      reader.onload=(ev)=>{
        setImage(ev.target.result)
      }

      reader.readAsDataURL(file);
    });
  };
  // const onChangeInput = (event) => {
  //   if (!event.target.files.length) {
  //     return;
  //   }
  //   const files = Array.from(event.target.files);
  //   files.map((file) => {
  //     if (!file.type.match("image")) {
  //       return;
  //     }
  //     return <div className></div>
  //     // setImage(file.name)

  //     // const reader = new FileReader();
  //     // console.log(file);
  //     // reader.onload = (ev) => {
  //     //   //   // console.log(reader.result)
  //     //   const img = React.createElement("img", {
  //     //     src: ev.target.result,
  //     //     alt: file.name,
  //     //   });

  //       // console.log(ev)
  //       // const previewImage = React.createElement(
  //       //   "div",
  //       //   {
  //       //     className: "preview-image",
  //       //     name: file.name,
  //       //   },
  //       //   img
  //       // );

  //       // previewRef.current.insertAdjacentHTML('afterbegin', previewImage.props.name)
  //       // previewRef.current.append(ev.target.result)
  //      // ReactDOM.render(previewImage, document.querySelector("#previewId"));
  //   }
  //   )}
  //     // reader.readAsDataURL(file);
  //   // });
  // };
  // console.log(typeof image)
  return (
    <div className="modal fade" id="add_photo_modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            type="button"
            className="close p-0"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img
                src={process.env.PUBLIC_URL + "/icons/close-icon.svg"}
                alt={"close-icon-modal"}
              />{" "}
              ZAVRIEŤ
            </span>
          </button>
          <div className="modal-content-without-close">
            <div className="modal-header">
              <h5 className="modal-title">PRIDAŤ FOTKY</h5>
            </div>
            <div className="modal-body">
              <img
                id="icon_photo"
                src={process.env.PUBLIC_URL + "/icons/add-photo-icon.svg"}
                alt={"add-photos-modal"}
              />
              <p id="move_photo_text">SEM PRESUNTE FOTKY</p>
              <p id="or_text">alebo</p>
              <input
                type="file"
                id="file"
                onChange={(event) => onChangeInput(event)}
                accept={".png,.jpg,.jpeg,.gif"}
                multiple
              />
              {uploadButton("#file")}
              <div id="previewId" className="preview" ref={previewRef}>
                {fileArr.map((el, i) => {
                  return <div key={i} className="preview-image">
                    <div className="preview-remove">&times;</div>
                    {el.name}
                  </div>;
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success">
                <img
                  src={process.env.PUBLIC_URL + "/icons/add-icon.svg"}
                  alt={"add-icon-modal"}
                />
                PRIDAŤ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
