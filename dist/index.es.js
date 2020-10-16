import{createContext as e,useState as n,createElement as t,useContext as a}from"react";
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
***************************************************************************** */var r=function(){return(r=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e}).apply(this,arguments)},u=navigator.language.split("-")[0],l=e({locale:"",setLocale:function(){return null},languages:{},defaultLanguage:""});function o(e){var a=e.children,r=e.languages,o=e.defaultLanguage,c=e.detectBrowserLanguage,i=n(c?u:o),g=i[0],f=i[1];return t(l.Provider,{value:{locale:g,setLocale:f,languages:r,defaultLanguage:o}},a)}function c(e,n){var t=a(l),u=t.locale,o=t.languages,c=t.defaultLanguage,i=o[o[u]?u:c],g=e;if(n&&Object.keys(n).includes("count")&&(g=n.count>1?e+".plural":e+".default"),g.split(".").forEach((function(e){if(i[e])return i=i[e]})),"string"!=typeof i)return null;var f=n&&Object.entries(n).reduce((function(e,n){var t;return r(r({},e),((t={})[n[0]]=n[1].toString(),t))}),{});return f?i.split("__").map((function(e){return f[e]?f[e]:e})).join(""):i}function i(){return a(l)}export{o as Talkr,c as t,i as useLocale};
