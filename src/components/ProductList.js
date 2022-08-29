import Product from "./Product";

const ProductList = ({
  productsArr,
  color,
  increment,
  decrement,
  removeItems,
}) => {
  let products;
  if (color && color !== 'all') {
    products = productsArr.filter((e) => e.colour === color);
  } else {
    products = productsArr;
  }
  return (
    <div className="product-list">
      {products.length > 0 && products.map((item, index) => (
        <div key={item.id}>
        <Product
          id={item.id}
          color={item.colour}
          image={item.img}
          name={item.name}
          price={item.price}
          increment={increment}
          decrement={decrement}
          quantity={item?.quantity || 0}
          index={index}
          removeItems={removeItems}
        />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
