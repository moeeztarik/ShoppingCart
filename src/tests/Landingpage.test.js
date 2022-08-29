import "@testing-library/react";
import { render } from "@testing-library/react";
import Home from "../components/Home";
import "@testing-library/jest-dom/extend-expect";
it("fetches and displays data", async () => {
  const { getByTestId } = render(<Home/>);
  expect(getByTestId("loading")).toHaveTextContent("Loading data...")

});
