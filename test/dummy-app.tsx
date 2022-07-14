import React, { FC, ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Talkr } from "../src/index";

const en = {
  hello: "Hello",
  feedback: {
    error: "The connection failed",
    success: "The connection succedeed",
  },
  user: {
    describe: {
      simple: "You are __name__",
      complex: "You are __name__ and you like __hobby__",
    },
  },
  "message-count": {
    zero: "You don't have new messages",
    one: "You have 1 message",
    many: "You have __count__ messages",
  },
};

const fr = {
  hello: "Bonjour",
  feedback: {
    error: "La connection a échoué",
    success: "La connection a réussie",
  },
  user: {
    describe: {
      simple: "Vous êtes __name__",
      complex: "Vous êtes __name__ et vous aimez __hobby__",
    },
  },
  "message-count": {
    zero: "Vous n'avez aucun message",
    one: "Vous avez 1 message",
    many: "Vous avez __count__ messages",
  },
};

const DummyApp: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Talkr languages={{ en, fr }} defaultLanguage="en">
      {children}
    </Talkr>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: DummyApp, ...options });

export * from "@testing-library/react";
export { customRender as render };
