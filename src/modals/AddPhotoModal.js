import React, { useRef, useState } from "react";
import "./AddPhotoModal.scss";

export default function AddPhotoModal(props) {
  const previewRef = useRef(null);
  const [fileArr, setFileArr] = useState([]);

  const uploadButton = (selector) => {
    const input = document.querySelector(selector);
    const open = React.createElement(
      "button",
      {
        id: "openButton",
        className: "upload_button",
        onClick: () => {
          if (input) input.click();
        },
      },
      "VYBERTE SÚBORY"
    );
    return open;
  };

  const onChangeInput = (event) => {
    if (!event.target.files.length) {
      return;
    }
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      if (!file.type.match("image")) {
        return;
      }
      setFileArr(files);
    });
  };

  const postImages = () => {
    const formData = new FormData();
    fileArr.forEach((el) => {
      formData.append("path", el, el.name);
      return fetch(`http://api.programator.sk/gallery/${props.galleryName}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setFileArr([])
            return response.json();
          } else {
            throw new Error(
              "Post in Gallery/{path} in NOT okej. Response status is " +
                response.status
            );
          }
        })
        .catch((err) => console.log(err));
    });
  };

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
                {fileArr.map((file, i) => {
                  return (
                    <div key={i} className="preview-image">
                      <div
                        className="preview-remove"
                        data-name={file.name}
                        onClick={() => {
                          fileArr.splice(i, 1);
                          const block = document
                            .querySelector(`[data-name="${file.name}"]`)
                            .closest(".preview-image");
                          block.remove();
                        }}
                      >
                        &times;
                      </div>
                      {file.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => postImages()}
                className="btn btn-success"
              >
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
