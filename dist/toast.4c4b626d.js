parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UD5m":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateToast=void 0;var o=function(o){var e=o.columnId,n=o.message,t=o.backgroundColor,a=void 0===t?"#4682B4":t,c=o.color,r=void 0===c?"#fffffe":c,i=o.length,s=void 0===i?"2000ms":i,d=document.querySelector("div[id=container".concat(e,"]"));console.log(d),d.insertAdjacentHTML("afterbegin","<p class='toast'\n        style=\"background-color: ".concat(a,";\n        color: ").concat(r,";\n        animation-duration: ").concat(s,'">\n        ').concat(n,"\n        </p>"));var l=document.querySelector(".toast");l.addEventListener("animationend",function(){l.remove()})};exports.generateToast=o;
},{}]},{},["UD5m"], null)
//# sourceMappingURL=/toast.4c4b626d.js.map