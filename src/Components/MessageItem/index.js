const MessageItem = (props) => {
  const { value, suggestion } = props;
  const { category, response, similar_questions } = value;
  if (category === "QE") {
    return (
      <div className="shadow-2xl bg-black rounded-3xl p-5 mb-5 w-fit rounded-tl-none">
        <h1 className="text-white">{response}</h1>
      </div>
    );
  } else {
    const onClickButtonOne = () => suggestion(similar_questions[0]);
    const onClickButtonTwo = () => suggestion(similar_questions[1]);
    return (
      <div className="bg-white text-right shadow-2xl rounded-3xl p-5 w-fit flex flex-col rounded-tr-none self-end mb-5">
        <h1>{response}</h1>
        <button
          onClick={onClickButtonOne}
          className="bg-orange-400 rounded-xl p-2 text-white mt-2"
        >
          {similar_questions[0]}
        </button>
        <button
          onClick={onClickButtonTwo}
          className="bg-orange-400 rounded-xl p-2 text-white mt-2"
        >
          {similar_questions[1]}
        </button>
      </div>
    );
  }
};

export default MessageItem;
