import React from "react";
import {
  fireEvent,
  prettyDOM,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
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

describe("functionality test", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });
  test("button Next when pressed 2 times update pageNumber state in 2", async () => {
    const pageNumber = screen.getByText("Page 1");
    const buttonArray = screen.getAllByRole("button");
    expect(pageNumber).toBeInTheDocument();
    await waitFor(() => expect(buttonArray[1]).toHaveTextContent("Next"));
    fireEvent.click(buttonArray[1]);
    await waitFor(() => expect(pageNumber).toHaveTextContent("Page 2"));
  });

  test("button Previous page number is 1 is disabled", async () => {
    const buttonArray = screen.getAllByRole("button");
    await waitFor(() => expect(buttonArray[0]).toHaveTextContent("Previous"));
    expect(buttonArray[0]).toHaveAttribute("disabled");
  });
});

describe("My test suite", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });
  test("My test case", async () => {
    const useCharacterDataSpy = jest.spyOn(
      require("./hooks/useCharacterData"),
      "useCharacterData"
    );
    const mockData = {}; // Your mock data here
    useCharacterDataSpy.mockReturnValue({
      isError: true,
      isLoading: false,
      isFething: false,
      data: mockData,
      retry: false,
    });

    expect(screen.getByText(/Error, please try/i)).toBeInTheDocument();
    useCharacterDataSpy.mockRestore();
  });
});

// describe("useQuery hook testing", () => {
//   test("check if the query call return is success", async () => {
//     const onSuccess = jest.fn();
//     const onError = jest.fn();
//     const pageNumber = 1;
//     const useCharacterDataSpy = jest.spyOn(
//       require("./hooks/useCharacterData"),
//       "useCharacterData"
//     );
//     const mockData = {}; // Your mock data here
//     useCharacterDataSpy.mockReturnValue({ isError: true, data: mockData });
//     await waitFor(() => expect(result.current.isSuccess).toBe(true));
//   });
// });
