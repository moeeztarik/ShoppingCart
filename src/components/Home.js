import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Select from "react-select";
import axios from "../services/axios";
import { getUniqueListBy, getSumofArr } from "../helpers/common";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [color, setColor] = useState("");
  const [price, setTotalPrice] = useState(0.00);

  useEffect(() => {
    async function fetchData() {
      try {
        axios.get("/products/products").then((res) => {
          setProducts(res?.data);
          let newColorsArr=getUniqueListBy(res.data, "colour").map((item) => {
            return {
              label: item.colour,
              value: item.colour,
            };
          })
          newColorsArr.unshift({label:'All', value:'all'})
          setColorOptions(newColorsArr);
        });
      }
      catch(e) {
      }
     
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
    setTotalPrice((getSumofArr(updateProduct, "totalPrice")).toFixed(2));
    setProducts(updateProduct);
  };
  const decrement = (index) => {
    let updateProduct = [...products];
    if (updateProduct[index]?.quantity) {
      updateProduct[index].totalPrice =
        updateProduct[index].price * (updateProduct[index].quantity - 1);
      updateProduct[index].quantity = updateProduct[index].quantity - 1;
    }
    setTotalPrice((getSumofArr(updateProduct, "totalPrice")).toFixed(2));
    setProducts(updateProduct);
  };
  const removeItems = (index) => {
    let updateProduct = [...products];
    if (updateProduct[index].quantity || updateProduct[index].quantity === 0 ) {
      let totalPrice =
        updateProduct[index].quantity * updateProduct[index].price;
      updateProduct[index].quantity = 0;
      updateProduct[index].totalPrice = 0;
      setTotalPrice((price - totalPrice).toFixed(2));
      setProducts(updateProduct);
    }
  };
  if(products.length === 0) {
    return  <span data-testid="loading">Loading data...</span>;
  }
  return (
    <div >
      <div className="container">
        <div className="header">
          <h1 data-testid="resolved">Select Color</h1>
        </div>
        <div data-testid="dropdown" >
          <Select
            value={colorOptions.filter((item) => item.value === color)}
            options={colorOptions}
            onChange={changeColor}
            data-testid="select_color_dropdown"
          />
        </div>
        <div className="header">
          <h1>Products</h1>
          <h1>{`Total $${price}`}</h1>
        </div>

        <ProductList
          productsArr={products}
          color={color}
          increment={increment}
          decrement={decrement}
          removeItems={removeItems}
        />
      </div>
    </div>
  );
};

export default Home;
