import{createContext as n,useState as e,createElement as t,useContext as r}from"react";
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
***************************************************************************** */var a=function(){return(a=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)},u=navigator.language.split("-")[0],o=n({locale:"",setLocale:function(){return null},languages:{},defaultLanguage:""});function l(n){var r=n.children,a=n.languages,l=n.defaultLanguage,c=n.detectBrowserLanguage,i=e(c?u:l),g=i[0],f=i[1];return t(o.Provider,{value:{locale:g,setLocale:f,languages:a,defaultLanguage:l}},r)}function c(n,e){var t=r(o),u=t.locale,l=t.languages,c=t.defaultLanguage,i=l[l[u]?u:c],g=n;if(e&&Object.keys(e).includes("count")&&(g=0===e.count?n+".zero":1===e.count?n+".one":n+".many"),g.split(".").forEach((function(n){if(i[n])return i=i[n]})),"string"!=typeof i)return null;var f=e&&Object.entries(e).reduce((function(n,e){var t;return a(a({},n),((t={})[e[0]]=e[1].toString(),t))}),{});return f?i.split("__").map((function(n){return f[n]?f[n]:n})).join(""):i}function i(){return r(o)}export{l as Talkr,c as t,i as useLocale};
