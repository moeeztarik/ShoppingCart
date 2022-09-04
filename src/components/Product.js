const Product = ({
  name,
  image,
  price,
  index,
  quantity,
  cartActions,
  id
}) => {
  return (
    <div className="product-container "  data-testid={`container-${id}`}>
      <div className="product-info">
        <img src={image} width={200} height={200} alt="" />
        <div className="flex flex-col">
          <p className="">{name}</p>
          <p className="">{`Price: $${price}`}</p>
        </div>
        <div className="flex flex-col item-center height-zero">
        <div className="cartControl">
        <button
            data-testid={`decrement-${id}`}
            className="cart-control-btn"
            onClick={() => cartActions('decrement', index)}
          >
            -
          </button>
          <p data-testid="count">{quantity}</p>
          <button
            data-testid={`increment-${id}`}
            className="cart-control-btn"
            onClick={() => cartActions('increment',index)}
          >
            +
          </button>
        </div>
        <div>
        <button className="remove-cart-btn" data-testid={`removebtn-${id}`}
  onClick={() => cartActions('removeItems',index)}>Remove</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
