import React,{useState} from "react";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import OTPVerificationDialog from "./OTPVerificationDialog";
import ResetPasswordWindow from "./ResetPasswordWindow";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState<any>({});
  const [userDetail, setUserDetails] = useState({});
  const [openOTPVerificationFlag, setOpenOTPVerificationFlag] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);

  const validateforgotPassword = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
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

  const forgotPassword = (e:any) => {
    e.preventDefault();

    const validate = validateforgotPassword();

    if (validate) {
      const baseUrl = "http://localhost:9999/userDetailController/verifyUser";
      const myObj = { emailId: email };
      axios.post(baseUrl, myObj).then((response) => {
        console.log(response.data);
        if (response.data.data !== null && response.data.status !== 500) {
          setUserDetails(response.data.data);
          setOpenOTPVerificationFlag(true);
          success(response.data.message);
        } else {
          error(response.data.message);
        }
      });
    }
  };

  const myconstants = (flag1:any, flag2:any) => {
    setResetPasswordDialog(flag1);
    setOpenOTPVerificationFlag(flag2);
  };

  return (
    <>
      <div className="row g-0 auth-wrapper">
        <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
          <div className="auth-background-holder"></div>
          <div className="auth-background-mask"></div>
        </div>

        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
          <div className="d-flex flex-column align-content-end">
            <div className="auth-body mx-auto">
              <p>Forgot Password</p>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  method="POST"
                  onSubmit={forgotPassword}
                  autoComplete={"off"}
                >
                  <div className="email mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        validate.validate && validate.validate.email
                          ? "is-invalid "
                          : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.email
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.email
                        ? validate.validate.email[0]
                        : ""}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>

                <hr />
                <div className="auth-option text-center pt-2">
                  <Link className="text-link" to="/login">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {userDetail && openOTPVerificationFlag ? (
            <OTPVerificationDialog
              myFlag={openOTPVerificationFlag}
              email={email}
              userDetails={userDetail}
              onNext={(resetFDialogFlag:any, otpDialogFlag:any) =>
                myconstants(resetFDialogFlag, otpDialogFlag)
              }
            />
          ) : (
            ""
          )}
          {resetPasswordDialog ? (
            <ResetPasswordWindow
              flag={resetPasswordDialog}
              email={email}
              onNext={(resetFDialogFlag:any) =>
                setResetPasswordDialog(resetFDialogFlag)
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Forgot;
