import{createContext as n,useState as e,createElement as t,useContext as a}from"react";
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
***************************************************************************** */var r=function(){return(r=Object.assign||function(n){for(var e,t=1,a=arguments.length;t<a;t++)for(var r in e=arguments[t])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)},u=navigator.language.split("-")[0],l=n({locale:"",setLocale:function(){return null},languages:{},defaultLanguage:""});function o(n){var a=n.children,r=n.languages,o=n.defaultLanguage,c=n.detectBrowserLanguage,g=e(c?u:o),i=g[0],f=g[1];return t(l.Provider,{value:{locale:i,setLocale:f,languages:r,defaultLanguage:o}},a)}function c(n,e){var t=a(l),u=t.locale,o=t.languages,c=t.defaultLanguage,g=o[o[u]?u:c],i=n;if(e&&e.count&&(i=e.count>1?n+".plural":n+".default"),i.split(".").forEach((function(n){if(g[n])return g=g[n]})),"string"!=typeof g)return null;var f=e&&Object.entries(e).reduce((function(n,e){var t;return r(r({},n),((t={})[e[0]]=e[1].toString(),t))}),{});return f?g.split("__").map((function(n){return f[n]?f[n]:n})).join(""):g}function g(){return a(l)}export{o as Talkr,c as t,g as useLocale};
