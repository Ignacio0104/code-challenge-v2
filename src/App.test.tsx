import React from "react";
import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider, UseQueryResult } from "@tanstack/react-query";
import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { useCharacterData } from "../src/hooks/useCharacterData";
import HeroSection from "./components/HeroSection";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

Enzyme.configure({ adapter: new Adapter() });

describe("components mount correctly", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });

  test("navbar title to be in the document", () => {
    const linkElement = screen.getByText(/Rick and Morty/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("Ag grid should be in the document", async () => {
    const grid = screen.getAllByRole("presentation");
    await waitFor(() => {
      expect(grid[0]).toBeInTheDocument();
    });
  });

  test("navbar title to be a link", () => {
    const links: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(links[0].href).toContain("/");
  });
  test("navbar to have an icon", () => {
    const image = screen.getByAltText("navbar icon");
    expect(image).toHaveAttribute("src", "icon-header.png");
  });
  test("button container to be in the document", () => {
    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(2);
  });
});

describe("functionality test", ()=>{
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });
  test("button previous to change the state of the component", async() => {
    const pageNumber = screen.getByText("Page 1");
    const button = screen.getByText("Next")
    expect(pageNumber).toBeInTheDocument()
    fireEvent.click(button);
    fireEvent.click(button);
    expect(pageNumber).toHaveTextContent("Page 3")
  });
})

