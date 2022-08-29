import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Form from "../../utilities/Forms";
import {message} from 'antd';
import axios from "axios";

const OTPVerificationDialog = (props:any) => {
  const [myFlag, setMyFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [validate, setValidate] = useState<any>();
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(props.myFlag);
    console.log("Props.userDetails => ", props.userDetails);
    setEmail(props.email);
    setMyFlag(props.myFlag);
  }, [props]);

  const validateforgotPassword = () => {
    let isValid = true;

    let validator:any = Form.validator({
      otp: {
        value: otp,
        isRequired: true,
        isOtp: true,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const error = (msg:any) => {
    message.error(msg);
  };

  const success = (msg:any) => {
    message.success(msg);
  };

  const verifyOtp = (e:any) => {
    e.preventDefault();

    const validate = validateforgotPassword();
    if (validate) {
      const baseUrl = "http://localhost:9999/userDetailController/verifyOtp";
      const myObj = { emailId: email, otp: otp };
      axios.post(baseUrl, myObj).then((response) => {
        console.log(response.data);
        if (response.data.data != null && response.data.status !== 500) {
          props.onNext(true,false);
          success(response.data.message);
        } else {
          error(response.data.message);
        }
      });
    }
  };

  return (
    <div>
      <Modal
        {...props}
        show={myFlag}
        onHide={() => setMyFlag(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter modal-lg2"
        centered
      >
        <Modal.Header closeButton>
          <div>
            <h4>! OTP Verification Window !</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="auth-form-container text-start">
            <form
              className="auth-form"
              method="POST"
              onSubmit={verifyOtp}
              autoComplete={"off"}
            >
              <div className="otp mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    validate.validate && validate.validate.otp
                      ? "is-invalid "
                      : ""
                  }`}
                  id="otp"
                  name="otp"
                  value={otp}
                  placeholder="OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />

                <div
                  className={`invalid-feedback text-start ${
                    validate.validate && validate.validate.email
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  {validate.validate && validate.validate.otp
                    ? validate.validate.otp[0]
                    : ""}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-100 theme-btn mx-auto"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <h5 style={{ textAlign: "center" }}>
              ! Thank you for verification !
            </h5>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OTPVerificationDialog;
