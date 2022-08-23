const Product = ({
  name,
  image,
  price,
  index,
  increment,
  decrement,
  quantity,
  removeItems,
}) => {
  return (
    <div className="product_Container">
      <div className="product">
        <img src={image} width={200} height={200} alt="" />
        <div className="flex flex-col">
          <p className="">{name}</p>
          <p className="">{`Price: $${price}`}</p>
        </div>

        <div className="cartControl">
          <button
            data-testid="incrementing"
            className="cartbtn"
            onClick={() => increment(index)}
          >
            +
          </button>
          <p data-testid="count">{quantity}</p>
          <button
            data-testid="decrement"
            className="cartbtn"
            onClick={() => decrement(index)}
          >
            -
          </button>
        </div>
        <div>
          <button onClick={() => removeItems(index)}>Remove Items</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
