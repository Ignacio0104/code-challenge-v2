import React from "react";
import { fireEvent, prettyDOM, render, renderHook, screen, waitFor } from "@testing-library/react";
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
  test("button Next when pressed 2 times update pageNumber state in 2", async() => {
    const pageNumber = screen.getByText("Page 1");
    const button = screen.getByText("Next")
    expect(pageNumber).toBeInTheDocument()
    fireEvent.click(button);
    fireEvent.click(button);
    expect(pageNumber).toHaveTextContent("Page 3")
  });

  test("button Previous when pressed 1 time update pageNumber state -1", async() => {
    const pageNumber = screen.getByText("Page 1");
    const buttonNext = screen.getByText("Next")
    fireEvent.click(buttonNext);
    fireEvent.click(buttonNext);
    const buttonPrevious = screen.getByText("Previous")
    fireEvent.click(buttonPrevious)
    expect(pageNumber).toHaveTextContent("Page 2")
  });

  test("button Previous when pressed and page number is 1, it doesn't go to 0", async() => {
    const pageNumber = screen.getByText("Page 1");
    const buttonPrevious = screen.getByText("Previous")
    fireEvent.click(buttonPrevious)
    fireEvent.click(buttonPrevious)
    fireEvent.click(buttonPrevious)
    expect(pageNumber).toHaveTextContent("Page 1")
  });

  // test("button Next when pressed and there is no data, it will maintain previous page", async() => {
  //   const mockUseCharacterData = useCharacterData as jest.MockedFunction<typeof useCharacterData>;
  //   mockUseCharacterData.mockReturnValue({
  //     data: {
  //       characters: {
  //         results: []
  //       }
  //     },
  //   });
    
  //   const pageNumber = screen.getByText("Page 1");
  //   const buttonPrevious = screen.getByText("Next")
  //   for (let index = 0; index < 100; index++) {
  //     fireEvent.click(buttonPrevious)
  //   }
  //   expect(pageNumber).toHaveTextContent("Page 43")
  // });
})

describe("useQuery hook testing",()=>{
  test("check if the query call return is success",async()=>{
    const queryClient = new QueryClient();
    const wrapper = ({ children} : {children:React.ReactNode}) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
    const {result} = renderHook(() => useCharacterData(()=>{},()=>{},1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  })

})

