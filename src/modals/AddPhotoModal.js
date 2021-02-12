import "./AddPhotoModal.scss";

export default function AddPhotoModal() {
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
              <button type="button" className="upload_button">
                VYBERTE SÚBORY
              </button>
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
