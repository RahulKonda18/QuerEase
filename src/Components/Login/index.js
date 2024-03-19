import { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

// import GoogleButton from "react-google-button";

class Login extends Component {
  state = {
    usermail: "",
    password: "",
    errorMsg: "",
    showErrorMsg: false,
  };

  setCookie = (x) => {
    Cookies.set("dashboard_token", x, {
      expires: 2,
    });
    this.setState({});
  };

  onSignIn = (e) => {
    e.preventDefault();
    const { usermail, password } = this.state;
    signInWithEmailAndPassword(auth, usermail, password)
      .then((userCredential) => {
        const x = userCredential.user.accessToken;
        this.setCookie(x);
      })

      .catch((error) => {
        console.log(error.code, error);
        this.setState({ errorMsg: error.code.slice(5), showErrorMsg: true });
      });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value, showErrorMsg: false });
  };

  onChangeUsermail = (e) => {
    this.setState({ usermail: e.target.value, showErrorMsg: false });
  };

  render() {
    const { usermail, password, errorMsg, showErrorMsg } = this.state;
    Cookies.remove("signup_token");
    if (Cookies.get("dashboard_token") !== undefined) {
      return <Navigate to="/home" />;
    }
    return (
      <div className=" bg-slate-100 flex w-screen flex-row h-screen font-sans subpixel-antialiased items-center justify-center">
        <div className="bg-black h-full  basis-1/2 subpixel-antialiased  flex flex-col justify-center items-center">
          <h1 className="font-medium  text-9xl text-white ">QuerEase.</h1>
        </div>
        <div className="bg-slate-100 basis-1/2 flex flex-col justify-center items-center ">
          <div className="w-1/2 mb-5">
            <h1 className="font-bold text-5xl mb-3">SignIn</h1>
            <p className="font-medium text-lg mb-3">Sign in to your Account</p>
          </div>
          <div>{/*  <GoogleButton type="dark" className="mb-5" />*/}</div>
          <div className="rounded-2xl bg-white shadow-md p-8 w-1/2">
            <div>
              <label className="font-medium text-lg " htmlFor="username">
                Email Address
              </label>
              <br />
              <input
                className="placeholder:text-black text-black font-medium outline-0 bg-slate-100 w-full h-10 mt-3 mb-3 rounded-lg pl-3"
                type="text"
                id="username"
                value={usermail}
                placeholder="johndoe@gmail.com"
                onChange={this.onChangeUsermail}
              />
              <br />
              <label className="font-medium text-lg " htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="placeholder:text-black text-black outline-0 bg-slate-100 w-full h-10 mt-3 mb-3 rounded-lg pl-3"
                type="password"
                id="password"
                value={password}
                placeholder="••••••••"
                onChange={this.onChangePassword}
              />
              <br />
              {showErrorMsg && (
                <p className="text-red-400 font-medium">*{errorMsg}</p>
              )}

              <button
                className="bg-black text-white w-full mt-3 mb-3 h-10 rounded-lg font-medium text-lg"
                type="button"
                onClick={this.onSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
          <h1 className=" cursor-pointer font-small text-lg mt-5 text-neutral-500">
            Don't have an account?
            <Link to="/signup">
              <span className=" text-blue-700  text-lg">Register here</span>
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}
export default Login;
