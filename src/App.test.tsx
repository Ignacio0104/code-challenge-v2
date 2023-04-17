import React from "react";
import { render, screen, waitFor } from "./test-utils";
import App from "./App";
import user from "@testing-library/user-event";

describe("components mount correctly", () => {
  test("navbar title to be in the document", () => {
    render(<App />);
    const linkElement = screen.getByText(/Rick and Morty/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("Ag grid should be in the document", async () => {
    render(<App />);
    const grid = screen.getAllByRole("presentation");
    await waitFor(() => {
      expect(grid[0]).toBeInTheDocument();
    });
  });

  test("navbar title to be a link", () => {
    render(<App />);
    const link: HTMLAnchorElement = screen.getByRole("link");
    expect(link.href).toContain("/");
  });
  test("navbar to have an icon", () => {
    render(<App />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "icon-header.png");
  });
  test("button container to be in the document", () => {
    render(<App />);
    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(2);
  });
});

describe("functionality test", () => {
  test("button Next when pressed 2 times update pageNumber state in 2", async () => {
    user.setup();
    const pageNumber = screen.getByText("Page 1");
    const button = await screen.findByRole("button", {
      name: "Next",
    });
    expect(pageNumber).toHaveTextContent("Page 1");
    expect(button).toBeInTheDocument();
    await user.click(button);
    await user.click(button);
    expect(pageNumber).toHaveTextContent("Page 3");
  });

  // test("button Previous page number is 1 is disabled", async () => {
  //   const buttonArray = screen.getAllByRole("button");
  //   await waitFor(() => expect(buttonArray[0]).toHaveTextContent("Previous"));
  //   expect(buttonArray[0]).toHaveAttribute("disabled");
  // });
});
