import { useEffect, useState } from "react";
import "./AddCategoryModal.scss";

export default function AddCategoryModal(props) {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);
  const headers = {
    "Content-Type": "application/json",
  };

  const inputHandler = () => {
    const errorDiv = document.querySelector('.invalid-feedback')
    console.log(value)
    if (value.length < 5 || value.includes('/') ){
      errorDiv.style.display = 'block'
      console.log('true')
      // if (errorDiv.style.display !== 'block'){
      //   errorDiv.style.display = 'block'
      // }
      // else errorDiv.style.display = 'none'
    }
    else errorDiv.style.display = 'none'


  }

  const onClickButton = () => {
    if (!value || value === "/") {
      // console.log("Error");
      // console.log(errorDiv)
    } else {
      return fetch("http://api.programator.sk/gallery", {
        method: "POST",
        body: JSON.stringify({
          name: value,
        }),
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((error) => {
            const e = new Error(
              "Post request on gallery is NOT okej. Response status is " +
                response.status
            );
            e.data = error;
            throw e;
          });
        })
        .catch((err) => console.info(err));
    }
  };

  return (
    <div className="modal fade" id="add_category_modal" tabIndex="-1">
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
                alt={"close-icon"}
              />{" "}
              ZAVRIEŤ
            </span>
          </button>
          <div className="modal-content-without-close">
            <div className="modal-header">
              <h5 className="modal-title">PRIDAŤ KATEGÓRIU</h5>
            </div>
            <div className="modal-footer">
              
              {/* <form name="myForm"> */}
                <div className="input-group mb-3">
                  <input
                    id="categoryInput"
                    name="fname"
                    type="text"
                    placeholder="ZADAJTE NÁZOV KATEGÓRIE"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    style={{ border: "none" }}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value)
                      inputHandler()
                    }}
                  />
                </div>
                <div className="invalid-feedback">Please provide a valid zip.</div>
              <button
                onClick={() => onClickButton()}
                type="submit"
                value="Submit"
                className="btn btn-success"
              > 

                <img
                  src={process.env.PUBLIC_URL + "/icons/add-icon.svg"}
                  alt={"add-icon"}
                />
                PRIDAŤ
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
