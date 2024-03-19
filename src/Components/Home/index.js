import { Navigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import React, { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";
import MessageItem from "../MessageItem";

class Home extends Component {
  state = {
    loggedIn: true,
    query: "",
    chat: [],
    isLoading: false,
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.getData();
  };

  changeQuery = (e) => {
    this.setState({ query: e.target.value });
  };

  onClickLogout = () => {
    Cookies.remove("dashboard_token");
    this.setState({ loggedIn: false });
  };

  getData = async () => {
    const { query, chat } = this.state;
    const x = await fetch(`/members?query=${query}}`);
    console.log(x);
    const y = await x.json();
    const z = await y.response;
    const prev = chat;
    const prevQuery = {
      category: "QE",
      response: query,
      similar_questions: [],
    };
    console.log(JSON.parse(z));
    this.setState({
      query: "",
      isLoading: false,
      chat: [...prev, prevQuery, JSON.parse(z)],
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  onClickSuggestion = async (data) => {
    this.setState({ query: "", isLoading: true });
    const { chat } = this.state;
    const x = await fetch(`/members?query=${data}}`);
    console.log(x);
    const y = await x.json();
    const z = await y.response;
    const prev = chat;
    const prevQuery = {
      category: "QE",
      response: data,
      similar_questions: [],
    };
    console.log(JSON.parse(z));
    this.setState({
      query: "",
      isLoading: false,
      chat: [...prev, prevQuery, JSON.parse(z)],
    });
  };

  render() {
    const { query, isLoading, chat } = this.state;
    console.log(chat);
    if (Cookies.get("dashboard_token") === undefined) {
      return <Navigate to="/" replace={true} />;
    }
    return (
      <div className="w-screen h-screen bg-cover flex items-center justify-stretch  bg-white">
        <div className="specific bg-black h-full basis-1/5 flex flex-col justify-between p-10 drop-shadow-2xl">
          <div>
            <h1 className="text-6xl text-white font-medium mb-10">QuerEase.</h1>
            <div className="flex mb-3 cursor-pointer text-black bg-white rounded-xl p-3 hover:text-white hover:bg-orange-400 transition ease-in-out delay-150 hover:-tranzinc-y-1 hover:scale-110">
              <IoChatboxEllipsesOutline className=" text-3xl mr-4" />
              <p className="text-2xl  font-medium">Customer support</p>
            </div>
          </div>
          <div
            className="text-white cursor-pointer hover:bg-black hover:text-white flex justify-center items-center p-5 rounded-xl drop-shadow-2xl cursor-pointer hover:-translate-y-1 hover:scale-110 hover:text-orange-400"
            onClick={this.onClickLogout}
          >
            <h1 className="font-medium text-2xl mr-3">Logout</h1>
            <FaPowerOff className="text-2xl mr-4 " />
          </div>
        </div>
        <div className="flex flex-col justify-start basis-4/5 bg-zic-100 h-full w-full  rounded-3xl p-10 pt-0 pb-0">
          <div className="h-full w-full bg-white rounded-3xl shadow-3xl p-10 flex-flex-col">
            <div className="shadow-2xl overflow-y-auto rounded-3xl bg-zinc-100 h-5/6 w-full p-10 flex flex-col">
              {chat.map((each) => (
                <MessageItem
                  suggestion={this.onClickSuggestion}
                  key={each.response}
                  value={each}
                />
              ))}
              <div
                ref={(el) => {
                  this.el = el;
                }}
              />
            </div>
            <form
              className="flex justify-between items-center h-1/6"
              onSubmit={this.submitForm}
            >
              {isLoading ? (
                <div className="flex justify-center w-full ">
                  <ThreeDots
                    type="ThreeDots"
                    color="orange"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Enter your Query..."
                  className="w-full rounded-2xl  bg-transparent h-1/6 p-10 outline-none pl-0"
                  onChange={this.changeQuery}
                  value={query}
                />
              )}
              <button
                type="submit"
                className=" pl-5 rounded-xl pr-5 bg-black h-10 text-white shadow-2xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
