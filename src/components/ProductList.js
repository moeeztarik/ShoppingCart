import Product from "./Product";

const ProductList = ({
  productsArr,
  cartActions
}) => {
  return (
    <div className="product-list">
      {productsArr.length > 0 && productsArr.map((item, index) => (
        <div key={item.id}>
        <Product
          id={item.id}
          color={item.colour}
          image={item.img}
          name={item.name}
          price={item.price}
          quantity={item?.quantity || 0}
          index={index}
          cartActions={cartActions}
        />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
