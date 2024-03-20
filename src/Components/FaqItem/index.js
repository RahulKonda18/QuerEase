const Item = (props) => {
  const { value } = props;
  console.log(value);
  const { Question, Answer } = value;
  console.log(Question, Answer);
  return (
    <div className="bg-white p-5">
      <h1 className="font-bold text-orange-500 font-xl">{Question}</h1>
      <h1 className="font-semibold">{Answer}</h1>
    </div>
  );
};

export default Item;
