import { useEffect, useState } from "react";
import "./AddCategoryModal.scss";

export default function AddCategoryModal(props) {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);
  const [focus, setFocus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const headers = {
    "Content-Type": "application/json",
  };
  const errorText = document.querySelector(".invalid-feedback");
  const errorBorder = document.querySelector("#categoryInput")

  const inputHandler = () => {
    // if (value.length < 5 ) {
      errorText.style.opacity = 0;
      errorBorder.style.border = 'none'
      // errorBorder.style.border = '3px solid red'
      
      console.log("true");
      // if (errorDiv.style.display !== 'block'){
      //   errorDiv.style.display = 'block'
      // }
      // else errorDiv.style.display = 'none'
    // } else errorText.style.opacity = 0;
  };

  const errorMessageInput = (value) => {
    if(!value){
      setErrorMessage('Názov galérie nemôže byť prázdny.')
    }
    if(value.length > 15){
      setErrorMessage('Názov galérie nesmie presiahnuť 15 znakov.')
    }
    if(value.includes("/")){
      setErrorMessage('Názov galérie nemôže obsahovať znak "/".')
    }
  }

  const onClickButton = () => {
    if (!value || value.includes("/") || value.length > 15) {
      errorMessageInput(value)
      errorText.style.opacity = 1;
      errorBorder.style.border = '2px solid rgba(255,0,0, .7)'
      // setFocus(false)

      // console.log("Error");
      // console.log(errorDiv)
    } else {
      errorBorder.style.border = '2px solid rgba(40,167,69, .7)'
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
              <div className="col">
                <div className="input-group">
                  <input
                    id="categoryInput"
                    name="fname"
                    type="text"
                    placeholder="ZADAJTE NÁZOV KATEGÓRIE"
                    className="form-control was-validated"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    style={{ border: "none" }}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      inputHandler();
                    }}
                    onFocus={()=>setFocus(true)}
                    required
                  />
                </div>
                <div className="invalid-feedback" style={{display: "block", opacity: 0}}>
                {errorMessage}
                </div>
              </div>
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
