import{createContext as n,useState as e,createElement as r,useContext as t}from"react";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var a=function(){return(a=Object.assign||function(n){for(var e,r=1,t=arguments.length;r<t;r++)for(var a in e=arguments[r])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)},l="undefined"!=typeof navigator?navigator.language.split("-")[0]:null,o=n(null);function u(n){var t=n.children,a=n.languages,u=n.defaultLanguage,i=n.detectBrowserLanguage,c=e(i&&l?l:u),s=c[0],f=c[1];return r(o.Provider,{value:{locale:s,setLocale:f,languages:a,defaultLanguage:u}},t)}function i(n,e){var r=c(),t=r.locale,l=r.languages,o=r.defaultLanguage,u=l[t]?t:o,i=l[u],s=n;if(e&&Object.keys(e).includes("count")){var f=new Intl.PluralRules(u).select(e.count);s=0===e.count?n+".zero":"other"===f?n+".many":n+"."+f}if(s.split(".").forEach((function(n){if(i[n])return i=i[n]})),"string"!=typeof i)return console.warn("Talkr bot: Missing translation for "+n),null;var g=e&&Object.entries(e).reduce((function(n,e){var r;return a(a({},n),((r={})[e[0]]=e[1].toString(),r))}),{});return g?i.split("__").map((function(n){return g[n]?g[n]:n})).join(""):i}function c(){var n=t(o);if(null==n)throw new Error("This should only be called inside Talkr");return n}export{i as T,u as Talkr,c as useLocale};
