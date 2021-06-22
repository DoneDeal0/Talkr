"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var n=t(e),r=function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},a="undefined"!=typeof navigator?navigator.language.split("-")[0]:null,u=e.createContext({locale:"",setLocale:function(){return null},languages:{},defaultLanguage:""});
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
***************************************************************************** */exports.T=function(t,n){var a=e.useContext(u),o=a.locale,l=a.languages,c=a.defaultLanguage,i=l[o]?o:c,s=l[i],f=t;if(n&&Object.keys(n).includes("count")){var g=new Intl.PluralRules(i).select(n.count);f=0===n.count?t+".zero":"other"===g?t+".many":t+"."+g}if(f.split(".").forEach((function(e){if(s[e])return s=s[e]})),"string"!=typeof s)return console.warn("Talkr bot: Missing translation for "+t),null;var p=n&&Object.entries(n).reduce((function(e,t){var n;return r(r({},e),((n={})[t[0]]=t[1].toString(),n))}),{});return p?s.split("__").map((function(e){return p[e]?p[e]:e})).join(""):s},exports.Talkr=function(t){var r=t.children,o=t.languages,l=t.defaultLanguage,c=t.detectBrowserLanguage,i=e.useState(c&&a?a:l),s=i[0],f=i[1];return n.createElement(u.Provider,{value:{locale:s,setLocale:f,languages:o,defaultLanguage:l}},r)},exports.useLocale=function(){return e.useContext(u)};
