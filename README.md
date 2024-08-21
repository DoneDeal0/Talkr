<img width="1015" alt="Capture d’écran 2024-05-20 à 17 19 54" src="https://github.com/DoneDeal0/Talkr/assets/43271780/55fb8790-13ee-4273-a113-8cc5478912da"></img>

<hr/>

# TALKR

**Talkr** is the lightest i18n provider for React applications. It supports **Typescript**, provides **autocompletion**, has **0 dependencies**, and is very easy to use.

[![Talkr CI](https://github.com/DoneDeal0/Talkr/actions/workflows/talkr.yml/badge.svg)](https://github.com/DoneDeal0/Talkr/actions/workflows/talkr.yml)
![NPM Downloads](https://img.shields.io/npm/dy/talkr?logo=npm)

<hr/>

### FEATURES

- Auto-detect browser language
- Auto-detect plural rules based on any language
- Dynamic translations with multiple keys
- Access deeply nested keys in json translations files
- Adapts syntax to gender
- Supports React Native
- Provides typescript autocompletion for your keys (🤘)

<hr/>
  
### SCREENSHOT

<img width="588" alt="talkr autocomplete in action" src="https://user-images.githubusercontent.com/43271780/154273252-f0818de8-66d1-4265-9e6f-bebe5bd8b73f.png"></img>

<hr/>

## INSTALLATION

```bash
// with npm
npm install talkr
// with yarn
yarn add talkr
```

<hr/>

# ADD TRANSLATION FILES

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
  "idiom": {
    "sovereign": {
      "female": "Long live the Queen!",
      "male": "Long live the King!"
    }
  },
  "message-count": {
    "zero": "you don't have new messages",
    "one": "you have 1 message",
    "many": "you have __count__ messages"
  }
}
```

<hr/>

# SET UP

- In your index file, import your JSON translations
- Wrap your App with **Talkr**'s `Provider`
- Pass it your available `languages` and your `defaultLanguage`.
- You also have the option to let **Talkr** detect browser's language with the prop `detectBrowserLanguage` (see [props](#Available props)).

```javascript
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Talkr } from "talkr";
import App from "./app";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

const root = createRoot(document.getElementById("root"));

root.render(
  <Talkr languages={{ en, fr }} defaultLanguage="en">
    <App />
  </Talkr>,
);
```

<hr/>

# SIMPLE USAGE

- In any component, import **Talker**'s hook `useT`.
- Destructure the translation function `T` from `useT`
- Fetch the desired sentence as if you were directly accessing an object, by adding `.` between each key. Based on the JSON example [above](add-translation-files), we could print the sentence `The connection succedeed` by simply writing `T("feedback.success")`

```javascript
import React from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT();
  return (
    <>
      <h1>{T("hello")}</h1>
      <div>{T("feedback.success")}</div>
    </>
  );
}
```

<hr/>

# DYNAMIC VALUES

- To handle dynamic translations, just add an object with all necessary dynamic values
- To make it work, you need to surround the dynamic values by double underscores in your [JSON files](Add translation files) (`__dynamicValue__`)

```json
"user": {
    "describe": {
      "simple": "You are __name__",
      "complex": "You are __name__ and you like __hobby__"
    }
  }
```

```javascript
import React from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT();
  return (
    <>
      <h1>{T("user.describe.complex", { name: "joe", hobby: "coding" })}</h1>
    </>
  );
}
```

<hr/>

# PLURAL

- To handle plural, just add a `count` property to the object
- To make it work, you need to provide both `zero`, `one` and `many` values to your JSON files.

```json
"message-count": {
    "zero": "you don't have new messages",
    "one": "you have 1 message",
    "many": "you have __count__ messages"
  }
```

```javascript
import React, { useState } from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT();
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{T("message-count", { count })}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
```

<hr/>

# GENDER

- Some languages have different syntax for masculine and feminine genders.
- To adapt your sentence accordingly, just pass the param `gender: m` for `male`, or `gender: f` for `female`.
- To make it work, you need to provide both `male` and `female` values to your JSON files.

```json
"idiom": {
    "sovereign": {
      "female": "Long live the Queen!",
      "male": "Long live the King!"
    }
  }
```

```javascript
import React from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT();
  return (
    <>
      <h1>{T("idiom.sovereign", { gender: "m" })}</h1>
    </>
  );
}
```

<hr/>

# LOCALE

- Access and update the locale by using the hook `useT()`
- If the provided locale doesn't match any JSON translation files, **Talkr** will use the `defaultLanguage` sent to the provider.

```javascript
import React, { useState } from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T, setLocale, locale } = useT();
  return (
    <>
      <h1>{T("hello")}</h1>
      <p>{locale}</p>
      <button onClick={() => setLocale("fr")}>speak french</button>
    </>
  );
}
```

<hr/>

<a name='autocomplete'></a>

# AUTOCOMPLETION

Autocompletion for translation keys is available in Typescript projects. Because json must be parsed at **compile time**, you will need to create your own `useAutocompleteT` hook with **Talkr**'s `Autocomplete` type wrapper.

Here's how to do it:

- Make sure you use `Typescript >=4.5.5` (we don't guarantee it will work on older versions)
- Create a `translate.tsx` file anywhere in your app(`translate.tsx` can be named as you want)
- Import your main language JSON translation (ex: `en.json`)
- Instantiate autocompletion with **Talkr's** `Autocomplete`
- Export a `useAutocompleteT` hook around **Talkr**'s `useT()`

```javascript
import { useT, Autocomplete, TParams, tr } from "talkr";
import en from "./en.json";

