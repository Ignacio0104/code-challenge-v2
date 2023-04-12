import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { useCharacterData } from "../src/hooks/useCharacterData";
import HeroSection from "./components/HeroSection";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

// add more examples based on this tutorial: https://www.js-howto.com/testing-react-query-with-jest-and-react-testing-library/

describe("components mount correctly", ()=>{

  beforeEach(()=>{
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  })

  test("navbar title to be in the document", () => {
    const linkElement = screen.getByText(/Rick and Morty/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("navbar title to be a link", () => {
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(links[0].href).toContain("/");
  });
  test("navbar to have an icon", () => {
    const image = screen.getByAltText("navbar icon")
    expect(image).toHaveAttribute("src","icon-header.png");
  });
  test('button container to be in the document', () => {
     const button = screen.getAllByRole("button");
     expect(button).toHaveLength(2)
  });
})


jest.mock('../src/hooks/useCharacterData', () => ({
  useCharacterData: jest.fn(() => ({
    isLoading: false,
    data: {},
    isError: false,
    isFetching: false,
  })),
}));

describe('UseQuery testing', () => {
  const queryClient = new QueryClient();

  test('UseCharacterData should be called just once when initiating app', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(()=>{
      expect(useCharacterData).toHaveBeenCalledTimes(1);
    })
   
  });
});

describe("Ag Grid testing", ()=>{
  const queryClient = new QueryClient();
  const appMain = mount(<QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>);

  test('Ag grid should be in the document', () => {
    expect(appMain.find("AgGridReact").exists()).toBe(true);
 });
})




