import React from "react";
import { prettyDOM, render, renderHook, screen, waitFor } from "./test-utils";
import App from "./App";
import user from "@testing-library/user-event";
import { useCharacterData } from "./hooks/useCharacterData";
import { server } from "./mocks/server";
import { rest } from "msw";

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
  test("button Next when pressed update pageNumber state by 1", async () => {
    user.setup();
    render(<App />);
    const pageNumber = await screen.findByText("Page 1");
    const button = await screen.findByRole("button", {
      name: "Next",
    });
    expect(pageNumber).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(pageNumber).toHaveTextContent("Page 2");
  });

  test("button Previous page number is 1 is disabled", async () => {
    render(<App />);
    const prevBtn = await screen.findByRole("button", { name: "Previous" });
    expect(prevBtn).toHaveAttribute("disabled");
  });

  test("ag grid should have 3 rows", async () => {
    render(<App />);
    const grid = await screen.findByRole("treegrid");
    await waitFor(() => expect(grid).toHaveAttribute("aria-rowcount", "4"));
  });
  test("ag grid should disappear if there's an error and a message will be shown", async () => {
    server.use(
      rest.post("https://rickandmortyapi.com/graphql", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            isError: true,
            isFetching: false,
            isLoading: false,
            isSuccess: false,
          })
        );
      })
    );
    render(<App />);
    const grid = await screen.findByRole("treegrid");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Error, please try again!" })
      ).toBeInTheDocument();
    });
    expect(grid).not.toBeInTheDocument();
  });

  test("after clicking the cell, the card should appear", async () => {
    user.setup();
    render(<App />);
    const grid = await screen.findByRole("treegrid");
    await waitFor(() => expect(grid).toHaveAttribute("aria-rowcount", "4"));
    const rows = await screen.findAllByRole("row");
    expect(rows[0]).toBeInTheDocument();
    const gridCell = await screen.findAllByRole("gridcell");
    expect(gridCell[0]).toBeInTheDocument();
    await user.click(gridCell[0]);
    const nameTitle = await screen.findByRole("heading", {
      name: "Rick Sanchez",
    });
    expect(nameTitle).toBeInTheDocument();
    const cardNumber = await screen.findByRole("heading", { name: "1" });
    expect(cardNumber).toBeInTheDocument();
  });
});
