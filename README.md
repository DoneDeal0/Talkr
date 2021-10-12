<img width="757" alt="talkr logo" src="https://user-images.githubusercontent.com/43271780/96292673-ddec9c80-0fe9-11eb-96d1-1cac75dfaf3d.png">

# TALKR - DOCUMENTATION

## WHAT IS IT?

**Talkr** is a super small i18n provider for React applications. It supports Typescript, has 0 dependencies, and is very easy to use.

### features:

- auto-detect browser language
- auto-detect plural rules based on any language
- dynamic translations with multiple keys
- access deeply nested keys in json translations files
- provides typescript autocompletion

## NICE! BUT HOW DOES IT WORK?

#### JSON

- Create your JSON translation files.
- Surround dynamic values by double underscores: `__dynamicValue__`.
- To allow automatic plural detection, you will need to pass a `count` parameter to **Talkr**'s translation function. **Talkr** will then chose the right word or sentence between `zero`, `one`, `two`, `few` and `many`.

> 🤓: Some languages have more complex plural rules, that may require these five options to offer a perfect user experience. For instance, Arabic handle `zero`, `one`, `two`, `numbers between 3 and 10` and `numbers over 10` as separate entities. If a language doesn't need all these subtleties - like english - you can only write `zero`, `one` and `many` in the JSON file.

```json
{
  "hello": "hello",
  "feedback": {
    "error": "The connection failed",
    "success": "The connection succedeed"
  },
  "user": {
    "describe": {
      "simple": "You are __name__",
      "complex": "You are __name__ and you like __hobby__"
    }
  },
  "message-count": {
    "zero": "you don't have new messages",
    "one": "you have 1 message",
    "many": "you have __count__ messages"
  }
}
```

#### PROVIDER

- In your index file, import your JSON translations
- Wrap your App with **Talkr Provider**
- Pass it your available `languages` and your `defaultLanguage`.
- You also have the option to let **Talkr** detect browser's language with the prop `detectBrowserLanguage` (see #Props).

```javascript
import * as React from "react";
import ReactDOM from "react-dom";
import { Talkr } from "talkr";
import App from "./app";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

ReactDOM.render(
  <Talkr languages={{ en, fr }} defaultLanguage="en">
    <App />
  </Talkr>,
  document.getElementById("root")
);
```

#### SIMPLE USAGE

- In any component, import **Talker**'s translation function `T`.
- Fetch the desired sentence as if you were directly accessing an object, by adding `.` between each key. Based on the JSON example above, we could print the sentence `The connection succedeed` by simply writing `T("feedback.success")`

```javascript
import React from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT()
  return (
    <>
      <h1>{T("hello")}</h1>
      <div>{T("feedback.success")}</div>
    </>
  );
}
```

#### DYNAMIC VALUES

- To handle dynamic translations, just add an object with all necessary dynamic values
- To make it work, you need to surround the dynamic values by double underscores in your JSON files (`__dynamicValue__`)

```javascript
import React from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT()
  return (
    <>
      <h1>{T("user.describe.complex", { name: "joe", hobby: "coding" })}</h1>
    </>
  );
}
```

#### PLURAL

- To handle plural, just add a `count` property to the object
- To make it work, you need to provide both `zero`, `one` and `many` values to your JSON files.

```javascript
import React, { useState } from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT()
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{T("message-count", { count })}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
```

#### LOCALE

- Access and update the locale by using the hook `useLocale()`
- If the provided locale doesn't match any JSON translation files, **Talkr** will use the `defaultLanguage` sent to the provider.

```javascript
import React, { useState } from "react";
import { useT, useLocale } from "talkr";

export default function MyComponent() {
  const { T } = useT()
  const { setLocale, locale } = useLocale();
  return (
    <>
      <h1>{T("hello")}</h1>
      <p>{locale}</p>
      <button onClick={() => setLocale("fr")}>speak french</button>
    </>
  );
}
```

## PROPS

### Provider

You can pass these props to **Talkr**'s provider
| |Type |Role |
|----------------|-------------------------------|-----------------------------|
|languages |`object` |object containing all your json files. Typical format: `{en: {...}, fr: {...}}` |
|defaultLanguage |`string` |default language of your app (a similar key must be included in the `language` prop) |
|detectBrowserLanguage |`boolean`|if `true`, **Talkr** will automatically use browser language and override the `defaultLanguage`. If the browser language is not included in your available translations, it will switch back to `defaultLanguage`.|

> 🤓: The auto-detect language feature will always return a simple key such as 'fr' instead of 'fr_FR'. Keep things simple and always declare your languages with 2 letters.

### useLocale

You can access these props from **Talkr**'s hook `useLocale()`
| |Type |Role |
|----------------|-------------------------------|-----------------------------|
|locale |`string` |returns the current locale |
|setLocale |`(locale: string) => void` |function to update the locale  
|defaultLanguage |`string`|returns the App's default language|
|languages |`object`|returns all your JSON translations|

## CREDITS

DoneDeal0

Mouth logo made by emilegraphics from the Noun Project