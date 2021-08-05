import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import fetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testShow = {
  name: "Test Stranger Things",
  summary: "summary",
  seasons: [
    { id: "1", name: "hello", episodes: [] },
    { id: "2", name: "hellooo", episodes: [] },
    { id: "3", name: "my name is helloo", episodes: [] },
  ],
};

test("renders ithout error", () => {
  render(<Display />);
});

test("render component when button is clicked", async () => {
  render(<Display />);
  fetchShow.mockResolvedValueOnce(testShow);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const shComponent = await screen.findByTestId("show-container");

  expect(shComponent).toBeInTheDocument();
});

test("readers season ", async () => {
  fetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const options = screen.queryAllByTestId("season-option");
    expect(options).toHaveLength(3);
  });
});
