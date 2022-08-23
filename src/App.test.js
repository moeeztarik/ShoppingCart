// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/react";
import { render, fireEvent, screen } from "@testing-library/react";
import Product from "./components/Product";

//test block
test("increments counter", () => {
  // render the component on virtual dom
  render(<Product />);

  //select the elements you want to interact with
  const counter = screen.getByTestId("count");
  const incrementBtn = screen.getByTestId("incrementing");

  //interact with those elements
  fireEvent.click(incrementBtn);

  //assert the expected result
  expect(counter).toHaveTextContent("1");
});