type Key = Autocomplete<typeof en>;

export const useAutocompleteT = () => {
  const { locale, languages, defaultLanguage } = useT();
  return {
    T: (key: Key, params?: TParams) =>
      tr({ locale, languages, defaultLanguage }, key, params),
  };
};
```

If you prefer to keep the `useT` naming, just write:

```js
import { useT as useTr, Autocomplete, TParams, tr } from "talkr";
import en from "./en.json";

type Key = Autocomplete<typeof en>;

export const useT = () => {
  const { locale, languages, defaultLanguage } = useTr();
  return {
    T: (key: Key, params?: TParams) =>
      tr({ locale, languages, defaultLanguage }, key, params),
  };
};
```

# Autocomplete usage

You now have the choice between using your own `useAutocompleteT` hook - which provides real-time autocompletion - or using **Talkr**'s `useT` - which doesn't provide autocompletion - in your app.

```js
import { useAutocompleteT } from "./translate";

function App() {
  const { T } = useAutocompleteT();
  return (
    <>
      <h1>{T("feedback.success")}</h1>
      <h4>{T("user.describe.complex", { name: "joe", hobby: "coding" })}</h4>
    </>
  );
}
```

> 🤓 Pro-tip: since you will need to import `useAutocompleteT` from `translate.tsx`, it is highly recommended to add an alias `translate` to your builder's config and `tsconfig.json`.

This will allow you to write

```js
import { useAutocompleteT } from "translate" 👍
```

instead of

```js
import { useAutocompleteT } from "../../translate" 👎
```

> **Exemples:**
> webpack
>
> ```
> resolve: {
>   extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
>   alias: {
>       translate: path.resolve(__dirname, "src/translate/"),
>  }
> ```
>
> tsconfig
>
> ```
> { "compilerOptions": {
>   "paths": {
>   "translate/*": ["src/translate/*"]
>   }
> }}
> ```
>
> for other bundlers, please refer to their respective documentations.

<hr/>

# REACT NATIVE

- Add your provider directly in App.(js|tsx)

```javascript
import { StyleSheet, Text, View } from "react-native";
import { Talkr } from "talkr";
import en from "./src/i18n/en.json";
import fr from "./src/i18n/fr.json";
import MyComponent from "./src/MyComponent";

export default function App() {
  return (
    <Talkr languages={{ en, fr }} defaultLanguage="en">
      <View style={styles.container}>
        <MyComponent />
      </View>
    </Talkr>
  );
}
```

- All the exemples above are valid in React Native. You only have to replace html tags (`div`, `h1`, etc.) by `Text`.
- Since `Intl` api is not available in React Native, the `count` param will only return three types of plural keys: `zero`, `one` and `many`. Please adjust your json files accordingly.

```javascript
import React, { Text, Button } from "react-native";
import { useState } from "react";
import { useT } from "talkr";

export default function MyComponent() {
  const { T } = useT();
  const [count, setCount] = useState(0);

  return (
    <>
      <Text>{T("hello")}</Text>
      <Text>
        {T("user.describe.complex", { name: "joe", hobby: "coding" })}
      </Text>
      <Text>{T("message-count", { count })}</Text>
      <Button onPress={() => setCount(count + 1)} title="+1" />
    </>
  );
}
```

<hr/>

# AVAILABLE PROPS

You can pass these props to **Talkr**'s provider
| |Type |Role |
|----------------|-------------------------------|-----------------------------|
|languages |`object` |object containing all your json files. Typical format: `{en: {...}, fr: {...}}` |
|defaultLanguage |`string` |default language of your app (a similar key must be included in the `language` prop) |
|detectBrowserLanguage |`boolean`|if `true`, **Talkr** will automatically use browser language and override the `defaultLanguage`. If the browser language is not included in your available translations, it will switch back to `defaultLanguage`. Not available in React Native. Use `expo-localization` to fetch the default user locale instead.|

> 🤓: The auto-detect language feature will always return a simple key such as 'fr' instead of 'fr_FR'. Keep things simple and always declare your languages with 2 letters.

<hr/>

## CREDITS

DoneDeal0

<hr/>

## SUPPORT

If you or your company uses **Talkr**, please show your support by becoming a sponsor! Your name and company logo will be displayed on the `README.md`.
https://github.com/sponsors/DoneDeal0

<br/>
<a href="https://github.com/sponsors/DoneDeal0" target="_blank">
<img alt="sponsor" src="https://github.com/DoneDeal0/superdiff/assets/43271780/21deb4f3-fee3-4bf9-a945-ed0b77c6f82f"/>
</a>
<br/>

<hr/>

<hr/>

Also see our <a href="https://talkr-documentation.netlify.app/">website</a>
