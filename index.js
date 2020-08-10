!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("default",[],e):"object"==typeof exports?exports.default=e():t.default=e()}(window,(function(){return function(t){var e={};function s(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);
//! Request.js
//! authors : Alan Balen Schio - @schirrel
//! license : MIT
const r=(t,e)=>Object.assign({},t,e),n={method:"GET"},i={method:"PUT"},o={method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"}},a={method:"DELETE"};class u{static QueryURL(t,e){let s=new URL(t),r=new URLSearchParams(e).toString();return s.search=r,s}static getResponseByType(t){switch(t.type){case"basic":case"text":return t.text();case"json":case"cors":return t.json();default:return t.body()}}static getResponseByContentType(t){return/(application\/json)/.test(t.headers.get("content-type"))?t.json():/(text)/.test(t.headers.get("content-type"))?t.text():t.body()}static getResponse(t,e,s){return t.headers.get("content-type")?this.getResponseByContentType(t):this.getResponseByType(t)}static async request(t,e){return new Promise(async(s,r)=>{try{e&&e.body&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body));let r=await fetch(t,e);if(r.status>400)throw new Error(JSON.stringify({status:r.status,statusText:r.statusText}));s(this.getResponse(r))}catch(t){r(t)}})}static mountURL(t,e){return e&&Object.keys(e).length&&(t=this.QueryURL(t,e)),t}static get(t,e={},s={}){return this.request(this.mountURL(t,e),r(n,s))}static post(t,e={}){return this.request(t,r(o,e))}static put(t,e={}){return this.request(t,r(i,e))}static delete(t,e={}){return this.request(t,r(a,e))}}const c=()=>"_"+Math.random().toString(36).substr(2,9);class p{constructor(t){this.requests=new Set,this.observables=new Map,this.parent=t,this._identifier="RequestObservable-"+c()}watch(t){let e=c();return this.observables.set(e,t),e}callObservables(){for(var[t,e]of this.observables)e(!!this.requests.size)}updateRequests(t,e){this.parent&&this.parent.updateRequests&&this.parent.updateRequests(t,e),e?this.requests.delete(t):this.requests.add(t),this.callObservables()}}e.default=class{constructor(t,e){this.uri=t,this._observable=new p(e)}loading(t){this._observable.watch(t)}perform(t){let e=c();return this._observable.updateRequests(e),new Promise((s,r)=>{t.then(t=>{s(t)}).catch(t=>{r(t)}).finally(()=>{this._observable.updateRequests(e,!0)})})}get(t){return this.perform(u.get(this.uri+"/"+t))}all(){return this.perform(u.get(this.uri))}save(t){return t.id?this.perform(u.put(this.uri+"/"+t.id,{body:JSON.stringify(t)})):this.perform(u.post(this.uri,{body:JSON.stringify(t)}))}pagination(t){return t.page=t.page||1,t.limit=t.limit||10,this.perform(u.get(this.uri+"/pagination",t))}search(t){return this.perform(u.get(this.uri+"/search",t))}}}]).default}));