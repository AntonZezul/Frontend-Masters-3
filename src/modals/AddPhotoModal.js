import React from "react";
import ReactDOM from "react-dom";
import "./AddPhotoModal.scss";

export default function AddPhotoModal() {
  const upload = (selector) => {
    const input = document.querySelector(selector);
    const open = React.createElement(
      "button",
      {
        className: "upload_button",
        onClick: () => input.click(),
      },
      "VYBERTE SÚBORY"
    );

    // if(options.accept && Array.isArray(options.accept)){
    //   input.setAttribute('multiple', true)
    // }
    // const changeHandler = (event) => {
    //   console.log(event.target.files)
    // }

    // input.addEventListener('change', changeHandler)
    // ReactDOM.render(open,input)
    return open;
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
                src={process.env.PUBLIC_URL + "/icons/add-photo-icon.svg"}
                alt={"add-photos-modal"}
              />
              <p id="move_photo_text">SEM PRESUNTE FOTKY</p>
              <p id="or_text">alebo</p>
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  if(!event.target.files.length){
                    return
                  }
                  const files = Array.from(event.target.files)
                  files.forEach(file=>{
                    if(!file.type.match('image')){
                      return
                    }
                    //todo
                  })

                  console.log(files)
                }}
                accept={".png,.jpg,.jpeg,.gif"}
                multiple
              />
              {upload("#file")}
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
