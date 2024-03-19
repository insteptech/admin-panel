import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/action";
// import logoImg from '../../logo.png';
import "./login.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Redirect } from "react-router";
const Login = () => {
  const [loginError, setLoginError] = React.useState(false);

  // const []

  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const loginAdmin = () => {
    dispatch(loginAction(value))
      .then((response) => {
        localStorage.setItem("mobile", value);
        if (
          response &&
          response.data &&
          response.data.errors &&
          response.data.data.adminLogin === null
        ) {
          alert("you are not anauthorized");
        } else {
          setLoginError(true);
          localStorage.setItem("adminId", response.data.data.adminLogin._id);
        }
      })
      .catch(() => {
        // console.log("hellodsndmncncnmcnmcnmcmcmcnm");
      });
    setValue("");
  };
  const auth = useSelector((state) => state.auth);

  if (loginError) {
    return <Redirect to={"/ConfirmOtp"} />;
  }
  const onKeyUp = (e) => {
    if (e.key >= 'Enter') {
      e.preventDefault()
      loginAdmin()

    }
  }


  return (
    <div className="wrapper fadeInDown">
      <div className="container">
        <div className="form-inner">
          <div className="row">
            <div className="w-100">
              <div className="fadeIn first">
                <h4>Login</h4>
              </div>
              <form>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  style={{ width: "100%" }}
                  value={value}
                  onChange={setValue}
                  onKeyPress={onKeyUp}
                />
              </form>
              <p>{loginError}</p>
              <button className="btn loginBtn" onClick={loginAdmin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
