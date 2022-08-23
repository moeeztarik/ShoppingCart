import Product from "./Product";

const ProductList = ({
  notes,
  handleDeleteNote,
  color,
  increment,
  decrement,
  removeItems,
}) => {
  let products;
  if (color) {
    products = notes.filter((e) => e.colour === color);
  } else {
    products = notes;
  }
  return (
    <div className="product-list">
      {products.map((item, index) => (
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
      ))}
    </div>
  );
};

export default ProductList;
