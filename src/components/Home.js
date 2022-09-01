import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Select from "react-select";
import axios from "../services/axios";
import { getUniqueListBy, getSumofArr } from "../helpers/common";
import { DECREMENT, INCREMENT } from "../helpers/constants";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [color, setColor] = useState("");
  const [price, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        axios.get("/products/products").then((res) => {
          setProducts(res?.data);
          setAllProducts(res?.data)
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
    if(e.value === 'all') {
      setProducts(allProducts)
    }
    else {
      const filteredProducts=allProducts.filter((item) => item.colour === e.value);
      setProducts(filteredProducts)
    }
    setColor(e.value)
  };
  const cartActions = (key,index) => {
    let updateProduct = [...products];
    if(key === INCREMENT) {
      if (!updateProduct[index]?.quantity) {
        updateProduct[index].quantity = 1;
        updateProduct[index].totalPrice = updateProduct[index].price;
      } else {
        updateProduct[index].totalPrice =
          updateProduct[index].price * (updateProduct[index].quantity + 1);
        updateProduct[index].quantity = updateProduct[index].quantity + 1;
        setTotalPrice((getSumofArr(updateProduct, "totalPrice")));
        setProducts(updateProduct);
      }
    } else if(key === DECREMENT) {
      if (updateProduct[index]?.quantity) {
        updateProduct[index].totalPrice =
        updateProduct[index].price * (updateProduct[index].quantity - 1);
        updateProduct[index].quantity = updateProduct[index].quantity - 1;
        setTotalPrice(getSumofArr(updateProduct, "totalPrice"));
        setProducts(updateProduct);
      }
    } else {
      if (updateProduct[index].quantity || updateProduct[index].quantity === 0 ) {
        let totalPrice =
          updateProduct[index].quantity * updateProduct[index].price;
        updateProduct[index].quantity = 0;
        updateProduct[index].totalPrice = 0;
        setTotalPrice((price - totalPrice));
        setProducts(updateProduct);
      }
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
          <h1>{`Total $${ parseFloat(price).toFixed(2)}`}</h1>
        </div>

        <ProductList
          productsArr={products}
          // color={color}
          cartActions={cartActions}
        />
      </div>
    </div>
  );
};

export default Home;
