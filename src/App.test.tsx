import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// add more examples based on this tutorial: https://www.js-howto.com/testing-react-query-with-jest-and-react-testing-library/

test("renders learn react link", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/loading/i);
  expect(linkElement).toBeInTheDocument();
});
