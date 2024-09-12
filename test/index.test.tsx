import * as React from "react";
import "@testing-library/jest-dom";
import { fireEvent, screen, render } from "./dummy-app";
import { useT } from "../src/index";

const Component = () => {
  const { T, locale, setLocale } = useT();
  return (
    <div>
      <div data-testid="talkr-locale">{locale}</div>
      <div data-testid="talkr-basic">{T("hello")}</div>
      <div data-testid="talkr-nested">{T("feedback.success")}</div>
      <div data-testid="talkr-complex">
        {T("user.describe.complex", { name: "Joe", hobby: "coding" })}
      </div>
      <div data-testid="talkr-count-zero">
        {T("message-count", { count: 0 })}
      </div>
      <div data-testid="talkr-count-one">
        {T("message-count", { count: 1 })}
      </div>
      <div data-testid="talkr-count-many">
        {T("message-count", { count: 12 })}
      </div>
      <div data-testid="talkr-king">
        {T("idiom.sovereign", { gender: "m" })}
      </div>
      <div data-testid="talkr-queen">
        {T("idiom.sovereign", { gender: "f" })}
      </div>
      <div data-testid="talkr-days-conjunction">{T("days")}</div>
      <div data-testid="talkr-days-conjunction-long">
        {T("days", { listStyle: "long" })}
      </div>
      <div data-testid="talkr-days-disjunction">
        {T("days", { listType: "disjunction" })}
      </div>
      <div data-testid=" talkr-empty-list">
        {T("empty-list", { listType: "disjunction" })}
      </div>
      <div data-testid="talkr-unknown">{T("unknown.key")}</div>
      <button role="button" onClick={() => setLocale("fr")}>
        speak french
      </button>
    </div>
  );
};

const Counter = () => {
  const { T } = useT();
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div data-testid="talkr-count">{T("message-count", { count })}</div>
      <button role="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
};

describe("translate", () => {
  it("render a simple translation", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-basic").textContent).toEqual("Hello");
  });
  it("render a nested translation", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-nested").textContent).toEqual(
      "The connection succedeed",
    );
  });
  it("render a dynamic translation", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-complex").textContent).toEqual(
      "You are Joe and you like coding",
    );
    expect(screen.getByTestId("talkr-count-zero").textContent).toEqual(
      "You don't have new messages",
    );
    expect(screen.getByTestId("talkr-count-one").textContent).toEqual(
      "You have 1 message",
    );
    expect(screen.getByTestId("talkr-count-many").textContent).toEqual(
      "You have 12 messages",
    );
  });
  it("render an empty string if the translation doesn't exist", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-unknown").textContent).toEqual("");
  });
});

describe("locale", () => {
  it("returns the current locale", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-locale").textContent).toEqual("en");
  });
  it("change the locale from english to french", () => {
    render(<Component />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByTestId("talkr-locale").textContent).toEqual("fr");
    expect(screen.getByTestId("talkr-basic").textContent).toEqual("Bonjour");
  });
});

describe("gender", () => {
  it("return the correct syntax based on gender", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-king").textContent).toEqual(
      "Long live the King!",
    );
    expect(screen.getByTestId("talkr-queen").textContent).toEqual(
      "Long live the Queen!",
    );
  });
});

describe("list", () => {
  it("return a conjuction list", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-days-conjunction").textContent).toEqual(
      "Monday, Tuesday, Wednesday",
    );
    expect(
      screen.getByTestId("talkr-days-conjunction-long").textContent,
    ).toEqual("Monday, Tuesday, and Wednesday");
  });
  it("return a disjunction list", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-days-disjunction").textContent).toEqual(
      "Monday, Tuesday, or Wednesday",
    );
  });
  it("return a empty string if the list is empty", () => {
    render(<Component />);
    expect(screen.getByTestId("talkr-empty-list").textContent).toEqual("");
  });
});

describe("live translation update", () => {
  it("update a translation based on a dynamic counter", () => {
    render(<Counter />);
    const button = screen.getByRole("button");
    expect(screen.getByTestId("talkr-count").textContent).toEqual(
      "You don't have new messages",
    );
    fireEvent.click(button);
    expect(screen.getByTestId("talkr-count").textContent).toEqual(
      "You have 1 message",
    );
    fireEvent.click(button);
    expect(screen.getByTestId("talkr-count").textContent).toEqual(
      "You have 2 messages",
    );
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.getByTestId("talkr-count").textContent).toEqual(
      "You have 5 messages",
    );
  });
});
