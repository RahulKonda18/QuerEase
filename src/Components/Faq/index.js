import { Navigate, Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import Cookies from "js-cookie";
import { Component } from "react";
import Item from "../FaqItem";
const faqlist = [
  {
    id: 1,
    Question: " What is Swiggy Customer Care Number?",
    Answer:
      "We value our customer’s time and hence moved away from a single customer care number to a comprehensive chat-based support system for quick and easy resolution. ",
  },
  {
    id: 2,
    Question: "I did not receive my OTP on SMS",
    Answer:
      "If you're not receiving the OTP, it's usually due to a network issue. Please check your mobile network settings and try generating a new OTP.",
  },

  {
    id: 3,
    Question: "I see surge fees on app",
    Answer:
      "Non-Swiggy one customer: Surge fee is generally enabled temporarily due to higher than expected demand to help us to fairly compensate the delivery executive. ",
  },
  {
    id: 4,
    Question:
      "I entered the wrong CVV, why did my transaction still go through?",
    Answer:
      "The logic of validations of CVV resides with either payment gateways or banks. It is absolutely the choice of banks to have CVV as a mandatory input field or not. ",
  },
  {
    id: 5,
    Question: "Can I edit my order?",
    Answer:
      "In order to edit your order, please click on Help and then I want to modify items in my order. We will connect you to a support agent who will assist you with the same.",
  },
  {
    id: 6,
    Question: "I want to cancel my order ",
    Answer:
      "In order to cancel your order, please click on Help and then I want to cancel my order.",
  },
  {
    id: 7,
    Question: "Will Swiggy be accountable for quality/quantity?",
    Answer:
      "Quantity and quality of the food is the restaurants' responsibility. However in case of issues with the quality or quantity, kindly submit your feedback and we will pass it on to the restaurant.",
  },
  {
    id: 8,
    Question: "Is there a minimum order value?",
    Answer: "We have no minimum order value and you can order for any amount. ",
  },
  {
    id: 9,
    Question: "Do you charge for delivery?",
    Answer:
      "Delivery fee varies from city to city and is applicable if order value is below a certain amount. Additionally, certain restaurants might have fixed delivery fees. ",
  },
  {
    id: 10,
    Question: "How long do you take to deliver?",
    Answer:
      "Standard delivery times vary by the location selected and prevailing conditions. Once you select your location, an estimated delivery time is mentioned for each restaurant.",
  },
  {
    id: 11,
    Question: "What are your delivery hours?",
    Answer:
      "Our delivery hours vary for different locations and depends on availability of supply from restaurant partners.",
  },
  {
    id: 12,
    Question: "Can I order from any location?",
    Answer:
      "We will deliver from any restaurant listed on the search results for your location. We recommend enabling your GPS location finder and letting the app auto-detect your location.",
  },
  {
    id: 13,
    Question: "Is single order from many restaurants possible?",
    Answer:
      "We currently do not support this functionality. However, you can place orders for individual items from different restaurants.",
  },
  {
    id: 14,
    Question: "Do you support bulk orders?",
    Answer:
      "In order to provide all customers with a great selection and to ensure on time delivery of your meal, we reserve the right to limit the quantities depending on supply.",
  },
  {
    id: 15,
    Question: "Can I order in advance?",
    Answer:
      "Yes, you can order up to 2 days in advance on our platform. Click onthe NOW button on the top left corner of the app to select your desired delivery time slot and place an order. This feature is currently available only on Android phones and in select cities.",
  },
  {
    id: 16,
    Question: "Can I change the address / number?",
    Answer:
      "Any major change in delivery address is not possible after you have placed an order with us. However, slight modifications like changing the flat number, street name, landmark etc. are allowed. If you have received delivery executive details, you can directly call him, else you could contact our customer service team.",
  },
  {
    id: 17,
    Question: "Unable to view the details in my profile",
    Answer:
      "Please check if your app is due for an update. If not, please share the details via support@swiggy.in",
  },
  {
    id: 18,
    Question: "Did not receive referral coupon?",
    Answer:
      "Referral coupon is given upon the first successful transaction of the referred person. If you still have not received it, kindly send us your details at support@swiggy.in. We will contact you within 48 hours.",
  },
  {
    id: 19,
    Question: "Deactivate my account",
    Answer:
      "Please write to us at support@swiggy.in in the event that you want to deactivate your account.",
  },
  {
    id: 20,
    Question: "Unable to view the details in my profile",
    Answer:
      "Please check if your app is due for an update. If not, please share the details via support@swiggy.in",
  },
  {
    id: 21,
    Question: "Do you accept Sodexo, Ticket Restaurant etc.?",
    Answer:
      "We do not accept Sodexo vouchers but we do accept Sodexo card. You can select the Sodexo card option while selecting payment options at the time of order",
  },
  {
    id: 22,
    Question:
      "Is there a limit on the number of devices I can use Swiggy One on?",
    Answer:
      "Yes. Swiggy One membership can be used only on 2 devices at a time from 8th Feb onwards.",
  },
  {
    id: 23,
    Question:
      "Is there a minimum bill value to avail Swiggy One Pre-Book offers on Dineout?",
    Answer:
      "No there is no minimum bill value required to avail Swiggy One Pre-Book offers on Dineout pre-book restaurants. ",
  },
  {
    id: 24,
    Question:
      "Are Swiggy One benefits available at all food delivery restaurants?",
    Answer:
      "Swiggy One Free delivery is applicable on ALL food delivery restaurants within 10 kms from your location except dominos. You are also eligible for member only extra discounts of up to 30% on select food delivery restaurants. Please note you get this discount over and above the regular offers that you can avail on Swiggy. ",
  },
  {
    id: 25,
    Question: "What all charges will be covered under free delivery ?",
    Answer:
      "Free delivery covers all delivery charges such as delivery fee, late night surcharge & surge fee, which may apply when there is high demand, bad weather, or on special occasions. ",
  },
  {
    id: 26,
    Question: "Is there a limit on free deliveries or extra discounts?",
    Answer:
      "For our 3 month and 12 month duration plans, you can enjoy free delivery on ALL restaurants upto 10 km and free delivery on all Instamart orders above the minimum order value",
  },
  {
    id: 27,
    Question:
      "Can I club Swiggy One extra discount with other offers? Is there an upper limit?",
    Answer:
      "As a Swiggy One member, you have exclusive access to member only extra discouts of up to 30% on select food delivery restaurants. ",
  },
  {
    id: 28,
    Question: "Are Swiggy One benefits applicable on far away restaurants?",
    Answer:
      "Swiggy One Free delivery is applicable on ALL food delivery restaurants up to 10 kms. Any restaurants beyond 10 km will not be eligible for the free delivery benefit. When you order from a new location, you will enjoy benefits on many more restaurants within 10 km from your new location.",
  },
  {
    id: 29,
    Question: "Is Swiggy One available in all cities ?",
    Answer: "Currently Swiggy One is available in select cities only.",
  },
  {
    id: 30,
    Question:
      "Is there a minimum order value to avail free delivery on restaurants?",
    Answer:
      "Swiggy One members in all active cities can avail free delivery on all food delivery restaurants within 10 km on orders above INR 149.",
  },
  {
    id: 31,
    Question:
      "What are the mandatory documents needed to list my restaurant on Swiggy?",
    Answer:
      " - FSSAI Licence OR FSSAI Acknowledgement- Pan Card- GSTIN Certificate - Cancelled Cheque OR bank Passbook - Menu",
  },
  {
    id: 32,
    Question:
      "After I submit all documents, how long will it take for my restaurant to go live on Swiggy?",
    Answer:
      "After all mandatory documents have been received and verified it takes upto 7-10 working days for the onboarding to be completed and make your restaurant live on the platform.",
  },
  {
    id: 33,
    Question:
      "What is this one time Onboarding fees? Do I have to pay for it while registering?",
    Answer:
      "This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It is deducted from the weekly payouts after you start receiving orders from Swiggy.",
  },
  {
    id: 34,
    Question:
      "Who should I contact if I need help & support in getting onboarded?",
    Answer:
      "You can connect with Partner Support on 080-67466777/68179777 or write to onboarding@swiggy.in",
  },
  {
    id: 35,
    Question: "How much commission will I be charged by Swiggy?",
    Answer:
      "The commission charges vary for different cities. You will be able to see the commission applicable for you once the preliminary onboarding details have been filled.",
  },
  {
    id: 36,
    Question:
      "I don't have an FSSAI licence for my restaurant. Can it still be onboarded?",
    Answer:
      "FSSAI licence is a mandatory requirement according to the government’s policies. However, if you are yet to receive the licence at the time of onboarding, you can proceed with the acknowledgement number which you will have received from FSSAI for your registration.",
  },
  {
    id: 37,
    Question: "Will my order be delivered according to the promised time?",
    Answer:
      "We are dedicated to ensuring the timely delivery of your order within the committed timeframe. Once your order is placed, you can track its progress in the Swiggy App track screen.",
  },
  {
    id: 38,
    Question: "What will happen if the train is delayed?",
    Answer:
      "We’ll be checking the status of the train on a timely basis and in case the train is delayed, we’ll reschedule the order based on the train’s arrival time. Please reach out to the customer support team if you have any issues with your order.",
  },
];

class Faq extends Component {
  onClickLogout = () => {
    Cookies.remove("dashboard_token");
    this.setState({ loggedIn: " false" });
  };
  render() {
    if (Cookies.get("dashboard_token") === undefined) {
      return <Navigate to="/" replace={true} />;
    }
    return (
      <div className="w-screen h-screen bg-cover flex items-center justify-stretch  bg-white">
        <div className="specific bg-black h-full basis-1/5 flex flex-col justify-between p-10 drop-shadow-2xl">
          <div>
            <h1 className="text-6xl text-white font-medium mb-10">QuerEase.</h1>
            <Link to="/home">
              <div className="flex mb-3 cursor-pointer text-white rounded-xl p-3 hover:text-white hover:bg-orange-400 transition ease-in-out delay-150 hover:-tranzinc-y-1 hover:scale-110">
                <IoChatboxEllipsesOutline className=" text-3xl mr-4" />
                <p className="text-2xl  font-medium">Customer support</p>
              </div>
            </Link>

            <Link to="/faq">
              <div className="flex mb-3 cursor-pointer text-black bg-white  rounded-xl p-3 hover:text-white hover:bg-orange-400 transition ease-in-out delay-150 hover:-tranzinc-y-1 hover:scale-110">
                <IoChatboxEllipsesOutline className=" text-3xl mr-4" />
                <p className="text-2xl  font-medium">FAQ List</p>
              </div>
            </Link>
          </div>
          <div
            className="text-white cursor-pointer hover:bg-black hover:text-white flex justify-center items-center p-5 rounded-xl drop-shadow-2xl cursor-pointer hover:-translate-y-1 hover:scale-110 hover:text-orange-400"
            onClick={this.onClickLogout}
          >
            <h1 className="font-medium text-2xl mr-3">Logout</h1>
            <FaPowerOff className="text-2xl mr-4 " />
          </div>
        </div>
        <div className="flex flex-col justify-start bg-zinc-200 h-full w-full p-10 ">
          <div className="bg-zinc-200 shadow-2xl h-full w-full p-10 overflow-y-scroll">
            <h1 className="font-medium text-white p-5 bg-black">FAQ List</h1>
            {faqlist.map((each) => (
              <Item key={each.id} value={each} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Faq;
