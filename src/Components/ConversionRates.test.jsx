import { describe, expect, test, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  debug,
  waitFor,
} from "@testing-library/react";
import ConversionRates from "./ConversionRates";

describe("ConversionRates", () => {
  test("Render correct BTC conversion rate for USD", async () => {
    render(<ConversionRates />);

    const usdElement = await waitFor(() => screen.getByTestId("USD"));

    //approximate conversion of 1 usd to btc
    const expectedBtcRate = 0.0001;
    const actualBtcRate = parseFloat(usdElement.textContent.split(" ")[3]);

    expect(actualBtcRate).toBeCloseTo(expectedBtcRate, 3);
  });
});
