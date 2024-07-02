import { Component } from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";

// import GoogleButton from "react-google-button";

class SignUp extends Component {
  state = {
    usermail: "",
    password: "",
    errorMsg: "",
    showErrorMsg: "",
  };

  setCookie = (x) => {
    Cookies.set("signup_token", x, {
      expires: 2,
    });
    this.setState({});
  };

  signUp = (e) => {
    const { usermail, password } = this.state;
    e.preventDefault();
    createUserWithEmailAndPassword(auth, usermail, password)
      .then((userCredential) => {
        console.log(userCredential);
        const x = userCredential.user.accessToken;
        this.setCookie(x);
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errorMsg: error.message, showErrorMsg: true });
      });
  };

  displayErrorMessage = (error) => {
    if (
      error ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return "*Password should consist of atleast 6 characters";
    } else if (error === "Firebase: Error (auth/missing-password).") {
      return "*Please enter Password";
    } else if (error === "Firebase: Error (auth/invalid-email).") {
      return "*Please enter Email correctly";
    } else if (error === "Firebase: Error (auth/email-already-in-use).") {
      return "*Email is already taken";
    }
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeUsermail = (e) => {
    this.setState({ usermail: e.target.value });
  };

  render() {
    const { usermail, password, errorMsg, showErrorMsg } = this.state;
    if (Cookies.get("signup_token") !== undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className=" bg-slate-100 flex w-screen flex-row h-screen font-sans subpixel-antialiased items-center justify-center">
        <div className="bg-slate-100 basis-1/2 flex flex-col justify-center items-center ">
          <div className="w-1/2 mb-5">
            <h1 className="font-bold text-5xl mb-3">SignUp</h1>
            <p className="font-medium text-lg mb-3">Create your Account</p>
          </div>
          <div>{/*  <GoogleButton type="dark" className="mb-5" />*/}</div>
          <div className="rounded-2xl bg-white shadow-md p-8 w-1/2">
            <div>
              <label className="font-medium text-lg " htmlFor="username">
                Email Address
              </label>
              <br />
              <input
                className="placeholder:text-gray-400 text-black outline-0 bg-slate-100 w-full h-10 mt-3 mb-3 rounded-lg pl-3"
                type="text"
                id="username"
                value={usermail}
                placeholder="Enter your Email"
                onChange={this.onChangeUsermail}
              />
              <br />
              <label className="font-medium text-lg " htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="placeholder:text-gray-400 text-black outline-0 bg-slate-100 w-full h-10 mt-3 mb-3 rounded-lg pl-3"
                type="password"
                id="password"
                value={password}
                placeholder="Enter your Password"
                onChange={this.onChangePassword}
              />
              <br />

              {showErrorMsg && (
                <p className="text-red-400 font-medium">
                  {this.displayErrorMessage(errorMsg)}
                </p>
              )}

              <button
                className="bg-black text-white w-full mt-3 mb-3 h-10 rounded-lg font-medium text-lg"
                type="button"
                onClick={this.signUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black h-full  basis-1/2 subpixel-antialiased  flex flex-col justify-center items-center">
          <h1 className="font-medium  text-9xl text-white ">QuerEase.</h1>
        </div>
      </div>
    );
  }
}
export default SignUp;
