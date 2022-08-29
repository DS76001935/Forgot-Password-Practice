import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "../../utilities/Forms";
import { message } from "antd";
import axios from "axios";

const ResetPasswordWindow = (props:any) => {
  const [my, setMy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [validate, setValidate] = useState<any>();

  useEffect(() => {
    console.log(props.flag);
    setMy(props.flag);
    setEmail(props.email);
  }, [props]);

  const validateforgotPassword = () => {
    let isValid = true;

    let validator:any = Form.validator({
      password: {
        value: password,
        isRequired: true,
        isPassword: true,
      },
      repassword: {
        value: password,
        isRequired: true,
        isRePassword: true,
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

  const resetPassword = (e:any) => {
    e.preventDefault();

    const validate = validateforgotPassword();

    if (validate) {
      const baseUrl =
        "http://localhost:9999/userDetailController/resetPassword";
      const myObj = { emailId: email, pass: password, rePass: rePassword };
      axios.post(baseUrl, myObj).then((response) => {
        console.log(response.data);
        if (response.data.data != null && response.data.status !== 500) {
          props.onNext(false);
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
        show={my}
        onHide={() => setMy(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter modal-lg2"
        centered
      >
        <Modal.Header closeButton>
          <h5>Reset Your Password</h5>
        </Modal.Header>
        <Modal.Body>
          <form
            className="auth-form"
            method="POST"
            onSubmit={resetPassword}
            autoComplete={"off"}
          >
            <div className="password mb-3">
              <input
                type="password"
                className={`form-control ${
                  validate.validate && validate.validate.password
                    ? "is-invalid "
                    : ""
                }`}
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className={`invalid-feedback text-start ${
                  validate.validate && validate.validate.password
                    ? "d-block"
                    : "d-none"
                }`}
              >
                {validate.validate && validate.validate.password
                  ? validate.validate.password[0]
                  : ""}
              </div>
            </div>

            <div className="password mb-3">
              <div className="input-group">
                <input
                  type="password"
                  className={`form-control ${
                    validate.validate && validate.validate.repassword
                      ? "is-invalid "
                      : ""
                  }`}
                  id="repassword"
                  name="repassword"
                  value={rePassword}
                  placeholder="Re-Password"
                  onChange={(e) => setRePassword(e.target.value)}
                />

                <div
                  className={`invalid-feedback text-start ${
                    validate.validate && validate.validate.repassword
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  {validate.validate && validate.validate.repassword
                    ? validate.validate.repassword[0]
                    : ""}
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 theme-btn mx-auto"
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <h5>Thank you for your update...</h5>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ResetPasswordWindow;
