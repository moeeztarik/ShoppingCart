import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Select from "react-select";
import axios from "../services/axios";
import { getUniqueListBy, getSumofArr } from "../helpers/common";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [color, setColor] = useState("");
  const [price, setTotalPrice] = useState("");

  useEffect(() => {
    async function fetchData() {
      axios.get("/products").then((res) => {
        setProducts(res?.data);
        setColorOptions(
          getUniqueListBy(res.data, "colour").map((item) => {
            return {
              label: item.colour,
              value: item.colour,
            };
          })
        );
      });
    }
    fetchData();
  }, []);
  const changeColor = (e) => {
    setColor(e.value);
  };
  const increment = (index) => {
    let updateProduct = [...products];
    if (!updateProduct[index]?.quantity) {
      updateProduct[index].quantity = 1;
      updateProduct[index].totalPrice = updateProduct[index].price;
    } else {
      updateProduct[index].totalPrice =
        updateProduct[index].price * (updateProduct[index].quantity + 1);
      updateProduct[index].quantity = updateProduct[index].quantity + 1;
    }
    setTotalPrice(getSumofArr(updateProduct, "totalPrice"));
    setProducts(updateProduct);
  };
  const decrement = (index) => {
    let updateProduct = [...products];
    if (updateProduct[index]?.quantity) {
      updateProduct[index].totalPrice =
        updateProduct[index].price * (updateProduct[index].quantity - 1);
      updateProduct[index].quantity = updateProduct[index].quantity - 1;
    }
    setTotalPrice(getSumofArr(updateProduct, "totalPrice"));
    setProducts(updateProduct);
  };
  const removeItems = (index) => {
    let updateProduct = [...products];
    if (updateProduct[index].quantity !== 0) {
      let totalPrice =
        updateProduct[index].quantity * updateProduct[index].price;
      updateProduct[index].quantity = 0;
      setTotalPrice(price - totalPrice);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="header">
          <h1>Select Color</h1>
        </div>
        <div>
          <Select
            value={colorOptions.filter((item) => item.value === color)}
            options={colorOptions}
            onChange={changeColor}
          />
        </div>
        <div className="header">
          <h1>Products</h1>
          <h1>{`Total $${price}`}</h1>
        </div>

        <ProductList
          notes={products}
          color={color}
          increment={increment}
          decrement={decrement}
          removeItems={removeItems}
          // handleAddNote={addNote}
        />
      </div>
    </div>
  );
};

export default Home;
