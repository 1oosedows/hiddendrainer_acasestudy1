/*! For license information please see inpage.js.LICENSE.txt */
(()=>{
var t={
"../../../node_modules/@solana/buffer-layout/lib/Layout.js":(t,e,r)=>{
"use strict";
e._O=e.Jq=e.KB=e.u8=e.cv=void 0,e.Ik=e.A9=e.n_=e.gM=void 0;
const n=r("../../../node_modules/buffer/index.js");
function o(t){
if(!(t instanceof Uint8Array))throw new TypeError("b must be a Uint8Array")
}
function i(t){
return o(t),n.Buffer.from(t.buffer,t.byteOffset,t.length)
}
class s{
constructor(t,e){
if(!Number.isInteger(t))throw new TypeError("span must be an integer");
this.span=t,this.property=e
}
makeDestinationObject(){
return{

}

}
getSpan(t,e){
if(0>this.span)throw new RangeError("indeterminate span");
return this.span
}
replicate(t){
const e=Object.create(this.constructor.prototype);
return Object.assign(e,this),e.property=t,e
}
fromArray(t){

}

}
function a(t,e){
return e.property?t+"["+e.property+"]":t
}
class u extends s{
isCount(){
throw new Error("ExternalLayout is abstract")
}

}
class c extends u{
constructor(t,e=0,r){
if(!(t instanceof s))throw new TypeError("layout must be a Layout");
if(!Number.isInteger(e))throw new TypeError("offset must be integer or undefined");
super(t.span,r||t.property),this.layout=t,this.offset=e
}
isCount(){
return this.layout instanceof l||this.layout instanceof f
}
decode(t,e=0){
return this.layout.decode(t,e+this.offset)
}
encode(t,e,r=0){
return this.layout.encode(t,e,r+this.offset)
}

}
class l extends s{
constructor(t,e){
if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")
}
decode(t,e=0){
return i(t).readUIntLE(e,this.span)
}
encode(t,e,r=0){
return i(e).writeUIntLE(t,r,this.span),this.span
}

}
class f extends s{
constructor(t,e){
if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")
}
decode(t,e=0){
return i(t).readUIntBE(e,this.span)
}
encode(t,e,r=0){
return i(e).writeUIntBE(t,r,this.span),this.span
}

}
const h=Math.pow(2,32);
function d(t){
const e=Math.floor(t/h);
return{
hi32:e,lo32:t-e*h
}

}
function p(t,e){
return t*h+e
}
class y extends s{
constructor(t){
super(8,t)
}
decode(t,e=0){
const r=i(t),n=r.readUInt32LE(e);
return p(r.readUInt32LE(e+4),n)
}
encode(t,e,r=0){
const n=d(t),o=i(e);
return o.writeUInt32LE(n.lo32,r),o.writeUInt32LE(n.hi32,r+4),8
}

}
class g extends s{
constructor(t){
super(8,t)
}
decode(t,e=0){
const r=i(t),n=r.readUInt32LE(e);
return p(r.readInt32LE(e+4),n)
}
encode(t,e,r=0){
const n=d(t),o=i(e);
return o.writeUInt32LE(n.lo32,r),o.writeInt32LE(n.hi32,r+4),8
}

}
class m extends s{
constructor(t,e,r){
if(!(t instanceof s))throw new TypeError("elementLayout must be a Layout");
if(!(e instanceof u&&e.isCount()||Number.isInteger(e)&&0<=e))throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
let n=-1;
!(e instanceof u)&&0<t.span&&(n=e*t.span),super(n,r),this.elementLayout=t,this.count=e
}
getSpan(t,e=0){
if(0<=this.span)return this.span;
let r=0,n=this.count;
if(n instanceof u&&(n=n.decode(t,e)),0<this.elementLayout.span)r=n*this.elementLayout.span;
else{
let o=0;
for(;
o<n;
)r+=this.elementLayout.getSpan(t,e+r),++o
}
return r
}
decode(t,e=0){
const r=[];
let n=0,o=this.count;
for(o instanceof u&&(o=o.decode(t,e));
n<o;
)r.push(this.elementLayout.decode(t,e)),e+=this.elementLayout.getSpan(t,e),n+=1;
return r
}
encode(t,e,r=0){
const n=this.elementLayout,o=t.reduce(((t,o)=>t+n.encode(o,e,r+t)),0);
return this.count instanceof u&&this.count.encode(t.length,e,r),o
}

}
class b extends s{
constructor(t,e,r){
if(!Array.isArray(t)||!t.reduce(((t,e)=>t&&e instanceof s),!0))throw new TypeError("fields must be array of Layout instances");
"boolean"==typeof e&&void 0===r&&(r=e,e=void 0);
for(const e of t)if(0>e.span&&void 0===e.property)throw new Error("fields cannot contain unnamed variable-length layout");
let n=-1;
try{
n=t.reduce(((t,e)=>t+e.getSpan()),0)
}
catch(t){

}
super(n,e),this.fields=t,this.decodePrefixes=!!r
}
getSpan(t,e=0){
if(0<=this.span)return this.span;
let r=0;
try{
r=this.fields.reduce(((r,n)=>{
const o=n.getSpan(t,e);
return e+=o,r+o
}
),0)
}
catch(t){
throw new RangeError("indeterminate span")
}
return r
}
decode(t,e=0){
o(t);
const r=this.makeDestinationObject();
for(const n of this.fields)if(void 0!==n.property&&(r[n.property]=n.decode(t,e)),e+=n.getSpan(t,e),this.decodePrefixes&&t.length===e)break;
return r
}
encode(t,e,r=0){
const n=r;
let o=0,i=0;
for(const n of this.fields){
let s=n.span;
if(i=0<s?s:0,void 0!==n.property){
const o=t[n.property];
void 0!==o&&(i=n.encode(o,e,r),0>s&&(s=n.getSpan(e,r)))
}
o=r,r+=s
}
return o+i-n
}
fromArray(t){
const e=this.makeDestinationObject();
for(const r of this.fields)void 0!==r.property&&0<t.length&&(e[r.property]=t.shift());
return e
}
layoutFor(t){
if("string"!=typeof t)throw new TypeError("property must be string");
for(const e of this.fields)if(e.property===t)return e
}
offsetOf(t){
if("string"!=typeof t)throw new TypeError("property must be string");
let e=0;
for(const r of this.fields){
if(r.property===t)return e;
0>r.span?e=-1:0<=e&&(e+=r.span)
}

}

}
class w extends s{
constructor(t,e){
if(!(t instanceof u&&t.isCount()||Number.isInteger(t)&&0<=t))throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
let r=-1;
t instanceof u||(r=t),super(r,e),this.length=t
}
getSpan(t,e){
let r=this.span;
return 0>r&&(r=this.length.decode(t,e)),r
}
decode(t,e=0){
let r=this.span;
return 0>r&&(r=this.length.decode(t,e)),i(t).slice(e,e+r)
}
encode(t,e,r){
let n=this.length;
if(this.length instanceof u&&(n=t.length),!(t instanceof Uint8Array&&n===t.length))throw new TypeError(a("Blob.encode",this)+" requires (length "+n+") Uint8Array as src");
if(r+n>e.length)throw new RangeError("encoding overruns Uint8Array");
const o=i(t);
return i(e).write(o.toString("hex"),r,n,"hex"),this.length instanceof u&&this.length.encode(n,e,r),n
}

}
e.cv=(t,e,r)=>new c(t,e,r),e.u8=t=>new l(1,t),e.KB=t=>new l(2,t),e.Jq=t=>new l(4,t),e._O=t=>new y(t),e.gM=t=>new g(t),e.n_=(t,e,r)=>new b(t,e,r),e.A9=(t,e,r)=>new m(t,e,r),e.Ik=(t,e)=>new w(t,e)
}
,"../../../node_modules/assert/build/assert.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/process/browser.js"),o=r("../../../node_modules/console-browserify/index.js");
function i(t){
return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}
:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t
}
,i(t)
}
var s,a,u=r("../../../node_modules/assert/build/internal/errors.js").codes,c=u.ERR_AMBIGUOUS_ARGUMENT,l=u.ERR_INVALID_ARG_TYPE,f=u.ERR_INVALID_ARG_VALUE,h=u.ERR_INVALID_RETURN_VALUE,d=u.ERR_MISSING_ARGS,p=r("../../../node_modules/assert/build/internal/assert/assertion_error.js"),y=r("../../../node_modules/util/util.js").inspect,g=r("../../../node_modules/util/util.js").types,m=g.isPromise,b=g.isRegExp,w=Object.assign?Object.assign:r("../../../node_modules/es6-object-assign/index.js").assign,v=Object.is?Object.is:r("../../../node_modules/object-is/index.js");
function x(){
var t=r("../../../node_modules/assert/build/internal/util/comparisons.js");
s=t.isDeepEqual,a=t.isDeepStrictEqual
}
new Map;
var k=!1,S=t.exports=I,M={

}
;
function E(t){
if(t.message instanceof Error)throw t.message;
throw new p(t)
}
function A(t,e,r,n){
if(!r){
var o=!1;
if(0===e)o=!0,n="No value argument passed to `assert.ok()`";
else if(n instanceof Error)throw n;
var i=new p({
actual:r,expected:!0,message:n,operator:"==",stackStartFn:t
}
);
throw i.generatedMessage=o,i
}

}
function I(){
for(var t=arguments.length,e=new Array(t),r=0;
r<t;
r++)e[r]=arguments[r];
A.apply(void 0,[I,e.length].concat(e))
}
S.fail=function t(e,r,i,s,a){
var u,c=arguments.length;
if(0===c?u="Failed":1===c?(i=e,e=void 0):(!1===k&&(k=!0,(n.emitWarning?n.emitWarning:o.warn.bind(o))("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.","DeprecationWarning","DEP0094")),2===c&&(s="!=")),i instanceof Error)throw i;
var l={
actual:e,expected:r,operator:void 0===s?"fail":s,stackStartFn:a||t
}
;
void 0!==i&&(l.message=i);
var f=new p(l);
throw u&&(f.message=u,f.generatedMessage=!0),f
}
,S.AssertionError=p,S.ok=I,S.equal=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
e!=r&&E({
actual:e,expected:r,message:n,operator:"==",stackStartFn:t
}
)
}
,S.notEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
e==r&&E({
actual:e,expected:r,message:n,operator:"!=",stackStartFn:t
}
)
}
,S.deepEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),s(e,r)||E({
actual:e,expected:r,message:n,operator:"deepEqual",stackStartFn:t
}
)
}
,S.notDeepEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),s(e,r)&&E({
actual:e,expected:r,message:n,operator:"notDeepEqual",stackStartFn:t
}
)
}
,S.deepStrictEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),a(e,r)||E({
actual:e,expected:r,message:n,operator:"deepStrictEqual",stackStartFn:t
}
)
}
,S.notDeepStrictEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),a(e,r)&&E({
actual:e,expected:r,message:n,operator:"notDeepStrictEqual",stackStartFn:t
}
)
}
,S.strictEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
v(e,r)||E({
actual:e,expected:r,message:n,operator:"strictEqual",stackStartFn:t
}
)
}
,S.notStrictEqual=function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
v(e,r)&&E({
actual:e,expected:r,message:n,operator:"notStrictEqual",stackStartFn:t
}
)
}
;
var j=function t(e,r,n){
var o=this;
!function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}
(this,t),r.forEach((function(t){
t in e&&(void 0!==n&&"string"==typeof n[t]&&b(e[t])&&e[t].test(n[t])?o[t]=n[t]:o[t]=e[t])
}
))
}
;
function _(t,e,r,n){
if("function"!=typeof e){
if(b(e))return e.test(t);
if(2===arguments.length)throw new l("expected",["Function","RegExp"],e);
if("object"!==i(t)||null===t){
var o=new p({
actual:t,expected:e,message:r,operator:"deepStrictEqual",stackStartFn:n
}
);
throw o.operator=n.name,o
}
var u=Object.keys(e);
if(e instanceof Error)u.push("name","message");
else if(0===u.length)throw new f("error",e,"may not be an empty object");
return void 0===s&&x(),u.forEach((function(o){
"string"==typeof t[o]&&b(e[o])&&e[o].test(t[o])||function(t,e,r,n,o,i){
if(!(r in t)||!a(t[r],e[r])){
if(!n){
var s=new j(t,o),u=new j(e,o,t),c=new p({
actual:s,expected:u,operator:"deepStrictEqual",stackStartFn:i
}
);
throw c.actual=t,c.expected=e,c.operator=i.name,c
}
E({
actual:t,expected:e,message:n,operator:i.name,stackStartFn:i
}
)
}

}
(t,e,o,r,u,n)
}
)),!0
}
return void 0!==e.prototype&&t instanceof e||!Error.isPrototypeOf(e)&&!0===e.call({

}
,t)
}
function B(t){
if("function"!=typeof t)throw new l("fn","Function",t);
try{
t()
}
catch(t){
return t
}
return M
}
function O(t){
return m(t)||null!==t&&"object"===i(t)&&"function"==typeof t.then&&"function"==typeof t.catch
}
function T(t){
return Promise.resolve().then((function(){
var e;
if("function"==typeof t){
if(!O(e=t()))throw new h("instance of Promise","promiseFn",e)
}
else{
if(!O(t))throw new l("promiseFn",["Function","Promise"],t);
e=t
}
return Promise.resolve().then((function(){
return e
}
)).then((function(){
return M
}
)).catch((function(t){
return t
}
))
}
))
}
function L(t,e,r,n){
if("string"==typeof r){
if(4===arguments.length)throw new l("error",["Object","Error","Function","RegExp"],r);
if("object"===i(e)&&null!==e){
if(e.message===r)throw new c("error/message",'The error message "'.concat(e.message,'" is identical to the message.'))
}
else if(e===r)throw new c("error/message",'The error "'.concat(e,'" is identical to the message.'));
n=r,r=void 0
}
else if(null!=r&&"object"!==i(r)&&"function"!=typeof r)throw new l("error",["Object","Error","Function","RegExp"],r);
if(e===M){
var o="";
r&&r.name&&(o+=" (".concat(r.name,")")),o+=n?": ".concat(n):".";
var s="rejects"===t.name?"rejection":"exception";
E({
actual:void 0,expected:r,operator:t.name,message:"Missing expected ".concat(s).concat(o),stackStartFn:t
}
)
}
if(r&&!_(e,r,n,t))throw e
}
function P(t,e,r,n){
if(e!==M){
if("string"==typeof r&&(n=r,r=void 0),!r||_(e,r)){
var o=n?": ".concat(n):".",i="doesNotReject"===t.name?"rejection":"exception";
E({
actual:e,expected:r,operator:t.name,message:"Got unwanted ".concat(i).concat(o,"\n")+'Actual message: "'.concat(e&&e.message,'"'),stackStartFn:t
}
)
}
throw e
}

}
function N(){
for(var t=arguments.length,e=new Array(t),r=0;
r<t;
r++)e[r]=arguments[r];
A.apply(void 0,[N,e.length].concat(e))
}
S.throws=function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
L.apply(void 0,[t,B(e)].concat(n))
}
,S.rejects=function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
return T(e).then((function(e){
return L.apply(void 0,[t,e].concat(n))
}
))
}
,S.doesNotThrow=function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
P.apply(void 0,[t,B(e)].concat(n))
}
,S.doesNotReject=function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
return T(e).then((function(e){
return P.apply(void 0,[t,e].concat(n))
}
))
}
,S.ifError=function t(e){
if(null!=e){
var r="ifError got unwanted exception: ";
"object"===i(e)&&"string"==typeof e.message?0===e.message.length&&e.constructor?r+=e.constructor.name:r+=e.message:r+=y(e);
var n=new p({
actual:e,expected:null,operator:"ifError",message:r,stackStartFn:t
}
),o=e.stack;
if("string"==typeof o){
var s=o.split("\n");
s.shift();
for(var a=n.stack.split("\n"),u=0;
u<s.length;
u++){
var c=a.indexOf(s[u]);
if(-1!==c){
a=a.slice(0,c);
break
}

}
n.stack="".concat(a.join("\n"),"\n").concat(s.join("\n"))
}
throw n
}

}
,S.strict=w(N,S,{
equal:S.strictEqual,deepEqual:S.deepStrictEqual,notEqual:S.notStrictEqual,notDeepEqual:S.notDeepStrictEqual
}
),S.strict.strict=S.strict
}
,"../../../node_modules/assert/build/internal/assert/assertion_error.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/process/browser.js");
function o(t,e,r){
return e in t?Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
}
):t[e]=r,t
}
function i(t,e){
for(var r=0;
r<e.length;
r++){
var n=e[r];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)
}

}
function s(t,e){
return!e||"object"!==h(e)&&"function"!=typeof e?a(t):e
}
function a(t){
if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t
}
function u(t){
var e="function"==typeof Map?new Map:void 0;
return u=function(t){
if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;
var r;
if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");
if(void 0!==e){
if(e.has(t))return e.get(t);
e.set(t,n)
}
function n(){
return c(t,arguments,f(this).constructor)
}
return n.prototype=Object.create(t.prototype,{
constructor:{
value:n,enumerable:!1,writable:!0,configurable:!0
}

}
),l(n,t)
}
,u(t)
}
function c(t,e,r){
return c=function(){
if("undefined"==typeof Reflect||!Reflect.construct)return!1;
if(Reflect.construct.sham)return!1;
if("function"==typeof Proxy)return!0;
try{
return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){

}
))),!0
}
catch(t){
return!1
}

}
()?Reflect.construct:function(t,e,r){
var n=[null];
n.push.apply(n,e);
var o=new(Function.bind.apply(t,n));
return r&&l(o,r.prototype),o
}
,c.apply(null,arguments)
}
function l(t,e){
return l=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t
}
,l(t,e)
}
function f(t){
return f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t)
}
,f(t)
}
function h(t){
return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}
:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t
}
,h(t)
}
var d=r("../../../node_modules/util/util.js").inspect,p=r("../../../node_modules/assert/build/internal/errors.js").codes.ERR_INVALID_ARG_TYPE;
function y(t,e,r){
return(void 0===r||r>t.length)&&(r=t.length),t.substring(r-e.length,r)===e
}
var g="",m="",b="",w="",v={
deepStrictEqual:"Expected values to be strictly deep-equal:",strictEqual:"Expected values to be strictly equal:",strictEqualObject:'Expected "actual" to be reference-equal to "expected":',deepEqual:"Expected values to be loosely deep-equal:",equal:"Expected values to be loosely equal:",notDeepStrictEqual:'Expected "actual" not to be strictly deep-equal to:',notStrictEqual:'Expected "actual" to be strictly unequal to:',notStrictEqualObject:'Expected "actual" not to be reference-equal to "expected":',notDeepEqual:'Expected "actual" not to be loosely deep-equal to:',notEqual:'Expected "actual" to be loosely unequal to:',notIdentical:"Values identical but not reference-equal:"
}
;
function x(t){
var e=Object.keys(t),r=Object.create(Object.getPrototypeOf(t));
return e.forEach((function(e){
r[e]=t[e]
}
)),Object.defineProperty(r,"message",{
value:t.message
}
),r
}
function k(t){
return d(t,{
compact:!1,customInspect:!1,depth:1e3,maxArrayLength:1/0,showHidden:!1,breakLength:1/0,showProxy:!1,sorted:!0,getters:!0
}
)
}
var S=function(t){
function e(t){
var r;
if(function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}
(this,e),"object"!==h(t)||null===t)throw new p("options","Object",t);
var o=t.message,i=t.operator,u=t.stackStartFn,c=t.actual,l=t.expected,d=Error.stackTraceLimit;
if(Error.stackTraceLimit=0,null!=o)r=s(this,f(e).call(this,String(o)));
else if(n.stderr&&n.stderr.isTTY&&(n.stderr&&n.stderr.getColorDepth&&1!==n.stderr.getColorDepth()?(g="[34m",m="[32m",w="[39m",b="[31m"):(g="",m="",w="",b="")),"object"===h(c)&&null!==c&&"object"===h(l)&&null!==l&&"stack"in c&&c instanceof Error&&"stack"in l&&l instanceof Error&&(c=x(c),l=x(l)),"deepStrictEqual"===i||"strictEqual"===i)r=s(this,f(e).call(this,function(t,e,r){
var o="",i="",s=0,a="",u=!1,c=k(t),l=c.split("\n"),f=k(e).split("\n"),d=0,p="";
if("strictEqual"===r&&"object"===h(t)&&"object"===h(e)&&null!==t&&null!==e&&(r="strictEqualObject"),1===l.length&&1===f.length&&l[0]!==f[0]){
var x=l[0].length+f[0].length;
if(x<=10){
if(!("object"===h(t)&&null!==t||"object"===h(e)&&null!==e||0===t&&0===e))return"".concat(v[r],"\n\n")+"".concat(l[0]," !== ").concat(f[0],"\n")
}
else if("strictEqualObject"!==r&&x<(n.stderr&&n.stderr.isTTY?n.stderr.columns:80)){
for(;
l[0][d]===f[0][d];
)d++;
d>2&&(p="\n  ".concat(function(t,e){
if(e=Math.floor(e),0==t.length||0==e)return"";
var r=t.length*e;
for(e=Math.floor(Math.log(e)/Math.log(2));
e;
)t+=t,e--;
return t+t.substring(0,r-t.length)
}
(" ",d),"^"),d=0)
}

}
for(var S=l[l.length-1],M=f[f.length-1];
S===M&&(d++<2?a="\n  ".concat(S).concat(a):o=S,l.pop(),f.pop(),0!==l.length&&0!==f.length);
)S=l[l.length-1],M=f[f.length-1];
var E=Math.max(l.length,f.length);
if(0===E){
var A=c.split("\n");
if(A.length>30)for(A[26]="".concat(g,"...").concat(w);
A.length>27;
)A.pop();
return"".concat(v.notIdentical,"\n\n").concat(A.join("\n"),"\n")
}
d>3&&(a="\n".concat(g,"...").concat(w).concat(a),u=!0),""!==o&&(a="\n  ".concat(o).concat(a),o="");
var I=0,j=v[r]+"\n".concat(m,"+ actual").concat(w," ").concat(b,"- expected").concat(w),_=" ".concat(g,"...").concat(w," Lines skipped");
for(d=0;
d<E;
d++){
var B=d-s;
if(l.length<d+1)B>1&&d>2&&(B>4?(i+="\n".concat(g,"...").concat(w),u=!0):B>3&&(i+="\n  ".concat(f[d-2]),I++),i+="\n  ".concat(f[d-1]),I++),s=d,o+="\n".concat(b,"-").concat(w," ").concat(f[d]),I++;
else if(f.length<d+1)B>1&&d>2&&(B>4?(i+="\n".concat(g,"...").concat(w),u=!0):B>3&&(i+="\n  ".concat(l[d-2]),I++),i+="\n  ".concat(l[d-1]),I++),s=d,i+="\n".concat(m,"+").concat(w," ").concat(l[d]),I++;
else{
var O=f[d],T=l[d],L=T!==O&&(!y(T,",")||T.slice(0,-1)!==O);
L&&y(O,",")&&O.slice(0,-1)===T&&(L=!1,T+=","),L?(B>1&&d>2&&(B>4?(i+="\n".concat(g,"...").concat(w),u=!0):B>3&&(i+="\n  ".concat(l[d-2]),I++),i+="\n  ".concat(l[d-1]),I++),s=d,i+="\n".concat(m,"+").concat(w," ").concat(T),o+="\n".concat(b,"-").concat(w," ").concat(O),I+=2):(i+=o,o="",1!==B&&0!==d||(i+="\n  ".concat(T),I++))
}
if(I>20&&d<E-2)return"".concat(j).concat(_,"\n").concat(i,"\n").concat(g,"...").concat(w).concat(o,"\n")+"".concat(g,"...").concat(w)
}
return"".concat(j).concat(u?_:"","\n").concat(i).concat(o).concat(a).concat(p)
}
(c,l,i)));
else if("notDeepStrictEqual"===i||"notStrictEqual"===i){
var S=v[i],M=k(c).split("\n");
if("notStrictEqual"===i&&"object"===h(c)&&null!==c&&(S=v.notStrictEqualObject),M.length>30)for(M[26]="".concat(g,"...").concat(w);
M.length>27;
)M.pop();
r=1===M.length?s(this,f(e).call(this,"".concat(S," ").concat(M[0]))):s(this,f(e).call(this,"".concat(S,"\n\n").concat(M.join("\n"),"\n")))
}
else{
var E=k(c),A="",I=v[i];
"notDeepEqual"===i||"notEqual"===i?(E="".concat(v[i],"\n\n").concat(E)).length>1024&&(E="".concat(E.slice(0,1021),"...")):(A="".concat(k(l)),E.length>512&&(E="".concat(E.slice(0,509),"...")),A.length>512&&(A="".concat(A.slice(0,509),"...")),"deepEqual"===i||"equal"===i?E="".concat(I,"\n\n").concat(E,"\n\nshould equal\n\n"):A=" ".concat(i," ").concat(A)),r=s(this,f(e).call(this,"".concat(E).concat(A)))
}
return Error.stackTraceLimit=d,r.generatedMessage=!o,Object.defineProperty(a(r),"name",{
value:"AssertionError [ERR_ASSERTION]",enumerable:!1,writable:!0,configurable:!0
}
),r.code="ERR_ASSERTION",r.actual=c,r.expected=l,r.operator=i,Error.captureStackTrace&&Error.captureStackTrace(a(r),u),r.stack,r.name="AssertionError",s(r)
}
var r,u;
return function(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{
constructor:{
value:t,writable:!0,configurable:!0
}

}
),e&&l(t,e)
}
(e,t),r=e,u=[{
key:"toString",value:function(){
return"".concat(this.name," [").concat(this.code,"]: ").concat(this.message)
}

}
,{
key:d.custom,value:function(t,e){
return d(this,function(t){
for(var e=1;
e<arguments.length;
e++){
var r=null!=arguments[e]?arguments[e]:{

}
,n=Object.keys(r);
"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){
return Object.getOwnPropertyDescriptor(r,t).enumerable
}
)))),n.forEach((function(e){
o(t,e,r[e])
}
))
}
return t
}
({

}
,e,{
customInspect:!1,depth:0
}
))
}

}
],u&&i(r.prototype,u),e
}
(u(Error));
t.exports=S
}
,"../../../node_modules/assert/build/internal/errors.js":(t,e,r)=>{
"use strict";
function n(t){
return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}
:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t
}
,n(t)
}
function o(t){
return o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t)
}
,o(t)
}
function i(t,e){
return i=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t
}
,i(t,e)
}
var s,a,u={

}
;
function c(t,e,r){
r||(r=Error);
var s=function(r){
function s(r,i,a){
var u,c,l;
return function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}
(this,s),c=this,l=o(s).call(this,function(t,r,n){
return"string"==typeof e?e:e(t,r,n)
}
(r,i,a)),u=!l||"object"!==n(l)&&"function"!=typeof l?function(t){
if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t
}
(c):l,u.code=t,u
}
return function(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{
constructor:{
value:t,writable:!0,configurable:!0
}

}
),e&&i(t,e)
}
(s,r),s
}
(r);
u[t]=s
}
function l(t,e){
if(Array.isArray(t)){
var r=t.length;
return t=t.map((function(t){
return String(t)
}
)),r>2?"one of ".concat(e," ").concat(t.slice(0,r-1).join(", "),", or ")+t[r-1]:2===r?"one of ".concat(e," ").concat(t[0]," or ").concat(t[1]):"of ".concat(e," ").concat(t[0])
}
return"of ".concat(e," ").concat(String(t))
}
c("ERR_AMBIGUOUS_ARGUMENT",'The "%s" argument is ambiguous. %s',TypeError),c("ERR_INVALID_ARG_TYPE",(function(t,e,o){
var i,a,u,c,f;
if(void 0===s&&(s=r("../../../node_modules/assert/build/assert.js")),s("string"==typeof t,"'name' must be a string"),"string"==typeof e&&(a="not ",e.substr(0,4)===a)?(i="must not be",e=e.replace(/^not /,"")):i="must be",function(t,e,r){
return(void 0===r||r>t.length)&&(r=t.length),t.substring(r-9,r)===e
}
(t," argument"))u="The ".concat(t," ").concat(i," ").concat(l(e,"type"));
else{
var h=("number"!=typeof f&&(f=0),f+1>(c=t).length||-1===c.indexOf(".",f)?"argument":"property");
u='The "'.concat(t,'" ').concat(h," ").concat(i," ").concat(l(e,"type"))
}
return u+". Received type ".concat(n(o))
}
),TypeError),c("ERR_INVALID_ARG_VALUE",(function(t,e){
var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"is invalid";
void 0===a&&(a=r("../../../node_modules/util/util.js"));
var o=a.inspect(e);
return o.length>128&&(o="".concat(o.slice(0,128),"...")),"The argument '".concat(t,"' ").concat(n,". Received ").concat(o)
}
),TypeError,RangeError),c("ERR_INVALID_RETURN_VALUE",(function(t,e,r){
var o;
return o=r&&r.constructor&&r.constructor.name?"instance of ".concat(r.constructor.name):"type ".concat(n(r)),"Expected ".concat(t,' to be returned from the "').concat(e,'"')+" function but got ".concat(o,".")
}
),TypeError),c("ERR_MISSING_ARGS",(function(){
for(var t=arguments.length,e=new Array(t),n=0;
n<t;
n++)e[n]=arguments[n];
void 0===s&&(s=r("../../../node_modules/assert/build/assert.js")),s(e.length>0,"At least one arg needs to be specified");
var o="The ",i=e.length;
switch(e=e.map((function(t){
return'"'.concat(t,'"')
}
)),i){
case 1:o+="".concat(e[0]," argument");
break;
case 2:o+="".concat(e[0]," and ").concat(e[1]," arguments");
break;
default:o+=e.slice(0,i-1).join(", "),o+=", and ".concat(e[i-1]," arguments")
}
return"".concat(o," must be specified")
}
),TypeError),t.exports.codes=u
}
,"../../../node_modules/assert/build/internal/util/comparisons.js":(t,e,r)=>{
"use strict";
function n(t,e){
return function(t){
if(Array.isArray(t))return t
}
(t)||function(t,e){
var r=[],n=!0,o=!1,i=void 0;
try{
for(var s,a=t[Symbol.iterator]();
!(n=(s=a.next()).done)&&(r.push(s.value),!e||r.length!==e);
n=!0);

}
catch(t){
o=!0,i=t
}
finally{
try{
n||null==a.return||a.return()
}
finally{
if(o)throw i
}

}
return r
}
(t,e)||function(){
throw new TypeError("Invalid attempt to destructure non-iterable instance")
}
()
}
function o(t){
return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}
:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t
}
,o(t)
}
var i=void 0!==/a/g.flags,s=function(t){
var e=[];
return t.forEach((function(t){
return e.push(t)
}
)),e
}
,a=function(t){
var e=[];
return t.forEach((function(t,r){
return e.push([r,t])
}
)),e
}
,u=Object.is?Object.is:r("../../../node_modules/object-is/index.js"),c=Object.getOwnPropertySymbols?Object.getOwnPropertySymbols:function(){
return[]
}
,l=Number.isNaN?Number.isNaN:r("../../../node_modules/is-nan/index.js");
function f(t){
return t.call.bind(t)
}
var h=f(Object.prototype.hasOwnProperty),d=f(Object.prototype.propertyIsEnumerable),p=f(Object.prototype.toString),y=r("../../../node_modules/util/util.js").types,g=y.isAnyArrayBuffer,m=y.isArrayBufferView,b=y.isDate,w=y.isMap,v=y.isRegExp,x=y.isSet,k=y.isNativeError,S=y.isBoxedPrimitive,M=y.isNumberObject,E=y.isStringObject,A=y.isBooleanObject,I=y.isBigIntObject,j=y.isSymbolObject,_=y.isFloat32Array,B=y.isFloat64Array;
function O(t){
if(0===t.length||t.length>10)return!0;
for(var e=0;
e<t.length;
e++){
var r=t.charCodeAt(e);
if(r<48||r>57)return!0
}
return 10===t.length&&t>=Math.pow(2,32)
}
function T(t){
return Object.keys(t).filter(O).concat(c(t).filter(Object.prototype.propertyIsEnumerable.bind(t)))
}
function L(t,e){
if(t===e)return 0;
for(var r=t.length,n=e.length,o=0,i=Math.min(r,n);
o<i;
++o)if(t[o]!==e[o]){
r=t[o],n=e[o];
break
}
return r<n?-1:n<r?1:0
}
var P=0,N=1,z=2,R=3;
function U(t,e,r,n){
if(t===e)return 0!==t||!r||u(t,e);
if(r){
if("object"!==o(t))return"number"==typeof t&&l(t)&&l(e);
if("object"!==o(e)||null===t||null===e)return!1;
if(Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1
}
else{
if(null===t||"object"!==o(t))return(null===e||"object"!==o(e))&&t==e;
if(null===e||"object"!==o(e))return!1
}
var s,a,c,f,h=p(t);
if(h!==p(e))return!1;
if(Array.isArray(t)){
if(t.length!==e.length)return!1;
var d=T(t),y=T(e);
return d.length===y.length&&q(t,e,r,n,N,d)
}
if("[object Object]"===h&&(!w(t)&&w(e)||!x(t)&&x(e)))return!1;
if(b(t)){
if(!b(e)||Date.prototype.getTime.call(t)!==Date.prototype.getTime.call(e))return!1
}
else if(v(t)){
if(!v(e)||(c=t,f=e,!(i?c.source===f.source&&c.flags===f.flags:RegExp.prototype.toString.call(c)===RegExp.prototype.toString.call(f))))return!1
}
else if(k(t)||t instanceof Error){
if(t.message!==e.message||t.name!==e.name)return!1
}
else{
if(m(t)){
if(r||!_(t)&&!B(t)){
if(!function(t,e){
return t.byteLength===e.byteLength&&0===L(new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new Uint8Array(e.buffer,e.byteOffset,e.byteLength))
}
(t,e))return!1
}
else if(!function(t,e){
if(t.byteLength!==e.byteLength)return!1;
for(var r=0;
r<t.byteLength;
r++)if(t[r]!==e[r])return!1;
return!0
}
(t,e))return!1;
var O=T(t),U=T(e);
return O.length===U.length&&q(t,e,r,n,P,O)
}
if(x(t))return!(!x(e)||t.size!==e.size)&&q(t,e,r,n,z);
if(w(t))return!(!w(e)||t.size!==e.size)&&q(t,e,r,n,R);
if(g(t)){
if(a=e,(s=t).byteLength!==a.byteLength||0!==L(new Uint8Array(s),new Uint8Array(a)))return!1
}
else if(S(t)&&!function(t,e){
return M(t)?M(e)&&u(Number.prototype.valueOf.call(t),Number.prototype.valueOf.call(e)):E(t)?E(e)&&String.prototype.valueOf.call(t)===String.prototype.valueOf.call(e):A(t)?A(e)&&Boolean.prototype.valueOf.call(t)===Boolean.prototype.valueOf.call(e):I(t)?I(e)&&BigInt.prototype.valueOf.call(t)===BigInt.prototype.valueOf.call(e):j(e)&&Symbol.prototype.valueOf.call(t)===Symbol.prototype.valueOf.call(e)
}
(t,e))return!1
}
return q(t,e,r,n,P)
}
function D(t,e){
return e.filter((function(e){
return d(t,e)
}
))
}
function q(t,e,r,i,u,l){
if(5===arguments.length){
l=Object.keys(t);
var f=Object.keys(e);
if(l.length!==f.length)return!1
}
for(var p=0;
p<l.length;
p++)if(!h(e,l[p]))return!1;
if(r&&5===arguments.length){
var y=c(t);
if(0!==y.length){
var g=0;
for(p=0;
p<y.length;
p++){
var m=y[p];
if(d(t,m)){
if(!d(e,m))return!1;
l.push(m),g++
}
else if(d(e,m))return!1
}
var b=c(e);
if(y.length!==b.length&&D(e,b).length!==g)return!1
}
else{
var w=c(e);
if(0!==w.length&&0!==D(e,w).length)return!1
}

}
if(0===l.length&&(u===P||u===N&&0===t.length||0===t.size))return!0;
if(void 0===i)i={
val1:new Map,val2:new Map,position:0
}
;
else{
var v=i.val1.get(t);
if(void 0!==v){
var x=i.val2.get(e);
if(void 0!==x)return v===x
}
i.position++
}
i.val1.set(t,i.position),i.val2.set(e,i.position);
var k=function(t,e,r,i,u,c){
var l=0;
if(c===z){
if(!function(t,e,r,n){
for(var i=null,a=s(t),u=0;
u<a.length;
u++){
var c=a[u];
if("object"===o(c)&&null!==c)null===i&&(i=new Set),i.add(c);
else if(!e.has(c)){
if(r)return!1;
if(!F(t,e,c))return!1;
null===i&&(i=new Set),i.add(c)
}

}
if(null!==i){
for(var l=s(e),f=0;
f<l.length;
f++){
var h=l[f];
if("object"===o(h)&&null!==h){
if(!W(i,h,r,n))return!1
}
else if(!r&&!t.has(h)&&!W(i,h,r,n))return!1
}
return 0===i.size
}
return!0
}
(t,e,r,u))return!1
}
else if(c===R){
if(!function(t,e,r,i){
for(var s=null,u=a(t),c=0;
c<u.length;
c++){
var l=n(u[c],2),f=l[0],h=l[1];
if("object"===o(f)&&null!==f)null===s&&(s=new Set),s.add(f);
else{
var d=e.get(f);
if(void 0===d&&!e.has(f)||!U(h,d,r,i)){
if(r)return!1;
if(!K(t,e,f,h,i))return!1;
null===s&&(s=new Set),s.add(f)
}

}

}
if(null!==s){
for(var p=a(e),y=0;
y<p.length;
y++){
var g=n(p[y],2),m=(f=g[0],g[1]);
if("object"===o(f)&&null!==f){
if(!$(s,t,f,m,r,i))return!1
}
else if(!(r||t.has(f)&&U(t.get(f),m,!1,i)||$(s,t,f,m,!1,i)))return!1
}
return 0===s.size
}
return!0
}
(t,e,r,u))return!1
}
else if(c===N)for(;
l<t.length;
l++){
if(!h(t,l)){
if(h(e,l))return!1;
for(var f=Object.keys(t);
l<f.length;
l++){
var d=f[l];
if(!h(e,d)||!U(t[d],e[d],r,u))return!1
}
return f.length===Object.keys(e).length
}
if(!h(e,l)||!U(t[l],e[l],r,u))return!1
}
for(l=0;
l<i.length;
l++){
var p=i[l];
if(!U(t[p],e[p],r,u))return!1
}
return!0
}
(t,e,r,l,i,u);
return i.val1.delete(t),i.val2.delete(e),k
}
function W(t,e,r,n){
for(var o=s(t),i=0;
i<o.length;
i++){
var a=o[i];
if(U(e,a,r,n))return t.delete(a),!0
}
return!1
}
function C(t){
switch(o(t)){
case"undefined":return null;
case"object":return;
case"symbol":return!1;
case"string":t=+t;
case"number":if(l(t))return!1
}
return!0
}
function F(t,e,r){
var n=C(r);
return null!=n?n:e.has(n)&&!t.has(n)
}
function K(t,e,r,n,o){
var i=C(r);
if(null!=i)return i;
var s=e.get(i);
return!(void 0===s&&!e.has(i)||!U(n,s,!1,o))&&!t.has(i)&&U(n,s,!1,o)
}
function $(t,e,r,n,o,i){
for(var a=s(t),u=0;
u<a.length;
u++){
var c=a[u];
if(U(r,c,o,i)&&U(n,e.get(c),o,i))return t.delete(c),!0
}
return!1
}
t.exports={
isDeepEqual:function(t,e){
return U(t,e,!1)
}
,isDeepStrictEqual:function(t,e){
return U(t,e,!0)
}

}

}
,"../../../node_modules/base-x/src/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/safe-buffer/index.js").Buffer;
t.exports=function(t){
if(t.length>=255)throw new TypeError("Alphabet too long");
for(var e=new Uint8Array(256),r=0;
r<e.length;
r++)e[r]=255;
for(var o=0;
o<t.length;
o++){
var i=t.charAt(o),s=i.charCodeAt(0);
if(255!==e[s])throw new TypeError(i+" is ambiguous");
e[s]=o
}
var a=t.length,u=t.charAt(0),c=Math.log(a)/Math.log(256),l=Math.log(256)/Math.log(a);
function f(t){
if("string"!=typeof t)throw new TypeError("Expected String");
if(0===t.length)return n.alloc(0);
for(var r=0,o=0,i=0;
t[r]===u;
)o++,r++;
for(var s=(t.length-r)*c+1>>>0,l=new Uint8Array(s);
t[r];
){
var f=e[t.charCodeAt(r)];
if(255===f)return;
for(var h=0,d=s-1;
(0!==f||h<i)&&-1!==d;
d--,h++)f+=a*l[d]>>>0,l[d]=f%256>>>0,f=f/256>>>0;
if(0!==f)throw new Error("Non-zero carry");
i=h,r++
}
for(var p=s-i;
p!==s&&0===l[p];
)p++;
var y=n.allocUnsafe(o+(s-p));
y.fill(0,0,o);
for(var g=o;
p!==s;
)y[g++]=l[p++];
return y
}
return{
encode:function(e){
if((Array.isArray(e)||e instanceof Uint8Array)&&(e=n.from(e)),!n.isBuffer(e))throw new TypeError("Expected Buffer");
if(0===e.length)return"";
for(var r=0,o=0,i=0,s=e.length;
i!==s&&0===e[i];
)i++,r++;
for(var c=(s-i)*l+1>>>0,f=new Uint8Array(c);
i!==s;
){
for(var h=e[i],d=0,p=c-1;
(0!==h||d<o)&&-1!==p;
p--,d++)h+=256*f[p]>>>0,f[p]=h%a>>>0,h=h/a>>>0;
if(0!==h)throw new Error("Non-zero carry");
o=d,i++
}
for(var y=c-o;
y!==c&&0===f[y];
)y++;
for(var g=u.repeat(r);
y<c;
++y)g+=t.charAt(f[y]);
return g
}
,decodeUnsafe:f,decode:function(t){
var e=f(t);
if(e)return e;
throw new Error("Non-base"+a+" character")
}

}

}

}
,"../../../node_modules/base64-js/index.js":(t,e)=>{
"use strict";
e.byteLength=function(t){
var e=a(t),r=e[0],n=e[1];
return 3*(r+n)/4-n
}
,e.toByteArray=function(t){
var e,r,i=a(t),s=i[0],u=i[1],c=new o(function(t,e,r){
return 3*(e+r)/4-r
}
(0,s,u)),l=0,f=u>0?s-4:s;
for(r=0;
r<f;
r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],c[l++]=e>>16&255,c[l++]=e>>8&255,c[l++]=255&e;
return 2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,c[l++]=255&e),1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,c[l++]=e>>8&255,c[l++]=255&e),c
}
,e.fromByteArray=function(t){
for(var e,n=t.length,o=n%3,i=[],s=16383,a=0,c=n-o;
a<c;
a+=s)i.push(u(t,a,a+s>c?c:a+s));
return 1===o?(e=t[n-1],i.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],i.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),i.join("")
}
;
for(var r=[],n=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0;
s<64;
++s)r[s]=i[s],n[i.charCodeAt(s)]=s;
function a(t){
var e=t.length;
if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");
var r=t.indexOf("=");
return-1===r&&(r=e),[r,r===e?0:4-r%4]
}
function u(t,e,n){
for(var o,i,s=[],a=e;
a<n;
a+=3)o=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),s.push(r[(i=o)>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);
return s.join("")
}
n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63
}
,"../../../node_modules/bigint-buffer/dist/browser.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/buffer/index.js").Buffer;
e.oU=function(t){
{
const e=n.from(t);
e.reverse();
const r=e.toString("hex");
return 0===r.length?BigInt(0):BigInt(`0x${
r
}
`)
}

}
,e.k$=function(t,e){
{
const r=t.toString(16),o=n.from(r.padStart(2*e,"0").slice(0,2*e),"hex");
return o.reverse(),o
}

}

}
,"../../../node_modules/bn.js/lib/bn.js":function(t,e,r){
!function(t,e){
"use strict";
function n(t,e){
if(!t)throw new Error(e||"Assertion failed")
}
function o(t,e){
t.super_=e;
var r=function(){

}
;
r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t
}
function i(t,e,r){
if(i.isBN(t))return t;
this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==e&&"be"!==e||(r=e,e=10),this._init(t||0,e||10,r||"be"))
}
var s;
"object"==typeof t?t.exports=i:e.BN=i,i.BN=i,i.wordSize=26;
try{
s="undefined"!=typeof window&&void 0!==window.Buffer?window.Buffer:r("?6876").Buffer
}
catch(t){

}
function a(t,e){
var r=t.charCodeAt(e);
return r>=48&&r<=57?r-48:r>=65&&r<=70?r-55:r>=97&&r<=102?r-87:void n(!1,"Invalid character in "+t)
}
function u(t,e,r){
var n=a(t,r);
return r-1>=e&&(n|=a(t,r-1)<<4),n
}
function c(t,e,r,o){
for(var i=0,s=0,a=Math.min(t.length,r),u=e;
u<a;
u++){
var c=t.charCodeAt(u)-48;
i*=o,s=c>=49?c-49+10:c>=17?c-17+10:c,n(c>=0&&s<o,"Invalid character"),i+=s
}
return i
}
function l(t,e){
t.words=e.words,t.length=e.length,t.negative=e.negative,t.red=e.red
}
if(i.isBN=function(t){
return t instanceof i||null!==t&&"object"==typeof t&&t.constructor.wordSize===i.wordSize&&Array.isArray(t.words)
}
,i.max=function(t,e){
return t.cmp(e)>0?t:e
}
,i.min=function(t,e){
return t.cmp(e)<0?t:e
}
,i.prototype._init=function(t,e,r){
if("number"==typeof t)return this._initNumber(t,e,r);
if("object"==typeof t)return this._initArray(t,e,r);
"hex"===e&&(e=16),n(e===(0|e)&&e>=2&&e<=36);
var o=0;
"-"===(t=t.toString().replace(/\s+/g,""))[0]&&(o++,this.negative=1),o<t.length&&(16===e?this._parseHex(t,o,r):(this._parseBase(t,e,o),"le"===r&&this._initArray(this.toArray(),e,r)))
}
,i.prototype._initNumber=function(t,e,r){
t<0&&(this.negative=1,t=-t),t<67108864?(this.words=[67108863&t],this.length=1):t<4503599627370496?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(n(t<9007199254740992),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===r&&this._initArray(this.toArray(),e,r)
}
,i.prototype._initArray=function(t,e,r){
if(n("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;
this.length=Math.ceil(t.length/3),this.words=new Array(this.length);
for(var o=0;
o<this.length;
o++)this.words[o]=0;
var i,s,a=0;
if("be"===r)for(o=t.length-1,i=0;
o>=0;
o-=3)s=t[o]|t[o-1]<<8|t[o-2]<<16,this.words[i]|=s<<a&67108863,this.words[i+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,i++);
else if("le"===r)for(o=0,i=0;
o<t.length;
o+=3)s=t[o]|t[o+1]<<8|t[o+2]<<16,this.words[i]|=s<<a&67108863,this.words[i+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,i++);
return this._strip()
}
,i.prototype._parseHex=function(t,e,r){
this.length=Math.ceil((t.length-e)/6),this.words=new Array(this.length);
for(var n=0;
n<this.length;
n++)this.words[n]=0;
var o,i=0,s=0;
if("be"===r)for(n=t.length-1;
n>=e;
n-=2)o=u(t,e,n)<<i,this.words[s]|=67108863&o,i>=18?(i-=18,s+=1,this.words[s]|=o>>>26):i+=8;
else for(n=(t.length-e)%2==0?e+1:e;
n<t.length;
n+=2)o=u(t,e,n)<<i,this.words[s]|=67108863&o,i>=18?(i-=18,s+=1,this.words[s]|=o>>>26):i+=8;
this._strip()
}
,i.prototype._parseBase=function(t,e,r){
this.words=[0],this.length=1;
for(var n=0,o=1;
o<=67108863;
o*=e)n++;
n--,o=o/e|0;
for(var i=t.length-r,s=i%n,a=Math.min(i,i-s)+r,u=0,l=r;
l<a;
l+=n)u=c(t,l,l+n,e),this.imuln(o),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u);
if(0!==s){
var f=1;
for(u=c(t,l,t.length,e),l=0;
l<s;
l++)f*=e;
this.imuln(f),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u)
}
this._strip()
}
,i.prototype.copy=function(t){
t.words=new Array(this.length);
for(var e=0;
e<this.length;
e++)t.words[e]=this.words[e];
t.length=this.length,t.negative=this.negative,t.red=this.red
}
,i.prototype._move=function(t){
l(t,this)
}
,i.prototype.clone=function(){
var t=new i(null);
return this.copy(t),t
}
,i.prototype._expand=function(t){
for(;
this.length<t;
)this.words[this.length++]=0;
return this
}
,i.prototype._strip=function(){
for(;
this.length>1&&0===this.words[this.length-1];
)this.length--;
return this._normSign()
}
,i.prototype._normSign=function(){
return 1===this.length&&0===this.words[0]&&(this.negative=0),this
}
,"undefined"!=typeof Symbol&&"function"==typeof Symbol.for)try{
i.prototype[Symbol.for("nodejs.util.inspect.custom")]=f
}
catch(t){
i.prototype.inspect=f
}
else i.prototype.inspect=f;
function f(){
return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"
}
var h=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],d=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],p=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];
function y(t,e,r){
r.negative=e.negative^t.negative;
var n=t.length+e.length|0;
r.length=n,n=n-1|0;
var o=0|t.words[0],i=0|e.words[0],s=o*i,a=67108863&s,u=s/67108864|0;
r.words[0]=a;
for(var c=1;
c<n;
c++){
for(var l=u>>>26,f=67108863&u,h=Math.min(c,e.length-1),d=Math.max(0,c-t.length+1);
d<=h;
d++){
var p=c-d|0;
l+=(s=(o=0|t.words[p])*(i=0|e.words[d])+f)/67108864|0,f=67108863&s
}
r.words[c]=0|f,u=0|l
}
return 0!==u?r.words[c]=0|u:r.length--,r._strip()
}
i.prototype.toString=function(t,e){
var r;
if(e=0|e||1,16===(t=t||10)||"hex"===t){
r="";
for(var o=0,i=0,s=0;
s<this.length;
s++){
var a=this.words[s],u=(16777215&(a<<o|i)).toString(16);
i=a>>>24-o&16777215,(o+=2)>=26&&(o-=26,s--),r=0!==i||s!==this.length-1?h[6-u.length]+u+r:u+r
}
for(0!==i&&(r=i.toString(16)+r);
r.length%e!=0;
)r="0"+r;
return 0!==this.negative&&(r="-"+r),r
}
if(t===(0|t)&&t>=2&&t<=36){
var c=d[t],l=p[t];
r="";
var f=this.clone();
for(f.negative=0;
!f.isZero();
){
var y=f.modrn(l).toString(t);
r=(f=f.idivn(l)).isZero()?y+r:h[c-y.length]+y+r
}
for(this.isZero()&&(r="0"+r);
r.length%e!=0;
)r="0"+r;
return 0!==this.negative&&(r="-"+r),r
}
n(!1,"Base should be between 2 and 36")
}
,i.prototype.toNumber=function(){
var t=this.words[0];
return 2===this.length?t+=67108864*this.words[1]:3===this.length&&1===this.words[2]?t+=4503599627370496+67108864*this.words[1]:this.length>2&&n(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t
}
,i.prototype.toJSON=function(){
return this.toString(16,2)
}
,s&&(i.prototype.toBuffer=function(t,e){
return this.toArrayLike(s,t,e)
}
),i.prototype.toArray=function(t,e){
return this.toArrayLike(Array,t,e)
}
,i.prototype.toArrayLike=function(t,e,r){
this._strip();
var o=this.byteLength(),i=r||Math.max(1,o);
n(o<=i,"byte array longer than desired length"),n(i>0,"Requested array length <= 0");
var s=function(t,e){
return t.allocUnsafe?t.allocUnsafe(e):new t(e)
}
(t,i);
return this["_toArrayLike"+("le"===e?"LE":"BE")](s,o),s
}
,i.prototype._toArrayLikeLE=function(t,e){
for(var r=0,n=0,o=0,i=0;
o<this.length;
o++){
var s=this.words[o]<<i|n;
t[r++]=255&s,r<t.length&&(t[r++]=s>>8&255),r<t.length&&(t[r++]=s>>16&255),6===i?(r<t.length&&(t[r++]=s>>24&255),n=0,i=0):(n=s>>>24,i+=2)
}
if(r<t.length)for(t[r++]=n;
r<t.length;
)t[r++]=0
}
,i.prototype._toArrayLikeBE=function(t,e){
for(var r=t.length-1,n=0,o=0,i=0;
o<this.length;
o++){
var s=this.words[o]<<i|n;
t[r--]=255&s,r>=0&&(t[r--]=s>>8&255),r>=0&&(t[r--]=s>>16&255),6===i?(r>=0&&(t[r--]=s>>24&255),n=0,i=0):(n=s>>>24,i+=2)
}
if(r>=0)for(t[r--]=n;
r>=0;
)t[r--]=0
}
,Math.clz32?i.prototype._countBits=function(t){
return 32-Math.clz32(t)
}
:i.prototype._countBits=function(t){
var e=t,r=0;
return e>=4096&&(r+=13,e>>>=13),e>=64&&(r+=7,e>>>=7),e>=8&&(r+=4,e>>>=4),e>=2&&(r+=2,e>>>=2),r+e
}
,i.prototype._zeroBits=function(t){
if(0===t)return 26;
var e=t,r=0;
return 8191&e||(r+=13,e>>>=13),127&e||(r+=7,e>>>=7),15&e||(r+=4,e>>>=4),3&e||(r+=2,e>>>=2),1&e||r++,r
}
,i.prototype.bitLength=function(){
var t=this.words[this.length-1],e=this._countBits(t);
return 26*(this.length-1)+e
}
,i.prototype.zeroBits=function(){
if(this.isZero())return 0;
for(var t=0,e=0;
e<this.length;
e++){
var r=this._zeroBits(this.words[e]);
if(t+=r,26!==r)break
}
return t
}
,i.prototype.byteLength=function(){
return Math.ceil(this.bitLength()/8)
}
,i.prototype.toTwos=function(t){
return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()
}
,i.prototype.fromTwos=function(t){
return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()
}
,i.prototype.isNeg=function(){
return 0!==this.negative
}
,i.prototype.neg=function(){
return this.clone().ineg()
}
,i.prototype.ineg=function(){
return this.isZero()||(this.negative^=1),this
}
,i.prototype.iuor=function(t){
for(;
this.length<t.length;
)this.words[this.length++]=0;
for(var e=0;
e<t.length;
e++)this.words[e]=this.words[e]|t.words[e];
return this._strip()
}
,i.prototype.ior=function(t){
return n(!(this.negative|t.negative)),this.iuor(t)
}
,i.prototype.or=function(t){
return this.length>t.length?this.clone().ior(t):t.clone().ior(this)
}
,i.prototype.uor=function(t){
return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)
}
,i.prototype.iuand=function(t){
var e;
e=this.length>t.length?t:this;
for(var r=0;
r<e.length;
r++)this.words[r]=this.words[r]&t.words[r];
return this.length=e.length,this._strip()
}
,i.prototype.iand=function(t){
return n(!(this.negative|t.negative)),this.iuand(t)
}
,i.prototype.and=function(t){
return this.length>t.length?this.clone().iand(t):t.clone().iand(this)
}
,i.prototype.uand=function(t){
return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)
}
,i.prototype.iuxor=function(t){
var e,r;
this.length>t.length?(e=this,r=t):(e=t,r=this);
for(var n=0;
n<r.length;
n++)this.words[n]=e.words[n]^r.words[n];
if(this!==e)for(;
n<e.length;
n++)this.words[n]=e.words[n];
return this.length=e.length,this._strip()
}
,i.prototype.ixor=function(t){
return n(!(this.negative|t.negative)),this.iuxor(t)
}
,i.prototype.xor=function(t){
return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)
}
,i.prototype.uxor=function(t){
return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)
}
,i.prototype.inotn=function(t){
n("number"==typeof t&&t>=0);
var e=0|Math.ceil(t/26),r=t%26;
this._expand(e),r>0&&e--;
for(var o=0;
o<e;
o++)this.words[o]=67108863&~this.words[o];
return r>0&&(this.words[o]=~this.words[o]&67108863>>26-r),this._strip()
}
,i.prototype.notn=function(t){
return this.clone().inotn(t)
}
,i.prototype.setn=function(t,e){
n("number"==typeof t&&t>=0);
var r=t/26|0,o=t%26;
return this._expand(r+1),this.words[r]=e?this.words[r]|1<<o:this.words[r]&~(1<<o),this._strip()
}
,i.prototype.iadd=function(t){
var e,r,n;
if(0!==this.negative&&0===t.negative)return this.negative=0,e=this.isub(t),this.negative^=1,this._normSign();
if(0===this.negative&&0!==t.negative)return t.negative=0,e=this.isub(t),t.negative=1,e._normSign();
this.length>t.length?(r=this,n=t):(r=t,n=this);
for(var o=0,i=0;
i<n.length;
i++)e=(0|r.words[i])+(0|n.words[i])+o,this.words[i]=67108863&e,o=e>>>26;
for(;
0!==o&&i<r.length;
i++)e=(0|r.words[i])+o,this.words[i]=67108863&e,o=e>>>26;
if(this.length=r.length,0!==o)this.words[this.length]=o,this.length++;
else if(r!==this)for(;
i<r.length;
i++)this.words[i]=r.words[i];
return this
}
,i.prototype.add=function(t){
var e;
return 0!==t.negative&&0===this.negative?(t.negative=0,e=this.sub(t),t.negative^=1,e):0===t.negative&&0!==this.negative?(this.negative=0,e=t.sub(this),this.negative=1,e):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)
}
,i.prototype.isub=function(t){
if(0!==t.negative){
t.negative=0;
var e=this.iadd(t);
return t.negative=1,e._normSign()
}
if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();
var r,n,o=this.cmp(t);
if(0===o)return this.negative=0,this.length=1,this.words[0]=0,this;
o>0?(r=this,n=t):(r=t,n=this);
for(var i=0,s=0;
s<n.length;
s++)i=(e=(0|r.words[s])-(0|n.words[s])+i)>>26,this.words[s]=67108863&e;
for(;
0!==i&&s<r.length;
s++)i=(e=(0|r.words[s])+i)>>26,this.words[s]=67108863&e;
if(0===i&&s<r.length&&r!==this)for(;
s<r.length;
s++)this.words[s]=r.words[s];
return this.length=Math.max(this.length,s),r!==this&&(this.negative=1),this._strip()
}
,i.prototype.sub=function(t){
return this.clone().isub(t)
}
;
var g=function(t,e,r){
var n,o,i,s=t.words,a=e.words,u=r.words,c=0,l=0|s[0],f=8191&l,h=l>>>13,d=0|s[1],p=8191&d,y=d>>>13,g=0|s[2],m=8191&g,b=g>>>13,w=0|s[3],v=8191&w,x=w>>>13,k=0|s[4],S=8191&k,M=k>>>13,E=0|s[5],A=8191&E,I=E>>>13,j=0|s[6],_=8191&j,B=j>>>13,O=0|s[7],T=8191&O,L=O>>>13,P=0|s[8],N=8191&P,z=P>>>13,R=0|s[9],U=8191&R,D=R>>>13,q=0|a[0],W=8191&q,C=q>>>13,F=0|a[1],K=8191&F,$=F>>>13,H=0|a[2],V=8191&H,G=H>>>13,J=0|a[3],Z=8191&J,Y=J>>>13,Q=0|a[4],X=8191&Q,tt=Q>>>13,et=0|a[5],rt=8191&et,nt=et>>>13,ot=0|a[6],it=8191&ot,st=ot>>>13,at=0|a[7],ut=8191&at,ct=at>>>13,lt=0|a[8],ft=8191&lt,ht=lt>>>13,dt=0|a[9],pt=8191&dt,yt=dt>>>13;
r.negative=t.negative^e.negative,r.length=19;
var gt=(c+(n=Math.imul(f,W))|0)+((8191&(o=(o=Math.imul(f,C))+Math.imul(h,W)|0))<<13)|0;
c=((i=Math.imul(h,C))+(o>>>13)|0)+(gt>>>26)|0,gt&=67108863,n=Math.imul(p,W),o=(o=Math.imul(p,C))+Math.imul(y,W)|0,i=Math.imul(y,C);
var mt=(c+(n=n+Math.imul(f,K)|0)|0)+((8191&(o=(o=o+Math.imul(f,$)|0)+Math.imul(h,K)|0))<<13)|0;
c=((i=i+Math.imul(h,$)|0)+(o>>>13)|0)+(mt>>>26)|0,mt&=67108863,n=Math.imul(m,W),o=(o=Math.imul(m,C))+Math.imul(b,W)|0,i=Math.imul(b,C),n=n+Math.imul(p,K)|0,o=(o=o+Math.imul(p,$)|0)+Math.imul(y,K)|0,i=i+Math.imul(y,$)|0;
var bt=(c+(n=n+Math.imul(f,V)|0)|0)+((8191&(o=(o=o+Math.imul(f,G)|0)+Math.imul(h,V)|0))<<13)|0;
c=((i=i+Math.imul(h,G)|0)+(o>>>13)|0)+(bt>>>26)|0,bt&=67108863,n=Math.imul(v,W),o=(o=Math.imul(v,C))+Math.imul(x,W)|0,i=Math.imul(x,C),n=n+Math.imul(m,K)|0,o=(o=o+Math.imul(m,$)|0)+Math.imul(b,K)|0,i=i+Math.imul(b,$)|0,n=n+Math.imul(p,V)|0,o=(o=o+Math.imul(p,G)|0)+Math.imul(y,V)|0,i=i+Math.imul(y,G)|0;
var wt=(c+(n=n+Math.imul(f,Z)|0)|0)+((8191&(o=(o=o+Math.imul(f,Y)|0)+Math.imul(h,Z)|0))<<13)|0;
c=((i=i+Math.imul(h,Y)|0)+(o>>>13)|0)+(wt>>>26)|0,wt&=67108863,n=Math.imul(S,W),o=(o=Math.imul(S,C))+Math.imul(M,W)|0,i=Math.imul(M,C),n=n+Math.imul(v,K)|0,o=(o=o+Math.imul(v,$)|0)+Math.imul(x,K)|0,i=i+Math.imul(x,$)|0,n=n+Math.imul(m,V)|0,o=(o=o+Math.imul(m,G)|0)+Math.imul(b,V)|0,i=i+Math.imul(b,G)|0,n=n+Math.imul(p,Z)|0,o=(o=o+Math.imul(p,Y)|0)+Math.imul(y,Z)|0,i=i+Math.imul(y,Y)|0;
var vt=(c+(n=n+Math.imul(f,X)|0)|0)+((8191&(o=(o=o+Math.imul(f,tt)|0)+Math.imul(h,X)|0))<<13)|0;
c=((i=i+Math.imul(h,tt)|0)+(o>>>13)|0)+(vt>>>26)|0,vt&=67108863,n=Math.imul(A,W),o=(o=Math.imul(A,C))+Math.imul(I,W)|0,i=Math.imul(I,C),n=n+Math.imul(S,K)|0,o=(o=o+Math.imul(S,$)|0)+Math.imul(M,K)|0,i=i+Math.imul(M,$)|0,n=n+Math.imul(v,V)|0,o=(o=o+Math.imul(v,G)|0)+Math.imul(x,V)|0,i=i+Math.imul(x,G)|0,n=n+Math.imul(m,Z)|0,o=(o=o+Math.imul(m,Y)|0)+Math.imul(b,Z)|0,i=i+Math.imul(b,Y)|0,n=n+Math.imul(p,X)|0,o=(o=o+Math.imul(p,tt)|0)+Math.imul(y,X)|0,i=i+Math.imul(y,tt)|0;
var xt=(c+(n=n+Math.imul(f,rt)|0)|0)+((8191&(o=(o=o+Math.imul(f,nt)|0)+Math.imul(h,rt)|0))<<13)|0;
c=((i=i+Math.imul(h,nt)|0)+(o>>>13)|0)+(xt>>>26)|0,xt&=67108863,n=Math.imul(_,W),o=(o=Math.imul(_,C))+Math.imul(B,W)|0,i=Math.imul(B,C),n=n+Math.imul(A,K)|0,o=(o=o+Math.imul(A,$)|0)+Math.imul(I,K)|0,i=i+Math.imul(I,$)|0,n=n+Math.imul(S,V)|0,o=(o=o+Math.imul(S,G)|0)+Math.imul(M,V)|0,i=i+Math.imul(M,G)|0,n=n+Math.imul(v,Z)|0,o=(o=o+Math.imul(v,Y)|0)+Math.imul(x,Z)|0,i=i+Math.imul(x,Y)|0,n=n+Math.imul(m,X)|0,o=(o=o+Math.imul(m,tt)|0)+Math.imul(b,X)|0,i=i+Math.imul(b,tt)|0,n=n+Math.imul(p,rt)|0,o=(o=o+Math.imul(p,nt)|0)+Math.imul(y,rt)|0,i=i+Math.imul(y,nt)|0;
var kt=(c+(n=n+Math.imul(f,it)|0)|0)+((8191&(o=(o=o+Math.imul(f,st)|0)+Math.imul(h,it)|0))<<13)|0;
c=((i=i+Math.imul(h,st)|0)+(o>>>13)|0)+(kt>>>26)|0,kt&=67108863,n=Math.imul(T,W),o=(o=Math.imul(T,C))+Math.imul(L,W)|0,i=Math.imul(L,C),n=n+Math.imul(_,K)|0,o=(o=o+Math.imul(_,$)|0)+Math.imul(B,K)|0,i=i+Math.imul(B,$)|0,n=n+Math.imul(A,V)|0,o=(o=o+Math.imul(A,G)|0)+Math.imul(I,V)|0,i=i+Math.imul(I,G)|0,n=n+Math.imul(S,Z)|0,o=(o=o+Math.imul(S,Y)|0)+Math.imul(M,Z)|0,i=i+Math.imul(M,Y)|0,n=n+Math.imul(v,X)|0,o=(o=o+Math.imul(v,tt)|0)+Math.imul(x,X)|0,i=i+Math.imul(x,tt)|0,n=n+Math.imul(m,rt)|0,o=(o=o+Math.imul(m,nt)|0)+Math.imul(b,rt)|0,i=i+Math.imul(b,nt)|0,n=n+Math.imul(p,it)|0,o=(o=o+Math.imul(p,st)|0)+Math.imul(y,it)|0,i=i+Math.imul(y,st)|0;
var St=(c+(n=n+Math.imul(f,ut)|0)|0)+((8191&(o=(o=o+Math.imul(f,ct)|0)+Math.imul(h,ut)|0))<<13)|0;
c=((i=i+Math.imul(h,ct)|0)+(o>>>13)|0)+(St>>>26)|0,St&=67108863,n=Math.imul(N,W),o=(o=Math.imul(N,C))+Math.imul(z,W)|0,i=Math.imul(z,C),n=n+Math.imul(T,K)|0,o=(o=o+Math.imul(T,$)|0)+Math.imul(L,K)|0,i=i+Math.imul(L,$)|0,n=n+Math.imul(_,V)|0,o=(o=o+Math.imul(_,G)|0)+Math.imul(B,V)|0,i=i+Math.imul(B,G)|0,n=n+Math.imul(A,Z)|0,o=(o=o+Math.imul(A,Y)|0)+Math.imul(I,Z)|0,i=i+Math.imul(I,Y)|0,n=n+Math.imul(S,X)|0,o=(o=o+Math.imul(S,tt)|0)+Math.imul(M,X)|0,i=i+Math.imul(M,tt)|0,n=n+Math.imul(v,rt)|0,o=(o=o+Math.imul(v,nt)|0)+Math.imul(x,rt)|0,i=i+Math.imul(x,nt)|0,n=n+Math.imul(m,it)|0,o=(o=o+Math.imul(m,st)|0)+Math.imul(b,it)|0,i=i+Math.imul(b,st)|0,n=n+Math.imul(p,ut)|0,o=(o=o+Math.imul(p,ct)|0)+Math.imul(y,ut)|0,i=i+Math.imul(y,ct)|0;
var Mt=(c+(n=n+Math.imul(f,ft)|0)|0)+((8191&(o=(o=o+Math.imul(f,ht)|0)+Math.imul(h,ft)|0))<<13)|0;
c=((i=i+Math.imul(h,ht)|0)+(o>>>13)|0)+(Mt>>>26)|0,Mt&=67108863,n=Math.imul(U,W),o=(o=Math.imul(U,C))+Math.imul(D,W)|0,i=Math.imul(D,C),n=n+Math.imul(N,K)|0,o=(o=o+Math.imul(N,$)|0)+Math.imul(z,K)|0,i=i+Math.imul(z,$)|0,n=n+Math.imul(T,V)|0,o=(o=o+Math.imul(T,G)|0)+Math.imul(L,V)|0,i=i+Math.imul(L,G)|0,n=n+Math.imul(_,Z)|0,o=(o=o+Math.imul(_,Y)|0)+Math.imul(B,Z)|0,i=i+Math.imul(B,Y)|0,n=n+Math.imul(A,X)|0,o=(o=o+Math.imul(A,tt)|0)+Math.imul(I,X)|0,i=i+Math.imul(I,tt)|0,n=n+Math.imul(S,rt)|0,o=(o=o+Math.imul(S,nt)|0)+Math.imul(M,rt)|0,i=i+Math.imul(M,nt)|0,n=n+Math.imul(v,it)|0,o=(o=o+Math.imul(v,st)|0)+Math.imul(x,it)|0,i=i+Math.imul(x,st)|0,n=n+Math.imul(m,ut)|0,o=(o=o+Math.imul(m,ct)|0)+Math.imul(b,ut)|0,i=i+Math.imul(b,ct)|0,n=n+Math.imul(p,ft)|0,o=(o=o+Math.imul(p,ht)|0)+Math.imul(y,ft)|0,i=i+Math.imul(y,ht)|0;
var Et=(c+(n=n+Math.imul(f,pt)|0)|0)+((8191&(o=(o=o+Math.imul(f,yt)|0)+Math.imul(h,pt)|0))<<13)|0;
c=((i=i+Math.imul(h,yt)|0)+(o>>>13)|0)+(Et>>>26)|0,Et&=67108863,n=Math.imul(U,K),o=(o=Math.imul(U,$))+Math.imul(D,K)|0,i=Math.imul(D,$),n=n+Math.imul(N,V)|0,o=(o=o+Math.imul(N,G)|0)+Math.imul(z,V)|0,i=i+Math.imul(z,G)|0,n=n+Math.imul(T,Z)|0,o=(o=o+Math.imul(T,Y)|0)+Math.imul(L,Z)|0,i=i+Math.imul(L,Y)|0,n=n+Math.imul(_,X)|0,o=(o=o+Math.imul(_,tt)|0)+Math.imul(B,X)|0,i=i+Math.imul(B,tt)|0,n=n+Math.imul(A,rt)|0,o=(o=o+Math.imul(A,nt)|0)+Math.imul(I,rt)|0,i=i+Math.imul(I,nt)|0,n=n+Math.imul(S,it)|0,o=(o=o+Math.imul(S,st)|0)+Math.imul(M,it)|0,i=i+Math.imul(M,st)|0,n=n+Math.imul(v,ut)|0,o=(o=o+Math.imul(v,ct)|0)+Math.imul(x,ut)|0,i=i+Math.imul(x,ct)|0,n=n+Math.imul(m,ft)|0,o=(o=o+Math.imul(m,ht)|0)+Math.imul(b,ft)|0,i=i+Math.imul(b,ht)|0;
var At=(c+(n=n+Math.imul(p,pt)|0)|0)+((8191&(o=(o=o+Math.imul(p,yt)|0)+Math.imul(y,pt)|0))<<13)|0;
c=((i=i+Math.imul(y,yt)|0)+(o>>>13)|0)+(At>>>26)|0,At&=67108863,n=Math.imul(U,V),o=(o=Math.imul(U,G))+Math.imul(D,V)|0,i=Math.imul(D,G),n=n+Math.imul(N,Z)|0,o=(o=o+Math.imul(N,Y)|0)+Math.imul(z,Z)|0,i=i+Math.imul(z,Y)|0,n=n+Math.imul(T,X)|0,o=(o=o+Math.imul(T,tt)|0)+Math.imul(L,X)|0,i=i+Math.imul(L,tt)|0,n=n+Math.imul(_,rt)|0,o=(o=o+Math.imul(_,nt)|0)+Math.imul(B,rt)|0,i=i+Math.imul(B,nt)|0,n=n+Math.imul(A,it)|0,o=(o=o+Math.imul(A,st)|0)+Math.imul(I,it)|0,i=i+Math.imul(I,st)|0,n=n+Math.imul(S,ut)|0,o=(o=o+Math.imul(S,ct)|0)+Math.imul(M,ut)|0,i=i+Math.imul(M,ct)|0,n=n+Math.imul(v,ft)|0,o=(o=o+Math.imul(v,ht)|0)+Math.imul(x,ft)|0,i=i+Math.imul(x,ht)|0;
var It=(c+(n=n+Math.imul(m,pt)|0)|0)+((8191&(o=(o=o+Math.imul(m,yt)|0)+Math.imul(b,pt)|0))<<13)|0;
c=((i=i+Math.imul(b,yt)|0)+(o>>>13)|0)+(It>>>26)|0,It&=67108863,n=Math.imul(U,Z),o=(o=Math.imul(U,Y))+Math.imul(D,Z)|0,i=Math.imul(D,Y),n=n+Math.imul(N,X)|0,o=(o=o+Math.imul(N,tt)|0)+Math.imul(z,X)|0,i=i+Math.imul(z,tt)|0,n=n+Math.imul(T,rt)|0,o=(o=o+Math.imul(T,nt)|0)+Math.imul(L,rt)|0,i=i+Math.imul(L,nt)|0,n=n+Math.imul(_,it)|0,o=(o=o+Math.imul(_,st)|0)+Math.imul(B,it)|0,i=i+Math.imul(B,st)|0,n=n+Math.imul(A,ut)|0,o=(o=o+Math.imul(A,ct)|0)+Math.imul(I,ut)|0,i=i+Math.imul(I,ct)|0,n=n+Math.imul(S,ft)|0,o=(o=o+Math.imul(S,ht)|0)+Math.imul(M,ft)|0,i=i+Math.imul(M,ht)|0;
var jt=(c+(n=n+Math.imul(v,pt)|0)|0)+((8191&(o=(o=o+Math.imul(v,yt)|0)+Math.imul(x,pt)|0))<<13)|0;
c=((i=i+Math.imul(x,yt)|0)+(o>>>13)|0)+(jt>>>26)|0,jt&=67108863,n=Math.imul(U,X),o=(o=Math.imul(U,tt))+Math.imul(D,X)|0,i=Math.imul(D,tt),n=n+Math.imul(N,rt)|0,o=(o=o+Math.imul(N,nt)|0)+Math.imul(z,rt)|0,i=i+Math.imul(z,nt)|0,n=n+Math.imul(T,it)|0,o=(o=o+Math.imul(T,st)|0)+Math.imul(L,it)|0,i=i+Math.imul(L,st)|0,n=n+Math.imul(_,ut)|0,o=(o=o+Math.imul(_,ct)|0)+Math.imul(B,ut)|0,i=i+Math.imul(B,ct)|0,n=n+Math.imul(A,ft)|0,o=(o=o+Math.imul(A,ht)|0)+Math.imul(I,ft)|0,i=i+Math.imul(I,ht)|0;
var _t=(c+(n=n+Math.imul(S,pt)|0)|0)+((8191&(o=(o=o+Math.imul(S,yt)|0)+Math.imul(M,pt)|0))<<13)|0;
c=((i=i+Math.imul(M,yt)|0)+(o>>>13)|0)+(_t>>>26)|0,_t&=67108863,n=Math.imul(U,rt),o=(o=Math.imul(U,nt))+Math.imul(D,rt)|0,i=Math.imul(D,nt),n=n+Math.imul(N,it)|0,o=(o=o+Math.imul(N,st)|0)+Math.imul(z,it)|0,i=i+Math.imul(z,st)|0,n=n+Math.imul(T,ut)|0,o=(o=o+Math.imul(T,ct)|0)+Math.imul(L,ut)|0,i=i+Math.imul(L,ct)|0,n=n+Math.imul(_,ft)|0,o=(o=o+Math.imul(_,ht)|0)+Math.imul(B,ft)|0,i=i+Math.imul(B,ht)|0;
var Bt=(c+(n=n+Math.imul(A,pt)|0)|0)+((8191&(o=(o=o+Math.imul(A,yt)|0)+Math.imul(I,pt)|0))<<13)|0;
c=((i=i+Math.imul(I,yt)|0)+(o>>>13)|0)+(Bt>>>26)|0,Bt&=67108863,n=Math.imul(U,it),o=(o=Math.imul(U,st))+Math.imul(D,it)|0,i=Math.imul(D,st),n=n+Math.imul(N,ut)|0,o=(o=o+Math.imul(N,ct)|0)+Math.imul(z,ut)|0,i=i+Math.imul(z,ct)|0,n=n+Math.imul(T,ft)|0,o=(o=o+Math.imul(T,ht)|0)+Math.imul(L,ft)|0,i=i+Math.imul(L,ht)|0;
var Ot=(c+(n=n+Math.imul(_,pt)|0)|0)+((8191&(o=(o=o+Math.imul(_,yt)|0)+Math.imul(B,pt)|0))<<13)|0;
c=((i=i+Math.imul(B,yt)|0)+(o>>>13)|0)+(Ot>>>26)|0,Ot&=67108863,n=Math.imul(U,ut),o=(o=Math.imul(U,ct))+Math.imul(D,ut)|0,i=Math.imul(D,ct),n=n+Math.imul(N,ft)|0,o=(o=o+Math.imul(N,ht)|0)+Math.imul(z,ft)|0,i=i+Math.imul(z,ht)|0;
var Tt=(c+(n=n+Math.imul(T,pt)|0)|0)+((8191&(o=(o=o+Math.imul(T,yt)|0)+Math.imul(L,pt)|0))<<13)|0;
c=((i=i+Math.imul(L,yt)|0)+(o>>>13)|0)+(Tt>>>26)|0,Tt&=67108863,n=Math.imul(U,ft),o=(o=Math.imul(U,ht))+Math.imul(D,ft)|0,i=Math.imul(D,ht);
var Lt=(c+(n=n+Math.imul(N,pt)|0)|0)+((8191&(o=(o=o+Math.imul(N,yt)|0)+Math.imul(z,pt)|0))<<13)|0;
c=((i=i+Math.imul(z,yt)|0)+(o>>>13)|0)+(Lt>>>26)|0,Lt&=67108863;
var Pt=(c+(n=Math.imul(U,pt))|0)+((8191&(o=(o=Math.imul(U,yt))+Math.imul(D,pt)|0))<<13)|0;
return c=((i=Math.imul(D,yt))+(o>>>13)|0)+(Pt>>>26)|0,Pt&=67108863,u[0]=gt,u[1]=mt,u[2]=bt,u[3]=wt,u[4]=vt,u[5]=xt,u[6]=kt,u[7]=St,u[8]=Mt,u[9]=Et,u[10]=At,u[11]=It,u[12]=jt,u[13]=_t,u[14]=Bt,u[15]=Ot,u[16]=Tt,u[17]=Lt,u[18]=Pt,0!==c&&(u[19]=c,r.length++),r
}
;
function m(t,e,r){
r.negative=e.negative^t.negative,r.length=t.length+e.length;
for(var n=0,o=0,i=0;
i<r.length-1;
i++){
var s=o;
o=0;
for(var a=67108863&n,u=Math.min(i,e.length-1),c=Math.max(0,i-t.length+1);
c<=u;
c++){
var l=i-c,f=(0|t.words[l])*(0|e.words[c]),h=67108863&f;
a=67108863&(h=h+a|0),o+=(s=(s=s+(f/67108864|0)|0)+(h>>>26)|0)>>>26,s&=67108863
}
r.words[i]=a,n=s,s=o
}
return 0!==n?r.words[i]=n:r.length--,r._strip()
}
function b(t,e,r){
return m(t,e,r)
}
function w(t,e){
this.x=t,this.y=e
}
Math.imul||(g=y),i.prototype.mulTo=function(t,e){
var r=this.length+t.length;
return 10===this.length&&10===t.length?g(this,t,e):r<63?y(this,t,e):r<1024?m(this,t,e):b(this,t,e)
}
,w.prototype.makeRBT=function(t){
for(var e=new Array(t),r=i.prototype._countBits(t)-1,n=0;
n<t;
n++)e[n]=this.revBin(n,r,t);
return e
}
,w.prototype.revBin=function(t,e,r){
if(0===t||t===r-1)return t;
for(var n=0,o=0;
o<e;
o++)n|=(1&t)<<e-o-1,t>>=1;
return n
}
,w.prototype.permute=function(t,e,r,n,o,i){
for(var s=0;
s<i;
s++)n[s]=e[t[s]],o[s]=r[t[s]]
}
,w.prototype.transform=function(t,e,r,n,o,i){
this.permute(i,t,e,r,n,o);
for(var s=1;
s<o;
s<<=1)for(var a=s<<1,u=Math.cos(2*Math.PI/a),c=Math.sin(2*Math.PI/a),l=0;
l<o;
l+=a)for(var f=u,h=c,d=0;
d<s;
d++){
var p=r[l+d],y=n[l+d],g=r[l+d+s],m=n[l+d+s],b=f*g-h*m;
m=f*m+h*g,g=b,r[l+d]=p+g,n[l+d]=y+m,r[l+d+s]=p-g,n[l+d+s]=y-m,d!==a&&(b=u*f-c*h,h=u*h+c*f,f=b)
}

}
,w.prototype.guessLen13b=function(t,e){
var r=1|Math.max(e,t),n=1&r,o=0;
for(r=r/2|0;
r;
r>>>=1)o++;
return 1<<o+1+n
}
,w.prototype.conjugate=function(t,e,r){
if(!(r<=1))for(var n=0;
n<r/2;
n++){
var o=t[n];
t[n]=t[r-n-1],t[r-n-1]=o,o=e[n],e[n]=-e[r-n-1],e[r-n-1]=-o
}

}
,w.prototype.normalize13b=function(t,e){
for(var r=0,n=0;
n<e/2;
n++){
var o=8192*Math.round(t[2*n+1]/e)+Math.round(t[2*n]/e)+r;
t[n]=67108863&o,r=o<67108864?0:o/67108864|0
}
return t
}
,w.prototype.convert13b=function(t,e,r,o){
for(var i=0,s=0;
s<e;
s++)i+=0|t[s],r[2*s]=8191&i,i>>>=13,r[2*s+1]=8191&i,i>>>=13;
for(s=2*e;
s<o;
++s)r[s]=0;
n(0===i),n(!(-8192&i))
}
,w.prototype.stub=function(t){
for(var e=new Array(t),r=0;
r<t;
r++)e[r]=0;
return e
}
,w.prototype.mulp=function(t,e,r){
var n=2*this.guessLen13b(t.length,e.length),o=this.makeRBT(n),i=this.stub(n),s=new Array(n),a=new Array(n),u=new Array(n),c=new Array(n),l=new Array(n),f=new Array(n),h=r.words;
h.length=n,this.convert13b(t.words,t.length,s,n),this.convert13b(e.words,e.length,c,n),this.transform(s,i,a,u,n,o),this.transform(c,i,l,f,n,o);
for(var d=0;
d<n;
d++){
var p=a[d]*l[d]-u[d]*f[d];
u[d]=a[d]*f[d]+u[d]*l[d],a[d]=p
}
return this.conjugate(a,u,n),this.transform(a,u,h,i,n,o),this.conjugate(h,i,n),this.normalize13b(h,n),r.negative=t.negative^e.negative,r.length=t.length+e.length,r._strip()
}
,i.prototype.mul=function(t){
var e=new i(null);
return e.words=new Array(this.length+t.length),this.mulTo(t,e)
}
,i.prototype.mulf=function(t){
var e=new i(null);
return e.words=new Array(this.length+t.length),b(this,t,e)
}
,i.prototype.imul=function(t){
return this.clone().mulTo(t,this)
}
,i.prototype.imuln=function(t){
var e=t<0;
e&&(t=-t),n("number"==typeof t),n(t<67108864);
for(var r=0,o=0;
o<this.length;
o++){
var i=(0|this.words[o])*t,s=(67108863&i)+(67108863&r);
r>>=26,r+=i/67108864|0,r+=s>>>26,this.words[o]=67108863&s
}
return 0!==r&&(this.words[o]=r,this.length++),e?this.ineg():this
}
,i.prototype.muln=function(t){
return this.clone().imuln(t)
}
,i.prototype.sqr=function(){
return this.mul(this)
}
,i.prototype.isqr=function(){
return this.imul(this.clone())
}
,i.prototype.pow=function(t){
var e=function(t){
for(var e=new Array(t.bitLength()),r=0;
r<e.length;
r++){
var n=r/26|0,o=r%26;
e[r]=t.words[n]>>>o&1
}
return e
}
(t);
if(0===e.length)return new i(1);
for(var r=this,n=0;
n<e.length&&0===e[n];
n++,r=r.sqr());
if(++n<e.length)for(var o=r.sqr();
n<e.length;
n++,o=o.sqr())0!==e[n]&&(r=r.mul(o));
return r
}
,i.prototype.iushln=function(t){
n("number"==typeof t&&t>=0);
var e,r=t%26,o=(t-r)/26,i=67108863>>>26-r<<26-r;
if(0!==r){
var s=0;
for(e=0;
e<this.length;
e++){
var a=this.words[e]&i,u=(0|this.words[e])-a<<r;
this.words[e]=u|s,s=a>>>26-r
}
s&&(this.words[e]=s,this.length++)
}
if(0!==o){
for(e=this.length-1;
e>=0;
e--)this.words[e+o]=this.words[e];
for(e=0;
e<o;
e++)this.words[e]=0;
this.length+=o
}
return this._strip()
}
,i.prototype.ishln=function(t){
return n(0===this.negative),this.iushln(t)
}
,i.prototype.iushrn=function(t,e,r){
var o;
n("number"==typeof t&&t>=0),o=e?(e-e%26)/26:0;
var i=t%26,s=Math.min((t-i)/26,this.length),a=67108863^67108863>>>i<<i,u=r;
if(o-=s,o=Math.max(0,o),u){
for(var c=0;
c<s;
c++)u.words[c]=this.words[c];
u.length=s
}
if(0===s);
else if(this.length>s)for(this.length-=s,c=0;
c<this.length;
c++)this.words[c]=this.words[c+s];
else this.words[0]=0,this.length=1;
var l=0;
for(c=this.length-1;
c>=0&&(0!==l||c>=o);
c--){
var f=0|this.words[c];
this.words[c]=l<<26-i|f>>>i,l=f&a
}
return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this._strip()
}
,i.prototype.ishrn=function(t,e,r){
return n(0===this.negative),this.iushrn(t,e,r)
}
,i.prototype.shln=function(t){
return this.clone().ishln(t)
}
,i.prototype.ushln=function(t){
return this.clone().iushln(t)
}
,i.prototype.shrn=function(t){
return this.clone().ishrn(t)
}
,i.prototype.ushrn=function(t){
return this.clone().iushrn(t)
}
,i.prototype.testn=function(t){
n("number"==typeof t&&t>=0);
var e=t%26,r=(t-e)/26,o=1<<e;
return!(this.length<=r||!(this.words[r]&o))
}
,i.prototype.imaskn=function(t){
n("number"==typeof t&&t>=0);
var e=t%26,r=(t-e)/26;
if(n(0===this.negative,"imaskn works only with positive numbers"),this.length<=r)return this;
if(0!==e&&r++,this.length=Math.min(r,this.length),0!==e){
var o=67108863^67108863>>>e<<e;
this.words[this.length-1]&=o
}
return this._strip()
}
,i.prototype.maskn=function(t){
return this.clone().imaskn(t)
}
,i.prototype.iaddn=function(t){
return n("number"==typeof t),n(t<67108864),t<0?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<=t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)
}
,i.prototype._iaddn=function(t){
this.words[0]+=t;
for(var e=0;
e<this.length&&this.words[e]>=67108864;
e++)this.words[e]-=67108864,e===this.length-1?this.words[e+1]=1:this.words[e+1]++;
return this.length=Math.max(this.length,e+1),this
}
,i.prototype.isubn=function(t){
if(n("number"==typeof t),n(t<67108864),t<0)return this.iaddn(-t);
if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;
if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;
else for(var e=0;
e<this.length&&this.words[e]<0;
e++)this.words[e]+=67108864,this.words[e+1]-=1;
return this._strip()
}
,i.prototype.addn=function(t){
return this.clone().iaddn(t)
}
,i.prototype.subn=function(t){
return this.clone().isubn(t)
}
,i.prototype.iabs=function(){
return this.negative=0,this
}
,i.prototype.abs=function(){
return this.clone().iabs()
}
,i.prototype._ishlnsubmul=function(t,e,r){
var o,i,s=t.length+r;
this._expand(s);
var a=0;
for(o=0;
o<t.length;
o++){
i=(0|this.words[o+r])+a;
var u=(0|t.words[o])*e;
a=((i-=67108863&u)>>26)-(u/67108864|0),this.words[o+r]=67108863&i
}
for(;
o<this.length-r;
o++)a=(i=(0|this.words[o+r])+a)>>26,this.words[o+r]=67108863&i;
if(0===a)return this._strip();
for(n(-1===a),a=0,o=0;
o<this.length;
o++)a=(i=-(0|this.words[o])+a)>>26,this.words[o]=67108863&i;
return this.negative=1,this._strip()
}
,i.prototype._wordDiv=function(t,e){
var r=(this.length,t.length),n=this.clone(),o=t,s=0|o.words[o.length-1];
0!=(r=26-this._countBits(s))&&(o=o.ushln(r),n.iushln(r),s=0|o.words[o.length-1]);
var a,u=n.length-o.length;
if("mod"!==e){
(a=new i(null)).length=u+1,a.words=new Array(a.length);
for(var c=0;
c<a.length;
c++)a.words[c]=0
}
var l=n.clone()._ishlnsubmul(o,1,u);
0===l.negative&&(n=l,a&&(a.words[u]=1));
for(var f=u-1;
f>=0;
f--){
var h=67108864*(0|n.words[o.length+f])+(0|n.words[o.length+f-1]);
for(h=Math.min(h/s|0,67108863),n._ishlnsubmul(o,h,f);
0!==n.negative;
)h--,n.negative=0,n._ishlnsubmul(o,1,f),n.isZero()||(n.negative^=1);
a&&(a.words[f]=h)
}
return a&&a._strip(),n._strip(),"div"!==e&&0!==r&&n.iushrn(r),{
div:a||null,mod:n
}

}
,i.prototype.divmod=function(t,e,r){
return n(!t.isZero()),this.isZero()?{
div:new i(0),mod:new i(0)
}
:0!==this.negative&&0===t.negative?(a=this.neg().divmod(t,e),"mod"!==e&&(o=a.div.neg()),"div"!==e&&(s=a.mod.neg(),r&&0!==s.negative&&s.iadd(t)),{
div:o,mod:s
}
):0===this.negative&&0!==t.negative?(a=this.divmod(t.neg(),e),"mod"!==e&&(o=a.div.neg()),{
div:o,mod:a.mod
}
):this.negative&t.negative?(a=this.neg().divmod(t.neg(),e),"div"!==e&&(s=a.mod.neg(),r&&0!==s.negative&&s.isub(t)),{
div:a.div,mod:s
}
):t.length>this.length||this.cmp(t)<0?{
div:new i(0),mod:this
}
:1===t.length?"div"===e?{
div:this.divn(t.words[0]),mod:null
}
:"mod"===e?{
div:null,mod:new i(this.modrn(t.words[0]))
}
:{
div:this.divn(t.words[0]),mod:new i(this.modrn(t.words[0]))
}
:this._wordDiv(t,e);
var o,s,a
}
,i.prototype.div=function(t){
return this.divmod(t,"div",!1).div
}
,i.prototype.mod=function(t){
return this.divmod(t,"mod",!1).mod
}
,i.prototype.umod=function(t){
return this.divmod(t,"mod",!0).mod
}
,i.prototype.divRound=function(t){
var e=this.divmod(t);
if(e.mod.isZero())return e.div;
var r=0!==e.div.negative?e.mod.isub(t):e.mod,n=t.ushrn(1),o=t.andln(1),i=r.cmp(n);
return i<0||1===o&&0===i?e.div:0!==e.div.negative?e.div.isubn(1):e.div.iaddn(1)
}
,i.prototype.modrn=function(t){
var e=t<0;
e&&(t=-t),n(t<=67108863);
for(var r=(1<<26)%t,o=0,i=this.length-1;
i>=0;
i--)o=(r*o+(0|this.words[i]))%t;
return e?-o:o
}
,i.prototype.modn=function(t){
return this.modrn(t)
}
,i.prototype.idivn=function(t){
var e=t<0;
e&&(t=-t),n(t<=67108863);
for(var r=0,o=this.length-1;
o>=0;
o--){
var i=(0|this.words[o])+67108864*r;
this.words[o]=i/t|0,r=i%t
}
return this._strip(),e?this.ineg():this
}
,i.prototype.divn=function(t){
return this.clone().idivn(t)
}
,i.prototype.egcd=function(t){
n(0===t.negative),n(!t.isZero());
var e=this,r=t.clone();
e=0!==e.negative?e.umod(t):e.clone();
for(var o=new i(1),s=new i(0),a=new i(0),u=new i(1),c=0;
e.isEven()&&r.isEven();
)e.iushrn(1),r.iushrn(1),++c;
for(var l=r.clone(),f=e.clone();
!e.isZero();
){
for(var h=0,d=1;
!(e.words[0]&d)&&h<26;
++h,d<<=1);
if(h>0)for(e.iushrn(h);
h-- >0;
)(o.isOdd()||s.isOdd())&&(o.iadd(l),s.isub(f)),o.iushrn(1),s.iushrn(1);
for(var p=0,y=1;
!(r.words[0]&y)&&p<26;
++p,y<<=1);
if(p>0)for(r.iushrn(p);
p-- >0;
)(a.isOdd()||u.isOdd())&&(a.iadd(l),u.isub(f)),a.iushrn(1),u.iushrn(1);
e.cmp(r)>=0?(e.isub(r),o.isub(a),s.isub(u)):(r.isub(e),a.isub(o),u.isub(s))
}
return{
a,b:u,gcd:r.iushln(c)
}

}
,i.prototype._invmp=function(t){
n(0===t.negative),n(!t.isZero());
var e=this,r=t.clone();
e=0!==e.negative?e.umod(t):e.clone();
for(var o,s=new i(1),a=new i(0),u=r.clone();
e.cmpn(1)>0&&r.cmpn(1)>0;
){
for(var c=0,l=1;
!(e.words[0]&l)&&c<26;
++c,l<<=1);
if(c>0)for(e.iushrn(c);
c-- >0;
)s.isOdd()&&s.iadd(u),s.iushrn(1);
for(var f=0,h=1;
!(r.words[0]&h)&&f<26;
++f,h<<=1);
if(f>0)for(r.iushrn(f);
f-- >0;
)a.isOdd()&&a.iadd(u),a.iushrn(1);
e.cmp(r)>=0?(e.isub(r),s.isub(a)):(r.isub(e),a.isub(s))
}
return(o=0===e.cmpn(1)?s:a).cmpn(0)<0&&o.iadd(t),o
}
,i.prototype.gcd=function(t){
if(this.isZero())return t.abs();
if(t.isZero())return this.abs();
var e=this.clone(),r=t.clone();
e.negative=0,r.negative=0;
for(var n=0;
e.isEven()&&r.isEven();
n++)e.iushrn(1),r.iushrn(1);
for(;
;
){
for(;
e.isEven();
)e.iushrn(1);
for(;
r.isEven();
)r.iushrn(1);
var o=e.cmp(r);
if(o<0){
var i=e;
e=r,r=i
}
else if(0===o||0===r.cmpn(1))break;
e.isub(r)
}
return r.iushln(n)
}
,i.prototype.invm=function(t){
return this.egcd(t).a.umod(t)
}
,i.prototype.isEven=function(){
return!(1&this.words[0])
}
,i.prototype.isOdd=function(){
return!(1&~this.words[0])
}
,i.prototype.andln=function(t){
return this.words[0]&t
}
,i.prototype.bincn=function(t){
n("number"==typeof t);
var e=t%26,r=(t-e)/26,o=1<<e;
if(this.length<=r)return this._expand(r+1),this.words[r]|=o,this;
for(var i=o,s=r;
0!==i&&s<this.length;
s++){
var a=0|this.words[s];
i=(a+=i)>>>26,a&=67108863,this.words[s]=a
}
return 0!==i&&(this.words[s]=i,this.length++),this
}
,i.prototype.isZero=function(){
return 1===this.length&&0===this.words[0]
}
,i.prototype.cmpn=function(t){
var e,r=t<0;
if(0!==this.negative&&!r)return-1;
if(0===this.negative&&r)return 1;
if(this._strip(),this.length>1)e=1;
else{
r&&(t=-t),n(t<=67108863,"Number is too big");
var o=0|this.words[0];
e=o===t?0:o<t?-1:1
}
return 0!==this.negative?0|-e:e
}
,i.prototype.cmp=function(t){
if(0!==this.negative&&0===t.negative)return-1;
if(0===this.negative&&0!==t.negative)return 1;
var e=this.ucmp(t);
return 0!==this.negative?0|-e:e
}
,i.prototype.ucmp=function(t){
if(this.length>t.length)return 1;
if(this.length<t.length)return-1;
for(var e=0,r=this.length-1;
r>=0;
r--){
var n=0|this.words[r],o=0|t.words[r];
if(n!==o){
n<o?e=-1:n>o&&(e=1);
break
}

}
return e
}
,i.prototype.gtn=function(t){
return 1===this.cmpn(t)
}
,i.prototype.gt=function(t){
return 1===this.cmp(t)
}
,i.prototype.gten=function(t){
return this.cmpn(t)>=0
}
,i.prototype.gte=function(t){
return this.cmp(t)>=0
}
,i.prototype.ltn=function(t){
return-1===this.cmpn(t)
}
,i.prototype.lt=function(t){
return-1===this.cmp(t)
}
,i.prototype.lten=function(t){
return this.cmpn(t)<=0
}
,i.prototype.lte=function(t){
return this.cmp(t)<=0
}
,i.prototype.eqn=function(t){
return 0===this.cmpn(t)
}
,i.prototype.eq=function(t){
return 0===this.cmp(t)
}
,i.red=function(t){
return new A(t)
}
,i.prototype.toRed=function(t){
return n(!this.red,"Already a number in reduction context"),n(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)
}
,i.prototype.fromRed=function(){
return n(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)
}
,i.prototype._forceRed=function(t){
return this.red=t,this
}
,i.prototype.forceRed=function(t){
return n(!this.red,"Already a number in reduction context"),this._forceRed(t)
}
,i.prototype.redAdd=function(t){
return n(this.red,"redAdd works only with red numbers"),this.red.add(this,t)
}
,i.prototype.redIAdd=function(t){
return n(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)
}
,i.prototype.redSub=function(t){
return n(this.red,"redSub works only with red numbers"),this.red.sub(this,t)
}
,i.prototype.redISub=function(t){
return n(this.red,"redISub works only with red numbers"),this.red.isub(this,t)
}
,i.prototype.redShl=function(t){
return n(this.red,"redShl works only with red numbers"),this.red.shl(this,t)
}
,i.prototype.redMul=function(t){
return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)
}
,i.prototype.redIMul=function(t){
return n(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)
}
,i.prototype.redSqr=function(){
return n(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)
}
,i.prototype.redISqr=function(){
return n(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)
}
,i.prototype.redSqrt=function(){
return n(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)
}
,i.prototype.redInvm=function(){
return n(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)
}
,i.prototype.redNeg=function(){
return n(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)
}
,i.prototype.redPow=function(t){
return n(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)
}
;
var v={
k256:null,p224:null,p192:null,p25519:null
}
;
function x(t,e){
this.name=t,this.p=new i(e,16),this.n=this.p.bitLength(),this.k=new i(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()
}
function k(){
x.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
}
function S(){
x.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
}
function M(){
x.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
}
function E(){
x.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
}
function A(t){
if("string"==typeof t){
var e=i._prime(t);
this.m=e.p,this.prime=e
}
else n(t.gtn(1),"modulus must be greater than 1"),this.m=t,this.prime=null
}
function I(t){
A.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new i(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)
}
x.prototype._tmp=function(){
var t=new i(null);
return t.words=new Array(Math.ceil(this.n/13)),t
}
,x.prototype.ireduce=function(t){
var e,r=t;
do{
this.split(r,this.tmp),e=(r=(r=this.imulK(r)).iadd(this.tmp)).bitLength()
}
while(e>this.n);
var n=e<this.n?-1:r.ucmp(this.p);
return 0===n?(r.words[0]=0,r.length=1):n>0?r.isub(this.p):void 0!==r.strip?r.strip():r._strip(),r
}
,x.prototype.split=function(t,e){
t.iushrn(this.n,0,e)
}
,x.prototype.imulK=function(t){
return t.imul(this.k)
}
,o(k,x),k.prototype.split=function(t,e){
for(var r=4194303,n=Math.min(t.length,9),o=0;
o<n;
o++)e.words[o]=t.words[o];
if(e.length=n,t.length<=9)return t.words[0]=0,void(t.length=1);
var i=t.words[9];
for(e.words[e.length++]=i&r,o=10;
o<t.length;
o++){
var s=0|t.words[o];
t.words[o-10]=(s&r)<<4|i>>>22,i=s
}
i>>>=22,t.words[o-10]=i,0===i&&t.length>10?t.length-=10:t.length-=9
}
,k.prototype.imulK=function(t){
t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;
for(var e=0,r=0;
r<t.length;
r++){
var n=0|t.words[r];
e+=977*n,t.words[r]=67108863&e,e=64*n+(e/67108864|0)
}
return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t
}
,o(S,x),o(M,x),o(E,x),E.prototype.imulK=function(t){
for(var e=0,r=0;
r<t.length;
r++){
var n=19*(0|t.words[r])+e,o=67108863&n;
n>>>=26,t.words[r]=o,e=n
}
return 0!==e&&(t.words[t.length++]=e),t
}
,i._prime=function(t){
if(v[t])return v[t];
var e;
if("k256"===t)e=new k;
else if("p224"===t)e=new S;
else if("p192"===t)e=new M;
else{
if("p25519"!==t)throw new Error("Unknown prime "+t);
e=new E
}
return v[t]=e,e
}
,A.prototype._verify1=function(t){
n(0===t.negative,"red works only with positives"),n(t.red,"red works only with red numbers")
}
,A.prototype._verify2=function(t,e){
n(!(t.negative|e.negative),"red works only with positives"),n(t.red&&t.red===e.red,"red works only with red numbers")
}
,A.prototype.imod=function(t){
return this.prime?this.prime.ireduce(t)._forceRed(this):(l(t,t.umod(this.m)._forceRed(this)),t)
}
,A.prototype.neg=function(t){
return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)
}
,A.prototype.add=function(t,e){
this._verify2(t,e);
var r=t.add(e);
return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)
}
,A.prototype.iadd=function(t,e){
this._verify2(t,e);
var r=t.iadd(e);
return r.cmp(this.m)>=0&&r.isub(this.m),r
}
,A.prototype.sub=function(t,e){
this._verify2(t,e);
var r=t.sub(e);
return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)
}
,A.prototype.isub=function(t,e){
this._verify2(t,e);
var r=t.isub(e);
return r.cmpn(0)<0&&r.iadd(this.m),r
}
,A.prototype.shl=function(t,e){
return this._verify1(t),this.imod(t.ushln(e))
}
,A.prototype.imul=function(t,e){
return this._verify2(t,e),this.imod(t.imul(e))
}
,A.prototype.mul=function(t,e){
return this._verify2(t,e),this.imod(t.mul(e))
}
,A.prototype.isqr=function(t){
return this.imul(t,t.clone())
}
,A.prototype.sqr=function(t){
return this.mul(t,t)
}
,A.prototype.sqrt=function(t){
if(t.isZero())return t.clone();
var e=this.m.andln(3);
if(n(e%2==1),3===e){
var r=this.m.add(new i(1)).iushrn(2);
return this.pow(t,r)
}
for(var o=this.m.subn(1),s=0;
!o.isZero()&&0===o.andln(1);
)s++,o.iushrn(1);
n(!o.isZero());
var a=new i(1).toRed(this),u=a.redNeg(),c=this.m.subn(1).iushrn(1),l=this.m.bitLength();
for(l=new i(2*l*l).toRed(this);
0!==this.pow(l,c).cmp(u);
)l.redIAdd(u);
for(var f=this.pow(l,o),h=this.pow(t,o.addn(1).iushrn(1)),d=this.pow(t,o),p=s;
0!==d.cmp(a);
){
for(var y=d,g=0;
0!==y.cmp(a);
g++)y=y.redSqr();
n(g<p);
var m=this.pow(f,new i(1).iushln(p-g-1));
h=h.redMul(m),f=m.redSqr(),d=d.redMul(f),p=g
}
return h
}
,A.prototype.invm=function(t){
var e=t._invmp(this.m);
return 0!==e.negative?(e.negative=0,this.imod(e).redNeg()):this.imod(e)
}
,A.prototype.pow=function(t,e){
if(e.isZero())return new i(1).toRed(this);
if(0===e.cmpn(1))return t.clone();
var r=new Array(16);
r[0]=new i(1).toRed(this),r[1]=t;
for(var n=2;
n<r.length;
n++)r[n]=this.mul(r[n-1],t);
var o=r[0],s=0,a=0,u=e.bitLength()%26;
for(0===u&&(u=26),n=e.length-1;
n>=0;
n--){
for(var c=e.words[n],l=u-1;
l>=0;
l--){
var f=c>>l&1;
o!==r[0]&&(o=this.sqr(o)),0!==f||0!==s?(s<<=1,s|=f,(4==++a||0===n&&0===l)&&(o=this.mul(o,r[s]),a=0,s=0)):a=0
}
u=26
}
return o
}
,A.prototype.convertTo=function(t){
var e=t.umod(this.m);
return e===t?e.clone():e
}
,A.prototype.convertFrom=function(t){
var e=t.clone();
return e.red=null,e
}
,i.mont=function(t){
return new I(t)
}
,o(I,A),I.prototype.convertTo=function(t){
return this.imod(t.ushln(this.shift))
}
,I.prototype.convertFrom=function(t){
var e=this.imod(t.mul(this.rinv));
return e.red=null,e
}
,I.prototype.imul=function(t,e){
if(t.isZero()||e.isZero())return t.words[0]=0,t.length=1,t;
var r=t.imul(e),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),o=r.isub(n).iushrn(this.shift),i=o;
return o.cmp(this.m)>=0?i=o.isub(this.m):o.cmpn(0)<0&&(i=o.iadd(this.m)),i._forceRed(this)
}
,I.prototype.mul=function(t,e){
if(t.isZero()||e.isZero())return new i(0)._forceRed(this);
var r=t.mul(e),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),o=r.isub(n).iushrn(this.shift),s=o;
return o.cmp(this.m)>=0?s=o.isub(this.m):o.cmpn(0)<0&&(s=o.iadd(this.m)),s._forceRed(this)
}
,I.prototype.invm=function(t){
return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
}

}
(t=r.nmd(t),this)
}
,"../../../node_modules/borsh/lib/index.js":function(t,e,r){
"use strict";
var n=r("../../../node_modules/buffer/index.js").Buffer,o=this&&this.__createBinding||(Object.create?function(t,e,r,n){
void 0===n&&(n=r),Object.defineProperty(t,n,{
enumerable:!0,get:function(){
return e[r]
}

}
)
}
:function(t,e,r,n){
void 0===n&&(n=r),t[n]=e[r]
}
),i=this&&this.__setModuleDefault||(Object.create?function(t,e){
Object.defineProperty(t,"default",{
enumerable:!0,value:e
}
)
}
:function(t,e){
t.default=e
}
),s=this&&this.__decorate||function(t,e,r,n){
var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);
else for(var a=t.length-1;
a>=0;
a--)(o=t[a])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);
return i>3&&s&&Object.defineProperty(e,r,s),s
}
,a=this&&this.__importStar||function(t){
if(t&&t.__esModule)return t;
var e={

}
;
if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&o(e,t,r);
return i(e,t),e
}
,u=this&&this.__importDefault||function(t){
return t&&t.__esModule?t:{
default:t
}

}
;
Object.defineProperty(e,"__esModule",{
value:!0
}
),e.deserializeUnchecked=e.deserialize=e.serialize=e.BinaryReader=e.BinaryWriter=e.BorshError=e.baseDecode=e.baseEncode=void 0;
const c=u(r("../../../node_modules/bn.js/lib/bn.js")),l=u(r("../../../node_modules/bs58/index.js")),f=a(r("../../../node_modules/text-encoding-utf-8/lib/encoding.lib.js")),h=new("function"!=typeof TextDecoder?f.TextDecoder:TextDecoder)("utf-8",{
fatal:!0
}
);
e.baseEncode=function(t){
return"string"==typeof t&&(t=n.from(t,"utf8")),l.default.encode(n.from(t))
}
,e.baseDecode=function(t){
return n.from(l.default.decode(t))
}
;
const d=1024;
class p extends Error{
constructor(t){
super(t),this.fieldPath=[],this.originalMessage=t
}
addToFieldPath(t){
this.fieldPath.splice(0,0,t),this.message=this.originalMessage+": "+this.fieldPath.join(".")
}

}
e.BorshError=p;
class y{
constructor(){
this.buf=n.alloc(d),this.length=0
}
maybeResize(){
this.buf.length<16+this.length&&(this.buf=n.concat([this.buf,n.alloc(d)]))
}
writeU8(t){
this.maybeResize(),this.buf.writeUInt8(t,this.length),this.length+=1
}
writeU16(t){
this.maybeResize(),this.buf.writeUInt16LE(t,this.length),this.length+=2
}
writeU32(t){
this.maybeResize(),this.buf.writeUInt32LE(t,this.length),this.length+=4
}
writeU64(t){
this.maybeResize(),this.writeBuffer(n.from(new c.default(t).toArray("le",8)))
}
writeU128(t){
this.maybeResize(),this.writeBuffer(n.from(new c.default(t).toArray("le",16)))
}
writeU256(t){
this.maybeResize(),this.writeBuffer(n.from(new c.default(t).toArray("le",32)))
}
writeU512(t){
this.maybeResize(),this.writeBuffer(n.from(new c.default(t).toArray("le",64)))
}
writeBuffer(t){
this.buf=n.concat([n.from(this.buf.subarray(0,this.length)),t,n.alloc(d)]),this.length+=t.length
}
writeString(t){
this.maybeResize();
const e=n.from(t,"utf8");
this.writeU32(e.length),this.writeBuffer(e)
}
writeFixedArray(t){
this.writeBuffer(n.from(t))
}
writeArray(t,e){
this.maybeResize(),this.writeU32(t.length);
for(const r of t)this.maybeResize(),e(r)
}
toArray(){
return this.buf.subarray(0,this.length)
}

}
function g(t,e,r){
const n=r.value;
r.value=function(...t){
try{
return n.apply(this,t)
}
catch(t){
if(t instanceof RangeError){
const e=t.code;
if(["ERR_BUFFER_OUT_OF_BOUNDS","ERR_OUT_OF_RANGE"].indexOf(e)>=0)throw new p("Reached the end of buffer when deserializing")
}
throw t
}

}

}
e.BinaryWriter=y;
class m{
constructor(t){
this.buf=t,this.offset=0
}
readU8(){
const t=this.buf.readUInt8(this.offset);
return this.offset+=1,t
}
readU16(){
const t=this.buf.readUInt16LE(this.offset);
return this.offset+=2,t
}
readU32(){
const t=this.buf.readUInt32LE(this.offset);
return this.offset+=4,t
}
readU64(){
const t=this.readBuffer(8);
return new c.default(t,"le")
}
readU128(){
const t=this.readBuffer(16);
return new c.default(t,"le")
}
readU256(){
const t=this.readBuffer(32);
return new c.default(t,"le")
}
readU512(){
const t=this.readBuffer(64);
return new c.default(t,"le")
}
readBuffer(t){
if(this.offset+t>this.buf.length)throw new p(`Expected buffer length ${
t
}
 isn't within bounds`);
const e=this.buf.slice(this.offset,this.offset+t);
return this.offset+=t,e
}
readString(){
const t=this.readU32(),e=this.readBuffer(t);
try{
return h.decode(e)
}
catch(t){
throw new p(`Error decoding UTF-8 string: ${
t
}
`)
}

}
readFixedArray(t){
return new Uint8Array(this.readBuffer(t))
}
readArray(t){
const e=this.readU32(),r=Array();
for(let n=0;
n<e;
++n)r.push(t());
return r
}

}
function b(t){
return t.charAt(0).toUpperCase()+t.slice(1)
}
function w(t,e,r,n,o){
try{
if("string"==typeof n)o[`write${
b(n)
}
`](r);
else if(n instanceof Array)if("number"==typeof n[0]){
if(r.length!==n[0])throw new p(`Expecting byte array of length ${
n[0]
}
, but got ${
r.length
}
 bytes`);
o.writeFixedArray(r)
}
else if(2===n.length&&"number"==typeof n[1]){
if(r.length!==n[1])throw new p(`Expecting byte array of length ${
n[1]
}
, but got ${
r.length
}
 bytes`);
for(let e=0;
e<n[1];
e++)w(t,null,r[e],n[0],o)
}
else o.writeArray(r,(r=>{
w(t,e,r,n[0],o)
}
));
else if(void 0!==n.kind)switch(n.kind){
case"option":null==r?o.writeU8(0):(o.writeU8(1),w(t,e,r,n.type,o));
break;
case"map":o.writeU32(r.size),r.forEach(((r,i)=>{
w(t,e,i,n.key,o),w(t,e,r,n.value,o)
}
));
break;
default:throw new p(`FieldType ${
n
}
 unrecognized`)
}
else v(t,r,o)
}
catch(t){
throw t instanceof p&&t.addToFieldPath(e),t
}

}
function v(t,e,r){
if("function"==typeof e.borshSerialize)return void e.borshSerialize(r);
const n=t.get(e.constructor);
if(!n)throw new p(`Class ${
e.constructor.name
}
 is missing in schema`);
if("struct"===n.kind)n.fields.map((([n,o])=>{
w(t,n,e[n],o,r)
}
));
else{
if("enum"!==n.kind)throw new p(`Unexpected schema kind: ${
n.kind
}
 for ${
e.constructor.name
}
`);
{
const o=e[n.field];
for(let i=0;
i<n.values.length;
++i){
const[s,a]=n.values[i];
if(s===o){
r.writeU8(i),w(t,s,e[s],a,r);
break
}

}

}

}

}
function x(t,e,r,n){
try{
if("string"==typeof r)return n[`read${
b(r)
}
`]();
if(r instanceof Array){
if("number"==typeof r[0])return n.readFixedArray(r[0]);
if("number"==typeof r[1]){
const e=[];
for(let o=0;
o<r[1];
o++)e.push(x(t,null,r[0],n));
return e
}
return n.readArray((()=>x(t,e,r[0],n)))
}
if("option"===r.kind)return n.readU8()?x(t,e,r.type,n):void 0;
if("map"===r.kind){
let o=new Map;
const i=n.readU32();
for(let s=0;
s<i;
s++){
const i=x(t,e,r.key,n),s=x(t,e,r.value,n);
o.set(i,s)
}
return o
}
return k(t,r,n)
}
catch(t){
throw t instanceof p&&t.addToFieldPath(e),t
}

}
function k(t,e,r){
if("function"==typeof e.borshDeserialize)return e.borshDeserialize(r);
const n=t.get(e);
if(!n)throw new p(`Class ${
e.name
}
 is missing in schema`);
if("struct"===n.kind){
const n={

}
;
for(const[o,i]of t.get(e).fields)n[o]=x(t,o,i,r);
return new e(n)
}
if("enum"===n.kind){
const o=r.readU8();
if(o>=n.values.length)throw new p(`Enum index: ${
o
}
 is out of range`);
const[i,s]=n.values[o],a=x(t,i,s,r);
return new e({
[i]:a
}
)
}
throw new p(`Unexpected schema kind: ${
n.kind
}
 for ${
e.constructor.name
}
`)
}
s([g],m.prototype,"readU8",null),s([g],m.prototype,"readU16",null),s([g],m.prototype,"readU32",null),s([g],m.prototype,"readU64",null),s([g],m.prototype,"readU128",null),s([g],m.prototype,"readU256",null),s([g],m.prototype,"readU512",null),s([g],m.prototype,"readString",null),s([g],m.prototype,"readFixedArray",null),s([g],m.prototype,"readArray",null),e.BinaryReader=m,e.serialize=function(t,e,r=y){
const n=new r;
return v(t,e,n),n.toArray()
}
,e.deserialize=function(t,e,r,n=m){
const o=new n(r),i=k(t,e,o);
if(o.offset<r.length)throw new p(`Unexpected ${
r.length-o.offset
}
 bytes after deserialized data`);
return i
}
,e.deserializeUnchecked=function(t,e,r,n=m){
return k(t,e,new n(r))
}

}
,"../../../node_modules/bs58/index.js":(t,e,r)=>{
var n=r("../../../node_modules/base-x/src/index.js");
t.exports=n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
}
,"../../../node_modules/buffer/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/console-browserify/index.js");
const o=r("../../../node_modules/base64-js/index.js"),i=r("../../../node_modules/ieee754/index.js"),s="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;
e.Buffer=c,e.SlowBuffer=function(t){
return+t!=t&&(t=0),c.alloc(+t)
}
,e.INSPECT_MAX_BYTES=50;
const a=2147483647;
function u(t){
if(t>a)throw new RangeError('The value "'+t+'" is invalid for option "size"');
const e=new Uint8Array(t);
return Object.setPrototypeOf(e,c.prototype),e
}
function c(t,e,r){
if("number"==typeof t){
if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');
return h(t)
}
return l(t,e,r)
}
function l(t,e,r){
if("string"==typeof t)return function(t,e){
if("string"==typeof e&&""!==e||(e="utf8"),!c.isEncoding(e))throw new TypeError("Unknown encoding: "+e);
const r=0|g(t,e);
let n=u(r);
const o=n.write(t,e);
return o!==r&&(n=n.slice(0,o)),n
}
(t,e);
if(ArrayBuffer.isView(t))return function(t){
if(Z(t,Uint8Array)){
const e=new Uint8Array(t);
return p(e.buffer,e.byteOffset,e.byteLength)
}
return d(t)
}
(t);
if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);
if(Z(t,ArrayBuffer)||t&&Z(t.buffer,ArrayBuffer))return p(t,e,r);
if("undefined"!=typeof SharedArrayBuffer&&(Z(t,SharedArrayBuffer)||t&&Z(t.buffer,SharedArrayBuffer)))return p(t,e,r);
if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');
const n=t.valueOf&&t.valueOf();
if(null!=n&&n!==t)return c.from(n,e,r);
const o=function(t){
if(c.isBuffer(t)){
const e=0|y(t.length),r=u(e);
return 0===r.length||t.copy(r,0,0,e),r
}
return void 0!==t.length?"number"!=typeof t.length||Y(t.length)?u(0):d(t):"Buffer"===t.type&&Array.isArray(t.data)?d(t.data):void 0
}
(t);
if(o)return o;
if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return c.from(t[Symbol.toPrimitive]("string"),e,r);
throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)
}
function f(t){
if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');
if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')
}
function h(t){
return f(t),u(t<0?0:0|y(t))
}
function d(t){
const e=t.length<0?0:0|y(t.length),r=u(e);
for(let n=0;
n<e;
n+=1)r[n]=255&t[n];
return r
}
function p(t,e,r){
if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');
if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');
let n;
return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,c.prototype),n
}
function y(t){
if(t>=a)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+a.toString(16)+" bytes");
return 0|t
}
function g(t,e){
if(c.isBuffer(t))return t.length;
if(ArrayBuffer.isView(t)||Z(t,ArrayBuffer))return t.byteLength;
if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);
const r=t.length,n=arguments.length>2&&!0===arguments[2];
if(!n&&0===r)return 0;
let o=!1;
for(;
;
)switch(e){
case"ascii":case"latin1":case"binary":return r;
case"utf8":case"utf-8":return V(t).length;
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;
case"hex":return r>>>1;
case"base64":return G(t).length;
default:if(o)return n?-1:V(t).length;
e=(""+e).toLowerCase(),o=!0
}

}
function m(t,e,r){
let n=!1;
if((void 0===e||e<0)&&(e=0),e>this.length)return"";
if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";
if((r>>>=0)<=(e>>>=0))return"";
for(t||(t="utf8");
;
)switch(t){
case"hex":return O(this,e,r);
case"utf8":case"utf-8":return I(this,e,r);
case"ascii":return _(this,e,r);
case"latin1":case"binary":return B(this,e,r);
case"base64":return A(this,e,r);
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,r);
default:if(n)throw new TypeError("Unknown encoding: "+t);
t=(t+"").toLowerCase(),n=!0
}

}
function b(t,e,r){
const n=t[e];
t[e]=t[r],t[r]=n
}
function w(t,e,r,n,o){
if(0===t.length)return-1;
if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),Y(r=+r)&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){
if(o)return-1;
r=t.length-1
}
else if(r<0){
if(!o)return-1;
r=0
}
if("string"==typeof e&&(e=c.from(e,n)),c.isBuffer(e))return 0===e.length?-1:v(t,e,r,n,o);
if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):v(t,[e],r,n,o);
throw new TypeError("val must be string, number or Buffer")
}
function v(t,e,r,n,o){
let i,s=1,a=t.length,u=e.length;
if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){
if(t.length<2||e.length<2)return-1;
s=2,a/=2,u/=2,r/=2
}
function c(t,e){
return 1===s?t[e]:t.readUInt16BE(e*s)
}
if(o){
let n=-1;
for(i=r;
i<a;
i++)if(c(t,i)===c(e,-1===n?0:i-n)){
if(-1===n&&(n=i),i-n+1===u)return n*s
}
else-1!==n&&(i-=i-n),n=-1
}
else for(r+u>a&&(r=a-u),i=r;
i>=0;
i--){
let r=!0;
for(let n=0;
n<u;
n++)if(c(t,i+n)!==c(e,n)){
r=!1;
break
}
if(r)return i
}
return-1
}
function x(t,e,r,n){
r=Number(r)||0;
const o=t.length-r;
n?(n=Number(n))>o&&(n=o):n=o;
const i=e.length;
let s;
for(n>i/2&&(n=i/2),s=0;
s<n;
++s){
const n=parseInt(e.substr(2*s,2),16);
if(Y(n))return s;
t[r+s]=n
}
return s
}
function k(t,e,r,n){
return J(V(e,t.length-r),t,r,n)
}
function S(t,e,r,n){
return J(function(t){
const e=[];
for(let r=0;
r<t.length;
++r)e.push(255&t.charCodeAt(r));
return e
}
(e),t,r,n)
}
function M(t,e,r,n){
return J(G(e),t,r,n)
}
function E(t,e,r,n){
return J(function(t,e){
let r,n,o;
const i=[];
for(let s=0;
s<t.length&&!((e-=2)<0);
++s)r=t.charCodeAt(s),n=r>>8,o=r%256,i.push(o),i.push(n);
return i
}
(e,t.length-r),t,r,n)
}
function A(t,e,r){
return 0===e&&r===t.length?o.fromByteArray(t):o.fromByteArray(t.slice(e,r))
}
function I(t,e,r){
r=Math.min(t.length,r);
const n=[];
let o=e;
for(;
o<r;
){
const e=t[o];
let i=null,s=e>239?4:e>223?3:e>191?2:1;
if(o+s<=r){
let r,n,a,u;
switch(s){
case 1:e<128&&(i=e);
break;
case 2:r=t[o+1],128==(192&r)&&(u=(31&e)<<6|63&r,u>127&&(i=u));
break;
case 3:r=t[o+1],n=t[o+2],128==(192&r)&&128==(192&n)&&(u=(15&e)<<12|(63&r)<<6|63&n,u>2047&&(u<55296||u>57343)&&(i=u));
break;
case 4:r=t[o+1],n=t[o+2],a=t[o+3],128==(192&r)&&128==(192&n)&&128==(192&a)&&(u=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&a,u>65535&&u<1114112&&(i=u))
}

}
null===i?(i=65533,s=1):i>65535&&(i-=65536,n.push(i>>>10&1023|55296),i=56320|1023&i),n.push(i),o+=s
}
return function(t){
const e=t.length;
if(e<=j)return String.fromCharCode.apply(String,t);
let r="",n=0;
for(;
n<e;
)r+=String.fromCharCode.apply(String,t.slice(n,n+=j));
return r
}
(n)
}
e.kMaxLength=a,c.TYPED_ARRAY_SUPPORT=function(){
try{
const t=new Uint8Array(1),e={
foo:function(){
return 42
}

}
;
return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()
}
catch(t){
return!1
}

}
(),c.TYPED_ARRAY_SUPPORT||void 0===n||"function"!=typeof n.error||n.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(c.prototype,"parent",{
enumerable:!0,get:function(){
if(c.isBuffer(this))return this.buffer
}

}
),Object.defineProperty(c.prototype,"offset",{
enumerable:!0,get:function(){
if(c.isBuffer(this))return this.byteOffset
}

}
),c.poolSize=8192,c.from=function(t,e,r){
return l(t,e,r)
}
,Object.setPrototypeOf(c.prototype,Uint8Array.prototype),Object.setPrototypeOf(c,Uint8Array),c.alloc=function(t,e,r){
return function(t,e,r){
return f(t),t<=0?u(t):void 0!==e?"string"==typeof r?u(t).fill(e,r):u(t).fill(e):u(t)
}
(t,e,r)
}
,c.allocUnsafe=function(t){
return h(t)
}
,c.allocUnsafeSlow=function(t){
return h(t)
}
,c.isBuffer=function(t){
return null!=t&&!0===t._isBuffer&&t!==c.prototype
}
,c.compare=function(t,e){
if(Z(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),Z(e,Uint8Array)&&(e=c.from(e,e.offset,e.byteLength)),!c.isBuffer(t)||!c.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
if(t===e)return 0;
let r=t.length,n=e.length;
for(let o=0,i=Math.min(r,n);
o<i;
++o)if(t[o]!==e[o]){
r=t[o],n=e[o];
break
}
return r<n?-1:n<r?1:0
}
,c.isEncoding=function(t){
switch(String(t).toLowerCase()){
case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;
default:return!1
}

}
,c.concat=function(t,e){
if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');
if(0===t.length)return c.alloc(0);
let r;
if(void 0===e)for(e=0,r=0;
r<t.length;
++r)e+=t[r].length;
const n=c.allocUnsafe(e);
let o=0;
for(r=0;
r<t.length;
++r){
let e=t[r];
if(Z(e,Uint8Array))o+e.length>n.length?(c.isBuffer(e)||(e=c.from(e)),e.copy(n,o)):Uint8Array.prototype.set.call(n,e,o);
else{
if(!c.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');
e.copy(n,o)
}
o+=e.length
}
return n
}
,c.byteLength=g,c.prototype._isBuffer=!0,c.prototype.swap16=function(){
const t=this.length;
if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");
for(let e=0;
e<t;
e+=2)b(this,e,e+1);
return this
}
,c.prototype.swap32=function(){
const t=this.length;
if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");
for(let e=0;
e<t;
e+=4)b(this,e,e+3),b(this,e+1,e+2);
return this
}
,c.prototype.swap64=function(){
const t=this.length;
if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");
for(let e=0;
e<t;
e+=8)b(this,e,e+7),b(this,e+1,e+6),b(this,e+2,e+5),b(this,e+3,e+4);
return this
}
,c.prototype.toString=function(){
const t=this.length;
return 0===t?"":0===arguments.length?I(this,0,t):m.apply(this,arguments)
}
,c.prototype.toLocaleString=c.prototype.toString,c.prototype.equals=function(t){
if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");
return this===t||0===c.compare(this,t)
}
,c.prototype.inspect=function(){
let t="";
const r=e.INSPECT_MAX_BYTES;
return t=this.toString("hex",0,r).replace(/(.{
2
}
)/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"
}
,s&&(c.prototype[s]=c.prototype.inspect),c.prototype.compare=function(t,e,r,n,o){
if(Z(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),!c.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);
if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),e<0||r>t.length||n<0||o>this.length)throw new RangeError("out of range index");
if(n>=o&&e>=r)return 0;
if(n>=o)return-1;
if(e>=r)return 1;
if(this===t)return 0;
let i=(o>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);
const a=Math.min(i,s),u=this.slice(n,o),l=t.slice(e,r);
for(let t=0;
t<a;
++t)if(u[t]!==l[t]){
i=u[t],s=l[t];
break
}
return i<s?-1:s<i?1:0
}
,c.prototype.includes=function(t,e,r){
return-1!==this.indexOf(t,e,r)
}
,c.prototype.indexOf=function(t,e,r){
return w(this,t,e,r,!0)
}
,c.prototype.lastIndexOf=function(t,e,r){
return w(this,t,e,r,!1)
}
,c.prototype.write=function(t,e,r,n){
if(void 0===e)n="utf8",r=this.length,e=0;
else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;
else{
if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)
}
const o=this.length-e;
if((void 0===r||r>o)&&(r=o),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");
n||(n="utf8");
let i=!1;
for(;
;
)switch(n){
case"hex":return x(this,t,e,r);
case"utf8":case"utf-8":return k(this,t,e,r);
case"ascii":case"latin1":case"binary":return S(this,t,e,r);
case"base64":return M(this,t,e,r);
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,r);
default:if(i)throw new TypeError("Unknown encoding: "+n);
n=(""+n).toLowerCase(),i=!0
}

}
,c.prototype.toJSON=function(){
return{
type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)
}

}
;
const j=4096;
function _(t,e,r){
let n="";
r=Math.min(t.length,r);
for(let o=e;
o<r;
++o)n+=String.fromCharCode(127&t[o]);
return n
}
function B(t,e,r){
let n="";
r=Math.min(t.length,r);
for(let o=e;
o<r;
++o)n+=String.fromCharCode(t[o]);
return n
}
function O(t,e,r){
const n=t.length;
(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);
let o="";
for(let n=e;
n<r;
++n)o+=Q[t[n]];
return o
}
function T(t,e,r){
const n=t.slice(e,r);
let o="";
for(let t=0;
t<n.length-1;
t+=2)o+=String.fromCharCode(n[t]+256*n[t+1]);
return o
}
function L(t,e,r){
if(t%1!=0||t<0)throw new RangeError("offset is not uint");
if(t+e>r)throw new RangeError("Trying to access beyond buffer length")
}
function P(t,e,r,n,o,i){
if(!c.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');
if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');
if(r+n>t.length)throw new RangeError("Index out of range")
}
function N(t,e,r,n,o){
F(e,n,o,t,r,7);
let i=Number(e&BigInt(4294967295));
t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i;
let s=Number(e>>BigInt(32)&BigInt(4294967295));
return t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,r
}
function z(t,e,r,n,o){
F(e,n,o,t,r,7);
let i=Number(e&BigInt(4294967295));
t[r+7]=i,i>>=8,t[r+6]=i,i>>=8,t[r+5]=i,i>>=8,t[r+4]=i;
let s=Number(e>>BigInt(32)&BigInt(4294967295));
return t[r+3]=s,s>>=8,t[r+2]=s,s>>=8,t[r+1]=s,s>>=8,t[r]=s,r+8
}
function R(t,e,r,n,o,i){
if(r+n>t.length)throw new RangeError("Index out of range");
if(r<0)throw new RangeError("Index out of range")
}
function U(t,e,r,n,o){
return e=+e,r>>>=0,o||R(t,0,r,4),i.write(t,e,r,n,23,4),r+4
}
function D(t,e,r,n,o){
return e=+e,r>>>=0,o||R(t,0,r,8),i.write(t,e,r,n,52,8),r+8
}
c.prototype.slice=function(t,e){
const r=this.length;
(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);
const n=this.subarray(t,e);
return Object.setPrototypeOf(n,c.prototype),n
}
,c.prototype.readUintLE=c.prototype.readUIntLE=function(t,e,r){
t>>>=0,e>>>=0,r||L(t,e,this.length);
let n=this[t],o=1,i=0;
for(;
++i<e&&(o*=256);
)n+=this[t+i]*o;
return n
}
,c.prototype.readUintBE=c.prototype.readUIntBE=function(t,e,r){
t>>>=0,e>>>=0,r||L(t,e,this.length);
let n=this[t+--e],o=1;
for(;
e>0&&(o*=256);
)n+=this[t+--e]*o;
return n
}
,c.prototype.readUint8=c.prototype.readUInt8=function(t,e){
return t>>>=0,e||L(t,1,this.length),this[t]
}
,c.prototype.readUint16LE=c.prototype.readUInt16LE=function(t,e){
return t>>>=0,e||L(t,2,this.length),this[t]|this[t+1]<<8
}
,c.prototype.readUint16BE=c.prototype.readUInt16BE=function(t,e){
return t>>>=0,e||L(t,2,this.length),this[t]<<8|this[t+1]
}
,c.prototype.readUint32LE=c.prototype.readUInt32LE=function(t,e){
return t>>>=0,e||L(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]
}
,c.prototype.readUint32BE=c.prototype.readUInt32BE=function(t,e){
return t>>>=0,e||L(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])
}
,c.prototype.readBigUInt64LE=X((function(t){
K(t>>>=0,"offset");
const e=this[t],r=this[t+7];
void 0!==e&&void 0!==r||$(t,this.length-8);
const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,o=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;
return BigInt(n)+(BigInt(o)<<BigInt(32))
}
)),c.prototype.readBigUInt64BE=X((function(t){
K(t>>>=0,"offset");
const e=this[t],r=this[t+7];
void 0!==e&&void 0!==r||$(t,this.length-8);
const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],o=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;
return(BigInt(n)<<BigInt(32))+BigInt(o)
}
)),c.prototype.readIntLE=function(t,e,r){
t>>>=0,e>>>=0,r||L(t,e,this.length);
let n=this[t],o=1,i=0;
for(;
++i<e&&(o*=256);
)n+=this[t+i]*o;
return o*=128,n>=o&&(n-=Math.pow(2,8*e)),n
}
,c.prototype.readIntBE=function(t,e,r){
t>>>=0,e>>>=0,r||L(t,e,this.length);
let n=e,o=1,i=this[t+--n];
for(;
n>0&&(o*=256);
)i+=this[t+--n]*o;
return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i
}
,c.prototype.readInt8=function(t,e){
return t>>>=0,e||L(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]
}
,c.prototype.readInt16LE=function(t,e){
t>>>=0,e||L(t,2,this.length);
const r=this[t]|this[t+1]<<8;
return 32768&r?4294901760|r:r
}
,c.prototype.readInt16BE=function(t,e){
t>>>=0,e||L(t,2,this.length);
const r=this[t+1]|this[t]<<8;
return 32768&r?4294901760|r:r
}
,c.prototype.readInt32LE=function(t,e){
return t>>>=0,e||L(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24
}
,c.prototype.readInt32BE=function(t,e){
return t>>>=0,e||L(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]
}
,c.prototype.readBigInt64LE=X((function(t){
K(t>>>=0,"offset");
const e=this[t],r=this[t+7];
void 0!==e&&void 0!==r||$(t,this.length-8);
const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);
return(BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)
}
)),c.prototype.readBigInt64BE=X((function(t){
K(t>>>=0,"offset");
const e=this[t],r=this[t+7];
void 0!==e&&void 0!==r||$(t,this.length-8);
const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];
return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)
}
)),c.prototype.readFloatLE=function(t,e){
return t>>>=0,e||L(t,4,this.length),i.read(this,t,!0,23,4)
}
,c.prototype.readFloatBE=function(t,e){
return t>>>=0,e||L(t,4,this.length),i.read(this,t,!1,23,4)
}
,c.prototype.readDoubleLE=function(t,e){
return t>>>=0,e||L(t,8,this.length),i.read(this,t,!0,52,8)
}
,c.prototype.readDoubleBE=function(t,e){
return t>>>=0,e||L(t,8,this.length),i.read(this,t,!1,52,8)
}
,c.prototype.writeUintLE=c.prototype.writeUIntLE=function(t,e,r,n){
t=+t,e>>>=0,r>>>=0,n||P(this,t,e,r,Math.pow(2,8*r)-1,0);
let o=1,i=0;
for(this[e]=255&t;
++i<r&&(o*=256);
)this[e+i]=t/o&255;
return e+r
}
,c.prototype.writeUintBE=c.prototype.writeUIntBE=function(t,e,r,n){
t=+t,e>>>=0,r>>>=0,n||P(this,t,e,r,Math.pow(2,8*r)-1,0);
let o=r-1,i=1;
for(this[e+o]=255&t;
--o>=0&&(i*=256);
)this[e+o]=t/i&255;
return e+r
}
,c.prototype.writeUint8=c.prototype.writeUInt8=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,1,255,0),this[e]=255&t,e+1
}
,c.prototype.writeUint16LE=c.prototype.writeUInt16LE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2
}
,c.prototype.writeUint16BE=c.prototype.writeUInt16BE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2
}
,c.prototype.writeUint32LE=c.prototype.writeUInt32LE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4
}
,c.prototype.writeUint32BE=c.prototype.writeUInt32BE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4
}
,c.prototype.writeBigUInt64LE=X((function(t,e=0){
return N(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))
}
)),c.prototype.writeBigUInt64BE=X((function(t,e=0){
return z(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))
}
)),c.prototype.writeIntLE=function(t,e,r,n){
if(t=+t,e>>>=0,!n){
const n=Math.pow(2,8*r-1);
P(this,t,e,r,n-1,-n)
}
let o=0,i=1,s=0;
for(this[e]=255&t;
++o<r&&(i*=256);
)t<0&&0===s&&0!==this[e+o-1]&&(s=1),this[e+o]=(t/i|0)-s&255;
return e+r
}
,c.prototype.writeIntBE=function(t,e,r,n){
if(t=+t,e>>>=0,!n){
const n=Math.pow(2,8*r-1);
P(this,t,e,r,n-1,-n)
}
let o=r-1,i=1,s=0;
for(this[e+o]=255&t;
--o>=0&&(i*=256);
)t<0&&0===s&&0!==this[e+o+1]&&(s=1),this[e+o]=(t/i|0)-s&255;
return e+r
}
,c.prototype.writeInt8=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1
}
,c.prototype.writeInt16LE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2
}
,c.prototype.writeInt16BE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2
}
,c.prototype.writeInt32LE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4
}
,c.prototype.writeInt32BE=function(t,e,r){
return t=+t,e>>>=0,r||P(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4
}
,c.prototype.writeBigInt64LE=X((function(t,e=0){
return N(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))
}
)),c.prototype.writeBigInt64BE=X((function(t,e=0){
return z(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))
}
)),c.prototype.writeFloatLE=function(t,e,r){
return U(this,t,e,!0,r)
}
,c.prototype.writeFloatBE=function(t,e,r){
return U(this,t,e,!1,r)
}
,c.prototype.writeDoubleLE=function(t,e,r){
return D(this,t,e,!0,r)
}
,c.prototype.writeDoubleBE=function(t,e,r){
return D(this,t,e,!1,r)
}
,c.prototype.copy=function(t,e,r,n){
if(!c.isBuffer(t))throw new TypeError("argument should be a Buffer");
if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;
if(0===t.length||0===this.length)return 0;
if(e<0)throw new RangeError("targetStart out of bounds");
if(r<0||r>=this.length)throw new RangeError("Index out of range");
if(n<0)throw new RangeError("sourceEnd out of bounds");
n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);
const o=n-r;
return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),o
}
,c.prototype.fill=function(t,e,r,n){
if("string"==typeof t){
if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");
if("string"==typeof n&&!c.isEncoding(n))throw new TypeError("Unknown encoding: "+n);
if(1===t.length){
const e=t.charCodeAt(0);
("utf8"===n&&e<128||"latin1"===n)&&(t=e)
}

}
else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));
if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");
if(r<=e)return this;
let o;
if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;
o<r;
++o)this[o]=t;
else{
const i=c.isBuffer(t)?t:c.from(t,n),s=i.length;
if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');
for(o=0;
o<r-e;
++o)this[o+e]=i[o%s]
}
return this
}
;
const q={

}
;
function W(t,e,r){
q[t]=class extends r{
constructor(){
super(),Object.defineProperty(this,"message",{
value:e.apply(this,arguments),writable:!0,configurable:!0
}
),this.name=`${
this.name
}
 [${
t
}
]`,this.stack,delete this.name
}
get code(){
return t
}
set code(t){
Object.defineProperty(this,"code",{
configurable:!0,enumerable:!0,value:t,writable:!0
}
)
}
toString(){
return`${
this.name
}
 [${
t
}
]: ${
this.message
}
`
}

}

}
function C(t){
let e="",r=t.length;
const n="-"===t[0]?1:0;
for(;
r>=n+4;
r-=3)e=`_${
t.slice(r-3,r)
}
${
e
}
`;
return`${
t.slice(0,r)
}
${
e
}
`
}
function F(t,e,r,n,o,i){
if(t>r||t<e){
const n="bigint"==typeof e?"n":"";
let o;
throw o=i>3?0===e||e===BigInt(0)?`>= 0${
n
}
 and < 2${
n
}
 ** ${
8*(i+1)
}
${
n
}
`:`>= -(2${
n
}
 ** ${
8*(i+1)-1
}
${
n
}
) and < 2 ** ${
8*(i+1)-1
}
${
n
}
`:`>= ${
e
}
${
n
}
 and <= ${
r
}
${
n
}
`,new q.ERR_OUT_OF_RANGE("value",o,t)
}
!function(t,e,r){
K(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||$(e,t.length-(r+1))
}
(n,o,i)
}
function K(t,e){
if("number"!=typeof t)throw new q.ERR_INVALID_ARG_TYPE(e,"number",t)
}
function $(t,e,r){
if(Math.floor(t)!==t)throw K(t,r),new q.ERR_OUT_OF_RANGE(r||"offset","an integer",t);
if(e<0)throw new q.ERR_BUFFER_OUT_OF_BOUNDS;
throw new q.ERR_OUT_OF_RANGE(r||"offset",`>= ${
r?1:0
}
 and <= ${
e
}
`,t)
}
W("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){
return t?`${
t
}
 is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"
}
),RangeError),W("ERR_INVALID_ARG_TYPE",(function(t,e){
return`The "${
t
}
" argument must be of type number. Received type ${
typeof e
}
`
}
),TypeError),W("ERR_OUT_OF_RANGE",(function(t,e,r){
let n=`The value of "${
t
}
" is out of range.`,o=r;
return Number.isInteger(r)&&Math.abs(r)>2**32?o=C(String(r)):"bigint"==typeof r&&(o=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(o=C(o)),o+="n"),n+=` It must be ${
e
}
. Received ${
o
}
`,n
}
),RangeError);
const H=/[^+/0-9A-Za-z-_]/g;
function V(t,e){
let r;
e=e||1/0;
const n=t.length;
let o=null;
const i=[];
for(let s=0;
s<n;
++s){
if(r=t.charCodeAt(s),r>55295&&r<57344){
if(!o){
if(r>56319){
(e-=3)>-1&&i.push(239,191,189);
continue
}
if(s+1===n){
(e-=3)>-1&&i.push(239,191,189);
continue
}
o=r;
continue
}
if(r<56320){
(e-=3)>-1&&i.push(239,191,189),o=r;
continue
}
r=65536+(o-55296<<10|r-56320)
}
else o&&(e-=3)>-1&&i.push(239,191,189);
if(o=null,r<128){
if((e-=1)<0)break;
i.push(r)
}
else if(r<2048){
if((e-=2)<0)break;
i.push(r>>6|192,63&r|128)
}
else if(r<65536){
if((e-=3)<0)break;
i.push(r>>12|224,r>>6&63|128,63&r|128)
}
else{
if(!(r<1114112))throw new Error("Invalid code point");
if((e-=4)<0)break;
i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)
}

}
return i
}
function G(t){
return o.toByteArray(function(t){
if((t=(t=t.split("=")[0]).trim().replace(H,"")).length<2)return"";
for(;
t.length%4!=0;
)t+="=";
return t
}
(t))
}
function J(t,e,r,n){
let o;
for(o=0;
o<n&&!(o+r>=e.length||o>=t.length);
++o)e[o+r]=t[o];
return o
}
function Z(t,e){
return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name
}
function Y(t){
return t!=t
}
const Q=function(){
const t="0123456789abcdef",e=new Array(256);
for(let r=0;
r<16;
++r){
const n=16*r;
for(let o=0;
o<16;
++o)e[n+o]=t[r]+t[o]
}
return e
}
();
function X(t){
return"undefined"==typeof BigInt?tt:t
}
function tt(){
throw new Error("BigInt not supported")
}

}
,"../../../node_modules/call-bind/callBound.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/get-intrinsic/index.js"),o=r("../../../node_modules/call-bind/index.js"),i=o(n("String.prototype.indexOf"));
t.exports=function(t,e){
var r=n(t,!!e);
return"function"==typeof r&&i(t,".prototype.")>-1?o(r):r
}

}
,"../../../node_modules/call-bind/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/function-bind/index.js"),o=r("../../../node_modules/get-intrinsic/index.js"),i=r("../../../node_modules/set-function-length/index.js"),s=r("../../../node_modules/es-errors/type.js"),a=o("%Function.prototype.apply%"),u=o("%Function.prototype.call%"),c=o("%Reflect.apply%",!0)||n.call(u,a),l=r("../../../node_modules/es-define-property/index.js"),f=o("%Math.max%");
t.exports=function(t){
if("function"!=typeof t)throw new s("a function is required");
var e=c(n,u,arguments);
return i(e,1+f(0,t.length-(arguments.length-1)),!0)
}
;
var h=function(){
return c(n,a,arguments)
}
;
l?l(t.exports,"apply",{
value:h
}
):t.exports.apply=h
}
,"../../../node_modules/console-browserify/index.js":(t,e,r)=>{
var n=r("../../../node_modules/util/util.js"),o=r("../../../node_modules/assert/build/assert.js");
function i(){
return(new Date).getTime()
}
var s,a=Array.prototype.slice,u={

}
;
s=void 0!==r.g&&r.g.console?r.g.console:"undefined"!=typeof window&&window.console?window.console:{

}
;
for(var c=[[function(){

}
,"log"],[function(){
s.log.apply(s,arguments)
}
,"info"],[function(){
s.log.apply(s,arguments)
}
,"warn"],[function(){
s.warn.apply(s,arguments)
}
,"error"],[function(t){
u[t]=i()
}
,"time"],[function(t){
var e=u[t];
if(!e)throw new Error("No such label: "+t);
delete u[t];
var r=i()-e;
s.log(t+": "+r+"ms")
}
,"timeEnd"],[function(){
var t=new Error;
t.name="Trace",t.message=n.format.apply(null,arguments),s.error(t.stack)
}
,"trace"],[function(t){
s.log(n.inspect(t)+"\n")
}
,"dir"],[function(t){
if(!t){
var e=a.call(arguments,1);
o.ok(!1,n.format.apply(null,e))
}

}
,"assert"]],l=0;
l<c.length;
l++){
var f=c[l],h=f[0],d=f[1];
s[d]||(s[d]=h)
}
t.exports=s
}
,"../../../node_modules/define-data-property/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/es-define-property/index.js"),o=r("../../../node_modules/es-errors/syntax.js"),i=r("../../../node_modules/es-errors/type.js"),s=r("../../../node_modules/gopd/index.js");
t.exports=function(t,e,r){
if(!t||"object"!=typeof t&&"function"!=typeof t)throw new i("`obj` must be an object or a function`");
if("string"!=typeof e&&"symbol"!=typeof e)throw new i("`property` must be a string or a symbol`");
if(arguments.length>3&&"boolean"!=typeof arguments[3]&&null!==arguments[3])throw new i("`nonEnumerable`, if provided, must be a boolean or null");
if(arguments.length>4&&"boolean"!=typeof arguments[4]&&null!==arguments[4])throw new i("`nonWritable`, if provided, must be a boolean or null");
if(arguments.length>5&&"boolean"!=typeof arguments[5]&&null!==arguments[5])throw new i("`nonConfigurable`, if provided, must be a boolean or null");
if(arguments.length>6&&"boolean"!=typeof arguments[6])throw new i("`loose`, if provided, must be a boolean");
var a=arguments.length>3?arguments[3]:null,u=arguments.length>4?arguments[4]:null,c=arguments.length>5?arguments[5]:null,l=arguments.length>6&&arguments[6],f=!!s&&s(t,e);
if(n)n(t,e,{
configurable:null===c&&f?f.configurable:!c,enumerable:null===a&&f?f.enumerable:!a,value:r,writable:null===u&&f?f.writable:!u
}
);
else{
if(!l&&(a||u||c))throw new o("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
t[e]=r
}

}

}
,"../../../node_modules/define-properties/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/object-keys/index.js"),o="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),i=Object.prototype.toString,s=Array.prototype.concat,a=r("../../../node_modules/define-data-property/index.js"),u=r("../../../node_modules/has-property-descriptors/index.js")(),c=function(t,e,r,n){
if(e in t)if(!0===n){
if(t[e]===r)return
}
else if("function"!=typeof(o=n)||"[object Function]"!==i.call(o)||!n())return;
var o;
u?a(t,e,r,!0):a(t,e,r)
}
,l=function(t,e){
var r=arguments.length>2?arguments[2]:{

}
,i=n(e);
o&&(i=s.call(i,Object.getOwnPropertySymbols(e)));
for(var a=0;
a<i.length;
a+=1)c(t,i[a],e[i[a]],r[i[a]])
}
;
l.supportsDescriptors=!!u,t.exports=l
}
,"../../../node_modules/es-define-property/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/get-intrinsic/index.js")("%Object.defineProperty%",!0)||!1;
if(n)try{
n({

}
,"a",{
value:1
}
)
}
catch(t){
n=!1
}
t.exports=n
}
,"../../../node_modules/es-errors/eval.js":t=>{
"use strict";
t.exports=EvalError
}
,"../../../node_modules/es-errors/index.js":t=>{
"use strict";
t.exports=Error
}
,"../../../node_modules/es-errors/range.js":t=>{
"use strict";
t.exports=RangeError
}
,"../../../node_modules/es-errors/ref.js":t=>{
"use strict";
t.exports=ReferenceError
}
,"../../../node_modules/es-errors/syntax.js":t=>{
"use strict";
t.exports=SyntaxError
}
,"../../../node_modules/es-errors/type.js":t=>{
"use strict";
t.exports=TypeError
}
,"../../../node_modules/es-errors/uri.js":t=>{
"use strict";
t.exports=URIError
}
,"../../../node_modules/es6-object-assign/index.js":t=>{
"use strict";
function e(t,e){
if(null==t)throw new TypeError("Cannot convert first argument to object");
for(var r=Object(t),n=1;
n<arguments.length;
n++){
var o=arguments[n];
if(null!=o)for(var i=Object.keys(Object(o)),s=0,a=i.length;
s<a;
s++){
var u=i[s],c=Object.getOwnPropertyDescriptor(o,u);
void 0!==c&&c.enumerable&&(r[u]=o[u])
}

}
return r
}
t.exports={
assign:e,polyfill:function(){
Object.assign||Object.defineProperty(Object,"assign",{
enumerable:!1,configurable:!0,writable:!0,value:e
}
)
}

}

}
,"../../../node_modules/eventemitter3/index.js":t=>{
"use strict";
var e=Object.prototype.hasOwnProperty,r="~";
function n(){

}
function o(t,e,r){
this.fn=t,this.context=e,this.once=r||!1
}
function i(t,e,n,i,s){
if("function"!=typeof n)throw new TypeError("The listener must be a function");
var a=new o(n,i||t,s),u=r?r+e:e;
return t._events[u]?t._events[u].fn?t._events[u]=[t._events[u],a]:t._events[u].push(a):(t._events[u]=a,t._eventsCount++),t
}
function s(t,e){
0==--t._eventsCount?t._events=new n:delete t._events[e]
}
function a(){
this._events=new n,this._eventsCount=0
}
Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(r=!1)),a.prototype.eventNames=function(){
var t,n,o=[];
if(0===this._eventsCount)return o;
for(n in t=this._events)e.call(t,n)&&o.push(r?n.slice(1):n);
return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(t)):o
}
,a.prototype.listeners=function(t){
var e=r?r+t:t,n=this._events[e];
if(!n)return[];
if(n.fn)return[n.fn];
for(var o=0,i=n.length,s=new Array(i);
o<i;
o++)s[o]=n[o].fn;
return s
}
,a.prototype.listenerCount=function(t){
var e=r?r+t:t,n=this._events[e];
return n?n.fn?1:n.length:0
}
,a.prototype.emit=function(t,e,n,o,i,s){
var a=r?r+t:t;
if(!this._events[a])return!1;
var u,c,l=this._events[a],f=arguments.length;
if(l.fn){
switch(l.once&&this.removeListener(t,l.fn,void 0,!0),f){
case 1:return l.fn.call(l.context),!0;
case 2:return l.fn.call(l.context,e),!0;
case 3:return l.fn.call(l.context,e,n),!0;
case 4:return l.fn.call(l.context,e,n,o),!0;
case 5:return l.fn.call(l.context,e,n,o,i),!0;
case 6:return l.fn.call(l.context,e,n,o,i,s),!0
}
for(c=1,u=new Array(f-1);
c<f;
c++)u[c-1]=arguments[c];
l.fn.apply(l.context,u)
}
else{
var h,d=l.length;
for(c=0;
c<d;
c++)switch(l[c].once&&this.removeListener(t,l[c].fn,void 0,!0),f){
case 1:l[c].fn.call(l[c].context);
break;
case 2:l[c].fn.call(l[c].context,e);
break;
case 3:l[c].fn.call(l[c].context,e,n);
break;
case 4:l[c].fn.call(l[c].context,e,n,o);
break;
default:if(!u)for(h=1,u=new Array(f-1);
h<f;
h++)u[h-1]=arguments[h];
l[c].fn.apply(l[c].context,u)
}

}
return!0
}
,a.prototype.on=function(t,e,r){
return i(this,t,e,r,!1)
}
,a.prototype.once=function(t,e,r){
return i(this,t,e,r,!0)
}
,a.prototype.removeListener=function(t,e,n,o){
var i=r?r+t:t;
if(!this._events[i])return this;
if(!e)return s(this,i),this;
var a=this._events[i];
if(a.fn)a.fn!==e||o&&!a.once||n&&a.context!==n||s(this,i);
else{
for(var u=0,c=[],l=a.length;
u<l;
u++)(a[u].fn!==e||o&&!a[u].once||n&&a[u].context!==n)&&c.push(a[u]);
c.length?this._events[i]=1===c.length?c[0]:c:s(this,i)
}
return this
}
,a.prototype.removeAllListeners=function(t){
var e;
return t?(e=r?r+t:t,this._events[e]&&s(this,e)):(this._events=new n,this._eventsCount=0),this
}
,a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=r,a.EventEmitter=a,t.exports=a
}
,"../../../node_modules/for-each/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/is-callable/index.js"),o=Object.prototype.toString,i=Object.prototype.hasOwnProperty;
t.exports=function(t,e,r){
if(!n(e))throw new TypeError("iterator must be a function");
var s;
arguments.length>=3&&(s=r),"[object Array]"===o.call(t)?function(t,e,r){
for(var n=0,o=t.length;
n<o;
n++)i.call(t,n)&&(null==r?e(t[n],n,t):e.call(r,t[n],n,t))
}
(t,e,s):"string"==typeof t?function(t,e,r){
for(var n=0,o=t.length;
n<o;
n++)null==r?e(t.charAt(n),n,t):e.call(r,t.charAt(n),n,t)
}
(t,e,s):function(t,e,r){
for(var n in t)i.call(t,n)&&(null==r?e(t[n],n,t):e.call(r,t[n],n,t))
}
(t,e,s)
}

}
,"../../../node_modules/function-bind/implementation.js":t=>{
"use strict";
var e=Object.prototype.toString,r=Math.max,n=function(t,e){
for(var r=[],n=0;
n<t.length;
n+=1)r[n]=t[n];
for(var o=0;
o<e.length;
o+=1)r[o+t.length]=e[o];
return r
}
;
t.exports=function(t){
var o=this;
if("function"!=typeof o||"[object Function]"!==e.apply(o))throw new TypeError("Function.prototype.bind called on incompatible "+o);
for(var i,s=function(t,e){
for(var r=[],n=1,o=0;
n<t.length;
n+=1,o+=1)r[o]=t[n];
return r
}
(arguments),a=r(0,o.length-s.length),u=[],c=0;
c<a;
c++)u[c]="$"+c;
if(i=Function("binder","return function ("+function(t,e){
for(var r="",n=0;
n<t.length;
n+=1)r+=t[n],n+1<t.length&&(r+=",");
return r
}
(u)+"){
 return binder.apply(this,arguments);
 
}
")((function(){
if(this instanceof i){
var e=o.apply(this,n(s,arguments));
return Object(e)===e?e:this
}
return o.apply(t,n(s,arguments))
}
)),o.prototype){
var l=function(){

}
;
l.prototype=o.prototype,i.prototype=new l,l.prototype=null
}
return i
}

}
,"../../../node_modules/function-bind/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/function-bind/implementation.js");
t.exports=Function.prototype.bind||n
}
,"../../../node_modules/get-intrinsic/index.js":(t,e,r)=>{
"use strict";
var n,o=r("../../../node_modules/es-errors/index.js"),i=r("../../../node_modules/es-errors/eval.js"),s=r("../../../node_modules/es-errors/range.js"),a=r("../../../node_modules/es-errors/ref.js"),u=r("../../../node_modules/es-errors/syntax.js"),c=r("../../../node_modules/es-errors/type.js"),l=r("../../../node_modules/es-errors/uri.js"),f=Function,h=function(t){
try{
return f('"use strict";
 return ('+t+").constructor;
")()
}
catch(t){

}

}
,d=Object.getOwnPropertyDescriptor;
if(d)try{
d({

}
,"")
}
catch(t){
d=null
}
var p=function(){
throw new c
}
,y=d?function(){
try{
return p
}
catch(t){
try{
return d(arguments,"callee").get
}
catch(t){
return p
}

}

}
():p,g=r("../../../node_modules/has-symbols/index.js")(),m=r("../../../node_modules/has-proto/index.js")(),b=Object.getPrototypeOf||(m?function(t){
return t.__proto__
}
:null),w={

}
,v="undefined"!=typeof Uint8Array&&b?b(Uint8Array):n,x={
__proto__:null,"%AggregateError%":"undefined"==typeof AggregateError?n:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?n:ArrayBuffer,"%ArrayIteratorPrototype%":g&&b?b([][Symbol.iterator]()):n,"%AsyncFromSyncIteratorPrototype%":n,"%AsyncFunction%":w,"%AsyncGenerator%":w,"%AsyncGeneratorFunction%":w,"%AsyncIteratorPrototype%":w,"%Atomics%":"undefined"==typeof Atomics?n:Atomics,"%BigInt%":"undefined"==typeof BigInt?n:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?n:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?n:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?n:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":o,"%eval%":eval,"%EvalError%":i,"%Float32Array%":"undefined"==typeof Float32Array?n:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?n:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?n:FinalizationRegistry,"%Function%":f,"%GeneratorFunction%":w,"%Int8Array%":"undefined"==typeof Int8Array?n:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?n:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?n:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":g&&b?b(b([][Symbol.iterator]())):n,"%JSON%":"object"==typeof JSON?JSON:n,"%Map%":"undefined"==typeof Map?n:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&g&&b?b((new Map)[Symbol.iterator]()):n,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?n:Promise,"%Proxy%":"undefined"==typeof Proxy?n:Proxy,"%RangeError%":s,"%ReferenceError%":a,"%Reflect%":"undefined"==typeof Reflect?n:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?n:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&g&&b?b((new Set)[Symbol.iterator]()):n,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?n:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":g&&b?b(""[Symbol.iterator]()):n,"%Symbol%":g?Symbol:n,"%SyntaxError%":u,"%ThrowTypeError%":y,"%TypedArray%":v,"%TypeError%":c,"%Uint8Array%":"undefined"==typeof Uint8Array?n:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?n:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?n:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?n:Uint32Array,"%URIError%":l,"%WeakMap%":"undefined"==typeof WeakMap?n:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?n:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?n:WeakSet
}
;
if(b)try{
null.error
}
catch(t){
var k=b(b(t));
x["%Error.prototype%"]=k
}
var S=function t(e){
var r;
if("%AsyncFunction%"===e)r=h("async function () {

}
");
else if("%GeneratorFunction%"===e)r=h("function* () {

}
");
else if("%AsyncGeneratorFunction%"===e)r=h("async function* () {

}
");
else if("%AsyncGenerator%"===e){
var n=t("%AsyncGeneratorFunction%");
n&&(r=n.prototype)
}
else if("%AsyncIteratorPrototype%"===e){
var o=t("%AsyncGenerator%");
o&&b&&(r=b(o.prototype))
}
return x[e]=r,r
}
,M={
__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]
}
,E=r("../../../node_modules/function-bind/index.js"),A=r("../../../node_modules/hasown/index.js"),I=E.call(Function.call,Array.prototype.concat),j=E.call(Function.apply,Array.prototype.splice),_=E.call(Function.call,String.prototype.replace),B=E.call(Function.call,String.prototype.slice),O=E.call(Function.call,RegExp.prototype.exec),T=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,L=/\\(\\)?/g,P=function(t,e){
var r,n=t;
if(A(M,n)&&(n="%"+(r=M[n])[0]+"%"),A(x,n)){
var o=x[n];
if(o===w&&(o=S(n)),void 0===o&&!e)throw new c("intrinsic "+t+" exists, but is not available. Please file an issue!");
return{
alias:r,name:n,value:o
}

}
throw new u("intrinsic "+t+" does not exist!")
}
;
t.exports=function(t,e){
if("string"!=typeof t||0===t.length)throw new c("intrinsic name must be a non-empty string");
if(arguments.length>1&&"boolean"!=typeof e)throw new c('"allowMissing" argument must be a boolean');
if(null===O(/^%?[^%]*%?$/,t))throw new u("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
var r=function(t){
var e=B(t,0,1),r=B(t,-1);
if("%"===e&&"%"!==r)throw new u("invalid intrinsic syntax, expected closing `%`");
if("%"===r&&"%"!==e)throw new u("invalid intrinsic syntax, expected opening `%`");
var n=[];
return _(t,T,(function(t,e,r,o){
n[n.length]=r?_(o,L,"$1"):e||t
}
)),n
}
(t),n=r.length>0?r[0]:"",o=P("%"+n+"%",e),i=o.name,s=o.value,a=!1,l=o.alias;
l&&(n=l[0],j(r,I([0,1],l)));
for(var f=1,h=!0;
f<r.length;
f+=1){
var p=r[f],y=B(p,0,1),g=B(p,-1);
if(('"'===y||"'"===y||"`"===y||'"'===g||"'"===g||"`"===g)&&y!==g)throw new u("property names with quotes must have matching quotes");
if("constructor"!==p&&h||(a=!0),A(x,i="%"+(n+="."+p)+"%"))s=x[i];
else if(null!=s){
if(!(p in s)){
if(!e)throw new c("base intrinsic for "+t+" exists, but the property is not available.");
return
}
if(d&&f+1>=r.length){
var m=d(s,p);
s=(h=!!m)&&"get"in m&&!("originalValue"in m.get)?m.get:s[p]
}
else h=A(s,p),s=s[p];
h&&!a&&(x[i]=s)
}

}
return s
}

}
,"../../../node_modules/gopd/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/get-intrinsic/index.js")("%Object.getOwnPropertyDescriptor%",!0);
if(n)try{
n([],"length")
}
catch(t){
n=null
}
t.exports=n
}
,"../../../node_modules/has-property-descriptors/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/es-define-property/index.js"),o=function(){
return!!n
}
;
o.hasArrayLengthDefineBug=function(){
if(!n)return null;
try{
return 1!==n([],"length",{
value:1
}
).length
}
catch(t){
return!0
}

}
,t.exports=o
}
,"../../../node_modules/has-proto/index.js":t=>{
"use strict";
var e={
__proto__:null,foo:{

}

}
,r=Object;
t.exports=function(){
return{
__proto__:e
}
.foo===e.foo&&!(e instanceof r)
}

}
,"../../../node_modules/has-symbols/index.js":(t,e,r)=>{
"use strict";
var n="undefined"!=typeof Symbol&&Symbol,o=r("../../../node_modules/has-symbols/shams.js");
t.exports=function(){
return"function"==typeof n&&"function"==typeof Symbol&&"symbol"==typeof n("foo")&&"symbol"==typeof Symbol("bar")&&o()
}

}
,"../../../node_modules/has-symbols/shams.js":t=>{
"use strict";
t.exports=function(){
if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;
if("symbol"==typeof Symbol.iterator)return!0;
var t={

}
,e=Symbol("test"),r=Object(e);
if("string"==typeof e)return!1;
if("[object Symbol]"!==Object.prototype.toString.call(e))return!1;
if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;
for(e in t[e]=42,t)return!1;
if("function"==typeof Object.keys&&0!==Object.keys(t).length)return!1;
if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;
var n=Object.getOwnPropertySymbols(t);
if(1!==n.length||n[0]!==e)return!1;
if(!Object.prototype.propertyIsEnumerable.call(t,e))return!1;
if("function"==typeof Object.getOwnPropertyDescriptor){
var o=Object.getOwnPropertyDescriptor(t,e);
if(42!==o.value||!0!==o.enumerable)return!1
}
return!0
}

}
,"../../../node_modules/has-tostringtag/shams.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/has-symbols/shams.js");
t.exports=function(){
return n()&&!!Symbol.toStringTag
}

}
,"../../../node_modules/hasown/index.js":(t,e,r)=>{
"use strict";
var n=Function.prototype.call,o=Object.prototype.hasOwnProperty,i=r("../../../node_modules/function-bind/index.js");
t.exports=i.call(n,o)
}
,"../../../node_modules/ieee754/index.js":(t,e)=>{
e.read=function(t,e,r,n,o){
var i,s,a=8*o-n-1,u=(1<<a)-1,c=u>>1,l=-7,f=r?o-1:0,h=r?-1:1,d=t[e+f];
for(f+=h,i=d&(1<<-l)-1,d>>=-l,l+=a;
l>0;
i=256*i+t[e+f],f+=h,l-=8);
for(s=i&(1<<-l)-1,i>>=-l,l+=n;
l>0;
s=256*s+t[e+f],f+=h,l-=8);
if(0===i)i=1-c;
else{
if(i===u)return s?NaN:1/0*(d?-1:1);
s+=Math.pow(2,n),i-=c
}
return(d?-1:1)*s*Math.pow(2,i-n)
}
,e.write=function(t,e,r,n,o,i){
var s,a,u,c=8*i-o-1,l=(1<<c)-1,f=l>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:i-1,p=n?1:-1,y=e<0||0===e&&1/e<0?1:0;
for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=l):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+f>=1?h/u:h*Math.pow(2,1-f))*u>=2&&(s++,u/=2),s+f>=l?(a=0,s=l):s+f>=1?(a=(e*u-1)*Math.pow(2,o),s+=f):(a=e*Math.pow(2,f-1)*Math.pow(2,o),s=0));
o>=8;
t[r+d]=255&a,d+=p,a/=256,o-=8);
for(s=s<<o|a,c+=o;
c>0;
t[r+d]=255&s,d+=p,s/=256,c-=8);
t[r+d-p]|=128*y
}

}
,"../../../node_modules/inherits/inherits_browser.js":t=>{
"function"==typeof Object.create?t.exports=function(t,e){
e&&(t.super_=e,t.prototype=Object.create(e.prototype,{
constructor:{
value:t,enumerable:!1,writable:!0,configurable:!0
}

}
))
}
:t.exports=function(t,e){
if(e){
t.super_=e;
var r=function(){

}
;
r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t
}

}

}
,"../../../node_modules/is-arguments/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/has-tostringtag/shams.js")(),o=r("../../../node_modules/call-bind/callBound.js")("Object.prototype.toString"),i=function(t){
return!(n&&t&&"object"==typeof t&&Symbol.toStringTag in t)&&"[object Arguments]"===o(t)
}
,s=function(t){
return!!i(t)||null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Array]"!==o(t)&&"[object Function]"===o(t.callee)
}
,a=function(){
return i(arguments)
}
();
i.isLegacyArguments=s,t.exports=a?i:s
}
,"../../../node_modules/is-callable/index.js":t=>{
"use strict";
var e,r,n=Function.prototype.toString,o="object"==typeof Reflect&&null!==Reflect&&Reflect.apply;
if("function"==typeof o&&"function"==typeof Object.defineProperty)try{
e=Object.defineProperty({

}
,"length",{
get:function(){
throw r
}

}
),r={

}
,o((function(){
throw 42
}
),null,e)
}
catch(t){
t!==r&&(o=null)
}
else o=null;
var i=/^\s*class\b/,s=function(t){
try{
var e=n.call(t);
return i.test(e)
}
catch(t){
return!1
}

}
,a=function(t){
try{
return!s(t)&&(n.call(t),!0)
}
catch(t){
return!1
}

}
,u=Object.prototype.toString,c="function"==typeof Symbol&&!!Symbol.toStringTag,l=!(0 in[,]),f=function(){
return!1
}
;
if("object"==typeof document){
var h=document.all;
u.call(h)===u.call(document.all)&&(f=function(t){
if((l||!t)&&(void 0===t||"object"==typeof t))try{
var e=u.call(t);
return("[object HTMLAllCollection]"===e||"[object HTML document.all class]"===e||"[object HTMLCollection]"===e||"[object Object]"===e)&&null==t("")
}
catch(t){

}
return!1
}
)
}
t.exports=o?function(t){
if(f(t))return!0;
if(!t)return!1;
if("function"!=typeof t&&"object"!=typeof t)return!1;
try{
o(t,null,e)
}
catch(t){
if(t!==r)return!1
}
return!s(t)&&a(t)
}
:function(t){
if(f(t))return!0;
if(!t)return!1;
if("function"!=typeof t&&"object"!=typeof t)return!1;
if(c)return a(t);
if(s(t))return!1;
var e=u.call(t);
return!("[object Function]"!==e&&"[object GeneratorFunction]"!==e&&!/^\[object HTML/.test(e))&&a(t)
}

}
,"../../../node_modules/is-generator-function/index.js":(t,e,r)=>{
"use strict";
var n,o=Object.prototype.toString,i=Function.prototype.toString,s=/^\s*(?:function)?\*/,a=r("../../../node_modules/has-tostringtag/shams.js")(),u=Object.getPrototypeOf;
t.exports=function(t){
if("function"!=typeof t)return!1;
if(s.test(i.call(t)))return!0;
if(!a)return"[object GeneratorFunction]"===o.call(t);
if(!u)return!1;
if(void 0===n){
var e=function(){
if(!a)return!1;
try{
return Function("return function*() {

}
")()
}
catch(t){

}

}
();
n=!!e&&u(e)
}
return u(t)===n
}

}
,"../../../node_modules/is-nan/implementation.js":t=>{
"use strict";
t.exports=function(t){
return t!=t
}

}
,"../../../node_modules/is-nan/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/call-bind/index.js"),o=r("../../../node_modules/define-properties/index.js"),i=r("../../../node_modules/is-nan/implementation.js"),s=r("../../../node_modules/is-nan/polyfill.js"),a=r("../../../node_modules/is-nan/shim.js"),u=n(s(),Number);
o(u,{
getPolyfill:s,implementation:i,shim:a
}
),t.exports=u
}
,"../../../node_modules/is-nan/polyfill.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/is-nan/implementation.js");
t.exports=function(){
return Number.isNaN&&Number.isNaN(NaN)&&!Number.isNaN("a")?Number.isNaN:n
}

}
,"../../../node_modules/is-nan/shim.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/define-properties/index.js"),o=r("../../../node_modules/is-nan/polyfill.js");
t.exports=function(){
var t=o();
return n(Number,{
isNaN:t
}
,{
isNaN:function(){
return Number.isNaN!==t
}

}
),t
}

}
,"../../../node_modules/is-typed-array/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/which-typed-array/index.js");
t.exports=function(t){
return!!n(t)
}

}
,"../../../node_modules/jayson/lib/client/browser/index.js":(t,e,r)=>{
"use strict";
const n=r("../../../node_modules/uuid/dist/esm-browser/index.js").v4,o=r("../../../node_modules/jayson/lib/generateRequest.js"),i=function(t,e){
if(!(this instanceof i))return new i(t,e);
e||(e={

}
),this.options={
reviver:void 0!==e.reviver?e.reviver:null,replacer:void 0!==e.replacer?e.replacer:null,generator:void 0!==e.generator?e.generator:function(){
return n()
}
,version:void 0!==e.version?e.version:2,notificationIdNull:"boolean"==typeof e.notificationIdNull&&e.notificationIdNull
}
,this.callServer=t
}
;
t.exports=i,i.prototype.request=function(t,e,r,n){
const i=this;
let s=null;
const a=Array.isArray(t)&&"function"==typeof e;
if(1===this.options.version&&a)throw new TypeError("JSON-RPC 1.0 does not support batching");
if(a||!a&&t&&"object"==typeof t&&"function"==typeof e)n=e,s=t;
else{
"function"==typeof r&&(n=r,r=void 0);
const i="function"==typeof n;
try{
s=o(t,e,r,{
generator:this.options.generator,version:this.options.version,notificationIdNull:this.options.notificationIdNull
}
)
}
catch(t){
if(i)return n(t);
throw t
}
if(!i)return s
}
let u;
try{
u=JSON.stringify(s,this.options.replacer)
}
catch(t){
return n(t)
}
return this.callServer(u,(function(t,e){
i._parseResponse(t,e,n)
}
)),s
}
,i.prototype._parseResponse=function(t,e,r){
if(t)return void r(t);
if(!e)return r();
let n;
try{
n=JSON.parse(e,this.options.reviver)
}
catch(t){
return r(t)
}
if(3===r.length){
if(Array.isArray(n)){
const t=function(t){
return void 0!==t.error
}
,e=function(e){
return!t(e)
}
;
return r(null,n.filter(t),n.filter(e))
}
return r(null,n.error,n.result)
}
r(null,n)
}

}
,"../../../node_modules/jayson/lib/generateRequest.js":(t,e,r)=>{
"use strict";
const n=r("../../../node_modules/uuid/dist/esm-browser/index.js").v4;
t.exports=function(t,e,r,o){
if("string"!=typeof t)throw new TypeError(t+" must be a string");
const i="number"==typeof(o=o||{

}
).version?o.version:2;
if(1!==i&&2!==i)throw new TypeError(i+" must be 1 or 2");
const s={
method:t
}
;
if(2===i&&(s.jsonrpc="2.0"),e){
if("object"!=typeof e&&!Array.isArray(e))throw new TypeError(e+" must be an object, array or omitted");
s.params=e
}
if(void 0===r){
const t="function"==typeof o.generator?o.generator:function(){
return n()
}
;
s.id=t(s,o)
}
else 2===i&&null===r?o.notificationIdNull&&(s.id=null):s.id=r;
return s
}

}
,"../../../node_modules/object-is/implementation.js":t=>{
"use strict";
var e=function(t){
return t!=t
}
;
t.exports=function(t,r){
return 0===t&&0===r?1/t==1/r:t===r||!(!e(t)||!e(r))
}

}
,"../../../node_modules/object-is/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/define-properties/index.js"),o=r("../../../node_modules/call-bind/index.js"),i=r("../../../node_modules/object-is/implementation.js"),s=r("../../../node_modules/object-is/polyfill.js"),a=r("../../../node_modules/object-is/shim.js"),u=o(s(),Object);
n(u,{
getPolyfill:s,implementation:i,shim:a
}
),t.exports=u
}
,"../../../node_modules/object-is/polyfill.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/object-is/implementation.js");
t.exports=function(){
return"function"==typeof Object.is?Object.is:n
}

}
,"../../../node_modules/object-is/shim.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/object-is/polyfill.js"),o=r("../../../node_modules/define-properties/index.js");
t.exports=function(){
var t=n();
return o(Object,{
is:t
}
,{
is:function(){
return Object.is!==t
}

}
),t
}

}
,"../../../node_modules/object-keys/implementation.js":(t,e,r)=>{
"use strict";
var n;
if(!Object.keys){
var o=Object.prototype.hasOwnProperty,i=Object.prototype.toString,s=r("../../../node_modules/object-keys/isArguments.js"),a=Object.prototype.propertyIsEnumerable,u=!a.call({
toString:null
}
,"toString"),c=a.call((function(){

}
),"prototype"),l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=function(t){
var e=t.constructor;
return e&&e.prototype===t
}
,h={
$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0
}
,d=function(){
if("undefined"==typeof window)return!1;
for(var t in window)try{
if(!h["$"+t]&&o.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{
f(window[t])
}
catch(t){
return!0
}

}
catch(t){
return!0
}
return!1
}
();
n=function(t){
var e=null!==t&&"object"==typeof t,r="[object Function]"===i.call(t),n=s(t),a=e&&"[object String]"===i.call(t),h=[];
if(!e&&!r&&!n)throw new TypeError("Object.keys called on a non-object");
var p=c&&r;
if(a&&t.length>0&&!o.call(t,0))for(var y=0;
y<t.length;
++y)h.push(String(y));
if(n&&t.length>0)for(var g=0;
g<t.length;
++g)h.push(String(g));
else for(var m in t)p&&"prototype"===m||!o.call(t,m)||h.push(String(m));
if(u)for(var b=function(t){
if("undefined"==typeof window||!d)return f(t);
try{
return f(t)
}
catch(t){
return!1
}

}
(t),w=0;
w<l.length;
++w)b&&"constructor"===l[w]||!o.call(t,l[w])||h.push(l[w]);
return h
}

}
t.exports=n
}
,"../../../node_modules/object-keys/index.js":(t,e,r)=>{
"use strict";
var n=Array.prototype.slice,o=r("../../../node_modules/object-keys/isArguments.js"),i=Object.keys,s=i?function(t){
return i(t)
}
:r("../../../node_modules/object-keys/implementation.js"),a=Object.keys;
s.shim=function(){
if(Object.keys){
var t=function(){
var t=Object.keys(arguments);
return t&&t.length===arguments.length
}
(1,2);
t||(Object.keys=function(t){
return o(t)?a(n.call(t)):a(t)
}
)
}
else Object.keys=s;
return Object.keys||s
}
,t.exports=s
}
,"../../../node_modules/object-keys/isArguments.js":t=>{
"use strict";
var e=Object.prototype.toString;
t.exports=function(t){
var r=e.call(t),n="[object Arguments]"===r;
return n||(n="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===e.call(t.callee)),n
}

}
,"../../../node_modules/possible-typed-array-names/index.js":t=>{
"use strict";
t.exports=["Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array"]
}
,"../../../node_modules/process/browser.js":t=>{
var e,r,n=t.exports={

}
;
function o(){
throw new Error("setTimeout has not been defined")
}
function i(){
throw new Error("clearTimeout has not been defined")
}
function s(t){
if(e===setTimeout)return setTimeout(t,0);
if((e===o||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);
try{
return e(t,0)
}
catch(r){
try{
return e.call(null,t,0)
}
catch(r){
return e.call(this,t,0)
}

}

}
!function(){
try{
e="function"==typeof setTimeout?setTimeout:o
}
catch(t){
e=o
}
try{
r="function"==typeof clearTimeout?clearTimeout:i
}
catch(t){
r=i
}

}
();
var a,u=[],c=!1,l=-1;
function f(){
c&&a&&(c=!1,a.length?u=a.concat(u):l=-1,u.length&&h())
}
function h(){
if(!c){
var t=s(f);
c=!0;
for(var e=u.length;
e;
){
for(a=u,u=[];
++l<e;
)a&&a[l].run();
l=-1,e=u.length
}
a=null,c=!1,function(t){
if(r===clearTimeout)return clearTimeout(t);
if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);
try{
return r(t)
}
catch(e){
try{
return r.call(null,t)
}
catch(e){
return r.call(this,t)
}

}

}
(t)
}

}
function d(t,e){
this.fun=t,this.array=e
}
function p(){

}
n.nextTick=function(t){
var e=new Array(arguments.length-1);
if(arguments.length>1)for(var r=1;
r<arguments.length;
r++)e[r-1]=arguments[r];
u.push(new d(t,e)),1!==u.length||c||s(h)
}
,d.prototype.run=function(){
this.fun.apply(null,this.array)
}
,n.title="browser",n.browser=!0,n.env={

}
,n.argv=[],n.version="",n.versions={

}
,n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){
return[]
}
,n.binding=function(t){
throw new Error("process.binding is not supported")
}
,n.cwd=function(){
return"/"
}
,n.chdir=function(t){
throw new Error("process.chdir is not supported")
}
,n.umask=function(){
return 0
}

}
,"../../../node_modules/regenerator-runtime/runtime.js":t=>{
var e=function(t){
"use strict";
var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{

}
,i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",a=o.toStringTag||"@@toStringTag";
function u(t,e,r){
return Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
}
),t[e]
}
try{
u({

}
,"")
}
catch(t){
u=function(t,e,r){
return t[e]=r
}

}
function c(t,e,r,n){
var o=e&&e.prototype instanceof g?e:g,i=Object.create(o.prototype),s=new j(n||[]);
return i._invoke=function(t,e,r){
var n=f;
return function(o,i){
if(n===d)throw new Error("Generator is already running");
if(n===p){
if("throw"===o)throw i;
return B()
}
for(r.method=o,r.arg=i;
;
){
var s=r.delegate;
if(s){
var a=E(s,r);
if(a){
if(a===y)continue;
return a
}

}
if("next"===r.method)r.sent=r._sent=r.arg;
else if("throw"===r.method){
if(n===f)throw n=p,r.arg;
r.dispatchException(r.arg)
}
else"return"===r.method&&r.abrupt("return",r.arg);
n=d;
var u=l(t,e,r);
if("normal"===u.type){
if(n=r.done?p:h,u.arg===y)continue;
return{
value:u.arg,done:r.done
}

}
"throw"===u.type&&(n=p,r.method="throw",r.arg=u.arg)
}

}

}
(t,r,s),i
}
function l(t,e,r){
try{
return{
type:"normal",arg:t.call(e,r)
}

}
catch(t){
return{
type:"throw",arg:t
}

}

}
t.wrap=c;
var f="suspendedStart",h="suspendedYield",d="executing",p="completed",y={

}
;
function g(){

}
function m(){

}
function b(){

}
var w={

}
;
u(w,i,(function(){
return this
}
));
var v=Object.getPrototypeOf,x=v&&v(v(_([])));
x&&x!==r&&n.call(x,i)&&(w=x);
var k=b.prototype=g.prototype=Object.create(w);
function S(t){
["next","throw","return"].forEach((function(e){
u(t,e,(function(t){
return this._invoke(e,t)
}
))
}
))
}
function M(t,e){
function r(o,i,s,a){
var u=l(t[o],t,i);
if("throw"!==u.type){
var c=u.arg,f=c.value;
return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){
r("next",t,s,a)
}
),(function(t){
r("throw",t,s,a)
}
)):e.resolve(f).then((function(t){
c.value=t,s(c)
}
),(function(t){
return r("throw",t,s,a)
}
))
}
a(u.arg)
}
var o;
this._invoke=function(t,n){
function i(){
return new e((function(e,o){
r(t,n,e,o)
}
))
}
return o=o?o.then(i,i):i()
}

}
function E(t,r){
var n=t.iterator[r.method];
if(n===e){
if(r.delegate=null,"throw"===r.method){
if(t.iterator.return&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return y;
r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")
}
return y
}
var o=l(n,t.iterator,r.arg);
if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;
var i=o.arg;
return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)
}
function A(t){
var e={
tryLoc:t[0]
}
;
1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)
}
function I(t){
var e=t.completion||{

}
;
e.type="normal",delete e.arg,t.completion=e
}
function j(t){
this.tryEntries=[{
tryLoc:"root"
}
],t.forEach(A,this),this.reset(!0)
}
function _(t){
if(t){
var r=t[i];
if(r)return r.call(t);
if("function"==typeof t.next)return t;
if(!isNaN(t.length)){
var o=-1,s=function r(){
for(;
++o<t.length;
)if(n.call(t,o))return r.value=t[o],r.done=!1,r;
return r.value=e,r.done=!0,r
}
;
return s.next=s
}

}
return{
next:B
}

}
function B(){
return{
value:e,done:!0
}

}
return m.prototype=b,u(k,"constructor",b),u(b,"constructor",m),m.displayName=u(b,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){
var e="function"==typeof t&&t.constructor;
return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))
}
,t.mark=function(t){
return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,u(t,a,"GeneratorFunction")),t.prototype=Object.create(k),t
}
,t.awrap=function(t){
return{
__await:t
}

}
,S(M.prototype),u(M.prototype,s,(function(){
return this
}
)),t.AsyncIterator=M,t.async=function(e,r,n,o,i){
void 0===i&&(i=Promise);
var s=new M(c(e,r,n,o),i);
return t.isGeneratorFunction(r)?s:s.next().then((function(t){
return t.done?t.value:s.next()
}
))
}
,S(k),u(k,a,"Generator"),u(k,i,(function(){
return this
}
)),u(k,"toString",(function(){
return"[object Generator]"
}
)),t.keys=function(t){
var e=[];
for(var r in t)e.push(r);
return e.reverse(),function r(){
for(;
e.length;
){
var n=e.pop();
if(n in t)return r.value=n,r.done=!1,r
}
return r.done=!0,r
}

}
,t.values=_,j.prototype={
constructor:j,reset:function(t){
if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(I),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)
}
,stop:function(){
this.done=!0;
var t=this.tryEntries[0].completion;
if("throw"===t.type)throw t.arg;
return this.rval
}
,dispatchException:function(t){
if(this.done)throw t;
var r=this;
function o(n,o){
return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o
}
for(var i=this.tryEntries.length-1;
i>=0;
--i){
var s=this.tryEntries[i],a=s.completion;
if("root"===s.tryLoc)return o("end");
if(s.tryLoc<=this.prev){
var u=n.call(s,"catchLoc"),c=n.call(s,"finallyLoc");
if(u&&c){
if(this.prev<s.catchLoc)return o(s.catchLoc,!0);
if(this.prev<s.finallyLoc)return o(s.finallyLoc)
}
else if(u){
if(this.prev<s.catchLoc)return o(s.catchLoc,!0)
}
else{
if(!c)throw new Error("try statement without catch or finally");
if(this.prev<s.finallyLoc)return o(s.finallyLoc)
}

}

}

}
,abrupt:function(t,e){
for(var r=this.tryEntries.length-1;
r>=0;
--r){
var o=this.tryEntries[r];
if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){
var i=o;
break
}

}
i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);
var s=i?i.completion:{

}
;
return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(s)
}
,complete:function(t,e){
if("throw"===t.type)throw t.arg;
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y
}
,finish:function(t){
for(var e=this.tryEntries.length-1;
e>=0;
--e){
var r=this.tryEntries[e];
if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),y
}

}
,catch:function(t){
for(var e=this.tryEntries.length-1;
e>=0;
--e){
var r=this.tryEntries[e];
if(r.tryLoc===t){
var n=r.completion;
if("throw"===n.type){
var o=n.arg;
I(r)
}
return o
}

}
throw new Error("illegal catch attempt")
}
,delegateYield:function(t,r,n){
return this.delegate={
iterator:_(t),resultName:r,nextLoc:n
}
,"next"===this.method&&(this.arg=e),y
}

}
,t
}
(t.exports);
try{
regeneratorRuntime=e
}
catch(t){
"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)
}

}
,"../../../node_modules/rpc-websockets/dist/lib/client.js":(t,e,r)=>{
"use strict";
r("../../../node_modules/buffer/index.js").Buffer;
var n=r("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js"),o=(n(r("../../../node_modules/@babel/runtime/regenerator/index.js")),n(r("../../../node_modules/@babel/runtime/helpers/asyncToGenerator.js")),n(r("../../../node_modules/@babel/runtime/helpers/typeof.js")),n(r("../../../node_modules/@babel/runtime/helpers/classCallCheck.js")),n(r("../../../node_modules/@babel/runtime/helpers/createClass.js")),n(r("../../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js")),n(r("../../../node_modules/@babel/runtime/helpers/getPrototypeOf.js")),n(r("../../../node_modules/@babel/runtime/helpers/inherits.js")),r("../../../node_modules/eventemitter3/index.js"));
r("../../../node_modules/rpc-websockets/dist/lib/utils.js");
o.EventEmitter
}
,"../../../node_modules/rpc-websockets/dist/lib/client/websocket.browser.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js"),o=n(r("../../../node_modules/@babel/runtime/helpers/classCallCheck.js")),i=n(r("../../../node_modules/@babel/runtime/helpers/createClass.js")),s=n(r("../../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js")),a=n(r("../../../node_modules/@babel/runtime/helpers/getPrototypeOf.js")),u=n(r("../../../node_modules/@babel/runtime/helpers/inherits.js"));
function c(t,e,r){
return e=(0,a.default)(e),(0,s.default)(t,l()?Reflect.construct(e,r||[],(0,a.default)(t).constructor):e.apply(t,r))
}
function l(){
try{
var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){

}
)))
}
catch(t){

}
return(l=function(){
return!!t
}
)()
}
r("../../../node_modules/eventemitter3/index.js").EventEmitter
}
,"../../../node_modules/rpc-websockets/dist/lib/utils.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(e,"__esModule",{
value:!0
}
),e.DefaultDataPack=void 0,e.createError=function(t,e){
var r={
code:t,message:s.get(t)||"Internal Server Error"
}
;
return e&&(r.data=e),r
}
;
var o=n(r("../../../node_modules/@babel/runtime/helpers/classCallCheck.js")),i=n(r("../../../node_modules/@babel/runtime/helpers/createClass.js")),s=new Map([[-32e3,"Event not provided"],[-32600,"Invalid Request"],[-32601,"Method not found"],[-32602,"Invalid params"],[-32603,"Internal error"],[-32604,"Params not found"],[-32605,"Method forbidden"],[-32606,"Event forbidden"],[-32700,"Parse error"]]);
e.DefaultDataPack=function(){
return(0,i.default)((function t(){
(0,o.default)(this,t)
}
),[{
key:"encode",value:function(t){
return JSON.stringify(t)
}

}
,{
key:"decode",value:function(t){
return JSON.parse(t)
}

}
])
}
()
}
,"../../../node_modules/safe-buffer/index.js":(t,e,r)=>{
var n=r("../../../node_modules/buffer/index.js"),o=n.Buffer;
function i(t,e){
for(var r in t)e[r]=t[r]
}
function s(t,e,r){
return o(t,e,r)
}
o.from&&o.alloc&&o.allocUnsafe&&o.allocUnsafeSlow?t.exports=n:(i(n,e),e.Buffer=s),i(o,s),s.from=function(t,e,r){
if("number"==typeof t)throw new TypeError("Argument must not be a number");
return o(t,e,r)
}
,s.alloc=function(t,e,r){
if("number"!=typeof t)throw new TypeError("Argument must be a number");
var n=o(t);
return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n
}
,s.allocUnsafe=function(t){
if("number"!=typeof t)throw new TypeError("Argument must be a number");
return o(t)
}
,s.allocUnsafeSlow=function(t){
if("number"!=typeof t)throw new TypeError("Argument must be a number");
return n.SlowBuffer(t)
}

}
,"../../../node_modules/set-function-length/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/get-intrinsic/index.js"),o=r("../../../node_modules/define-data-property/index.js"),i=r("../../../node_modules/has-property-descriptors/index.js")(),s=r("../../../node_modules/gopd/index.js"),a=r("../../../node_modules/es-errors/type.js"),u=n("%Math.floor%");
t.exports=function(t,e){
if("function"!=typeof t)throw new a("`fn` is not a function");
if("number"!=typeof e||e<0||e>4294967295||u(e)!==e)throw new a("`length` must be a positive 32-bit integer");
var r=arguments.length>2&&!!arguments[2],n=!0,c=!0;
if("length"in t&&s){
var l=s(t,"length");
l&&!l.configurable&&(n=!1),l&&!l.writable&&(c=!1)
}
return(n||c||!r)&&(i?o(t,"length",e,!0,!0):o(t,"length",e)),t
}

}
,"../../../node_modules/text-encoding-utf-8/lib/encoding.lib.js":(t,e)=>{
"use strict";
function r(t,e,r){
return e<=t&&t<=r
}
function n(t){
if(void 0===t)return{

}
;
if(t===Object(t))return t;
throw TypeError("Could not convert argument to dictionary")
}
function o(t){
this.tokens=[].slice.call(t)
}
o.prototype={
endOfStream:function(){
return!this.tokens.length
}
,read:function(){
return this.tokens.length?this.tokens.shift():-1
}
,prepend:function(t){
if(Array.isArray(t))for(var e=t;
e.length;
)this.tokens.unshift(e.pop());
else this.tokens.unshift(t)
}
,push:function(t){
if(Array.isArray(t))for(var e=t;
e.length;
)this.tokens.push(e.shift());
else this.tokens.push(t)
}

}
;
var i=-1;
function s(t,e){
if(t)throw TypeError("Decoder error");
return e||65533
}
var a="utf-8";
function u(t,e){
if(!(this instanceof u))return new u(t,e);
if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");
e=n(e),this._streaming=!1,this._BOMseen=!1,this._decoder=null,this._fatal=Boolean(e.fatal),this._ignoreBOM=Boolean(e.ignoreBOM),Object.defineProperty(this,"encoding",{
value:"utf-8"
}
),Object.defineProperty(this,"fatal",{
value:this._fatal
}
),Object.defineProperty(this,"ignoreBOM",{
value:this._ignoreBOM
}
)
}
function c(t,e){
if(!(this instanceof c))return new c(t,e);
if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");
e=n(e),this._streaming=!1,this._encoder=null,this._options={
fatal:Boolean(e.fatal)
}
,Object.defineProperty(this,"encoding",{
value:"utf-8"
}
)
}
function l(t){
var e=t.fatal,n=0,o=0,a=0,u=128,c=191;
this.handler=function(t,l){
if(-1===l&&0!==a)return a=0,s(e);
if(-1===l)return i;
if(0===a){
if(r(l,0,127))return l;
if(r(l,194,223))a=1,n=l-192;
else if(r(l,224,239))224===l&&(u=160),237===l&&(c=159),a=2,n=l-224;
else{
if(!r(l,240,244))return s(e);
240===l&&(u=144),244===l&&(c=143),a=3,n=l-240
}
return n<<=6*a,null
}
if(!r(l,u,c))return n=a=o=0,u=128,c=191,t.prepend(l),s(e);
if(u=128,c=191,n+=l-128<<6*(a-(o+=1)),o!==a)return null;
var f=n;
return n=a=o=0,f
}

}
function f(t){
t.fatal,this.handler=function(t,e){
if(-1===e)return i;
if(r(e,0,127))return e;
var n,o;
r(e,128,2047)?(n=1,o=192):r(e,2048,65535)?(n=2,o=224):r(e,65536,1114111)&&(n=3,o=240);
for(var s=[(e>>6*n)+o];
n>0;
){
var a=e>>6*(n-1);
s.push(128|63&a),n-=1
}
return s
}

}
u.prototype={
decode:function(t,e){
var r;
r="object"==typeof t&&t instanceof ArrayBuffer?new Uint8Array(t):"object"==typeof t&&"buffer"in t&&t.buffer instanceof ArrayBuffer?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):new Uint8Array(0),e=n(e),this._streaming||(this._decoder=new l({
fatal:this._fatal
}
),this._BOMseen=!1),this._streaming=Boolean(e.stream);
for(var s,a=new o(r),u=[];
!a.endOfStream()&&(s=this._decoder.handler(a,a.read()))!==i;
)null!==s&&(Array.isArray(s)?u.push.apply(u,s):u.push(s));
if(!this._streaming){
do{
if((s=this._decoder.handler(a,a.read()))===i)break;
null!==s&&(Array.isArray(s)?u.push.apply(u,s):u.push(s))
}
while(!a.endOfStream());
this._decoder=null
}
return u.length&&(-1===["utf-8"].indexOf(this.encoding)||this._ignoreBOM||this._BOMseen||(65279===u[0]?(this._BOMseen=!0,u.shift()):this._BOMseen=!0)),function(t){
for(var e="",r=0;
r<t.length;
++r){
var n=t[r];
n<=65535?e+=String.fromCharCode(n):(n-=65536,e+=String.fromCharCode(55296+(n>>10),56320+(1023&n)))
}
return e
}
(u)
}

}
,c.prototype={
encode:function(t,e){
t=t?String(t):"",e=n(e),this._streaming||(this._encoder=new f(this._options)),this._streaming=Boolean(e.stream);
for(var r,s=[],a=new o(function(t){
for(var e=String(t),r=e.length,n=0,o=[];
n<r;
){
var i=e.charCodeAt(n);
if(i<55296||i>57343)o.push(i);
else if(56320<=i&&i<=57343)o.push(65533);
else if(55296<=i&&i<=56319)if(n===r-1)o.push(65533);
else{
var s=t.charCodeAt(n+1);
if(56320<=s&&s<=57343){
var a=1023&i,u=1023&s;
o.push(65536+(a<<10)+u),n+=1
}
else o.push(65533)
}
n+=1
}
return o
}
(t));
!a.endOfStream()&&(r=this._encoder.handler(a,a.read()))!==i;
)Array.isArray(r)?s.push.apply(s,r):s.push(r);
if(!this._streaming){
for(;
(r=this._encoder.handler(a,a.read()))!==i;
)Array.isArray(r)?s.push.apply(s,r):s.push(r);
this._encoder=null
}
return new Uint8Array(s)
}

}
,e.TextEncoder=c,e.TextDecoder=u
}
,"./src/scripts/inpage.ts":(t,e,r)=>{
"use strict";
var n={

}
;
r.r(n),r.d(n,{
aInRange:()=>Xt,abool:()=>Pt,abytes:()=>Lt,bitGet:()=>ee,bitLen:()=>te,bitMask:()=>ne,bitSet:()=>re,bytesToHex:()=>zt,bytesToNumberBE:()=>Ct,bytesToNumberLE:()=>Ft,concatBytes:()=>Gt,createHmacDrbg:()=>se,ensureBytes:()=>Vt,equalBytes:()=>Jt,hexToBytes:()=>Wt,hexToNumber:()=>Ut,inRange:()=>Qt,isBytes:()=>Tt,memoized:()=>le,notImplemented:()=>ce,numberToBytesBE:()=>Kt,numberToBytesLE:()=>$t,numberToHexUnpadded:()=>Rt,numberToVarBytesBE:()=>Ht,utf8ToBytes:()=>Zt,validateObject:()=>ue
}
);
var o,i=r("../../../node_modules/console-browserify/index.js");
class s extends Event{
constructor(t){
super("wallet-standard:register-wallet",{
bubbles:!1,cancelable:!1,composed:!1
}
),o.set(this,void 0),function(t,e,r,n,o){
if("m"===n)throw new TypeError("Private method is not writable");
if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");
if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");
"a"===n?o.call(t,r):o?o.value=r:e.set(t,r)
}
(this,o,t,"f")
}
get detail(){
return function(t,e,r,n){
if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");
if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");
return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)
}
(this,o,"f")
}
get type(){
return"wallet-standard:register-wallet"
}
preventDefault(){
throw new Error("preventDefault cannot be called")
}
stopImmediatePropagation(){
throw new Error("stopImmediatePropagation cannot be called")
}
stopPropagation(){
throw new Error("stopPropagation cannot be called")
}

}
o=new WeakMap;
const a="standard:connect",u="standard:disconnect",c="standard:events",l="solana:mainnet",f="solana:devnet",h="solana:testnet",d=[l,f,h,"solana:localnet"];
function p(t){
return d.includes(t)
}
const y="solana:signAndSendTransaction",g="solana:signTransaction",m="solana:signMessage";
var b,w,v,x,k,S,M=r("../../../node_modules/bs58/index.js"),E=r.n(M),A=function(t,e,r,n){
if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");
if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");
return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)
}
,I=function(t,e,r,n,o){
if("m"===n)throw new TypeError("Private method is not writable");
if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");
if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");
return"a"===n?o.call(t,r):o?o.value=r:e.set(t,r),r
}
;
class j{
get address(){
return A(this,b,"f")
}
get publicKey(){
return A(this,w,"f").slice()
}
get chains(){
return A(this,v,"f").slice()
}
get features(){
return A(this,x,"f").slice()
}
get label(){
return A(this,k,"f")
}
get icon(){
return A(this,S,"f")
}
constructor({
address:t,publicKey:e,label:r,icon:n,chains:o,features:i
}
){
b.set(this,void 0),w.set(this,void 0),v.set(this,void 0),x.set(this,void 0),k.set(this,void 0),S.set(this,void 0),new.target===j&&Object.freeze(this),I(this,b,t,"f"),I(this,w,e,"f"),I(this,v,o,"f"),I(this,x,i,"f"),I(this,k,r,"f"),I(this,S,n,"f")
}

}
b=new WeakMap,w=new WeakMap,v=new WeakMap,x=new WeakMap,k=new WeakMap,S=new WeakMap;
var _,B,O,T,L,P,N,z,R,U,D,q,W,C,F,K,$,H,V,G=function(t,e,r,n){
return new(r||(r=Promise))((function(o,i){
function s(t){
try{
u(n.next(t))
}
catch(t){
i(t)
}

}
function a(t){
try{
u(n.throw(t))
}
catch(t){
i(t)
}

}
function u(t){
var e;
t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)
}
))).then(s,a)
}
u((n=n.apply(t,e||[])).next())
}
))
}
,J=function(t,e,r,n){
if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");
if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");
return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)
}
,Z=function(t,e,r,n,o){
if("m"===n)throw new TypeError("Private method is not writable");
if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");
if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");
return"a"===n?o.call(t,r):o?o.value=r:e.set(t,r),r
}
;
class Y{
get version(){
return J(this,B,"f")
}
get name(){
return J(this,L,"f")
}
get icon(){
return J(this,P,"f")
}
get chains(){
return[l,f,h]
}
get accounts(){
return J(this,N,"f")?[J(this,N,"f")]:[]
}
get features(){
return{
[a]:{
version:"1.0.0",connect:J(this,F,"f")
}
,[u]:{
version:"1.0.0",disconnect:J(this,K,"f")
}
,[c]:{
version:"1.0.0",on:J(this,R,"f")
}
,[y]:{
version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:J(this,$,"f")
}
,[g]:{
version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:J(this,H,"f")
}
,[m]:{
version:"1.0.0",signMessage:J(this,V,"f")
}

}

}
constructor(){
_.add(this),B.set(this,"1.0.0"),O.set(this,window.solflare),T.set(this,{

}
),L.set(this,"Solflare"),P.set(this,"data:image/svg+xml;
base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+"),N.set(this,null),z.set(this,(t=>new j({
address:t.toString(),publicKey:t.toBytes(),chains:this.chains,features:Object.keys(this.features)
}
))),R.set(this,((t,e)=>{
var r;
return(null===(r=J(this,T,"f")[t])||void 0===r?void 0:r.push(e))||(J(this,T,"f")[t]=[e]),()=>J(this,_,"m",D).call(this,t,e)
}
)),q.set(this,(()=>{
J(this,O,"f").publicKey&&(J(this,N,"f")&&J(this,N,"f").address===J(this,O,"f").publicKey.toString()&&J(this,N,"f").publicKey.toString()===J(this,O,"f").publicKey.toString()||(Z(this,N,J(this,z,"f").call(this,J(this,O,"f").publicKey),"f"),J(this,_,"m",U).call(this,"change",{
accounts:this.accounts
}
)))
}
)),W.set(this,(()=>{
J(this,N,"f")&&(Z(this,N,null,"f"),J(this,_,"m",U).call(this,"change",{
accounts:this.accounts
}
))
}
)),C.set(this,(()=>{
J(this,O,"f").publicKey?J(this,q,"f").call(this):J(this,W,"f").call(this)
}
)),F.set(this,(t=>G(this,void 0,void 0,(function*(){
var e;
if(!J(this,O,"f").publicKey&&!(yield J(this,O,"f").request({
method:"connect",params:{
silent:null!==(e=null==t?void 0:t.silent)&&void 0!==e&&e
}

}
)))throw new Error("Connection rejected");
return J(this,q,"f").call(this),{
accounts:this.accounts
}

}
)))),K.set(this,(()=>G(this,void 0,void 0,(function*(){
yield J(this,O,"f").request({
method:"disconnect"
}
)
}
)))),$.set(this,((...t)=>G(this,void 0,void 0,(function*(){
if(!J(this,N,"f"))throw new Error("Wallet not connected");
const e=[];
for(const r of t){
const{
transaction:t,account:n,chain:o,options:i
}
=r;
if(n!==J(this,N,"f"))throw new Error("Invalid account");
if(!p(o))throw new Error("Invalid chain");
const{
signature:s
}
=yield J(this,O,"f").request({
method:"signAndSendTransaction",params:{
transaction:E().encode(t),options:i
}

}
);
e.push({
signature:E().decode(s)
}
)
}
return e
}
)))),H.set(this,((...t)=>G(this,void 0,void 0,(function*(){
if(!J(this,N,"f"))throw new Error("Wallet not connected");
if(1===t.length){
const{
transaction:e,account:r,chain:n
}
=t[0];
if(r!==J(this,N,"f"))throw new Error("Invalid account");
if(n&&!p(n))throw new Error("Invalid chain");
const{
transaction:o
}
=yield J(this,O,"f").request({
method:"signTransactionV2",params:{
transaction:E().encode(e)
}

}
);
return[{
signedTransaction:E().decode(o)
}
]
}
{
for(const e of t){
if(e.account!==J(this,N,"f"))throw new Error("Invalid account");
if(e.chain&&!p(e.chain))throw new Error("Invalid chain")
}
const{
transactions:e
}
=yield J(this,O,"f").request({
method:"signAllTransactionsV2",params:{
transactions:t.map((t=>E().encode(t.transaction)))
}

}
);
return e.map((t=>({
signedTransaction:E().decode(t)
}
)))
}

}
)))),V.set(this,((...t)=>G(this,void 0,void 0,(function*(){
if(!J(this,N,"f"))throw new Error("Wallet not connected");
const e=[];
for(const r of t){
const{
message:t,account:n
}
=r;
if(n!==J(this,N,"f"))throw new Error("Invalid account");
const{
signature:o
}
=yield J(this,O,"f").request({
method:"signMessage",params:{
message:t,display:"utf8"
}

}
);
e.push({
signedMessage:t,signature:E().decode(o)
}
)
}
return e
}
)))),J(this,O,"f").on("connect",J(this,q,"f"),this),J(this,O,"f").on("disconnect",J(this,W,"f"),this),J(this,O,"f").on("accountChanged",J(this,C,"f"),this),J(this,O,"f").publicKey&&Z(this,N,J(this,z,"f").call(this,J(this,O,"f").publicKey),"f")
}

}
B=new WeakMap,O=new WeakMap,T=new WeakMap,L=new WeakMap,P=new WeakMap,N=new WeakMap,z=new WeakMap,R=new WeakMap,q=new WeakMap,W=new WeakMap,C=new WeakMap,F=new WeakMap,K=new WeakMap,$=new WeakMap,H=new WeakMap,V=new WeakMap,_=new WeakSet,U=function(t,...e){
var r;
null===(r=J(this,T,"f")[t])||void 0===r||r.forEach((t=>t.apply(null,e)))
}
,D=function(t,e){
var r;
J(this,T,"f")[t]=null===(r=J(this,T,"f")[t])||void 0===r?void 0:r.filter((t=>e!==t))
}
;
var Q=r("../../../node_modules/buffer/index.js");
function X(t){
if(!Number.isSafeInteger(t)||t<0)throw new Error(`positive integer expected, not ${
t
}
`)
}
function tt(t,...e){
if(!((r=t)instanceof Uint8Array||null!=r&&"object"==typeof r&&"Uint8Array"===r.constructor.name))throw new Error("Uint8Array expected");
var r;
if(e.length>0&&!e.includes(t.length))throw new Error(`Uint8Array expected of length ${
e
}
, not of length=${
t.length
}
`)
}
function et(t,e=!0){
if(t.destroyed)throw new Error("Hash instance has been destroyed");
if(e&&t.finished)throw new Error("Hash#digest() has already been called")
}
function rt(t,e){
tt(t);
const r=e.outputLen;
if(t.length<r)throw new Error(`digestInto() expects output buffer of length at least ${
r
}
`)
}
const nt="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0,ot=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),it=(t,e)=>t<<32-e|t>>>e,st=68===new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function at(t){
for(let r=0;
r<t.length;
r++)t[r]=(e=t[r])<<24&4278190080|e<<8&16711680|e>>>8&65280|e>>>24&255;
var e
}
function ut(t){
return"string"==typeof t&&(t=function(t){
if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);
return new Uint8Array((new TextEncoder).encode(t))
}
(t)),tt(t),t
}
class ct{
clone(){
return this._cloneInto()
}

}
function lt(t){
const e=e=>t().update(ut(e)).digest(),r=t();
return e.outputLen=r.outputLen,e.blockLen=r.blockLen,e.create=()=>t(),e
}
function ft(t=32){
if(nt&&"function"==typeof nt.getRandomValues)return nt.getRandomValues(new Uint8Array(t));
if(nt&&"function"==typeof nt.randomBytes)return nt.randomBytes(t);
throw new Error("crypto.getRandomValues must be defined")
}
const ht=(t,e,r)=>t&e^t&r^e&r;
class dt extends ct{
constructor(t,e,r,n){
super(),this.blockLen=t,this.outputLen=e,this.padOffset=r,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=ot(this.buffer)
}
update(t){
et(this);
const{
view:e,buffer:r,blockLen:n
}
=this,o=(t=ut(t)).length;
for(let i=0;
i<o;
){
const s=Math.min(n-this.pos,o-i);
if(s!==n)r.set(t.subarray(i,i+s),this.pos),this.pos+=s,i+=s,this.pos===n&&(this.process(e,0),this.pos=0);
else{
const e=ot(t);
for(;
n<=o-i;
i+=n)this.process(e,i)
}

}
return this.length+=t.length,this.roundClean(),this
}
digestInto(t){
et(this),rt(t,this),this.finished=!0;
const{
buffer:e,view:r,blockLen:n,isLE:o
}
=this;
let{
pos:i
}
=this;
e[i++]=128,this.buffer.subarray(i).fill(0),this.padOffset>n-i&&(this.process(r,0),i=0);
for(let t=i;
t<n;
t++)e[t]=0;
!function(t,e,r,n){
if("function"==typeof t.setBigUint64)return t.setBigUint64(e,r,n);
const o=BigInt(32),i=BigInt(4294967295),s=Number(r>>o&i),a=Number(r&i),u=n?4:0,c=n?0:4;
t.setUint32(e+u,s,n),t.setUint32(e+c,a,n)
}
(r,n-8,BigInt(8*this.length),o),this.process(r,0);
const s=ot(t),a=this.outputLen;
if(a%4)throw new Error("_sha2: outputLen should be aligned to 32bit");
const u=a/4,c=this.get();
if(u>c.length)throw new Error("_sha2: outputLen bigger than state");
for(let t=0;
t<u;
t++)s.setUint32(4*t,c[t],o)
}
digest(){
const{
buffer:t,outputLen:e
}
=this;
this.digestInto(t);
const r=t.slice(0,e);
return this.destroy(),r
}
_cloneInto(t){
t||(t=new this.constructor),t.set(...this.get());
const{
blockLen:e,buffer:r,length:n,finished:o,destroyed:i,pos:s
}
=this;
return t.length=n,t.pos=s,t.finished=o,t.destroyed=i,n%e&&t.buffer.set(r),t
}

}
const pt=BigInt(2**32-1),yt=BigInt(32);
function gt(t,e=!1){
return e?{
h:Number(t&pt),l:Number(t>>yt&pt)
}
:{
h:0|Number(t>>yt&pt),l:0|Number(t&pt)
}

}
function mt(t,e=!1){
let r=new Uint32Array(t.length),n=new Uint32Array(t.length);
for(let o=0;
o<t.length;
o++){
const{
h:i,l:s
}
=gt(t[o],e);
[r[o],n[o]]=[i,s]
}
return[r,n]
}
const bt=(t,e,r)=>t<<r|e>>>32-r,wt=(t,e,r)=>e<<r|t>>>32-r,vt=(t,e,r)=>e<<r-32|t>>>64-r,xt=(t,e,r)=>t<<r-32|e>>>64-r,kt={
fromBig:gt,split:mt,toBig:(t,e)=>BigInt(t>>>0)<<yt|BigInt(e>>>0),shrSH:(t,e,r)=>t>>>r,shrSL:(t,e,r)=>t<<32-r|e>>>r,rotrSH:(t,e,r)=>t>>>r|e<<32-r,rotrSL:(t,e,r)=>t<<32-r|e>>>r,rotrBH:(t,e,r)=>t<<64-r|e>>>r-32,rotrBL:(t,e,r)=>t>>>r-32|e<<64-r,rotr32H:(t,e)=>e,rotr32L:(t,e)=>t,rotlSH:bt,rotlSL:wt,rotlBH:vt,rotlBL:xt,add:function(t,e,r,n){
const o=(e>>>0)+(n>>>0);
return{
h:t+r+(o/2**32|0)|0,l:0|o
}

}
,add3L:(t,e,r)=>(t>>>0)+(e>>>0)+(r>>>0),add3H:(t,e,r,n)=>e+r+n+(t/2**32|0)|0,add4L:(t,e,r,n)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0),add4H:(t,e,r,n,o)=>e+r+n+o+(t/2**32|0)|0,add5H:(t,e,r,n,o,i)=>e+r+n+o+i+(t/2**32|0)|0,add5L:(t,e,r,n,o)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0)+(o>>>0)
}
,[St,Mt]=(()=>kt.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map((t=>BigInt(t)))))(),Et=new Uint32Array(80),At=new Uint32Array(80);
class It extends dt{
constructor(){
super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209
}
get(){
const{
Ah:t,Al:e,Bh:r,Bl:n,Ch:o,Cl:i,Dh:s,Dl:a,Eh:u,El:c,Fh:l,Fl:f,Gh:h,Gl:d,Hh:p,Hl:y
}
=this;
return[t,e,r,n,o,i,s,a,u,c,l,f,h,d,p,y]
}
set(t,e,r,n,o,i,s,a,u,c,l,f,h,d,p,y){
this.Ah=0|t,this.Al=0|e,this.Bh=0|r,this.Bl=0|n,this.Ch=0|o,this.Cl=0|i,this.Dh=0|s,this.Dl=0|a,this.Eh=0|u,this.El=0|c,this.Fh=0|l,this.Fl=0|f,this.Gh=0|h,this.Gl=0|d,this.Hh=0|p,this.Hl=0|y
}
process(t,e){
for(let r=0;
r<16;
r++,e+=4)Et[r]=t.getUint32(e),At[r]=t.getUint32(e+=4);
for(let t=16;
t<80;
t++){
const e=0|Et[t-15],r=0|At[t-15],n=kt.rotrSH(e,r,1)^kt.rotrSH(e,r,8)^kt.shrSH(e,r,7),o=kt.rotrSL(e,r,1)^kt.rotrSL(e,r,8)^kt.shrSL(e,r,7),i=0|Et[t-2],s=0|At[t-2],a=kt.rotrSH(i,s,19)^kt.rotrBH(i,s,61)^kt.shrSH(i,s,6),u=kt.rotrSL(i,s,19)^kt.rotrBL(i,s,61)^kt.shrSL(i,s,6),c=kt.add4L(o,u,At[t-7],At[t-16]),l=kt.add4H(c,n,a,Et[t-7],Et[t-16]);
Et[t]=0|l,At[t]=0|c
}
let{
Ah:r,Al:n,Bh:o,Bl:i,Ch:s,Cl:a,Dh:u,Dl:c,Eh:l,El:f,Fh:h,Fl:d,Gh:p,Gl:y,Hh:g,Hl:m
}
=this;
for(let t=0;
t<80;
t++){
const e=kt.rotrSH(l,f,14)^kt.rotrSH(l,f,18)^kt.rotrBH(l,f,41),b=kt.rotrSL(l,f,14)^kt.rotrSL(l,f,18)^kt.rotrBL(l,f,41),w=l&h^~l&p,v=f&d^~f&y,x=kt.add5L(m,b,v,Mt[t],At[t]),k=kt.add5H(x,g,e,w,St[t],Et[t]),S=0|x,M=kt.rotrSH(r,n,28)^kt.rotrBH(r,n,34)^kt.rotrBH(r,n,39),E=kt.rotrSL(r,n,28)^kt.rotrBL(r,n,34)^kt.rotrBL(r,n,39),A=r&o^r&s^o&s,I=n&i^n&a^i&a;
g=0|p,m=0|y,p=0|h,y=0|d,h=0|l,d=0|f,({
h:l,l:f
}
=kt.add(0|u,0|c,0|k,0|S)),u=0|s,c=0|a,s=0|o,a=0|i,o=0|r,i=0|n;
const j=kt.add3L(S,E,I);
r=kt.add3H(j,k,M,A),n=0|j
}
({
h:r,l:n
}
=kt.add(0|this.Ah,0|this.Al,0|r,0|n)),({
h:o,l:i
}
=kt.add(0|this.Bh,0|this.Bl,0|o,0|i)),({
h:s,l:a
}
=kt.add(0|this.Ch,0|this.Cl,0|s,0|a)),({
h:u,l:c
}
=kt.add(0|this.Dh,0|this.Dl,0|u,0|c)),({
h:l,l:f
}
=kt.add(0|this.Eh,0|this.El,0|l,0|f)),({
h,l:d
}
=kt.add(0|this.Fh,0|this.Fl,0|h,0|d)),({
h:p,l:y
}
=kt.add(0|this.Gh,0|this.Gl,0|p,0|y)),({
h:g,l:m
}
=kt.add(0|this.Hh,0|this.Hl,0|g,0|m)),this.set(r,n,o,i,s,a,u,c,l,f,h,d,p,y,g,m)
}
roundClean(){
Et.fill(0),At.fill(0)
}
destroy(){
this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
}

}
const jt=lt((()=>new It)),_t=BigInt(0),Bt=BigInt(1),Ot=BigInt(2);
function Tt(t){
return t instanceof Uint8Array||null!=t&&"object"==typeof t&&"Uint8Array"===t.constructor.name
}
function Lt(t){
if(!Tt(t))throw new Error("Uint8Array expected")
}
function Pt(t,e){
if("boolean"!=typeof e)throw new Error(`${
t
}
 must be valid boolean, got "${
e
}
".`)
}
const Nt=Array.from({
length:256
}
,((t,e)=>e.toString(16).padStart(2,"0")));
function zt(t){
Lt(t);
let e="";
for(let r=0;
r<t.length;
r++)e+=Nt[t[r]];
return e
}
function Rt(t){
const e=t.toString(16);
return 1&e.length?`0${
e
}
`:e
}
function Ut(t){
if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);
return BigInt(""===t?"0":`0x${
t
}
`)
}
const Dt={
_0:48,_9:57,_A:65,_F:70,_a:97,_f:102
}
;
function qt(t){
return t>=Dt._0&&t<=Dt._9?t-Dt._0:t>=Dt._A&&t<=Dt._F?t-(Dt._A-10):t>=Dt._a&&t<=Dt._f?t-(Dt._a-10):void 0
}
function Wt(t){
if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);
const e=t.length,r=e/2;
if(e%2)throw new Error("padded hex string expected, got unpadded hex of length "+e);
const n=new Uint8Array(r);
for(let e=0,o=0;
e<r;
e++,o+=2){
const r=qt(t.charCodeAt(o)),i=qt(t.charCodeAt(o+1));
if(void 0===r||void 0===i){
const e=t[o]+t[o+1];
throw new Error('hex string expected, got non-hex character "'+e+'" at index '+o)
}
n[e]=16*r+i
}
return n
}
function Ct(t){
return Ut(zt(t))
}
function Ft(t){
return Lt(t),Ut(zt(Uint8Array.from(t).reverse()))
}
function Kt(t,e){
return Wt(t.toString(16).padStart(2*e,"0"))
}
function $t(t,e){
return Kt(t,e).reverse()
}
function Ht(t){
return Wt(Rt(t))
}
function Vt(t,e,r){
let n;
if("string"==typeof e)try{
n=Wt(e)
}
catch(r){
throw new Error(`${
t
}
 must be valid hex string, got "${
e
}
". Cause: ${
r
}
`)
}
else{
if(!Tt(e))throw new Error(`${
t
}
 must be hex string or Uint8Array`);
n=Uint8Array.from(e)
}
const o=n.length;
if("number"==typeof r&&o!==r)throw new Error(`${
t
}
 expected ${
r
}
 bytes, got ${
o
}
`);
return n
}
function Gt(...t){
let e=0;
for(let r=0;
r<t.length;
r++){
const n=t[r];
Lt(n),e+=n.length
}
const r=new Uint8Array(e);
for(let e=0,n=0;
e<t.length;
e++){
const o=t[e];
r.set(o,n),n+=o.length
}
return r
}
function Jt(t,e){
if(t.length!==e.length)return!1;
let r=0;
for(let n=0;
n<t.length;
n++)r|=t[n]^e[n];
return 0===r
}
function Zt(t){
if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);
return new Uint8Array((new TextEncoder).encode(t))
}
const Yt=t=>"bigint"==typeof t&&_t<=t;
function Qt(t,e,r){
return Yt(t)&&Yt(e)&&Yt(r)&&e<=t&&t<r
}
function Xt(t,e,r,n){
if(!Qt(e,r,n))throw new Error(`expected valid ${
t
}
: ${
r
}
 <= n < ${
n
}
, got ${
typeof e
}
 ${
e
}
`)
}
function te(t){
let e;
for(e=0;
t>_t;
t>>=Bt,e+=1);
return e
}
function ee(t,e){
return t>>BigInt(e)&Bt
}
function re(t,e,r){
return t|(r?Bt:_t)<<BigInt(e)
}
const ne=t=>(Ot<<BigInt(t-1))-Bt,oe=t=>new Uint8Array(t),ie=t=>Uint8Array.from(t);
function se(t,e,r){
if("number"!=typeof t||t<2)throw new Error("hashLen must be a number");
if("number"!=typeof e||e<2)throw new Error("qByteLen must be a number");
if("function"!=typeof r)throw new Error("hmacFn must be a function");
let n=oe(t),o=oe(t),i=0;
const s=()=>{
n.fill(1),o.fill(0),i=0
}
,a=(...t)=>r(o,n,...t),u=(t=oe())=>{
o=a(ie([0]),t),n=a(),0!==t.length&&(o=a(ie([1]),t),n=a())
}
,c=()=>{
if(i++>=1e3)throw new Error("drbg: tried 1000 values");
let t=0;
const r=[];
for(;
t<e;
){
n=a();
const e=n.slice();
r.push(e),t+=n.length
}
return Gt(...r)
}
;
return(t,e)=>{
let r;
for(s(),u(t);
!(r=e(c()));
)u();
return s(),r
}

}
const ae={
bigint:t=>"bigint"==typeof t,function:t=>"function"==typeof t,boolean:t=>"boolean"==typeof t,string:t=>"string"==typeof t,stringOrUint8Array:t=>"string"==typeof t||Tt(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>"function"==typeof t&&Number.isSafeInteger(t.outputLen)
}
;
function ue(t,e,r={

}
){
const n=(e,r,n)=>{
const o=ae[r];
if("function"!=typeof o)throw new Error(`Invalid validator "${
r
}
", expected function`);
const i=t[e];
if(!(n&&void 0===i||o(i,t)))throw new Error(`Invalid param ${
String(e)
}
=${
i
}
 (${
typeof i
}
), expected ${
r
}
`)
}
;
for(const[t,r]of Object.entries(e))n(t,r,!1);
for(const[t,e]of Object.entries(r))n(t,e,!0);
return t
}
const ce=()=>{
throw new Error("not implemented")
}
;
function le(t){
const e=new WeakMap;
return(r,...n)=>{
const o=e.get(r);
if(void 0!==o)return o;
const i=t(r,...n);
return e.set(r,i),i
}

}
const fe=BigInt(0),he=BigInt(1),de=BigInt(2),pe=BigInt(3),ye=BigInt(4),ge=BigInt(5),me=BigInt(8);
function be(t,e){
const r=t%e;
return r>=fe?r:e+r
}
function we(t,e,r){
if(r<=fe||e<fe)throw new Error("Expected power/modulo > 0");
if(r===he)return fe;
let n=he;
for(;
e>fe;
)e&he&&(n=n*t%r),t=t*t%r,e>>=he;
return n
}
function ve(t,e,r){
let n=t;
for(;
e-- >fe;
)n*=n,n%=r;
return n
}
function xe(t,e){
if(t===fe||e<=fe)throw new Error(`invert: expected positive integers, got n=${
t
}
 mod=${
e
}
`);
let r=be(t,e),n=e,o=fe,i=he,s=he,a=fe;
for(;
r!==fe;
){
const t=n/r,e=n%r,u=o-s*t,c=i-a*t;
n=r,r=e,o=s,i=a,s=u,a=c
}
if(n!==he)throw new Error("invert: does not exist");
return be(o,e)
}
BigInt(9),BigInt(16);
const ke=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];
function Se(t,e){
const r=void 0!==e?e:t.toString(2).length;
return{
nBitLength:r,nByteLength:Math.ceil(r/8)
}

}
function Me(t,e,r=!1,n={

}
){
if(t<=fe)throw new Error(`Expected Field ORDER > 0, got ${
t
}
`);
const{
nBitLength:o,nByteLength:i
}
=Se(t,e);
if(i>2048)throw new Error("Field lengths over 2048 bytes are not supported");
const s=function(t){
if(t%ye===pe){
const e=(t+he)/ye;
return function(t,r){
const n=t.pow(r,e);
if(!t.eql(t.sqr(n),r))throw new Error("Cannot find square root");
return n
}

}
if(t%me===ge){
const e=(t-ge)/me;
return function(t,r){
const n=t.mul(r,de),o=t.pow(n,e),i=t.mul(r,o),s=t.mul(t.mul(i,de),o),a=t.mul(i,t.sub(s,t.ONE));
if(!t.eql(t.sqr(a),r))throw new Error("Cannot find square root");
return a
}

}
return function(t){
const e=(t-he)/de;
let r,n,o;
for(r=t-he,n=0;
r%de===fe;
r/=de,n++);
for(o=de;
o<t&&we(o,e,t)!==t-he;
o++);
if(1===n){
const e=(t+he)/ye;
return function(t,r){
const n=t.pow(r,e);
if(!t.eql(t.sqr(n),r))throw new Error("Cannot find square root");
return n
}

}
const i=(r+he)/de;
return function(t,s){
if(t.pow(s,e)===t.neg(t.ONE))throw new Error("Cannot find square root");
let a=n,u=t.pow(t.mul(t.ONE,o),r),c=t.pow(s,i),l=t.pow(s,r);
for(;
!t.eql(l,t.ONE);
){
if(t.eql(l,t.ZERO))return t.ZERO;
let e=1;
for(let r=t.sqr(l);
e<a&&!t.eql(r,t.ONE);
e++)r=t.sqr(r);
const r=t.pow(u,he<<BigInt(a-e-1));
u=t.sqr(r),c=t.mul(c,r),l=t.mul(l,u),a=e
}
return c
}

}
(t)
}
(t),a=Object.freeze({
ORDER:t,BITS:o,BYTES:i,MASK:ne(o),ZERO:fe,ONE:he,create:e=>be(e,t),isValid:e=>{
if("bigint"!=typeof e)throw new Error("Invalid field element: expected bigint, got "+typeof e);
return fe<=e&&e<t
}
,is0:t=>t===fe,isOdd:t=>(t&he)===he,neg:e=>be(-e,t),eql:(t,e)=>t===e,sqr:e=>be(e*e,t),add:(e,r)=>be(e+r,t),sub:(e,r)=>be(e-r,t),mul:(e,r)=>be(e*r,t),pow:(t,e)=>function(t,e,r){
if(r<fe)throw new Error("Expected power > 0");
if(r===fe)return t.ONE;
if(r===he)return e;
let n=t.ONE,o=e;
for(;
r>fe;
)r&he&&(n=t.mul(n,o)),o=t.sqr(o),r>>=he;
return n
}
(a,t,e),div:(e,r)=>be(e*xe(r,t),t),sqrN:t=>t*t,addN:(t,e)=>t+e,subN:(t,e)=>t-e,mulN:(t,e)=>t*e,inv:e=>xe(e,t),sqrt:n.sqrt||(t=>s(a,t)),invertBatch:t=>function(t,e){
const r=new Array(e.length),n=e.reduce(((e,n,o)=>t.is0(n)?e:(r[o]=e,t.mul(e,n))),t.ONE),o=t.inv(n);
return e.reduceRight(((e,n,o)=>t.is0(n)?e:(r[o]=t.mul(e,r[o]),t.mul(e,n))),o),r
}
(a,t),cmov:(t,e,r)=>r?e:t,toBytes:t=>r?$t(t,i):Kt(t,i),fromBytes:t=>{
if(t.length!==i)throw new Error(`Fp.fromBytes: expected ${
i
}
, got ${
t.length
}
`);
return r?Ft(t):Ct(t)
}

}
);
return Object.freeze(a)
}
function Ee(t){
if("bigint"!=typeof t)throw new Error("field order must be bigint");
const e=t.toString(2).length;
return Math.ceil(e/8)
}
function Ae(t){
const e=Ee(t);
return e+Math.ceil(e/2)
}
const Ie=BigInt(0),je=BigInt(1),_e=new WeakMap,Be=new WeakMap;
function Oe(t,e){
const r=(t,e)=>{
const r=e.negate();
return t?r:e
}
,n=t=>{
if(!Number.isSafeInteger(t)||t<=0||t>e)throw new Error(`Wrong window size=${
t
}
, should be [1..${
e
}
]`)
}
,o=t=>(n(t),{
windows:Math.ceil(e/t)+1,windowSize:2**(t-1)
}
);
return{
constTimeNegate:r,unsafeLadder(e,r){
let n=t.ZERO,o=e;
for(;
r>Ie;
)r&je&&(n=n.add(o)),o=o.double(),r>>=je;
return n
}
,precomputeWindow(t,e){
const{
windows:r,windowSize:n
}
=o(e),i=[];
let s=t,a=s;
for(let t=0;
t<r;
t++){
a=s,i.push(a);
for(let t=1;
t<n;
t++)a=a.add(s),i.push(a);
s=a.double()
}
return i
}
,wNAF(e,n,i){
const{
windows:s,windowSize:a
}
=o(e);
let u=t.ZERO,c=t.BASE;
const l=BigInt(2**e-1),f=2**e,h=BigInt(e);
for(let t=0;
t<s;
t++){
const e=t*a;
let o=Number(i&l);
i>>=h,o>a&&(o-=f,i+=je);
const s=e,d=e+Math.abs(o)-1,p=t%2!=0,y=o<0;
0===o?c=c.add(r(p,n[s])):u=u.add(r(y,n[d]))
}
return{
p:u,f:c
}

}
,wNAFCached(t,e,r){
const n=Be.get(t)||1;
let o=_e.get(t);
return o||(o=this.precomputeWindow(t,n),1!==n&&_e.set(t,r(o))),this.wNAF(n,o,e)
}
,setWindowSize(t,e){
n(e),Be.set(t,e),_e.delete(t)
}

}

}
function Te(t,e,r,n){
if(!Array.isArray(r)||!Array.isArray(n)||n.length!==r.length)throw new Error("arrays of points and scalars must have equal length");
n.forEach(((t,r)=>{
if(!e.isValid(t))throw new Error(`wrong scalar at index ${
r
}
`)
}
)),r.forEach(((e,r)=>{
if(!(e instanceof t))throw new Error(`wrong point at index ${
r
}
`)
}
));
const o=te(BigInt(r.length)),i=o>12?o-3:o>4?o-2:o?2:1,s=(1<<i)-1,a=new Array(s+1).fill(t.ZERO),u=Math.floor((e.BITS-1)/i)*i;
let c=t.ZERO;
for(let e=u;
e>=0;
e-=i){
a.fill(t.ZERO);
for(let t=0;
t<n.length;
t++){
const o=n[t],i=Number(o>>BigInt(e)&BigInt(s));
a[i]=a[i].add(r[t])
}
let o=t.ZERO;
for(let e=a.length-1,r=t.ZERO;
e>0;
e--)r=r.add(a[e]),o=o.add(r);
if(c=c.add(o),0!==e)for(let t=0;
t<i;
t++)c=c.double()
}
return c
}
function Le(t){
return ue(t.Fp,ke.reduce(((t,e)=>(t[e]="function",t)),{
ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"
}
)),ue(t,{
n:"bigint",h:"bigint",Gx:"field",Gy:"field"
}
,{
nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"
}
),Object.freeze({
...Se(t.n,t.nBitLength),...t,p:t.Fp.ORDER
}
)
}
const Pe=BigInt(0),Ne=BigInt(1),ze=BigInt(2),Re=BigInt(8),Ue={
zip215:!0
}
;
const De=BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),qe=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),We=(BigInt(0),BigInt(1)),Ce=BigInt(2),Fe=(BigInt(3),BigInt(5)),Ke=BigInt(8);
function $e(t){
return t[0]&=248,t[31]&=127,t[31]|=64,t
}
function He(t,e){
const r=De,n=be(e*e*e,r),o=be(n*n*e,r);
let i=be(t*n*function(t){
const e=BigInt(10),r=BigInt(20),n=BigInt(40),o=BigInt(80),i=De,s=t*t%i*t%i,a=ve(s,Ce,i)*s%i,u=ve(a,We,i)*t%i,c=ve(u,Fe,i)*u%i,l=ve(c,e,i)*c%i,f=ve(l,r,i)*l%i,h=ve(f,n,i)*f%i,d=ve(h,o,i)*h%i,p=ve(d,o,i)*h%i,y=ve(p,e,i)*c%i;
return{
pow_p_5_8:ve(y,Ce,i)*t%i,b2:s
}

}
(t*o).pow_p_5_8,r);
const s=be(e*i*i,r),a=i,u=be(i*qe,r),c=s===t,l=s===be(-t,r),f=s===be(-t*qe,r);
return c&&(i=a),(l||f)&&(i=u),(be(i,r)&he)===he&&(i=be(-i,r)),{
isValid:c||l,value:i
}

}
const Ve=(()=>Me(De,void 0,!0))(),Ge=(()=>({
a:BigInt(-1),d:BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),Fp:Ve,n:BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),h:Ke,Gx:BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),Gy:BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),hash:jt,randomBytes:ft,adjustScalarBytes:$e,uvRatio:He
}
))(),Je=(()=>function(t){
const e=function(t){
const e=Le(t);
return ue(t,{
hash:"function",a:"bigint",d:"bigint",randomBytes:"function"
}
,{
adjustScalarBytes:"function",domain:"function",uvRatio:"function",mapToCurve:"function"
}
),Object.freeze({
...e
}
)
}
(t),{
Fp:r,n,prehash:o,hash:i,randomBytes:s,nByteLength:a,h:u
}
=e,c=ze<<BigInt(8*a)-Ne,l=r.create,f=Me(e.n,e.nBitLength),h=e.uvRatio||((t,e)=>{
try{
return{
isValid:!0,value:r.sqrt(t*r.inv(e))
}

}
catch(t){
return{
isValid:!1,value:Pe
}

}

}
),d=e.adjustScalarBytes||(t=>t),p=e.domain||((t,e,r)=>{
if(Pt("phflag",r),e.length||r)throw new Error("Contexts/pre-hash are not supported");
return t
}
);
function y(t,e){
Xt("coordinate "+t,e,Pe,c)
}
function g(t){
if(!(t instanceof w))throw new Error("ExtendedPoint expected")
}
const m=le(((t,e)=>{
const{
ex:n,ey:o,ez:i
}
=t,s=t.is0();
null==e&&(e=s?Re:r.inv(i));
const a=l(n*e),u=l(o*e),c=l(i*e);
if(s)return{
x:Pe,y:Ne
}
;
if(c!==Ne)throw new Error("invZ was invalid");
return{
x:a,y:u
}

}
)),b=le((t=>{
const{
a:r,d:n
}
=e;
if(t.is0())throw new Error("bad point: ZERO");
const{
ex:o,ey:i,ez:s,et:a
}
=t,u=l(o*o),c=l(i*i),f=l(s*s),h=l(f*f),d=l(u*r);
if(l(f*l(d+c))!==l(h+l(n*l(u*c))))throw new Error("bad point: equation left != right (1)");
if(l(o*i)!==l(s*a))throw new Error("bad point: equation left != right (2)");
return!0
}
));
class w{
constructor(t,e,r,n){
this.ex=t,this.ey=e,this.ez=r,this.et=n,y("x",t),y("y",e),y("z",r),y("t",n),Object.freeze(this)
}
get x(){
return this.toAffine().x
}
get y(){
return this.toAffine().y
}
static fromAffine(t){
if(t instanceof w)throw new Error("extended point not allowed");
const{
x:e,y:r
}
=t||{

}
;
return y("x",e),y("y",r),new w(e,r,Ne,l(e*r))
}
static normalizeZ(t){
const e=r.invertBatch(t.map((t=>t.ez)));
return t.map(((t,r)=>t.toAffine(e[r]))).map(w.fromAffine)
}
static msm(t,e){
return Te(w,f,t,e)
}
_setWindowSize(t){
k.setWindowSize(this,t)
}
assertValidity(){
b(this)
}
equals(t){
g(t);
const{
ex:e,ey:r,ez:n
}
=this,{
ex:o,ey:i,ez:s
}
=t,a=l(e*s),u=l(o*n),c=l(r*s),f=l(i*n);
return a===u&&c===f
}
is0(){
return this.equals(w.ZERO)
}
negate(){
return new w(l(-this.ex),this.ey,this.ez,l(-this.et))
}
double(){
const{
a:t
}
=e,{
ex:r,ey:n,ez:o
}
=this,i=l(r*r),s=l(n*n),a=l(ze*l(o*o)),u=l(t*i),c=r+n,f=l(l(c*c)-i-s),h=u+s,d=h-a,p=u-s,y=l(f*d),g=l(h*p),m=l(f*p),b=l(d*h);
return new w(y,g,b,m)
}
add(t){
g(t);
const{
a:r,d:n
}
=e,{
ex:o,ey:i,ez:s,et:a
}
=this,{
ex:u,ey:c,ez:f,et:h
}
=t;
if(r===BigInt(-1)){
const t=l((i-o)*(c+u)),e=l((i+o)*(c-u)),r=l(e-t);
if(r===Pe)return this.double();
const n=l(s*ze*h),d=l(a*ze*f),p=d+n,y=e+t,g=d-n,m=l(p*r),b=l(y*g),v=l(p*g),x=l(r*y);
return new w(m,b,x,v)
}
const d=l(o*u),p=l(i*c),y=l(a*n*h),m=l(s*f),b=l((o+i)*(u+c)-d-p),v=m-y,x=m+y,k=l(p-r*d),S=l(b*v),M=l(x*k),E=l(b*k),A=l(v*x);
return new w(S,M,A,E)
}
subtract(t){
return this.add(t.negate())
}
wNAF(t){
return k.wNAFCached(this,t,w.normalizeZ)
}
multiply(t){
const e=t;
Xt("scalar",e,Ne,n);
const{
p:r,f:o
}
=this.wNAF(e);
return w.normalizeZ([r,o])[0]
}
multiplyUnsafe(t){
const e=t;
return Xt("scalar",e,Pe,n),e===Pe?x:this.equals(x)||e===Ne?this:this.equals(v)?this.wNAF(e).p:k.unsafeLadder(this,e)
}
isSmallOrder(){
return this.multiplyUnsafe(u).is0()
}
isTorsionFree(){
return k.unsafeLadder(this,n).is0()
}
toAffine(t){
return m(this,t)
}
clearCofactor(){
const{
h:t
}
=e;
return t===Ne?this:this.multiplyUnsafe(t)
}
static fromHex(t,n=!1){
const{
d:o,a:i
}
=e,s=r.BYTES;
t=Vt("pointHex",t,s),Pt("zip215",n);
const a=t.slice(),u=t[s-1];
a[s-1]=-129&u;
const f=Ft(a),d=n?c:r.ORDER;
Xt("pointHex.y",f,Pe,d);
const p=l(f*f),y=l(p-Ne),g=l(o*p-i);
let{
isValid:m,value:b
}
=h(y,g);
if(!m)throw new Error("Point.fromHex: invalid y coordinate");
const v=(b&Ne)===Ne,x=!!(128&u);
if(!n&&b===Pe&&x)throw new Error("Point.fromHex: x=0 and x_0=1");
return x!==v&&(b=l(-b)),w.fromAffine({
x:b,y:f
}
)
}
static fromPrivateKey(t){
return E(t).point
}
toRawBytes(){
const{
x:t,y:e
}
=this.toAffine(),n=$t(e,r.BYTES);
return n[n.length-1]|=t&Ne?128:0,n
}
toHex(){
return zt(this.toRawBytes())
}

}
w.BASE=new w(e.Gx,e.Gy,Ne,l(e.Gx*e.Gy)),w.ZERO=new w(Pe,Ne,Ne,Pe);
const{
BASE:v,ZERO:x
}
=w,k=Oe(w,8*a);
function S(t){
return be(t,n)
}
function M(t){
return S(Ft(t))
}
function E(t){
const e=a;
t=Vt("private key",t,e);
const r=Vt("hashed private key",i(t),2*e),n=d(r.slice(0,e)),o=r.slice(e,2*e),s=M(n),u=v.multiply(s),c=u.toRawBytes();
return{
head:n,prefix:o,scalar:s,point:u,pointBytes:c
}

}
function A(t=new Uint8Array,...e){
const r=Gt(...e);
return M(i(p(r,Vt("context",t),!!o)))
}
const I=Ue;
return v._setWindowSize(8),{
CURVE:e,getPublicKey:function(t){
return E(t).pointBytes
}
,sign:function(t,e,i={

}
){
t=Vt("message",t),o&&(t=o(t));
const{
prefix:s,scalar:u,pointBytes:c
}
=E(e),l=A(i.context,s,t),f=v.multiply(l).toRawBytes(),h=S(l+A(i.context,f,c,t)*u);
return Xt("signature.s",h,Pe,n),Vt("result",Gt(f,$t(h,r.BYTES)),2*a)
}
,verify:function(t,e,n,i=I){
const{
context:s,zip215:a
}
=i,u=r.BYTES;
t=Vt("signature",t,2*u),e=Vt("message",e),void 0!==a&&Pt("zip215",a),o&&(e=o(e));
const c=Ft(t.slice(u,2*u));
let l,f,h;
try{
l=w.fromHex(n,a),f=w.fromHex(t.slice(0,u),a),h=v.multiplyUnsafe(c)
}
catch(t){
return!1
}
if(!a&&l.isSmallOrder())return!1;
const d=A(s,f.toRawBytes(),l.toRawBytes(),e);
return f.add(l.multiplyUnsafe(d)).subtract(h).clearCofactor().equals(w.ZERO)
}
,ExtendedPoint:w,utils:{
getExtendedPublicKey:E,randomPrivateKey:()=>s(r.BYTES),precompute:(t=8,e=w.BASE)=>(e._setWindowSize(t),e.multiply(BigInt(3)),e)
}

}

}
(Ge))();
var Ze=r("../../../node_modules/bn.js/lib/bn.js"),Ye=r.n(Ze);
const Qe=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Xe=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),tr=new Uint32Array(64);
class er extends dt{
constructor(){
super(64,32,8,!1),this.A=0|Xe[0],this.B=0|Xe[1],this.C=0|Xe[2],this.D=0|Xe[3],this.E=0|Xe[4],this.F=0|Xe[5],this.G=0|Xe[6],this.H=0|Xe[7]
}
get(){
const{
A:t,B:e,C:r,D:n,E:o,F:i,G:s,H:a
}
=this;
return[t,e,r,n,o,i,s,a]
}
set(t,e,r,n,o,i,s,a){
this.A=0|t,this.B=0|e,this.C=0|r,this.D=0|n,this.E=0|o,this.F=0|i,this.G=0|s,this.H=0|a
}
process(t,e){
for(let r=0;
r<16;
r++,e+=4)tr[r]=t.getUint32(e,!1);
for(let t=16;
t<64;
t++){
const e=tr[t-15],r=tr[t-2],n=it(e,7)^it(e,18)^e>>>3,o=it(r,17)^it(r,19)^r>>>10;
tr[t]=o+tr[t-7]+n+tr[t-16]|0
}
let{
A:r,B:n,C:o,D:i,E:s,F:a,G:u,H:c
}
=this;
for(let t=0;
t<64;
t++){
const e=c+(it(s,6)^it(s,11)^it(s,25))+((l=s)&a^~l&u)+Qe[t]+tr[t]|0,f=(it(r,2)^it(r,13)^it(r,22))+ht(r,n,o)|0;
c=u,u=a,a=s,s=i+e|0,i=o,o=n,n=r,r=e+f|0
}
var l;
r=r+this.A|0,n=n+this.B|0,o=o+this.C|0,i=i+this.D|0,s=s+this.E|0,a=a+this.F|0,u=u+this.G|0,c=c+this.H|0,this.set(r,n,o,i,s,a,u,c)
}
roundClean(){
tr.fill(0)
}
destroy(){
this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)
}

}
const rr=lt((()=>new er));
var nr=r("../../../node_modules/borsh/lib/index.js"),or=r("../../../node_modules/@solana/buffer-layout/lib/Layout.js"),ir=r("../../../node_modules/bigint-buffer/dist/browser.js");
r("../../../node_modules/console-browserify/index.js");
class sr extends TypeError{
constructor(t,e){
let r;
const{
message:n,...o
}
=t,{
path:i
}
=t;
super(0===i.length?n:"At path: "+i.join(".")+" -- "+n),Object.assign(this,o),this.name=this.constructor.name,this.failures=()=>{
var n;
return null!=(n=r)?n:r=[t,...e()]
}

}

}
function ar(t){
return"object"==typeof t&&null!=t
}
function ur(t){
return"string"==typeof t?JSON.stringify(t):""+t
}
function cr(t,e,r,n){
if(!0===t)return;
!1===t?t={

}
:"string"==typeof t&&(t={
message:t
}
);
const{
path:o,branch:i
}
=e,{
type:s
}
=r,{
refinement:a,message:u="Expected a value of type `"+s+"`"+(a?" with refinement `"+a+"`":"")+", but received: `"+ur(n)+"`"
}
=t;
return{
value:n,type:s,refinement:a,key:o[o.length-1],path:o,branch:i,...t,message:u
}

}
function*lr(t,e,r,n){
var o;
ar(o=t)&&"function"==typeof o[Symbol.iterator]||(t=[t]);
for(const o of t){
const t=cr(o,e,r,n);
t&&(yield t)
}

}
function*fr(t,e,r={

}
){
const{
path:n=[],branch:o=[t],coerce:i=!1,mask:s=!1
}
=r,a={
path:n,branch:o
}
;
if(i&&(t=e.coercer(t,a),s&&"type"!==e.type&&ar(e.schema)&&ar(t)&&!Array.isArray(t)))for(const r in t)void 0===e.schema[r]&&delete t[r];
let u=!0;
for(const r of e.validator(t,a))u=!1,yield[r,void 0];
for(let[r,c,l]of e.entries(t,a)){
const e=fr(c,l,{
path:void 0===r?n:[...n,r],branch:void 0===r?o:[...o,c],coerce:i,mask:s
}
);
for(const n of e)n[0]?(u=!1,yield[n[0],void 0]):i&&(c=n[1],void 0===r?t=c:t instanceof Map?t.set(r,c):t instanceof Set?t.add(c):ar(t)&&(t[r]=c))
}
if(u)for(const r of e.refiner(t,a))u=!1,yield[r,void 0];
u&&(yield[void 0,t])
}
class hr{
constructor(t){
const{
type:e,schema:r,validator:n,refiner:o,coercer:i=(t=>t),entries:s=function*(){

}

}
=t;
this.type=e,this.schema=r,this.entries=s,this.coercer=i,this.validator=n?(t,e)=>lr(n(t,e),e,this,t):()=>[],this.refiner=o?(t,e)=>lr(o(t,e),e,this,t):()=>[]
}
assert(t){
return function(t,e){
const r=yr(t,e);
if(r[0])throw r[0]
}
(t,this)
}
create(t){
return dr(t,this)
}
is(t){
return pr(t,this)
}
mask(t){
return function(t,e){
const r=yr(t,e,{
coerce:!0,mask:!0
}
);
if(r[0])throw r[0];
return r[1]
}
(t,this)
}
validate(t,e={

}
){
return yr(t,this,e)
}

}
function dr(t,e){
const r=yr(t,e,{
coerce:!0
}
);
if(r[0])throw r[0];
return r[1]
}
function pr(t,e){
return!yr(t,e)[0]
}
function yr(t,e,r={

}
){
const n=fr(t,e,r),o=function(t){
const{
done:e,value:r
}
=t.next();
return e?void 0:r
}
(n);
return o[0]?[new sr(o[0],(function*(){
for(const t of n)t[0]&&(yield t[0])
}
)),void 0]:[void 0,o[1]]
}
function gr(t,e){
return new hr({
type:t,schema:null,validator:e
}
)
}
function mr(t){
return new hr({
type:"array",schema:t,*entries(e){
if(t&&Array.isArray(e))for(const[r,n]of e.entries())yield[r,n,t]
}
,coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||"Expected an array value, but received: "+ur(t)
}
)
}
function br(){
return gr("boolean",(t=>"boolean"==typeof t))
}
function wr(t){
return gr("instance",(e=>e instanceof t||"Expected a `"+t.name+"` instance, but received: "+ur(e)))
}
function vr(t){
const e=ur(t),r=typeof t;
return new hr({
type:"literal",schema:"string"===r||"number"===r||"boolean"===r?t:null,validator:r=>r===t||"Expected the literal `"+e+"`, but received: "+ur(r)
}
)
}
function xr(t){
return new hr({
...t,validator:(e,r)=>null===e||t.validator(e,r),refiner:(e,r)=>null===e||t.refiner(e,r)
}
)
}
function kr(){
return gr("number",(t=>"number"==typeof t&&!isNaN(t)||"Expected a number, but received: "+ur(t)))
}
function Sr(t){
return new hr({
...t,validator:(e,r)=>void 0===e||t.validator(e,r),refiner:(e,r)=>void 0===e||t.refiner(e,r)
}
)
}
function Mr(t,e){
return new hr({
type:"record",schema:null,*entries(r){
if(ar(r))for(const n in r){
const o=r[n];
yield[n,n,t],yield[n,o,e]
}

}
,validator:t=>ar(t)||"Expected an object, but received: "+ur(t)
}
)
}
function Er(){
return gr("string",(t=>"string"==typeof t||"Expected a string, but received: "+ur(t)))
}
function Ar(t){
const e=gr("never",(()=>!1));
return new hr({
type:"tuple",schema:null,*entries(r){
if(Array.isArray(r)){
const n=Math.max(t.length,r.length);
for(let o=0;
o<n;
o++)yield[o,r[o],t[o]||e]
}

}
,validator:t=>Array.isArray(t)||"Expected an array, but received: "+ur(t)
}
)
}
function Ir(t){
const e=Object.keys(t);
return new hr({
type:"type",schema:t,*entries(r){
if(ar(r))for(const n of e)yield[n,r[n],t[n]]
}
,validator:t=>ar(t)||"Expected an object, but received: "+ur(t)
}
)
}
function jr(t){
const e=t.map((t=>t.type)).join(" | ");
return new hr({
type:"union",schema:null,validator(r,n){
const o=[];
for(const e of t){
const[...t]=fr(r,e,n),[i]=t;
if(!i[0])return[];
for(const[e]of t)e&&o.push(e)
}
return["Expected the value to satisfy a union of `"+e+"`, but received: "+ur(r),...o]
}

}
)
}
function _r(){
return gr("unknown",(()=>!0))
}
function Br(t,e,r){
return new hr({
...t,coercer:(n,o)=>pr(n,e)?t.coercer(r(n,o),o):t.coercer(n,o)
}
)
}
r("../../../node_modules/jayson/lib/client/browser/index.js"),r("../../../node_modules/rpc-websockets/dist/lib/client.js"),r("../../../node_modules/rpc-websockets/dist/lib/client/websocket.browser.js");
const Or=[],Tr=[],Lr=[],Pr=BigInt(0),Nr=BigInt(1),zr=BigInt(2),Rr=BigInt(7),Ur=BigInt(256),Dr=BigInt(113);
for(let t=0,e=Nr,r=1,n=0;
t<24;
t++){
[r,n]=[n,(2*r+3*n)%5],Or.push(2*(5*n+r)),Tr.push((t+1)*(t+2)/2%64);
let o=Pr;
for(let t=0;
t<7;
t++)e=(e<<Nr^(e>>Rr)*Dr)%Ur,e&zr&&(o^=Nr<<(Nr<<BigInt(t))-Nr);
Lr.push(o)
}
const[qr,Wr]=mt(Lr,!0),Cr=(t,e,r)=>r>32?vt(t,e,r):bt(t,e,r),Fr=(t,e,r)=>r>32?xt(t,e,r):wt(t,e,r);
class Kr extends ct{
constructor(t,e,r,n=!1,o=24){
if(super(),this.blockLen=t,this.suffix=e,this.outputLen=r,this.enableXOF=n,this.rounds=o,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,X(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");
var i;
this.state=new Uint8Array(200),this.state32=(i=this.state,new Uint32Array(i.buffer,i.byteOffset,Math.floor(i.byteLength/4)))
}
keccak(){
st||at(this.state32),function(t,e=24){
const r=new Uint32Array(10);
for(let n=24-e;
n<24;
n++){
for(let e=0;
e<10;
e++)r[e]=t[e]^t[e+10]^t[e+20]^t[e+30]^t[e+40];
for(let e=0;
e<10;
e+=2){
const n=(e+8)%10,o=(e+2)%10,i=r[o],s=r[o+1],a=Cr(i,s,1)^r[n],u=Fr(i,s,1)^r[n+1];
for(let r=0;
r<50;
r+=10)t[e+r]^=a,t[e+r+1]^=u
}
let e=t[2],o=t[3];
for(let r=0;
r<24;
r++){
const n=Tr[r],i=Cr(e,o,n),s=Fr(e,o,n),a=Or[r];
e=t[a],o=t[a+1],t[a]=i,t[a+1]=s
}
for(let e=0;
e<50;
e+=10){
for(let n=0;
n<10;
n++)r[n]=t[e+n];
for(let n=0;
n<10;
n++)t[e+n]^=~r[(n+2)%10]&r[(n+4)%10]
}
t[0]^=qr[n],t[1]^=Wr[n]
}
r.fill(0)
}
(this.state32,this.rounds),st||at(this.state32),this.posOut=0,this.pos=0
}
update(t){
et(this);
const{
blockLen:e,state:r
}
=this,n=(t=ut(t)).length;
for(let o=0;
o<n;
){
const i=Math.min(e-this.pos,n-o);
for(let e=0;
e<i;
e++)r[this.pos++]^=t[o++];
this.pos===e&&this.keccak()
}
return this
}
finish(){
if(this.finished)return;
this.finished=!0;
const{
state:t,suffix:e,pos:r,blockLen:n
}
=this;
t[r]^=e,128&e&&r===n-1&&this.keccak(),t[n-1]^=128,this.keccak()
}
writeInto(t){
et(this,!1),tt(t),this.finish();
const e=this.state,{
blockLen:r
}
=this;
for(let n=0,o=t.length;
n<o;
){
this.posOut>=r&&this.keccak();
const i=Math.min(r-this.posOut,o-n);
t.set(e.subarray(this.posOut,this.posOut+i),n),this.posOut+=i,n+=i
}
return t
}
xofInto(t){
if(!this.enableXOF)throw new Error("XOF is not possible for this instance");
return this.writeInto(t)
}
xof(t){
return X(t),this.xofInto(new Uint8Array(t))
}
digestInto(t){
if(rt(t,this),this.finished)throw new Error("digest() was already called");
return this.writeInto(t),this.destroy(),t
}
digest(){
return this.digestInto(new Uint8Array(this.outputLen))
}
destroy(){
this.destroyed=!0,this.state.fill(0)
}
_cloneInto(t){
const{
blockLen:e,suffix:r,outputLen:n,rounds:o,enableXOF:i
}
=this;
return t||(t=new Kr(e,r,n,i,o)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=o,t.suffix=r,t.outputLen=n,t.enableXOF=i,t.destroyed=this.destroyed,t
}

}
const $r=((t,e,r)=>lt((()=>new Kr(e,t,r))))(1,136,32);
class Hr extends ct{
constructor(t,e){
super(),this.finished=!1,this.destroyed=!1,function(t){
if("function"!=typeof t||"function"!=typeof t.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");
X(t.outputLen),X(t.blockLen)
}
(t);
const r=ut(e);
if(this.iHash=t.create(),"function"!=typeof this.iHash.update)throw new Error("Expected instance of class which extends utils.Hash");
this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;
const n=this.blockLen,o=new Uint8Array(n);
o.set(r.length>n?t.create().update(r).digest():r);
for(let t=0;
t<o.length;
t++)o[t]^=54;
this.iHash.update(o),this.oHash=t.create();
for(let t=0;
t<o.length;
t++)o[t]^=106;
this.oHash.update(o),o.fill(0)
}
update(t){
return et(this),this.iHash.update(t),this
}
digestInto(t){
et(this),tt(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()
}
digest(){
const t=new Uint8Array(this.oHash.outputLen);
return this.digestInto(t),t
}
_cloneInto(t){
t||(t=Object.create(Object.getPrototypeOf(this),{

}
));
const{
oHash:e,iHash:r,finished:n,destroyed:o,blockLen:i,outputLen:s
}
=this;
return t.finished=n,t.destroyed=o,t.blockLen=i,t.outputLen=s,t.oHash=e._cloneInto(t.oHash),t.iHash=r._cloneInto(t.iHash),t
}
destroy(){
this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()
}

}
const Vr=(t,e,r)=>new Hr(t,e).update(r).digest();
function Gr(t){
void 0!==t.lowS&&Pt("lowS",t.lowS),void 0!==t.prehash&&Pt("prehash",t.prehash)
}
Vr.create=(t,e)=>new Hr(t,e);
const{
bytesToNumberBE:Jr,hexToBytes:Zr
}
=n,Yr={
Err:class extends Error{
constructor(t=""){
super(t)
}

}
,_tlv:{
encode:(t,e)=>{
const{
Err:r
}
=Yr;
if(t<0||t>256)throw new r("tlv.encode: wrong tag");
if(1&e.length)throw new r("tlv.encode: unpadded data");
const n=e.length/2,o=Rt(n);
if(o.length/2&128)throw new r("tlv.encode: long form length too big");
const i=n>127?Rt(o.length/2|128):"";
return`${
Rt(t)
}
${
i
}
${
o
}
${
e
}
`
}
,decode(t,e){
const{
Err:r
}
=Yr;
let n=0;
if(t<0||t>256)throw new r("tlv.encode: wrong tag");
if(e.length<2||e[n++]!==t)throw new r("tlv.decode: wrong tlv");
const o=e[n++];
let i=0;
if(128&o){
const t=127&o;
if(!t)throw new r("tlv.decode(long): indefinite length not supported");
if(t>4)throw new r("tlv.decode(long): byte length is too big");
const s=e.subarray(n,n+t);
if(s.length!==t)throw new r("tlv.decode: length bytes not complete");
if(0===s[0])throw new r("tlv.decode(long): zero leftmost byte");
for(const t of s)i=i<<8|t;
if(n+=t,i<128)throw new r("tlv.decode(long): not minimal encoding")
}
else i=o;
const s=e.subarray(n,n+i);
if(s.length!==i)throw new r("tlv.decode: wrong value length");
return{
v:s,l:e.subarray(n+i)
}

}

}
,_int:{
encode(t){
const{
Err:e
}
=Yr;
if(t<Qr)throw new e("integer: negative integers are not allowed");
let r=Rt(t);
if(8&Number.parseInt(r[0],16)&&(r="00"+r),1&r.length)throw new e("unexpected assertion");
return r
}
,decode(t){
const{
Err:e
}
=Yr;
if(128&t[0])throw new e("Invalid signature integer: negative");
if(0===t[0]&&!(128&t[1]))throw new e("Invalid signature integer: unnecessary leading zero");
return Jr(t)
}

}
,toSig(t){
const{
Err:e,_int:r,_tlv:n
}
=Yr,o="string"==typeof t?Zr(t):t;
Lt(o);
const{
v:i,l:s
}
=n.decode(48,o);
if(s.length)throw new e("Invalid signature: left bytes after parsing");
const{
v:a,l:u
}
=n.decode(2,i),{
v:c,l
}
=n.decode(2,u);
if(l.length)throw new e("Invalid signature: left bytes after parsing");
return{
r:r.decode(a),s:r.decode(c)
}

}
,hexFromSig(t){
const{
_tlv:e,_int:r
}
=Yr,n=`${
e.encode(2,r.encode(t.r))
}
${
e.encode(2,r.encode(t.s))
}
`;
return e.encode(48,n)
}

}
,Qr=BigInt(0),Xr=BigInt(1),tn=(BigInt(2),BigInt(3));
function en(t){
const e=function(t){
const e=Le(t);
return ue(e,{
hash:"hash",hmac:"function",randomBytes:"function"
}
,{
bits2int:"function",bits2int_modN:"function",lowS:"boolean"
}
),Object.freeze({
lowS:!0,...e
}
)
}
(t),{
Fp:r,n
}
=e,o=r.BYTES+1,i=2*r.BYTES+1;
function s(t){
return be(t,n)
}
function a(t){
return xe(t,n)
}
const{
ProjectivePoint:u,normPrivateKeyToScalar:c,weierstrassEquation:l,isWithinCurveOrder:f
}
=function(t){
const e=function(t){
const e=Le(t);
ue(e,{
a:"field",b:"field"
}
,{
allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"
}
);
const{
endo:r,Fp:n,a:o
}
=e;
if(r){
if(!n.eql(o,n.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
if("object"!=typeof r||"bigint"!=typeof r.beta||"function"!=typeof r.splitScalar)throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")
}
return Object.freeze({
...e
}
)
}
(t),{
Fp:r
}
=e,n=Me(e.n,e.nBitLength),o=e.toBytes||((t,e,n)=>{
const o=e.toAffine();
return Gt(Uint8Array.from([4]),r.toBytes(o.x),r.toBytes(o.y))
}
),i=e.fromBytes||(t=>{
const e=t.subarray(1);
return{
x:r.fromBytes(e.subarray(0,r.BYTES)),y:r.fromBytes(e.subarray(r.BYTES,2*r.BYTES))
}

}
);
function s(t){
const{
a:n,b:o
}
=e,i=r.sqr(t),s=r.mul(i,t);
return r.add(r.add(s,r.mul(t,n)),o)
}
if(!r.eql(r.sqr(e.Gy),s(e.Gx)))throw new Error("bad generator point: equation left != right");
function a(t){
const{
allowedPrivateKeyLengths:r,nByteLength:n,wrapPrivateKey:o,n:i
}
=e;
if(r&&"bigint"!=typeof t){
if(Tt(t)&&(t=zt(t)),"string"!=typeof t||!r.includes(t.length))throw new Error("Invalid key");
t=t.padStart(2*n,"0")
}
let s;
try{
s="bigint"==typeof t?t:Ct(Vt("private key",t,n))
}
catch(e){
throw new Error(`private key must be ${
n
}
 bytes, hex or bigint, not ${
typeof t
}
`)
}
return o&&(s=be(s,i)),Xt("private key",s,Xr,i),s
}
function u(t){
if(!(t instanceof f))throw new Error("ProjectivePoint expected")
}
const c=le(((t,e)=>{
const{
px:n,py:o,pz:i
}
=t;
if(r.eql(i,r.ONE))return{
x:n,y:o
}
;
const s=t.is0();
null==e&&(e=s?r.ONE:r.inv(i));
const a=r.mul(n,e),u=r.mul(o,e),c=r.mul(i,e);
if(s)return{
x:r.ZERO,y:r.ZERO
}
;
if(!r.eql(c,r.ONE))throw new Error("invZ was invalid");
return{
x:a,y:u
}

}
)),l=le((t=>{
if(t.is0()){
if(e.allowInfinityPoint&&!r.is0(t.py))return;
throw new Error("bad point: ZERO")
}
const{
x:n,y:o
}
=t.toAffine();
if(!r.isValid(n)||!r.isValid(o))throw new Error("bad point: x or y not FE");
const i=r.sqr(o),a=s(n);
if(!r.eql(i,a))throw new Error("bad point: equation left != right");
if(!t.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");
return!0
}
));
class f{
constructor(t,e,n){
if(this.px=t,this.py=e,this.pz=n,null==t||!r.isValid(t))throw new Error("x required");
if(null==e||!r.isValid(e))throw new Error("y required");
if(null==n||!r.isValid(n))throw new Error("z required");
Object.freeze(this)
}
static fromAffine(t){
const{
x:e,y:n
}
=t||{

}
;
if(!t||!r.isValid(e)||!r.isValid(n))throw new Error("invalid affine point");
if(t instanceof f)throw new Error("projective point not allowed");
const o=t=>r.eql(t,r.ZERO);
return o(e)&&o(n)?f.ZERO:new f(e,n,r.ONE)
}
get x(){
return this.toAffine().x
}
get y(){
return this.toAffine().y
}
static normalizeZ(t){
const e=r.invertBatch(t.map((t=>t.pz)));
return t.map(((t,r)=>t.toAffine(e[r]))).map(f.fromAffine)
}
static fromHex(t){
const e=f.fromAffine(i(Vt("pointHex",t)));
return e.assertValidity(),e
}
static fromPrivateKey(t){
return f.BASE.multiply(a(t))
}
static msm(t,e){
return Te(f,n,t,e)
}
_setWindowSize(t){
d.setWindowSize(this,t)
}
assertValidity(){
l(this)
}
hasEvenY(){
const{
y:t
}
=this.toAffine();
if(r.isOdd)return!r.isOdd(t);
throw new Error("Field doesn't support isOdd")
}
equals(t){
u(t);
const{
px:e,py:n,pz:o
}
=this,{
px:i,py:s,pz:a
}
=t,c=r.eql(r.mul(e,a),r.mul(i,o)),l=r.eql(r.mul(n,a),r.mul(s,o));
return c&&l
}
negate(){
return new f(this.px,r.neg(this.py),this.pz)
}
double(){
const{
a:t,b:n
}
=e,o=r.mul(n,tn),{
px:i,py:s,pz:a
}
=this;
let u=r.ZERO,c=r.ZERO,l=r.ZERO,h=r.mul(i,i),d=r.mul(s,s),p=r.mul(a,a),y=r.mul(i,s);
return y=r.add(y,y),l=r.mul(i,a),l=r.add(l,l),u=r.mul(t,l),c=r.mul(o,p),c=r.add(u,c),u=r.sub(d,c),c=r.add(d,c),c=r.mul(u,c),u=r.mul(y,u),l=r.mul(o,l),p=r.mul(t,p),y=r.sub(h,p),y=r.mul(t,y),y=r.add(y,l),l=r.add(h,h),h=r.add(l,h),h=r.add(h,p),h=r.mul(h,y),c=r.add(c,h),p=r.mul(s,a),p=r.add(p,p),h=r.mul(p,y),u=r.sub(u,h),l=r.mul(p,d),l=r.add(l,l),l=r.add(l,l),new f(u,c,l)
}
add(t){
u(t);
const{
px:n,py:o,pz:i
}
=this,{
px:s,py:a,pz:c
}
=t;
let l=r.ZERO,h=r.ZERO,d=r.ZERO;
const p=e.a,y=r.mul(e.b,tn);
let g=r.mul(n,s),m=r.mul(o,a),b=r.mul(i,c),w=r.add(n,o),v=r.add(s,a);
w=r.mul(w,v),v=r.add(g,m),w=r.sub(w,v),v=r.add(n,i);
let x=r.add(s,c);
return v=r.mul(v,x),x=r.add(g,b),v=r.sub(v,x),x=r.add(o,i),l=r.add(a,c),x=r.mul(x,l),l=r.add(m,b),x=r.sub(x,l),d=r.mul(p,v),l=r.mul(y,b),d=r.add(l,d),l=r.sub(m,d),d=r.add(m,d),h=r.mul(l,d),m=r.add(g,g),m=r.add(m,g),b=r.mul(p,b),v=r.mul(y,v),m=r.add(m,b),b=r.sub(g,b),b=r.mul(p,b),v=r.add(v,b),g=r.mul(m,v),h=r.add(h,g),g=r.mul(x,v),l=r.mul(w,l),l=r.sub(l,g),g=r.mul(w,m),d=r.mul(x,d),d=r.add(d,g),new f(l,h,d)
}
subtract(t){
return this.add(t.negate())
}
is0(){
return this.equals(f.ZERO)
}
wNAF(t){
return d.wNAFCached(this,t,f.normalizeZ)
}
multiplyUnsafe(t){
Xt("scalar",t,Qr,e.n);
const n=f.ZERO;
if(t===Qr)return n;
if(t===Xr)return this;
const{
endo:o
}
=e;
if(!o)return d.unsafeLadder(this,t);
let{
k1neg:i,k1:s,k2neg:a,k2:u
}
=o.splitScalar(t),c=n,l=n,h=this;
for(;
s>Qr||u>Qr;
)s&Xr&&(c=c.add(h)),u&Xr&&(l=l.add(h)),h=h.double(),s>>=Xr,u>>=Xr;
return i&&(c=c.negate()),a&&(l=l.negate()),l=new f(r.mul(l.px,o.beta),l.py,l.pz),c.add(l)
}
multiply(t){
const{
endo:n,n:o
}
=e;
let i,s;
if(Xt("scalar",t,Xr,o),n){
const{
k1neg:e,k1:o,k2neg:a,k2:u
}
=n.splitScalar(t);
let{
p:c,f:l
}
=this.wNAF(o),{
p:h,f:p
}
=this.wNAF(u);
c=d.constTimeNegate(e,c),h=d.constTimeNegate(a,h),h=new f(r.mul(h.px,n.beta),h.py,h.pz),i=c.add(h),s=l.add(p)
}
else{
const{
p:e,f:r
}
=this.wNAF(t);
i=e,s=r
}
return f.normalizeZ([i,s])[0]
}
multiplyAndAddUnsafe(t,e,r){
const n=f.BASE,o=(t,e)=>e!==Qr&&e!==Xr&&t.equals(n)?t.multiply(e):t.multiplyUnsafe(e),i=o(this,e).add(o(t,r));
return i.is0()?void 0:i
}
toAffine(t){
return c(this,t)
}
isTorsionFree(){
const{
h:t,isTorsionFree:r
}
=e;
if(t===Xr)return!0;
if(r)return r(f,this);
throw new Error("isTorsionFree() has not been declared for the elliptic curve")
}
clearCofactor(){
const{
h:t,clearCofactor:r
}
=e;
return t===Xr?this:r?r(f,this):this.multiplyUnsafe(e.h)
}
toRawBytes(t=!0){
return Pt("isCompressed",t),this.assertValidity(),o(f,this,t)
}
toHex(t=!0){
return Pt("isCompressed",t),zt(this.toRawBytes(t))
}

}
f.BASE=new f(e.Gx,e.Gy,r.ONE),f.ZERO=new f(r.ZERO,r.ONE,r.ZERO);
const h=e.nBitLength,d=Oe(f,e.endo?Math.ceil(h/2):h);
return{
CURVE:e,ProjectivePoint:f,normPrivateKeyToScalar:a,weierstrassEquation:s,isWithinCurveOrder:function(t){
return Qt(t,Xr,e.n)
}

}

}
({
...e,toBytes(t,e,n){
const o=e.toAffine(),i=r.toBytes(o.x),s=Gt;
return Pt("isCompressed",n),n?s(Uint8Array.from([e.hasEvenY()?2:3]),i):s(Uint8Array.from([4]),i,r.toBytes(o.y))
}
,fromBytes(t){
const e=t.length,n=t[0],s=t.subarray(1);
if(e!==o||2!==n&&3!==n){
if(e===i&&4===n)return{
x:r.fromBytes(s.subarray(0,r.BYTES)),y:r.fromBytes(s.subarray(r.BYTES,2*r.BYTES))
}
;
throw new Error(`Point of length ${
e
}
 was invalid. Expected ${
o
}
 compressed bytes or ${
i
}
 uncompressed bytes`)
}
{
const t=Ct(s);
if(!Qt(t,Xr,r.ORDER))throw new Error("Point is not on curve");
const e=l(t);
let o;
try{
o=r.sqrt(e)
}
catch(t){
const e=t instanceof Error?": "+t.message:"";
throw new Error("Point is not on curve"+e)
}
return!(1&~n)!=((o&Xr)===Xr)&&(o=r.neg(o)),{
x:t,y:o
}

}

}

}
),h=t=>zt(Kt(t,e.nByteLength));
function d(t){
return t>n>>Xr
}
const p=(t,e,r)=>Ct(t.slice(e,r));
class y{
constructor(t,e,r){
this.r=t,this.s=e,this.recovery=r,this.assertValidity()
}
static fromCompact(t){
const r=e.nByteLength;
return t=Vt("compactSignature",t,2*r),new y(p(t,0,r),p(t,r,2*r))
}
static fromDER(t){
const{
r:e,s:r
}
=Yr.toSig(Vt("DER",t));
return new y(e,r)
}
assertValidity(){
Xt("r",this.r,Xr,n),Xt("s",this.s,Xr,n)
}
addRecoveryBit(t){
return new y(this.r,this.s,t)
}
recoverPublicKey(t){
const{
r:n,s:o,recovery:i
}
=this,c=w(Vt("msgHash",t));
if(null==i||![0,1,2,3].includes(i))throw new Error("recovery id invalid");
const l=2===i||3===i?n+e.n:n;
if(l>=r.ORDER)throw new Error("recovery id 2 or 3 invalid");
const f=1&i?"03":"02",d=u.fromHex(f+h(l)),p=a(l),y=s(-c*p),g=s(o*p),m=u.BASE.multiplyAndAddUnsafe(d,y,g);
if(!m)throw new Error("point at infinify");
return m.assertValidity(),m
}
hasHighS(){
return d(this.s)
}
normalizeS(){
return this.hasHighS()?new y(this.r,s(-this.s),this.recovery):this
}
toDERRawBytes(){
return Wt(this.toDERHex())
}
toDERHex(){
return Yr.hexFromSig({
r:this.r,s:this.s
}
)
}
toCompactRawBytes(){
return Wt(this.toCompactHex())
}
toCompactHex(){
return h(this.r)+h(this.s)
}

}
const g={
isValidPrivateKey(t){
try{
return c(t),!0
}
catch(t){
return!1
}

}
,normPrivateKeyToScalar:c,randomPrivateKey:()=>{
const t=Ae(e.n);
return function(t,e,r=!1){
const n=t.length,o=Ee(e),i=Ae(e);
if(n<16||n<i||n>1024)throw new Error(`expected ${
i
}
-1024 bytes of input, got ${
n
}
`);
const s=be(r?Ct(t):Ft(t),e-he)+he;
return r?$t(s,o):Kt(s,o)
}
(e.randomBytes(t),e.n)
}
,precompute:(t=8,e=u.BASE)=>(e._setWindowSize(t),e.multiply(BigInt(3)),e)
}
;
function m(t){
const e=Tt(t),r="string"==typeof t,n=(e||r)&&t.length;
return e?n===o||n===i:r?n===2*o||n===2*i:t instanceof u
}
const b=e.bits2int||function(t){
const r=Ct(t),n=8*t.length-e.nBitLength;
return n>0?r>>BigInt(n):r
}
,w=e.bits2int_modN||function(t){
return s(b(t))
}
,v=ne(e.nBitLength);
function x(t){
return Xt(`num < 2^${
e.nBitLength
}
`,t,Qr,v),Kt(t,e.nByteLength)
}
const k={
lowS:e.lowS,prehash:!1
}
,S={
lowS:e.lowS,prehash:!1
}
;
return u.BASE._setWindowSize(8),{
CURVE:e,getPublicKey:function(t,e=!0){
return u.fromPrivateKey(t).toRawBytes(e)
}
,getSharedSecret:function(t,e,r=!0){
if(m(t))throw new Error("first arg must be private key");
if(!m(e))throw new Error("second arg must be public key");
return u.fromHex(e).multiply(c(t)).toRawBytes(r)
}
,sign:function(t,n,o=k){
const{
seed:i,k2sig:l
}
=function(t,n,o=k){
if(["recovered","canonical"].some((t=>t in o)))throw new Error("sign() legacy options not supported");
const{
hash:i,randomBytes:l
}
=e;
let{
lowS:h,prehash:p,extraEntropy:g
}
=o;
null==h&&(h=!0),t=Vt("msgHash",t),Gr(o),p&&(t=Vt("prehashed msgHash",i(t)));
const m=w(t),v=c(n),S=[x(v),x(m)];
if(null!=g&&!1!==g){
const t=!0===g?l(r.BYTES):g;
S.push(Vt("extraEntropy",t))
}
const M=Gt(...S),E=m;
return{
seed:M,k2sig:function(t){
const e=b(t);
if(!f(e))return;
const r=a(e),n=u.BASE.multiply(e).toAffine(),o=s(n.x);
if(o===Qr)return;
const i=s(r*s(E+o*v));
if(i===Qr)return;
let c=(n.x===o?0:2)|Number(n.y&Xr),l=i;
return h&&d(i)&&(l=function(t){
return d(t)?s(-t):t
}
(i),c^=1),new y(o,l,c)
}

}

}
(t,n,o),h=e;
return se(h.hash.outputLen,h.nByteLength,h.hmac)(i,l)
}
,verify:function(t,r,n,o=S){
const i=t;
if(r=Vt("msgHash",r),n=Vt("publicKey",n),"strict"in o)throw new Error("options.strict was renamed to lowS");
Gr(o);
const{
lowS:c,prehash:l
}
=o;
let f,h;
try{
if("string"==typeof i||Tt(i))try{
f=y.fromDER(i)
}
catch(t){
if(!(t instanceof Yr.Err))throw t;
f=y.fromCompact(i)
}
else{
if("object"!=typeof i||"bigint"!=typeof i.r||"bigint"!=typeof i.s)throw new Error("PARSE");
{
const{
r:t,s:e
}
=i;
f=new y(t,e)
}

}
h=u.fromHex(n)
}
catch(t){
if("PARSE"===t.message)throw new Error("signature must be Signature instance, Uint8Array or hex string");
return!1
}
if(c&&f.hasHighS())return!1;
l&&(r=e.hash(r));
const{
r:d,s:p
}
=f,g=w(r),m=a(p),b=s(g*m),v=s(d*m),x=u.BASE.multiplyAndAddUnsafe(h,b,v)?.toAffine();
return!!x&&s(x.x)===d
}
,ProjectivePoint:u,Signature:y,utils:g
}

}
function rn(t){
return{
hash:t,hmac:(e,...r)=>Vr(t,e,function(...t){
let e=0;
for(let r=0;
r<t.length;
r++){
const n=t[r];
tt(n),e+=n.length
}
const r=new Uint8Array(e);
for(let e=0,n=0;
e<t.length;
e++){
const o=t[e];
r.set(o,n),n+=o.length
}
return r
}
(...r)),randomBytes:ft
}

}
BigInt(4);
const nn=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),on=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),sn=BigInt(1),an=BigInt(2),un=(t,e)=>(t+e/an)/e;
const cn=Me(nn,void 0,void 0,{
sqrt:function(t){
const e=nn,r=BigInt(3),n=BigInt(6),o=BigInt(11),i=BigInt(22),s=BigInt(23),a=BigInt(44),u=BigInt(88),c=t*t*t%e,l=c*c*t%e,f=ve(l,r,e)*l%e,h=ve(f,r,e)*l%e,d=ve(h,an,e)*c%e,p=ve(d,o,e)*d%e,y=ve(p,i,e)*p%e,g=ve(y,a,e)*y%e,m=ve(g,u,e)*g%e,b=ve(m,a,e)*y%e,w=ve(b,r,e)*l%e,v=ve(w,s,e)*p%e,x=ve(v,n,e)*c%e,k=ve(x,an,e);
if(!cn.eql(cn.sqr(k),t))throw new Error("Cannot find square root");
return k
}

}
),ln=function(t,e){
const r=e=>en({
...t,...rn(e)
}
);
return Object.freeze({
...r(e),create:r
}
)
}
({
a:BigInt(0),b:BigInt(7),Fp:cn,n:on,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{
beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{
const e=on,r=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),n=-sn*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),o=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),i=r,s=BigInt("0x100000000000000000000000000000000"),a=un(i*t,e),u=un(-n*t,e);
let c=be(t-a*r-u*o,e),l=be(-a*n-u*i,e);
const f=c>s,h=l>s;
if(f&&(c=e-c),h&&(l=e-l),c>s||l>s)throw new Error("splitScalar: Endomorphism failed, k="+t);
return{
k1neg:f,k1:c,k2neg:h,k2:l
}

}

}

}
,rr);
BigInt(0),ln.ProjectivePoint;
var fn=r("../../../node_modules/console-browserify/index.js");
Je.utils.randomPrivateKey;
const hn=()=>{
const t=Je.utils.randomPrivateKey(),e=dn(t),r=new Uint8Array(64);
return r.set(t),r.set(e,32),{
publicKey:e,secretKey:r
}

}
,dn=Je.getPublicKey;
function pn(t){
try{
return Je.ExtendedPoint.fromHex(t),!0
}
catch{
return!1
}

}
const yn=(t,e)=>Je.sign(t,e.slice(0,32)),gn=Je.verify,mn=t=>Q.Buffer.isBuffer(t)?t:t instanceof Uint8Array?Q.Buffer.from(t.buffer,t.byteOffset,t.byteLength):Q.Buffer.from(t);
class bn{
constructor(t){
Object.assign(this,t)
}
encode(){
return Q.Buffer.from((0,nr.serialize)(wn,this))
}
static decode(t){
return(0,nr.deserialize)(wn,this,t)
}
static decodeUnchecked(t){
return(0,nr.deserializeUnchecked)(wn,this,t)
}

}
const wn=new Map;
var vn;
let xn;
const kn=32;
let Sn=1;
xn=Symbol.toStringTag;
class Mn extends bn{
constructor(t){
if(super({

}
),this._bn=void 0,function(t){
return void 0!==t._bn
}
(t))this._bn=t._bn;
else{
if("string"==typeof t){
const e=E().decode(t);
if(e.length!=kn)throw new Error("Invalid public key input");
this._bn=new(Ye())(e)
}
else this._bn=new(Ye())(t);
if(this._bn.byteLength()>kn)throw new Error("Invalid public key input")
}

}
static unique(){
const t=new Mn(Sn);
return Sn+=1,new Mn(t.toBuffer())
}
equals(t){
return this._bn.eq(t._bn)
}
toBase58(){
return E().encode(this.toBytes())
}
toJSON(){
return this.toBase58()
}
toBytes(){
const t=this.toBuffer();
return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)
}
toBuffer(){
const t=this._bn.toArrayLike(Q.Buffer);
if(t.length===kn)return t;
const e=Q.Buffer.alloc(32);
return t.copy(e,32-t.length),e
}
get[xn](){
return`PublicKey(${
this.toString()
}
)`
}
toString(){
return this.toBase58()
}
static async createWithSeed(t,e,r){
const n=Q.Buffer.concat([t.toBuffer(),Q.Buffer.from(e),r.toBuffer()]),o=rr(n);
return new Mn(o)
}
static createProgramAddressSync(t,e){
let r=Q.Buffer.alloc(0);
t.forEach((function(t){
if(t.length>32)throw new TypeError("Max seed length exceeded");
r=Q.Buffer.concat([r,mn(t)])
}
)),r=Q.Buffer.concat([r,e.toBuffer(),Q.Buffer.from("ProgramDerivedAddress")]);
const n=rr(r);
if(pn(n))throw new Error("Invalid seeds, address must fall off the curve");
return new Mn(n)
}
static async createProgramAddress(t,e){
return this.createProgramAddressSync(t,e)
}
static findProgramAddressSync(t,e){
let r,n=255;
for(;
0!=n;
){
try{
const o=t.concat(Q.Buffer.from([n]));
r=this.createProgramAddressSync(o,e)
}
catch(t){
if(t instanceof TypeError)throw t;
n--;
continue
}
return[r,n]
}
throw new Error("Unable to find a viable program address nonce")
}
static async findProgramAddress(t,e){
return this.findProgramAddressSync(t,e)
}
static isOnCurve(t){
return pn(new Mn(t).toBytes())
}

}
vn=Mn,Mn.default=new vn("11111111111111111111111111111111"),wn.set(Mn,{
kind:"struct",fields:[["_bn","u256"]]
}
),new Mn("BPFLoader1111111111111111111111111111111111");
const En=1232;
class An extends Error{
constructor(t){
super(`Signature ${
t
}
 has expired: block height exceeded.`),this.signature=void 0,this.signature=t
}

}
Object.defineProperty(An.prototype,"name",{
value:"TransactionExpiredBlockheightExceededError"
}
);
class In extends Error{
constructor(t,e){
super(`Transaction was not confirmed in ${
e.toFixed(2)
}
 seconds. It is unknown if it succeeded or failed. Check signature ${
t
}
 using the Solana Explorer or CLI tools.`),this.signature=void 0,this.signature=t
}

}
Object.defineProperty(In.prototype,"name",{
value:"TransactionExpiredTimeoutError"
}
);
class jn extends Error{
constructor(t){
super(`Signature ${
t
}
 has expired: the nonce is no longer valid.`),this.signature=void 0,this.signature=t
}

}
Object.defineProperty(jn.prototype,"name",{
value:"TransactionExpiredNonceInvalidError"
}
);
class _n{
constructor(t,e){
this.staticAccountKeys=void 0,this.accountKeysFromLookups=void 0,this.staticAccountKeys=t,this.accountKeysFromLookups=e
}
keySegments(){
const t=[this.staticAccountKeys];
return this.accountKeysFromLookups&&(t.push(this.accountKeysFromLookups.writable),t.push(this.accountKeysFromLookups.readonly)),t
}
get(t){
for(const e of this.keySegments()){
if(t<e.length)return e[t];
t-=e.length
}

}
get length(){
return this.keySegments().flat().length
}
compileInstructions(t){
if(this.length>256)throw new Error("Account index overflow encountered during compilation");
const e=new Map;
this.keySegments().flat().forEach(((t,r)=>{
e.set(t.toBase58(),r)
}
));
const r=t=>{
const r=e.get(t.toBase58());
if(void 0===r)throw new Error("Encountered an unknown instruction account key during compilation");
return r
}
;
return t.map((t=>({
programIdIndex:r(t.programId),accountKeyIndexes:t.keys.map((t=>r(t.pubkey))),data:t.data
}
)))
}

}
const Bn=(t="publicKey")=>or.Ik(32,t),On=(t="signature")=>or.Ik(64,t),Tn=(t="string")=>{
const e=or.n_([or.Jq("length"),or.Jq("lengthPadding"),or.Ik(or.cv(or.Jq(),-8),"chars")],t),r=e.decode.bind(e),n=e.encode.bind(e),o=e;
return o.decode=(t,e)=>r(t,e).chars.toString(),o.encode=(t,e,r)=>{
const o={
chars:Q.Buffer.from(t,"utf8")
}
;
return n(o,e,r)
}
,o.alloc=t=>or.Jq().span+or.Jq().span+Q.Buffer.from(t,"utf8").length,o
}
;
function Ln(t,e){
const r=t=>{
if(t.span>=0)return t.span;
if("function"==typeof t.alloc)return t.alloc(e[t.property]);
if("count"in t&&"elementLayout"in t){
const n=e[t.property];
if(Array.isArray(n))return n.length*r(t.elementLayout)
}
else if("fields"in t)return Ln({
layout:t
}
,e[t.property]);
return 0
}
;
let n=0;
return t.layout.fields.forEach((t=>{
n+=r(t)
}
)),n
}
function Pn(t){
let e=0,r=0;
for(;
;
){
let n=t.shift();
if(e|=(127&n)<<7*r,r+=1,!(128&n))break
}
return e
}
function Nn(t,e){
let r=e;
for(;
;
){
let e=127&r;
if(r>>=7,0==r){
t.push(e);
break
}
e|=128,t.push(e)
}

}
function zn(t,e){
if(!t)throw new Error(e||"Assertion failed")
}
class Rn{
constructor(t,e){
this.payer=void 0,this.keyMetaMap=void 0,this.payer=t,this.keyMetaMap=e
}
static compile(t,e){
const r=new Map,n=t=>{
const e=t.toBase58();
let n=r.get(e);
return void 0===n&&(n={
isSigner:!1,isWritable:!1,isInvoked:!1
}
,r.set(e,n)),n
}
,o=n(e);
o.isSigner=!0,o.isWritable=!0;
for(const e of t){
n(e.programId).isInvoked=!0;
for(const t of e.keys){
const e=n(t.pubkey);
e.isSigner||=t.isSigner,e.isWritable||=t.isWritable
}

}
return new Rn(e,r)
}
getMessageComponents(){
const t=[...this.keyMetaMap.entries()];
zn(t.length<=256,"Max static account keys length exceeded");
const e=t.filter((([,t])=>t.isSigner&&t.isWritable)),r=t.filter((([,t])=>t.isSigner&&!t.isWritable)),n=t.filter((([,t])=>!t.isSigner&&t.isWritable)),o=t.filter((([,t])=>!t.isSigner&&!t.isWritable)),i={
numRequiredSignatures:e.length+r.length,numReadonlySignedAccounts:r.length,numReadonlyUnsignedAccounts:o.length
}
;
{
zn(e.length>0,"Expected at least one writable signer key");
const[t]=e[0];
zn(t===this.payer.toBase58(),"Expected first writable signer key to be the fee payer")
}
return[i,[...e.map((([t])=>new Mn(t))),...r.map((([t])=>new Mn(t))),...n.map((([t])=>new Mn(t))),...o.map((([t])=>new Mn(t)))]]
}
extractTableLookup(t){
const[e,r]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&t.isWritable)),[n,o]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&!t.isWritable));
if(0!==e.length||0!==n.length)return[{
accountKey:t.key,writableIndexes:e,readonlyIndexes:n
}
,{
writable:r,readonly:o
}
]
}
drainKeysFoundInLookupTable(t,e){
const r=new Array,n=new Array;
for(const[o,i]of this.keyMetaMap.entries())if(e(i)){
const e=new Mn(o),i=t.findIndex((t=>t.equals(e)));
i>=0&&(zn(i<256,"Max lookup table index exceeded"),r.push(i),n.push(e),this.keyMetaMap.delete(o))
}
return[r,n]
}

}
const Un="Reached end of buffer unexpectedly";
function Dn(t){
if(0===t.length)throw new Error(Un);
return t.shift()
}
function qn(t,...e){
const[r]=e;
if(2===e.length?r+(e[1]??0)>t.length:r>=t.length)throw new Error(Un);
return t.splice(...e)
}
class Wn{
constructor(t){
this.header=void 0,this.accountKeys=void 0,this.recentBlockhash=void 0,this.instructions=void 0,this.indexToProgramIds=new Map,this.header=t.header,this.accountKeys=t.accountKeys.map((t=>new Mn(t))),this.recentBlockhash=t.recentBlockhash,this.instructions=t.instructions,this.instructions.forEach((t=>this.indexToProgramIds.set(t.programIdIndex,this.accountKeys[t.programIdIndex])))
}
get version(){
return"legacy"
}
get staticAccountKeys(){
return this.accountKeys
}
get compiledInstructions(){
return this.instructions.map((t=>({
programIdIndex:t.programIdIndex,accountKeyIndexes:t.accounts,data:E().decode(t.data)
}
)))
}
get addressTableLookups(){
return[]
}
getAccountKeys(){
return new _n(this.staticAccountKeys)
}
static compile(t){
const e=Rn.compile(t.instructions,t.payerKey),[r,n]=e.getMessageComponents(),o=new _n(n).compileInstructions(t.instructions).map((t=>({
programIdIndex:t.programIdIndex,accounts:t.accountKeyIndexes,data:E().encode(t.data)
}
)));
return new Wn({
header:r,accountKeys:n,recentBlockhash:t.recentBlockhash,instructions:o
}
)
}
isAccountSigner(t){
return t<this.header.numRequiredSignatures
}
isAccountWritable(t){
const e=this.header.numRequiredSignatures;
return t>=this.header.numRequiredSignatures?t-e<this.accountKeys.length-e-this.header.numReadonlyUnsignedAccounts:t<e-this.header.numReadonlySignedAccounts
}
isProgramId(t){
return this.indexToProgramIds.has(t)
}
programIds(){
return[...this.indexToProgramIds.values()]
}
nonProgramIds(){
return this.accountKeys.filter(((t,e)=>!this.isProgramId(e)))
}
serialize(){
const t=this.accountKeys.length;
let e=[];
Nn(e,t);
const r=this.instructions.map((t=>{
const{
accounts:e,programIdIndex:r
}
=t,n=Array.from(E().decode(t.data));
let o=[];
Nn(o,e.length);
let i=[];
return Nn(i,n.length),{
programIdIndex:r,keyIndicesCount:Q.Buffer.from(o),keyIndices:e,dataLength:Q.Buffer.from(i),data:n
}

}
));
let n=[];
Nn(n,r.length);
let o=Q.Buffer.alloc(En);
Q.Buffer.from(n).copy(o);
let i=n.length;
r.forEach((t=>{
const e=or.n_([or.u8("programIdIndex"),or.Ik(t.keyIndicesCount.length,"keyIndicesCount"),or.A9(or.u8("keyIndex"),t.keyIndices.length,"keyIndices"),or.Ik(t.dataLength.length,"dataLength"),or.A9(or.u8("userdatum"),t.data.length,"data")]).encode(t,o,i);
i+=e
}
)),o=o.slice(0,i);
const s=or.n_([or.Ik(1,"numRequiredSignatures"),or.Ik(1,"numReadonlySignedAccounts"),or.Ik(1,"numReadonlyUnsignedAccounts"),or.Ik(e.length,"keyCount"),or.A9(Bn("key"),t,"keys"),Bn("recentBlockhash")]),a={
numRequiredSignatures:Q.Buffer.from([this.header.numRequiredSignatures]),numReadonlySignedAccounts:Q.Buffer.from([this.header.numReadonlySignedAccounts]),numReadonlyUnsignedAccounts:Q.Buffer.from([this.header.numReadonlyUnsignedAccounts]),keyCount:Q.Buffer.from(e),keys:this.accountKeys.map((t=>mn(t.toBytes()))),recentBlockhash:E().decode(this.recentBlockhash)
}
;
let u=Q.Buffer.alloc(2048);
const c=s.encode(a,u);
return o.copy(u,c),u.slice(0,c+o.length)
}
static from(t){
let e=[...t];
const r=Dn(e);
if(r!==(127&r))throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
const n=Dn(e),o=Dn(e),i=Pn(e);
let s=[];
for(let t=0;
t<i;
t++){
const t=qn(e,0,kn);
s.push(new Mn(Q.Buffer.from(t)))
}
const a=qn(e,0,kn),u=Pn(e);
let c=[];
for(let t=0;
t<u;
t++){
const t=Dn(e),r=qn(e,0,Pn(e)),n=qn(e,0,Pn(e)),o=E().encode(Q.Buffer.from(n));
c.push({
programIdIndex:t,accounts:r,data:o
}
)
}
const l={
header:{
numRequiredSignatures:r,numReadonlySignedAccounts:n,numReadonlyUnsignedAccounts:o
}
,recentBlockhash:E().encode(Q.Buffer.from(a)),accountKeys:s,instructions:c
}
;
return new Wn(l)
}

}
class Cn{
constructor(t){
this.header=void 0,this.staticAccountKeys=void 0,this.recentBlockhash=void 0,this.compiledInstructions=void 0,this.addressTableLookups=void 0,this.header=t.header,this.staticAccountKeys=t.staticAccountKeys,this.recentBlockhash=t.recentBlockhash,this.compiledInstructions=t.compiledInstructions,this.addressTableLookups=t.addressTableLookups
}
get version(){
return 0
}
get numAccountKeysFromLookups(){
let t=0;
for(const e of this.addressTableLookups)t+=e.readonlyIndexes.length+e.writableIndexes.length;
return t
}
getAccountKeys(t){
let e;
if(t&&"accountKeysFromLookups"in t&&t.accountKeysFromLookups){
if(this.numAccountKeysFromLookups!=t.accountKeysFromLookups.writable.length+t.accountKeysFromLookups.readonly.length)throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
e=t.accountKeysFromLookups
}
else if(t&&"addressLookupTableAccounts"in t&&t.addressLookupTableAccounts)e=this.resolveAddressTableLookups(t.addressLookupTableAccounts);
else if(this.addressTableLookups.length>0)throw new Error("Failed to get account keys because address table lookups were not resolved");
return new _n(this.staticAccountKeys,e)
}
isAccountSigner(t){
return t<this.header.numRequiredSignatures
}
isAccountWritable(t){
const e=this.header.numRequiredSignatures,r=this.staticAccountKeys.length;
return t>=r?t-r<this.addressTableLookups.reduce(((t,e)=>t+e.writableIndexes.length),0):t>=this.header.numRequiredSignatures?t-e<r-e-this.header.numReadonlyUnsignedAccounts:t<e-this.header.numReadonlySignedAccounts
}
resolveAddressTableLookups(t){
const e={
writable:[],readonly:[]
}
;
for(const r of this.addressTableLookups){
const n=t.find((t=>t.key.equals(r.accountKey)));
if(!n)throw new Error(`Failed to find address lookup table account for table key ${
r.accountKey.toBase58()
}
`);
for(const t of r.writableIndexes){
if(!(t<n.state.addresses.length))throw new Error(`Failed to find address for index ${
t
}
 in address lookup table ${
r.accountKey.toBase58()
}
`);
e.writable.push(n.state.addresses[t])
}
for(const t of r.readonlyIndexes){
if(!(t<n.state.addresses.length))throw new Error(`Failed to find address for index ${
t
}
 in address lookup table ${
r.accountKey.toBase58()
}
`);
e.readonly.push(n.state.addresses[t])
}

}
return e
}
static compile(t){
const e=Rn.compile(t.instructions,t.payerKey),r=new Array,n={
writable:new Array,readonly:new Array
}
,o=t.addressLookupTableAccounts||[];
for(const t of o){
const o=e.extractTableLookup(t);
if(void 0!==o){
const[t,{
writable:e,readonly:i
}
]=o;
r.push(t),n.writable.push(...e),n.readonly.push(...i)
}

}
const[i,s]=e.getMessageComponents(),a=new _n(s,n).compileInstructions(t.instructions);
return new Cn({
header:i,staticAccountKeys:s,recentBlockhash:t.recentBlockhash,compiledInstructions:a,addressTableLookups:r
}
)
}
serialize(){
const t=Array();
Nn(t,this.staticAccountKeys.length);
const e=this.serializeInstructions(),r=Array();
Nn(r,this.compiledInstructions.length);
const n=this.serializeAddressTableLookups(),o=Array();
Nn(o,this.addressTableLookups.length);
const i=or.n_([or.u8("prefix"),or.n_([or.u8("numRequiredSignatures"),or.u8("numReadonlySignedAccounts"),or.u8("numReadonlyUnsignedAccounts")],"header"),or.Ik(t.length,"staticAccountKeysLength"),or.A9(Bn(),this.staticAccountKeys.length,"staticAccountKeys"),Bn("recentBlockhash"),or.Ik(r.length,"instructionsLength"),or.Ik(e.length,"serializedInstructions"),or.Ik(o.length,"addressTableLookupsLength"),or.Ik(n.length,"serializedAddressTableLookups")]),s=new Uint8Array(En),a=i.encode({
prefix:128,header:this.header,staticAccountKeysLength:new Uint8Array(t),staticAccountKeys:this.staticAccountKeys.map((t=>t.toBytes())),recentBlockhash:E().decode(this.recentBlockhash),instructionsLength:new Uint8Array(r),serializedInstructions:e,addressTableLookupsLength:new Uint8Array(o),serializedAddressTableLookups:n
}
,s);
return s.slice(0,a)
}
serializeInstructions(){
let t=0;
const e=new Uint8Array(En);
for(const r of this.compiledInstructions){
const n=Array();
Nn(n,r.accountKeyIndexes.length);
const o=Array();
Nn(o,r.data.length),t+=or.n_([or.u8("programIdIndex"),or.Ik(n.length,"encodedAccountKeyIndexesLength"),or.A9(or.u8(),r.accountKeyIndexes.length,"accountKeyIndexes"),or.Ik(o.length,"encodedDataLength"),or.Ik(r.data.length,"data")]).encode({
programIdIndex:r.programIdIndex,encodedAccountKeyIndexesLength:new Uint8Array(n),accountKeyIndexes:r.accountKeyIndexes,encodedDataLength:new Uint8Array(o),data:r.data
}
,e,t)
}
return e.slice(0,t)
}
serializeAddressTableLookups(){
let t=0;
const e=new Uint8Array(En);
for(const r of this.addressTableLookups){
const n=Array();
Nn(n,r.writableIndexes.length);
const o=Array();
Nn(o,r.readonlyIndexes.length),t+=or.n_([Bn("accountKey"),or.Ik(n.length,"encodedWritableIndexesLength"),or.A9(or.u8(),r.writableIndexes.length,"writableIndexes"),or.Ik(o.length,"encodedReadonlyIndexesLength"),or.A9(or.u8(),r.readonlyIndexes.length,"readonlyIndexes")]).encode({
accountKey:r.accountKey.toBytes(),encodedWritableIndexesLength:new Uint8Array(n),writableIndexes:r.writableIndexes,encodedReadonlyIndexesLength:new Uint8Array(o),readonlyIndexes:r.readonlyIndexes
}
,e,t)
}
return e.slice(0,t)
}
static deserialize(t){
let e=[...t];
const r=Dn(e),n=127&r;
zn(r!==n,"Expected versioned message but received legacy message"),zn(0===n,`Expected versioned message with version 0 but found version ${
n
}
`);
const o={
numRequiredSignatures:Dn(e),numReadonlySignedAccounts:Dn(e),numReadonlyUnsignedAccounts:Dn(e)
}
,i=[],s=Pn(e);
for(let t=0;
t<s;
t++)i.push(new Mn(qn(e,0,kn)));
const a=E().encode(qn(e,0,kn)),u=Pn(e),c=[];
for(let t=0;
t<u;
t++){
const t=Dn(e),r=qn(e,0,Pn(e)),n=Pn(e),o=new Uint8Array(qn(e,0,n));
c.push({
programIdIndex:t,accountKeyIndexes:r,data:o
}
)
}
const l=Pn(e),f=[];
for(let t=0;
t<l;
t++){
const t=new Mn(qn(e,0,kn)),r=qn(e,0,Pn(e)),n=qn(e,0,Pn(e));
f.push({
accountKey:t,writableIndexes:r,readonlyIndexes:n
}
)
}
return new Cn({
header:o,staticAccountKeys:i,recentBlockhash:a,compiledInstructions:c,addressTableLookups:f
}
)
}

}
const Fn={
deserializeMessageVersion(t){
const e=t[0],r=127&e;
return r===e?"legacy":r
}
,deserialize:t=>{
const e=Fn.deserializeMessageVersion(t);
if("legacy"===e)return Wn.from(t);
if(0===e)return Cn.deserialize(t);
throw new Error(`Transaction message version ${
e
}
 deserialization is not supported`)
}

}
,Kn=Q.Buffer.alloc(64).fill(0);
class $n{
constructor(t){
this.keys=void 0,this.programId=void 0,this.data=Q.Buffer.alloc(0),this.programId=t.programId,this.keys=t.keys,t.data&&(this.data=t.data)
}
toJSON(){
return{
keys:this.keys.map((({
pubkey:t,isSigner:e,isWritable:r
}
)=>({
pubkey:t.toJSON(),isSigner:e,isWritable:r
}
))),programId:this.programId.toJSON(),data:[...this.data]
}

}

}
class Hn{
get signature(){
return this.signatures.length>0?this.signatures[0].signature:null
}
constructor(t){
if(this.signatures=[],this.feePayer=void 0,this.instructions=[],this.recentBlockhash=void 0,this.lastValidBlockHeight=void 0,this.nonceInfo=void 0,this.minNonceContextSlot=void 0,this._message=void 0,this._json=void 0,t)if(t.feePayer&&(this.feePayer=t.feePayer),t.signatures&&(this.signatures=t.signatures),Object.prototype.hasOwnProperty.call(t,"nonceInfo")){
const{
minContextSlot:e,nonceInfo:r
}
=t;
this.minNonceContextSlot=e,this.nonceInfo=r
}
else if(Object.prototype.hasOwnProperty.call(t,"lastValidBlockHeight")){
const{
blockhash:e,lastValidBlockHeight:r
}
=t;
this.recentBlockhash=e,this.lastValidBlockHeight=r
}
else{
const{
recentBlockhash:e,nonceInfo:r
}
=t;
r&&(this.nonceInfo=r),this.recentBlockhash=e
}

}
toJSON(){
return{
recentBlockhash:this.recentBlockhash||null,feePayer:this.feePayer?this.feePayer.toJSON():null,nonceInfo:this.nonceInfo?{
nonce:this.nonceInfo.nonce,nonceInstruction:this.nonceInfo.nonceInstruction.toJSON()
}
:null,instructions:this.instructions.map((t=>t.toJSON())),signers:this.signatures.map((({
publicKey:t
}
)=>t.toJSON()))
}

}
add(...t){
if(0===t.length)throw new Error("No instructions");
return t.forEach((t=>{
"instructions"in t?this.instructions=this.instructions.concat(t.instructions):"data"in t&&"programId"in t&&"keys"in t?this.instructions.push(t):this.instructions.push(new $n(t))
}
)),this
}
compileMessage(){
if(this._message&&JSON.stringify(this.toJSON())===JSON.stringify(this._json))return this._message;
let t,e,r;
if(this.nonceInfo?(t=this.nonceInfo.nonce,e=this.instructions[0]!=this.nonceInfo.nonceInstruction?[this.nonceInfo.nonceInstruction,...this.instructions]:this.instructions):(t=this.recentBlockhash,e=this.instructions),!t)throw new Error("Transaction recentBlockhash required");
if(e.length<1&&fn.warn("No instructions provided"),this.feePayer)r=this.feePayer;
else{
if(!(this.signatures.length>0&&this.signatures[0].publicKey))throw new Error("Transaction fee payer required");
r=this.signatures[0].publicKey
}
for(let t=0;
t<e.length;
t++)if(void 0===e[t].programId)throw new Error(`Transaction instruction index ${
t
}
 has undefined program id`);
const n=[],o=[];
e.forEach((t=>{
t.keys.forEach((t=>{
o.push({
...t
}
)
}
));
const e=t.programId.toString();
n.includes(e)||n.push(e)
}
)),n.forEach((t=>{
o.push({
pubkey:new Mn(t),isSigner:!1,isWritable:!1
}
)
}
));
const i=[];
o.forEach((t=>{
const e=t.pubkey.toString(),r=i.findIndex((t=>t.pubkey.toString()===e));
r>-1?(i[r].isWritable=i[r].isWritable||t.isWritable,i[r].isSigner=i[r].isSigner||t.isSigner):i.push(t)
}
)),i.sort((function(t,e){
return t.isSigner!==e.isSigner?t.isSigner?-1:1:t.isWritable!==e.isWritable?t.isWritable?-1:1:t.pubkey.toBase58().localeCompare(e.pubkey.toBase58(),"en",{
localeMatcher:"best fit",usage:"sort",sensitivity:"variant",ignorePunctuation:!1,numeric:!1,caseFirst:"lower"
}
)
}
));
const s=i.findIndex((t=>t.pubkey.equals(r)));
if(s>-1){
const[t]=i.splice(s,1);
t.isSigner=!0,t.isWritable=!0,i.unshift(t)
}
else i.unshift({
pubkey:r,isSigner:!0,isWritable:!0
}
);
for(const t of this.signatures){
const e=i.findIndex((e=>e.pubkey.equals(t.publicKey)));
if(!(e>-1))throw new Error(`unknown signer: ${
t.publicKey.toString()
}
`);
i[e].isSigner||(i[e].isSigner=!0,fn.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."))
}
let a=0,u=0,c=0;
const l=[],f=[];
i.forEach((({
pubkey:t,isSigner:e,isWritable:r
}
)=>{
e?(l.push(t.toString()),a+=1,r||(u+=1)):(f.push(t.toString()),r||(c+=1))
}
));
const h=l.concat(f),d=e.map((t=>{
const{
data:e,programId:r
}
=t;
return{
programIdIndex:h.indexOf(r.toString()),accounts:t.keys.map((t=>h.indexOf(t.pubkey.toString()))),data:E().encode(e)
}

}
));
return d.forEach((t=>{
zn(t.programIdIndex>=0),t.accounts.forEach((t=>zn(t>=0)))
}
)),new Wn({
header:{
numRequiredSignatures:a,numReadonlySignedAccounts:u,numReadonlyUnsignedAccounts:c
}
,accountKeys:h,recentBlockhash:t,instructions:d
}
)
}
_compile(){
const t=this.compileMessage(),e=t.accountKeys.slice(0,t.header.numRequiredSignatures);
return this.signatures.length===e.length&&this.signatures.every(((t,r)=>e[r].equals(t.publicKey)))||(this.signatures=e.map((t=>({
signature:null,publicKey:t
}
)))),t
}
serializeMessage(){
return this._compile().serialize()
}
async getEstimatedFee(t){
return(await t.getFeeForMessage(this.compileMessage())).value
}
setSigners(...t){
if(0===t.length)throw new Error("No signers");
const e=new Set;
this.signatures=t.filter((t=>{
const r=t.toString();
return!e.has(r)&&(e.add(r),!0)
}
)).map((t=>({
signature:null,publicKey:t
}
)))
}
sign(...t){
if(0===t.length)throw new Error("No signers");
const e=new Set,r=[];
for(const n of t){
const t=n.publicKey.toString();
e.has(t)||(e.add(t),r.push(n))
}
this.signatures=r.map((t=>({
signature:null,publicKey:t.publicKey
}
)));
const n=this._compile();
this._partialSign(n,...r)
}
partialSign(...t){
if(0===t.length)throw new Error("No signers");
const e=new Set,r=[];
for(const n of t){
const t=n.publicKey.toString();
e.has(t)||(e.add(t),r.push(n))
}
const n=this._compile();
this._partialSign(n,...r)
}
_partialSign(t,...e){
const r=t.serialize();
e.forEach((t=>{
const e=yn(r,t.secretKey);
this._addSignature(t.publicKey,mn(e))
}
))
}
addSignature(t,e){
this._compile(),this._addSignature(t,e)
}
_addSignature(t,e){
zn(64===e.length);
const r=this.signatures.findIndex((e=>t.equals(e.publicKey)));
if(r<0)throw new Error(`unknown signer: ${
t.toString()
}
`);
this.signatures[r].signature=Q.Buffer.from(e)
}
verifySignatures(t=!0){
return!this._getMessageSignednessErrors(this.serializeMessage(),t)
}
_getMessageSignednessErrors(t,e){
const r={

}
;
for(const{
signature:n,publicKey:o
}
of this.signatures)null===n?e&&(r.missing||=[]).push(o):gn(n,t,o.toBytes())||(r.invalid||=[]).push(o);
return r.invalid||r.missing?r:void 0
}
serialize(t){
const{
requireAllSignatures:e,verifySignatures:r
}
=Object.assign({
requireAllSignatures:!0,verifySignatures:!0
}
,t),n=this.serializeMessage();
if(r){
const t=this._getMessageSignednessErrors(n,e);
if(t){
let e="Signature verification failed.";
throw t.invalid&&(e+=`\nInvalid signature for public key${
1===t.invalid.length?"":"(s)"
}
 [\`${
t.invalid.map((t=>t.toBase58())).join("`, `")
}
\`].`),t.missing&&(e+=`\nMissing signature for public key${
1===t.missing.length?"":"(s)"
}
 [\`${
t.missing.map((t=>t.toBase58())).join("`, `")
}
\`].`),new Error(e)
}

}
return this._serialize(n)
}
_serialize(t){
const{
signatures:e
}
=this,r=[];
Nn(r,e.length);
const n=r.length+64*e.length+t.length,o=Q.Buffer.alloc(n);
return zn(e.length<256),Q.Buffer.from(r).copy(o,0),e.forEach((({
signature:t
}
,e)=>{
null!==t&&(zn(64===t.length,"signature has invalid length"),Q.Buffer.from(t).copy(o,r.length+64*e))
}
)),t.copy(o,r.length+64*e.length),zn(o.length<=En,`Transaction too large: ${
o.length
}
 > 1232`),o
}
get keys(){
return zn(1===this.instructions.length),this.instructions[0].keys.map((t=>t.pubkey))
}
get programId(){
return zn(1===this.instructions.length),this.instructions[0].programId
}
get data(){
return zn(1===this.instructions.length),this.instructions[0].data
}
static from(t){
let e=[...t];
const r=Pn(e);
let n=[];
for(let t=0;
t<r;
t++){
const t=qn(e,0,64);
n.push(E().encode(Q.Buffer.from(t)))
}
return Hn.populate(Wn.from(e),n)
}
static populate(t,e=[]){
const r=new Hn;
return r.recentBlockhash=t.recentBlockhash,t.header.numRequiredSignatures>0&&(r.feePayer=t.accountKeys[0]),e.forEach(((e,n)=>{
const o={
signature:e==E().encode(Kn)?null:E().decode(e),publicKey:t.accountKeys[n]
}
;
r.signatures.push(o)
}
)),t.instructions.forEach((e=>{
const n=e.accounts.map((e=>{
const n=t.accountKeys[e];
return{
pubkey:n,isSigner:r.signatures.some((t=>t.publicKey.toString()===n.toString()))||t.isAccountSigner(e),isWritable:t.isAccountWritable(e)
}

}
));
r.instructions.push(new $n({
keys:n,programId:t.accountKeys[e.programIdIndex],data:E().decode(e.data)
}
))
}
)),r._message=t,r._json=r.toJSON(),r
}

}
class Vn{
get version(){
return this.message.version
}
constructor(t,e){
if(this.signatures=void 0,this.message=void 0,void 0!==e)zn(e.length===t.header.numRequiredSignatures,"Expected signatures length to be equal to the number of required signatures"),this.signatures=e;
else{
const e=[];
for(let r=0;
r<t.header.numRequiredSignatures;
r++)e.push(new Uint8Array(64));
this.signatures=e
}
this.message=t
}
serialize(){
const t=this.message.serialize(),e=Array();
Nn(e,this.signatures.length);
const r=or.n_([or.Ik(e.length,"encodedSignaturesLength"),or.A9(On(),this.signatures.length,"signatures"),or.Ik(t.length,"serializedMessage")]),n=new Uint8Array(2048),o=r.encode({
encodedSignaturesLength:new Uint8Array(e),signatures:this.signatures,serializedMessage:t
}
,n);
return n.slice(0,o)
}
static deserialize(t){
let e=[...t];
const r=[],n=Pn(e);
for(let t=0;
t<n;
t++)r.push(new Uint8Array(qn(e,0,64)));
const o=Fn.deserialize(new Uint8Array(e));
return new Vn(o,r)
}
sign(t){
const e=this.message.serialize(),r=this.message.staticAccountKeys.slice(0,this.message.header.numRequiredSignatures);
for(const n of t){
const t=r.findIndex((t=>t.equals(n.publicKey)));
zn(t>=0,`Cannot sign with non signer key ${
n.publicKey.toBase58()
}
`),this.signatures[t]=yn(e,n.secretKey)
}

}
addSignature(t,e){
zn(64===e.byteLength,"Signature must be 64 bytes long");
const r=this.message.staticAccountKeys.slice(0,this.message.header.numRequiredSignatures).findIndex((e=>e.equals(t)));
zn(r>=0,`Can not add signature;
 \`${
t.toBase58()
}
\` is not required to sign this transaction`),this.signatures[r]=e
}

}
const Gn=new Mn("SysvarC1ock11111111111111111111111111111111"),Jn=(new Mn("SysvarEpochSchedu1e111111111111111111111111"),new Mn("Sysvar1nstructions1111111111111111111111111"),new Mn("SysvarRecentB1ockHashes11111111111111111111")),Zn=new Mn("SysvarRent111111111111111111111111111111111"),Yn=(new Mn("SysvarRewards111111111111111111111111111111"),new Mn("SysvarS1otHashes111111111111111111111111111"),new Mn("SysvarS1otHistory11111111111111111111111111"),new Mn("SysvarStakeHistory1111111111111111111111111"));
async function Qn(t,e,r,n){
const o=n&&{
skipPreflight:n.skipPreflight,preflightCommitment:n.preflightCommitment||n.commitment,maxRetries:n.maxRetries,minContextSlot:n.minContextSlot
}
,i=await t.sendTransaction(e,r,o);
let s;
if(null!=e.recentBlockhash&&null!=e.lastValidBlockHeight)s=(await t.confirmTransaction({
abortSignal:n?.abortSignal,signature:i,blockhash:e.recentBlockhash,lastValidBlockHeight:e.lastValidBlockHeight
}
,n&&n.commitment)).value;
else if(null!=e.minNonceContextSlot&&null!=e.nonceInfo){
const{
nonceInstruction:r
}
=e.nonceInfo,o=r.keys[0].pubkey;
s=(await t.confirmTransaction({
abortSignal:n?.abortSignal,minContextSlot:e.minNonceContextSlot,nonceAccountPubkey:o,nonceValue:e.nonceInfo.nonce,signature:i
}
,n&&n.commitment)).value
}
else null!=n?.abortSignal&&fn.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."),s=(await t.confirmTransaction(i,n&&n.commitment)).value;
if(s.err)throw new Error(`Transaction ${
i
}
 failed (${
JSON.stringify(s)
}
)`);
return i
}
function Xn(t){
return new Promise((e=>setTimeout(e,t)))
}
function to(t,e){
const r=t.layout.span>=0?t.layout.span:Ln(t,e),n=Q.Buffer.alloc(r),o=Object.assign({
instruction:t.index
}
,e);
return t.layout.encode(o,n),n
}
const eo=or._O("lamportsPerSignature"),ro=or.n_([or.Jq("version"),or.Jq("state"),Bn("authorizedPubkey"),Bn("nonce"),or.n_([eo],"feeCalculator")]).span,no=(8,t=>{
const e=(0,or.Ik)(8,t),{
encode:r,decode:n
}
=(t=>({
decode:t.decode.bind(t),encode:t.encode.bind(t)
}
))(e),o=e;
return o.decode=(t,e)=>{
const r=n(t,e);
return(0,ir.oU)(Q.Buffer.from(r))
}
,o.encode=(t,e,n)=>{
const o=(0,ir.k$)(t,8);
return r(o,e,n)
}
,o
}
);
const oo=Object.freeze({
Create:{
index:0,layout:or.n_([or.Jq("instruction"),or.gM("lamports"),or.gM("space"),Bn("programId")])
}
,Assign:{
index:1,layout:or.n_([or.Jq("instruction"),Bn("programId")])
}
,Transfer:{
index:2,layout:or.n_([or.Jq("instruction"),no("lamports")])
}
,CreateWithSeed:{
index:3,layout:or.n_([or.Jq("instruction"),Bn("base"),Tn("seed"),or.gM("lamports"),or.gM("space"),Bn("programId")])
}
,AdvanceNonceAccount:{
index:4,layout:or.n_([or.Jq("instruction")])
}
,WithdrawNonceAccount:{
index:5,layout:or.n_([or.Jq("instruction"),or.gM("lamports")])
}
,InitializeNonceAccount:{
index:6,layout:or.n_([or.Jq("instruction"),Bn("authorized")])
}
,AuthorizeNonceAccount:{
index:7,layout:or.n_([or.Jq("instruction"),Bn("authorized")])
}
,Allocate:{
index:8,layout:or.n_([or.Jq("instruction"),or.gM("space")])
}
,AllocateWithSeed:{
index:9,layout:or.n_([or.Jq("instruction"),Bn("base"),Tn("seed"),or.gM("space"),Bn("programId")])
}
,AssignWithSeed:{
index:10,layout:or.n_([or.Jq("instruction"),Bn("base"),Tn("seed"),Bn("programId")])
}
,TransferWithSeed:{
index:11,layout:or.n_([or.Jq("instruction"),no("lamports"),Tn("seed"),Bn("programId")])
}
,UpgradeNonceAccount:{
index:12,layout:or.n_([or.Jq("instruction")])
}

}
);
class io{
constructor(){

}
static createAccount(t){
const e=to(oo.Create,{
lamports:t.lamports,space:t.space,programId:mn(t.programId.toBuffer())
}
);
return new $n({
keys:[{
pubkey:t.fromPubkey,isSigner:!0,isWritable:!0
}
,{
pubkey:t.newAccountPubkey,isSigner:!0,isWritable:!0
}
],programId:this.programId,data:e
}
)
}
static transfer(t){
let e,r;
return"basePubkey"in t?(e=to(oo.TransferWithSeed,{
lamports:BigInt(t.lamports),seed:t.seed,programId:mn(t.programId.toBuffer())
}
),r=[{
pubkey:t.fromPubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:t.basePubkey,isSigner:!0,isWritable:!1
}
,{
pubkey:t.toPubkey,isSigner:!1,isWritable:!0
}
]):(e=to(oo.Transfer,{
lamports:BigInt(t.lamports)
}
),r=[{
pubkey:t.fromPubkey,isSigner:!0,isWritable:!0
}
,{
pubkey:t.toPubkey,isSigner:!1,isWritable:!0
}
]),new $n({
keys:r,programId:this.programId,data:e
}
)
}
static assign(t){
let e,r;
return"basePubkey"in t?(e=to(oo.AssignWithSeed,{
base:mn(t.basePubkey.toBuffer()),seed:t.seed,programId:mn(t.programId.toBuffer())
}
),r=[{
pubkey:t.accountPubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:t.basePubkey,isSigner:!0,isWritable:!1
}
]):(e=to(oo.Assign,{
programId:mn(t.programId.toBuffer())
}
),r=[{
pubkey:t.accountPubkey,isSigner:!0,isWritable:!0
}
]),new $n({
keys:r,programId:this.programId,data:e
}
)
}
static createAccountWithSeed(t){
const e=to(oo.CreateWithSeed,{
base:mn(t.basePubkey.toBuffer()),seed:t.seed,lamports:t.lamports,space:t.space,programId:mn(t.programId.toBuffer())
}
);
let r=[{
pubkey:t.fromPubkey,isSigner:!0,isWritable:!0
}
,{
pubkey:t.newAccountPubkey,isSigner:!1,isWritable:!0
}
];
return t.basePubkey!=t.fromPubkey&&r.push({
pubkey:t.basePubkey,isSigner:!0,isWritable:!1
}
),new $n({
keys:r,programId:this.programId,data:e
}
)
}
static createNonceAccount(t){
const e=new Hn;
"basePubkey"in t&&"seed"in t?e.add(io.createAccountWithSeed({
fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:ro,programId:this.programId
}
)):e.add(io.createAccount({
fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,lamports:t.lamports,space:ro,programId:this.programId
}
));
const r={
noncePubkey:t.noncePubkey,authorizedPubkey:t.authorizedPubkey
}
;
return e.add(this.nonceInitialize(r)),e
}
static nonceInitialize(t){
const e=to(oo.InitializeNonceAccount,{
authorized:mn(t.authorizedPubkey.toBuffer())
}
),r={
keys:[{
pubkey:t.noncePubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:Jn,isSigner:!1,isWritable:!1
}
,{
pubkey:Zn,isSigner:!1,isWritable:!1
}
],programId:this.programId,data:e
}
;
return new $n(r)
}
static nonceAdvance(t){
const e=to(oo.AdvanceNonceAccount),r={
keys:[{
pubkey:t.noncePubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:Jn,isSigner:!1,isWritable:!1
}
,{
pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:e
}
;
return new $n(r)
}
static nonceWithdraw(t){
const e=to(oo.WithdrawNonceAccount,{
lamports:t.lamports
}
);
return new $n({
keys:[{
pubkey:t.noncePubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:t.toPubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:Jn,isSigner:!1,isWritable:!1
}
,{
pubkey:Zn,isSigner:!1,isWritable:!1
}
,{
pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:e
}
)
}
static nonceAuthorize(t){
const e=to(oo.AuthorizeNonceAccount,{
authorized:mn(t.newAuthorizedPubkey.toBuffer())
}
);
return new $n({
keys:[{
pubkey:t.noncePubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:e
}
)
}
static allocate(t){
let e,r;
return"basePubkey"in t?(e=to(oo.AllocateWithSeed,{
base:mn(t.basePubkey.toBuffer()),seed:t.seed,space:t.space,programId:mn(t.programId.toBuffer())
}
),r=[{
pubkey:t.accountPubkey,isSigner:!1,isWritable:!0
}
,{
pubkey:t.basePubkey,isSigner:!0,isWritable:!1
}
]):(e=to(oo.Allocate,{
space:t.space
}
),r=[{
pubkey:t.accountPubkey,isSigner:!0,isWritable:!0
}
]),new $n({
keys:r,programId:this.programId,data:e
}
)
}

}
io.programId=new Mn("11111111111111111111111111111111");
class so{
constructor(){

}
static getMinNumSignatures(t){
return 2*(Math.ceil(t/so.chunkSize)+1+1)
}
static async load(t,e,r,n,o){
{
const i=await t.getMinimumBalanceForRentExemption(o.length),s=await t.getAccountInfo(r.publicKey,"confirmed");
let a=null;
if(null!==s){
if(s.executable)return fn.error("Program load failed, account is already executable"),!1;
s.data.length!==o.length&&(a=a||new Hn,a.add(io.allocate({
accountPubkey:r.publicKey,space:o.length
}
))),s.owner.equals(n)||(a=a||new Hn,a.add(io.assign({
accountPubkey:r.publicKey,programId:n
}
))),s.lamports<i&&(a=a||new Hn,a.add(io.transfer({
fromPubkey:e.publicKey,toPubkey:r.publicKey,lamports:i-s.lamports
}
)))
}
else a=(new Hn).add(io.createAccount({
fromPubkey:e.publicKey,newAccountPubkey:r.publicKey,lamports:i>0?i:1,space:o.length,programId:n
}
));
null!==a&&await Qn(t,a,[e,r],{
commitment:"confirmed"
}
)
}
const i=or.n_([or.Jq("instruction"),or.Jq("offset"),or.Jq("bytesLength"),or.Jq("bytesLengthPadding"),or.A9(or.u8("byte"),or.cv(or.Jq(),-8),"bytes")]),s=so.chunkSize;
let a=0,u=o,c=[];
for(;
u.length>0;
){
const o=u.slice(0,s),l=Q.Buffer.alloc(s+16);
i.encode({
instruction:0,offset:a,bytes:o,bytesLength:0,bytesLengthPadding:0
}
,l);
const f=(new Hn).add({
keys:[{
pubkey:r.publicKey,isSigner:!0,isWritable:!0
}
],programId:n,data:l
}
);
if(c.push(Qn(t,f,[e,r],{
commitment:"confirmed"
}
)),t._rpcEndpoint.includes("solana.com")){
const t=4;
await Xn(1e3/t)
}
a+=s,u=u.slice(s)
}
await Promise.all(c);
{
const o=or.n_([or.Jq("instruction")]),i=Q.Buffer.alloc(o.span);
o.encode({
instruction:1
}
,i);
const s=(new Hn).add({
keys:[{
pubkey:r.publicKey,isSigner:!0,isWritable:!0
}
,{
pubkey:Zn,isSigner:!1,isWritable:!1
}
],programId:n,data:i
}
),a="processed",u=await t.sendTransaction(s,[e,r],{
preflightCommitment:a
}
),{
context:c,value:l
}
=await t.confirmTransaction({
signature:u,lastValidBlockHeight:s.lastValidBlockHeight,blockhash:s.recentBlockhash
}
,a);
if(l.err)throw new Error(`Transaction ${
u
}
 failed (${
JSON.stringify(l)
}
)`);
for(;
;
){
try{
if(await t.getSlot({
commitment:a
}
)>c.slot)break
}
catch{

}
await new Promise((t=>setTimeout(t,Math.round(200))))
}

}
return!0
}

}
so.chunkSize=932,new Mn("BPFLoader2111111111111111111111111111111111"),Object.prototype.toString,Object.keys,Error,Error,globalThis.fetch,or.n_([or.Jq("typeIndex"),no("deactivationSlot"),or._O("lastExtendedSlot"),or.u8("lastExtendedStartIndex"),or.u8(),or.A9(Bn(),or.cv(or.u8(),-1),"authority")]);
const ao=Br(wr(Mn),Er(),(t=>new Mn(t))),uo=Ar([Er(),vr("base64")]),co=Br(wr(Q.Buffer),uo,(t=>Q.Buffer.from(t[0],"base64")));
function lo(t){
return jr([Ir({
jsonrpc:vr("2.0"),id:Er(),result:t
}
),Ir({
jsonrpc:vr("2.0"),id:Er(),error:Ir({
code:_r(),message:Er(),data:Sr(gr("any",(()=>!0)))
}
)
}
)])
}
const fo=lo(_r());
function ho(t){
return Br(lo(t),fo,(e=>"error"in e?e:{
...e,result:dr(e.result,t)
}
))
}
function po(t){
return ho(Ir({
context:Ir({
slot:kr()
}
),value:t
}
))
}
function yo(t){
return Ir({
context:Ir({
slot:kr()
}
),value:t
}
)
}
const go=Ir({
foundation:kr(),foundationTerm:kr(),initial:kr(),taper:kr(),terminal:kr()
}
),mo=(ho(mr(xr(Ir({
epoch:kr(),effectiveSlot:kr(),amount:kr(),postBalance:kr(),commission:Sr(xr(kr()))
}
)))),mr(Ir({
slot:kr(),prioritizationFee:kr()
}
))),bo=Ir({
total:kr(),validator:kr(),foundation:kr(),epoch:kr()
}
),wo=Ir({
epoch:kr(),slotIndex:kr(),slotsInEpoch:kr(),absoluteSlot:kr(),blockHeight:Sr(kr()),transactionCount:Sr(kr())
}
),vo=Ir({
slotsPerEpoch:kr(),leaderScheduleSlotOffset:kr(),warmup:br(),firstNormalEpoch:kr(),firstNormalSlot:kr()
}
),xo=Mr(Er(),mr(kr())),ko=xr(jr([Ir({

}
),Er()])),So=Ir({
err:ko
}
),Mo=vr("receivedSignature");
Ir({
"solana-core":Er(),"feature-set":Sr(kr())
}
),po(Ir({
err:xr(jr([Ir({

}
),Er()])),logs:xr(mr(Er())),accounts:Sr(xr(mr(xr(Ir({
executable:br(),owner:Er(),lamports:kr(),data:mr(Er()),rentEpoch:Sr(kr())
}
))))),unitsConsumed:Sr(kr()),returnData:Sr(xr(Ir({
programId:Er(),data:Ar([Er(),vr("base64")])
}
)))
}
)),po(Ir({
byIdentity:Mr(Er(),mr(kr())),range:Ir({
firstSlot:kr(),lastSlot:kr()
}
)
}
)),ho(go),ho(bo),ho(mo),ho(wo),ho(vo),ho(xo),ho(kr()),po(Ir({
total:kr(),circulating:kr(),nonCirculating:kr(),nonCirculatingAccounts:mr(ao)
}
));
const Eo=Ir({
amount:Er(),uiAmount:xr(kr()),decimals:kr(),uiAmountString:Sr(Er())
}
),Ao=(po(mr(Ir({
address:ao,amount:Er(),uiAmount:xr(kr()),decimals:kr(),uiAmountString:Sr(Er())
}
))),po(mr(Ir({
pubkey:ao,account:Ir({
executable:br(),owner:ao,lamports:kr(),data:co,rentEpoch:kr()
}
)
}
))),Ir({
program:Er(),parsed:_r(),space:kr()
}
)),Io=(po(mr(Ir({
pubkey:ao,account:Ir({
executable:br(),owner:ao,lamports:kr(),data:Ao,rentEpoch:kr()
}
)
}
))),po(mr(Ir({
lamports:kr(),address:ao
}
))),Ir({
executable:br(),owner:ao,lamports:kr(),data:co,rentEpoch:kr()
}
)),jo=(Ir({
pubkey:ao,account:Io
}
),Br(jr([wr(Q.Buffer),Ao]),jr([uo,Ao]),(t=>Array.isArray(t)?dr(t,co):t))),_o=Ir({
executable:br(),owner:ao,lamports:kr(),data:jo,rentEpoch:kr()
}
),Bo=(Ir({
pubkey:ao,account:_o
}
),Ir({
state:jr([vr("active"),vr("inactive"),vr("activating"),vr("deactivating")]),active:kr(),inactive:kr()
}
),ho(mr(Ir({
signature:Er(),slot:kr(),err:ko,memo:xr(Er()),blockTime:Sr(xr(kr()))
}
))),ho(mr(Ir({
signature:Er(),slot:kr(),err:ko,memo:xr(Er()),blockTime:Sr(xr(kr()))
}
))),Ir({
subscription:kr(),result:yo(Io)
}
),Ir({
pubkey:ao,account:Io
}
)),Oo=(Ir({
subscription:kr(),result:yo(Bo)
}
),Ir({
parent:kr(),slot:kr(),root:kr()
}
)),To=(Ir({
subscription:kr(),result:Oo
}
),jr([Ir({
type:jr([vr("firstShredReceived"),vr("completed"),vr("optimisticConfirmation"),vr("root")]),slot:kr(),timestamp:kr()
}
),Ir({
type:vr("createdBank"),parent:kr(),slot:kr(),timestamp:kr()
}
),Ir({
type:vr("frozen"),slot:kr(),timestamp:kr(),stats:Ir({
numTransactionEntries:kr(),numSuccessfulTransactions:kr(),numFailedTransactions:kr(),maxTransactionsPerEntry:kr()
}
)
}
),Ir({
type:vr("dead"),slot:kr(),timestamp:kr(),err:Er()
}
)])),Lo=(Ir({
subscription:kr(),result:To
}
),Ir({
subscription:kr(),result:yo(jr([So,Mo]))
}
),Ir({
subscription:kr(),result:kr()
}
),Ir({
pubkey:Er(),gossip:xr(Er()),tpu:xr(Er()),rpc:xr(Er()),version:xr(Er())
}
),Ir({
votePubkey:Er(),nodePubkey:Er(),activatedStake:kr(),epochVoteAccount:br(),epochCredits:mr(Ar([kr(),kr(),kr()])),commission:kr(),lastVote:kr(),rootSlot:xr(kr())
}
)),Po=(ho(Ir({
current:mr(Lo),delinquent:mr(Lo)
}
)),jr([vr("processed"),vr("confirmed"),vr("finalized")])),No=Ir({
slot:kr(),confirmations:xr(kr()),err:ko,confirmationStatus:Sr(Po)
}
),zo=(po(mr(xr(No))),ho(kr()),Ir({
accountKey:ao,writableIndexes:mr(kr()),readonlyIndexes:mr(kr())
}
)),Ro=Ir({
signatures:mr(Er()),message:Ir({
accountKeys:mr(Er()),header:Ir({
numRequiredSignatures:kr(),numReadonlySignedAccounts:kr(),numReadonlyUnsignedAccounts:kr()
}
),instructions:mr(Ir({
accounts:mr(kr()),data:Er(),programIdIndex:kr()
}
)),recentBlockhash:Er(),addressTableLookups:Sr(mr(zo))
}
)
}
),Uo=Ir({
pubkey:ao,signer:br(),writable:br(),source:Sr(jr([vr("transaction"),vr("lookupTable")]))
}
),Do=Ir({
accountKeys:mr(Uo),signatures:mr(Er())
}
),qo=Ir({
parsed:_r(),program:Er(),programId:ao
}
),Wo=Ir({
accounts:mr(ao),data:Er(),programId:ao
}
),Co=Br(jr([Wo,qo]),jr([Ir({
parsed:_r(),program:Er(),programId:Er()
}
),Ir({
accounts:mr(Er()),data:Er(),programId:Er()
}
)]),(t=>dr(t,"accounts"in t?Wo:qo))),Fo=Ir({
signatures:mr(Er()),message:Ir({
accountKeys:mr(Uo),instructions:mr(Co),recentBlockhash:Er(),addressTableLookups:Sr(xr(mr(zo)))
}
)
}
),Ko=Ir({
accountIndex:kr(),mint:Er(),owner:Sr(Er()),uiTokenAmount:Eo
}
),$o=Ir({
writable:mr(ao),readonly:mr(ao)
}
),Ho=Ir({
err:ko,fee:kr(),innerInstructions:Sr(xr(mr(Ir({
index:kr(),instructions:mr(Ir({
accounts:mr(kr()),data:Er(),programIdIndex:kr()
}
))
}
)))),preBalances:mr(kr()),postBalances:mr(kr()),logMessages:Sr(xr(mr(Er()))),preTokenBalances:Sr(xr(mr(Ko))),postTokenBalances:Sr(xr(mr(Ko))),loadedAddresses:Sr($o),computeUnitsConsumed:Sr(kr())
}
),Vo=Ir({
err:ko,fee:kr(),innerInstructions:Sr(xr(mr(Ir({
index:kr(),instructions:mr(Co)
}
)))),preBalances:mr(kr()),postBalances:mr(kr()),logMessages:Sr(xr(mr(Er()))),preTokenBalances:Sr(xr(mr(Ko))),postTokenBalances:Sr(xr(mr(Ko))),loadedAddresses:Sr($o),computeUnitsConsumed:Sr(kr())
}
),Go=jr([vr(0),vr("legacy")]),Jo=Ir({
pubkey:Er(),lamports:kr(),postBalance:xr(kr()),rewardType:xr(Er()),commission:Sr(xr(kr()))
}
),Zo=(ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),transactions:mr(Ir({
transaction:Ro,meta:xr(Ho),version:Sr(Go)
}
)),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),transactions:mr(Ir({
transaction:Do,meta:xr(Ho),version:Sr(Go)
}
)),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),transactions:mr(Ir({
transaction:Fo,meta:xr(Vo),version:Sr(Go)
}
)),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),transactions:mr(Ir({
transaction:Do,meta:xr(Vo),version:Sr(Go)
}
)),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),rewards:Sr(mr(Jo)),blockTime:xr(kr()),blockHeight:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),transactions:mr(Ir({
transaction:Ro,meta:xr(Ho)
}
)),rewards:Sr(mr(Jo)),blockTime:xr(kr())
}
))),ho(xr(Ir({
blockhash:Er(),previousBlockhash:Er(),parentSlot:kr(),signatures:mr(Er()),blockTime:xr(kr())
}
))),ho(xr(Ir({
slot:kr(),meta:xr(Ho),blockTime:Sr(xr(kr())),transaction:Ro,version:Sr(Go)
}
))),ho(xr(Ir({
slot:kr(),transaction:Fo,meta:xr(Vo),blockTime:Sr(xr(kr())),version:Sr(Go)
}
))),po(Ir({
blockhash:Er(),feeCalculator:Ir({
lamportsPerSignature:kr()
}
)
}
)),po(Ir({
blockhash:Er(),lastValidBlockHeight:kr()
}
)),po(br()),ho(mr(Ir({
slot:kr(),numTransactions:kr(),numSlots:kr(),samplePeriodSecs:kr()
}
))),po(xr(Ir({
feeCalculator:Ir({
lamportsPerSignature:kr()
}
)
}
))),ho(Er()),ho(Er()),Ir({
err:ko,logs:mr(Er()),signature:Er()
}
));
Ir({
result:yo(Zo),subscription:kr()
}
);
class Yo{
constructor(t){
this._keypair=void 0,this._keypair=t??hn()
}
static generate(){
return new Yo(hn())
}
static fromSecretKey(t,e){
if(64!==t.byteLength)throw new Error("bad secret key size");
const r=t.slice(32,64);
if(!e||!e.skipValidation){
const e=t.slice(0,32),n=dn(e);
for(let t=0;
t<32;
t++)if(r[t]!==n[t])throw new Error("provided secretKey is invalid")
}
return new Yo({
publicKey:r,secretKey:t
}
)
}
static fromSeed(t){
const e=dn(t),r=new Uint8Array(64);
return r.set(t),r.set(e,32),new Yo({
publicKey:e,secretKey:r
}
)
}
get publicKey(){
return new Mn(this._keypair.publicKey)
}
get secretKey(){
return new Uint8Array(this._keypair.secretKey)
}

}
Object.freeze({
CreateLookupTable:{
index:0,layout:or.n_([or.Jq("instruction"),no("recentSlot"),or.u8("bumpSeed")])
}
,FreezeLookupTable:{
index:1,layout:or.n_([or.Jq("instruction")])
}
,ExtendLookupTable:{
index:2,layout:or.n_([or.Jq("instruction"),no(),or.A9(Bn(),or.cv(or.Jq(),-8),"addresses")])
}
,DeactivateLookupTable:{
index:3,layout:or.n_([or.Jq("instruction")])
}
,CloseLookupTable:{
index:4,layout:or.n_([or.Jq("instruction")])
}

}
);
new Mn("AddressLookupTab1e1111111111111111111111111");
Object.freeze({
RequestUnits:{
index:0,layout:or.n_([or.u8("instruction"),or.Jq("units"),or.Jq("additionalFee")])
}
,RequestHeapFrame:{
index:1,layout:or.n_([or.u8("instruction"),or.Jq("bytes")])
}
,SetComputeUnitLimit:{
index:2,layout:or.n_([or.u8("instruction"),or.Jq("units")])
}
,SetComputeUnitPrice:{
index:3,layout:or.n_([or.u8("instruction"),no("microLamports")])
}

}
);
new Mn("ComputeBudget111111111111111111111111111111");
const Qo=or.n_([or.u8("numSignatures"),or.u8("padding"),or.KB("signatureOffset"),or.KB("signatureInstructionIndex"),or.KB("publicKeyOffset"),or.KB("publicKeyInstructionIndex"),or.KB("messageDataOffset"),or.KB("messageDataSize"),or.KB("messageInstructionIndex")]);
class Xo{
constructor(){

}
static createInstructionWithPublicKey(t){
const{
publicKey:e,message:r,signature:n,instructionIndex:o
}
=t;
zn(32===e.length,`Public Key must be 32 bytes but received ${
e.length
}
 bytes`),zn(64===n.length,`Signature must be 64 bytes but received ${
n.length
}
 bytes`);
const i=Qo.span,s=i+e.length,a=s+n.length,u=Q.Buffer.alloc(a+r.length),c=null==o?65535:o;
return Qo.encode({
numSignatures:1,padding:0,signatureOffset:s,signatureInstructionIndex:c,publicKeyOffset:i,publicKeyInstructionIndex:c,messageDataOffset:a,messageDataSize:r.length,messageInstructionIndex:c
}
,u),u.fill(e,i),u.fill(n,s),u.fill(r,a),new $n({
keys:[],programId:Xo.programId,data:u
}
)
}
static createInstructionWithPrivateKey(t){
const{
privateKey:e,message:r,instructionIndex:n
}
=t;
zn(64===e.length,`Private key must be 64 bytes but received ${
e.length
}
 bytes`);
try{
const t=Yo.fromSecretKey(e),o=t.publicKey.toBytes(),i=yn(r,t.secretKey);
return this.createInstructionWithPublicKey({
publicKey:o,message:r,signature:i,instructionIndex:n
}
)
}
catch(t){
throw new Error(`Error creating instruction;
 ${
t
}
`)
}

}

}
Xo.programId=new Mn("Ed25519SigVerify111111111111111111111111111"),ln.utils.isValidPrivateKey;
const ti=ln.getPublicKey,ei=or.n_([or.u8("numSignatures"),or.KB("signatureOffset"),or.u8("signatureInstructionIndex"),or.KB("ethAddressOffset"),or.u8("ethAddressInstructionIndex"),or.KB("messageDataOffset"),or.KB("messageDataSize"),or.u8("messageInstructionIndex"),or.Ik(20,"ethAddress"),or.Ik(64,"signature"),or.u8("recoveryId")]);
class ri{
constructor(){

}
static publicKeyToEthAddress(t){
zn(64===t.length,`Public key must be 64 bytes but received ${
t.length
}
 bytes`);
try{
return Q.Buffer.from($r(mn(t))).slice(-20)
}
catch(t){
throw new Error(`Error constructing Ethereum address: ${
t
}
`)
}

}
static createInstructionWithPublicKey(t){
const{
publicKey:e,message:r,signature:n,recoveryId:o,instructionIndex:i
}
=t;
return ri.createInstructionWithEthAddress({
ethAddress:ri.publicKeyToEthAddress(e),message:r,signature:n,recoveryId:o,instructionIndex:i
}
)
}
static createInstructionWithEthAddress(t){
const{
ethAddress:e,message:r,signature:n,recoveryId:o,instructionIndex:i=0
}
=t;
let s;
s="string"==typeof e?e.startsWith("0x")?Q.Buffer.from(e.substr(2),"hex"):Q.Buffer.from(e,"hex"):e,zn(20===s.length,`Address must be 20 bytes but received ${
s.length
}
 bytes`);
const a=12+s.length,u=a+n.length+1,c=Q.Buffer.alloc(ei.span+r.length);
return ei.encode({
numSignatures:1,signatureOffset:a,signatureInstructionIndex:i,ethAddressOffset:12,ethAddressInstructionIndex:i,messageDataOffset:u,messageDataSize:r.length,messageInstructionIndex:i,signature:mn(n),ethAddress:mn(s),recoveryId:o
}
,c),c.fill(mn(r),ei.span),new $n({
keys:[],programId:ri.programId,data:c
}
)
}
static createInstructionWithPrivateKey(t){
const{
privateKey:e,message:r,instructionIndex:n
}
=t;
zn(32===e.length,`Private key must be 32 bytes but received ${
e.length
}
 bytes`);
try{
const t=mn(e),o=ti(t,!1).slice(1),i=Q.Buffer.from($r(mn(r))),[s,a]=((t,e)=>{
const r=ln.sign(t,e);
return[r.toCompactRawBytes(),r.recovery]
}
)(i,t);
return this.createInstructionWithPublicKey({
publicKey:o,message:r,signature:s,recoveryId:a,instructionIndex:n
}
)
}
catch(t){
throw new Error(`Error creating instruction;
 ${
t
}
`)
}

}

}
var ni;
ri.programId=new Mn("KeccakSecp256k11111111111111111111111111111");
const oi=new Mn("StakeConfig11111111111111111111111111111111");
class ii{
constructor(t,e,r){
this.unixTimestamp=void 0,this.epoch=void 0,this.custodian=void 0,this.unixTimestamp=t,this.epoch=e,this.custodian=r
}

}
ni=ii,ii.default=new ni(0,0,Mn.default);
const si=Object.freeze({
Initialize:{
index:0,layout:or.n_([or.Jq("instruction"),((t="authorized")=>or.n_([Bn("staker"),Bn("withdrawer")],t))(),((t="lockup")=>or.n_([or.gM("unixTimestamp"),or.gM("epoch"),Bn("custodian")],t))()])
}
,Authorize:{
index:1,layout:or.n_([or.Jq("instruction"),Bn("newAuthorized"),or.Jq("stakeAuthorizationType")])
}
,Delegate:{
index:2,layout:or.n_([or.Jq("instruction")])
}
,Split:{
index:3,layout:or.n_([or.Jq("instruction"),or.gM("lamports")])
}
,Withdraw:{
index:4,layout:or.n_([or.Jq("instruction"),or.gM("lamports")])
}
,Deactivate:{
index:5,layout:or.n_([or.Jq("instruction")])
}
,Merge:{
index:7,layout:or.n_([or.Jq("instruction")])
}
,AuthorizeWithSeed:{
index:8,layout:or.n_([or.Jq("instruction"),Bn("newAuthorized"),or.Jq("stakeAuthorizationType"),Tn("authoritySeed"),Bn("authorityOwner")])
}

}
);
Object.freeze({
Staker:{
index:0
}
,Withdrawer:{
index:1
}

}
);
class ai{
constructor(){

}
static initialize(t){
const{
stakePubkey:e,authorized:r,lockup:n
}
=t,o=n||ii.default,i=to(si.Initialize,{
authorized:{
staker:mn(r.staker.toBuffer()),withdrawer:mn(r.withdrawer.toBuffer())
}
,lockup:{
unixTimestamp:o.unixTimestamp,epoch:o.epoch,custodian:mn(o.custodian.toBuffer())
}

}
),s={
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:Zn,isSigner:!1,isWritable:!1
}
],programId:this.programId,data:i
}
;
return new $n(s)
}
static createAccountWithSeed(t){
const e=new Hn;
e.add(io.createAccountWithSeed({
fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:this.space,programId:this.programId
}
));
const{
stakePubkey:r,authorized:n,lockup:o
}
=t;
return e.add(this.initialize({
stakePubkey:r,authorized:n,lockup:o
}
))
}
static createAccount(t){
const e=new Hn;
e.add(io.createAccount({
fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,lamports:t.lamports,space:this.space,programId:this.programId
}
));
const{
stakePubkey:r,authorized:n,lockup:o
}
=t;
return e.add(this.initialize({
stakePubkey:r,authorized:n,lockup:o
}
))
}
static delegate(t){
const{
stakePubkey:e,authorizedPubkey:r,votePubkey:n
}
=t,o=to(si.Delegate);
return(new Hn).add({
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:n,isSigner:!1,isWritable:!1
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:Yn,isSigner:!1,isWritable:!1
}
,{
pubkey:oi,isSigner:!1,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:o
}
)
}
static authorize(t){
const{
stakePubkey:e,authorizedPubkey:r,newAuthorizedPubkey:n,stakeAuthorizationType:o,custodianPubkey:i
}
=t,s=to(si.Authorize,{
newAuthorized:mn(n.toBuffer()),stakeAuthorizationType:o.index
}
),a=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!0
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
];
return i&&a.push({
pubkey:i,isSigner:!0,isWritable:!1
}
),(new Hn).add({
keys:a,programId:this.programId,data:s
}
)
}
static authorizeWithSeed(t){
const{
stakePubkey:e,authorityBase:r,authoritySeed:n,authorityOwner:o,newAuthorizedPubkey:i,stakeAuthorizationType:s,custodianPubkey:a
}
=t,u=to(si.AuthorizeWithSeed,{
newAuthorized:mn(i.toBuffer()),stakeAuthorizationType:s.index,authoritySeed:n,authorityOwner:mn(o.toBuffer())
}
),c=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
];
return a&&c.push({
pubkey:a,isSigner:!0,isWritable:!1
}
),(new Hn).add({
keys:c,programId:this.programId,data:u
}
)
}
static splitInstruction(t){
const{
stakePubkey:e,authorizedPubkey:r,splitStakePubkey:n,lamports:o
}
=t,i=to(si.Split,{
lamports:o
}
);
return new $n({
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:n,isSigner:!1,isWritable:!0
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:i
}
)
}
static split(t,e){
const r=new Hn;
return r.add(io.createAccount({
fromPubkey:t.authorizedPubkey,newAccountPubkey:t.splitStakePubkey,lamports:e,space:this.space,programId:this.programId
}
)),r.add(this.splitInstruction(t))
}
static splitWithSeed(t,e){
const{
stakePubkey:r,authorizedPubkey:n,splitStakePubkey:o,basePubkey:i,seed:s,lamports:a
}
=t,u=new Hn;
return u.add(io.allocate({
accountPubkey:o,basePubkey:i,seed:s,space:this.space,programId:this.programId
}
)),e&&e>0&&u.add(io.transfer({
fromPubkey:t.authorizedPubkey,toPubkey:o,lamports:e
}
)),u.add(this.splitInstruction({
stakePubkey:r,authorizedPubkey:n,splitStakePubkey:o,lamports:a
}
))
}
static merge(t){
const{
stakePubkey:e,sourceStakePubKey:r,authorizedPubkey:n
}
=t,o=to(si.Merge);
return(new Hn).add({
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:r,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:Yn,isSigner:!1,isWritable:!1
}
,{
pubkey:n,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:o
}
)
}
static withdraw(t){
const{
stakePubkey:e,authorizedPubkey:r,toPubkey:n,lamports:o,custodianPubkey:i
}
=t,s=to(si.Withdraw,{
lamports:o
}
),a=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:n,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:Yn,isSigner:!1,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
];
return i&&a.push({
pubkey:i,isSigner:!0,isWritable:!1
}
),(new Hn).add({
keys:a,programId:this.programId,data:s
}
)
}
static deactivate(t){
const{
stakePubkey:e,authorizedPubkey:r
}
=t,n=to(si.Deactivate);
return(new Hn).add({
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:n
}
)
}

}
ai.programId=new Mn("Stake11111111111111111111111111111111111111"),ai.space=200;
const ui=Object.freeze({
InitializeAccount:{
index:0,layout:or.n_([or.Jq("instruction"),((t="voteInit")=>or.n_([Bn("nodePubkey"),Bn("authorizedVoter"),Bn("authorizedWithdrawer"),or.u8("commission")],t))()])
}
,Authorize:{
index:1,layout:or.n_([or.Jq("instruction"),Bn("newAuthorized"),or.Jq("voteAuthorizationType")])
}
,Withdraw:{
index:3,layout:or.n_([or.Jq("instruction"),or.gM("lamports")])
}
,UpdateValidatorIdentity:{
index:4,layout:or.n_([or.Jq("instruction")])
}
,AuthorizeWithSeed:{
index:10,layout:or.n_([or.Jq("instruction"),((t="voteAuthorizeWithSeedArgs")=>or.n_([or.Jq("voteAuthorizationType"),Bn("currentAuthorityDerivedKeyOwnerPubkey"),Tn("currentAuthorityDerivedKeySeed"),Bn("newAuthorized")],t))()])
}

}
);
Object.freeze({
Voter:{
index:0
}
,Withdrawer:{
index:1
}

}
);
class ci{
constructor(){

}
static initializeAccount(t){
const{
votePubkey:e,nodePubkey:r,voteInit:n
}
=t,o=to(ui.InitializeAccount,{
voteInit:{
nodePubkey:mn(n.nodePubkey.toBuffer()),authorizedVoter:mn(n.authorizedVoter.toBuffer()),authorizedWithdrawer:mn(n.authorizedWithdrawer.toBuffer()),commission:n.commission
}

}
),i={
keys:[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:Zn,isSigner:!1,isWritable:!1
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
],programId:this.programId,data:o
}
;
return new $n(i)
}
static createAccount(t){
const e=new Hn;
return e.add(io.createAccount({
fromPubkey:t.fromPubkey,newAccountPubkey:t.votePubkey,lamports:t.lamports,space:this.space,programId:this.programId
}
)),e.add(this.initializeAccount({
votePubkey:t.votePubkey,nodePubkey:t.voteInit.nodePubkey,voteInit:t.voteInit
}
))
}
static authorize(t){
const{
votePubkey:e,authorizedPubkey:r,newAuthorizedPubkey:n,voteAuthorizationType:o
}
=t,i=to(ui.Authorize,{
newAuthorized:mn(n.toBuffer()),voteAuthorizationType:o.index
}
),s=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
];
return(new Hn).add({
keys:s,programId:this.programId,data:i
}
)
}
static authorizeWithSeed(t){
const{
currentAuthorityDerivedKeyBasePubkey:e,currentAuthorityDerivedKeyOwnerPubkey:r,currentAuthorityDerivedKeySeed:n,newAuthorizedPubkey:o,voteAuthorizationType:i,votePubkey:s
}
=t,a=to(ui.AuthorizeWithSeed,{
voteAuthorizeWithSeedArgs:{
currentAuthorityDerivedKeyOwnerPubkey:mn(r.toBuffer()),currentAuthorityDerivedKeySeed:n,newAuthorized:mn(o.toBuffer()),voteAuthorizationType:i.index
}

}
),u=[{
pubkey:s,isSigner:!1,isWritable:!0
}
,{
pubkey:Gn,isSigner:!1,isWritable:!1
}
,{
pubkey:e,isSigner:!0,isWritable:!1
}
];
return(new Hn).add({
keys:u,programId:this.programId,data:a
}
)
}
static withdraw(t){
const{
votePubkey:e,authorizedWithdrawerPubkey:r,lamports:n,toPubkey:o
}
=t,i=to(ui.Withdraw,{
lamports:n
}
),s=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:o,isSigner:!1,isWritable:!0
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
];
return(new Hn).add({
keys:s,programId:this.programId,data:i
}
)
}
static safeWithdraw(t,e,r){
if(t.lamports>e-r)throw new Error("Withdraw will leave vote account with insufficient funds.");
return ci.withdraw(t)
}
static updateValidatorIdentity(t){
const{
votePubkey:e,authorizedWithdrawerPubkey:r,nodePubkey:n
}
=t,o=to(ui.UpdateValidatorIdentity),i=[{
pubkey:e,isSigner:!1,isWritable:!0
}
,{
pubkey:n,isSigner:!0,isWritable:!1
}
,{
pubkey:r,isSigner:!0,isWritable:!1
}
];
return(new Hn).add({
keys:i,programId:this.programId,data:o
}
)
}

}
ci.programId=new Mn("Vote111111111111111111111111111111111111111"),ci.space=3762,new Mn("Va1idator1nfo111111111111111111111111111111"),Ir({
name:Er(),website:Sr(Er()),details:Sr(Er()),keybaseUsername:Sr(Er())
}
),new Mn("Vote111111111111111111111111111111111111111"),or.n_([Bn("nodePubkey"),Bn("authorizedWithdrawer"),or.u8("commission"),or._O(),or.A9(or.n_([or._O("slot"),or.Jq("confirmationCount")]),or.cv(or.Jq(),-8),"votes"),or.u8("rootSlotValid"),or._O("rootSlot"),or._O(),or.A9(or.n_([or._O("epoch"),Bn("authorizedVoter")]),or.cv(or.Jq(),-8),"authorizedVoters"),or.n_([or.A9(or.n_([Bn("authorizedPubkey"),or._O("epochOfLastAuthorizedSwitch"),or._O("targetEpoch")]),32,"buf"),or._O("idx"),or.u8("isEmpty")],"priorVoters"),or._O(),or.A9(or.n_([or._O("epoch"),or._O("credits"),or._O("prevCredits")]),or.cv(or.Jq(),-8),"epochCredits"),or.n_([or._O("slot"),or._O("timestamp")],"lastTimestamp")]);
var li=r("../../../node_modules/eventemitter3/index.js"),fi=r.n(li);
const hi=t=>"method"in t&&void 0!==t.method;
var di=r("../../../node_modules/uuid/dist/esm-browser/v4.js");
const pi=t=>void 0===t.version,yi=t=>pi(t)?t.serialize({
requireAllSignatures:!1,verifySignatures:!1
}
):t.serialize(),gi=(t,e)=>e?Hn.from(t):Vn.deserialize(t),mi=t=>E().encode(t),bi=t=>E().decode(t);
var wi;
!function(t){
t.Connect="connect",t.Disconnect="disconnect",t.SignTransactionMessage="signTransaction",t.SignTransaction="signTransactionV2",t.SignAllTransactionMessages="signAllTransactions",t.SignAllTransactions="signAllTransactionsV2",t.SignAndSendTransaction="signAndSendTransaction",t.SignMessage="signMessage"
}
(wi||(wi={

}
));
class vi extends Error{
constructor(t,e){
super(e),this.code=t,this.name="JRpcError"
}

}
var xi,ki,Si,Mi,Ei,Ai,Ii,ji=function(t,e,r,n,o){
if("m"===n)throw new TypeError("Private method is not writable");
if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");
if("function"==typeof e?t!==e||!o:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");
return"a"===n?o.call(t,r):o?o.value=r:e.set(t,r),r
}
,_i=function(t,e,r,n){
if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");
if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");
return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)
}
;
ki=new WeakMap,Si=new WeakMap,Mi=new WeakMap,Ei=new WeakMap,Ii=new WeakMap,xi=new WeakSet,Ai=async function({
method:t,params:e
}
){
if(t===wi.Connect){
if(_i(this,ki,"f"))return _i(this,Ei,"f").emit("connect",_i(this,Si,"f")),!0;
try{
const{
account:t
}
=await _i(this,Ii,"f").call(this,{
method:"connect",params:e
}
);
return ji(this,ki,!0,"f"),ji(this,Si,new Mn(t.publicKey),"f"),_i(this,Ei,"f").emit("connect",new Mn(t.publicKey)),!0
}
catch(t){
return _i(this,Ei,"f").emit("disconnect"),!1
}

}
else if(t===wi.Disconnect){
if(!_i(this,ki,"f"))return _i(this,Ei,"f").emit("disconnect"),!0;
try{
return await _i(this,Ii,"f").call(this,{
method:"disconnect"
}
),ji(this,ki,!1,"f"),ji(this,Si,null,"f"),_i(this,Ei,"f").emit("disconnect"),!0
}
catch{
return!1
}

}
else{
if(t===wi.SignTransaction){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
transaction:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-transaction-request",transaction:e.transaction
}
);
return{
transaction:t
}

}
if(t===wi.SignTransactionMessage){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
signature:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-transaction-message-request",message:e.message
}
);
return{
signature:t,publicKey:_i(this,Si,"f")?.toString()??""
}

}
if(t===wi.SignAllTransactions){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
transactions:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-multiple-transactions-request",transactions:e.transactions
}
);
return{
transactions:t
}

}
if(t===wi.SignAllTransactionMessages){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
signatures:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-multiple-transaction-messages-request",messages:e.messages
}
);
return{
signatures:t,publicKey:_i(this,Si,"f")?.toString()??""
}

}
if(t===wi.SignAndSendTransaction){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
signature:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-and-send-transaction-request",transaction:e.transaction,options:e.options
}
);
return{
signature:t,publicKey:_i(this,Si,"f")?.toString()??""
}

}
if(t===wi.SignMessage){
if(!_i(this,ki,"f"))throw new vi(-32e3,"Not connected");
const{
signature:t
}
=await _i(this,Ii,"f").call(this,{
method:"sign-message-request",message:e.message,display:e.display
}
);
return{
signature:t,publicKey:_i(this,Si,"f")?.toString()??""
}

}

}

}
;
const Bi=new class{
constructor({
name:t,target:e
}
){
this.subscribers=new Set,this.incomingChannel=()=>`solflare_${
this._target
}
->${
this._name
}
`,this.outgoingChannel=()=>`solflare_${
this._name
}
->${
this._target
}
`,this.handleMessage=t=>{
t.isTrusted&&t.data?.target===this.incomingChannel()&&t.source===window&&this.subscribers.forEach((e=>e(t.data.payload,t)))
}
,this.onMessage=t=>(this.subscribers.add(t),()=>{
this.subscribers.delete(t)
}
),this.send=t=>{
const e={
target:this.outgoingChannel(),payload:t
}
;
window.postMessage(e)
}
,this._destroy=()=>{
window.removeEventListener("message",this.handleMessage,!0)
}
,this._name=t,this._target=e,this.subscribers=new Set,window.addEventListener("message",this.handleMessage,!0)
}

}
({
name:"inpage",target:"contentscript"
}
),Oi=new class{
constructor(t){
xi.add(this),ki.set(this,!1),Si.set(this,void 0),Mi.set(this,void 0),Ei.set(this,new(fi())),Ii.set(this,(async t=>(async(t,e,r)=>{
const n=function(t,e){
return{
id:e||(0,di.Z)(),payload:t
}

}
(e,r);
return t.send(n),new Promise(((e,r)=>{
const o=t.onMessage((t=>{
if(t.id===n.id){
if((t=>"error"in t&&t.error)(t.payload))return r(t.payload.message);
e(t.payload),o()
}

}
))
}
))
}
)(_i(this,Mi,"f"),t))),ji(this,Mi,t,"f"),t.onMessage((({
payload:t
}
)=>{
(t=>hi(t)&&"wallet-account-change"===t.method)(t)?_i(this,ki,"f")&&(t.account.publicKey?(ji(this,Si,new Mn(t.account.publicKey),"f"),_i(this,Ei,"f").emit("accountChanged",_i(this,Si,"f"))):_i(this,Ei,"f").emit("accountChanged",void 0)):(t=>hi(t)&&"disconnect"===t.method)(t)&&_i(this,ki,"f")&&(ji(this,ki,!1,"f"),ji(this,Si,null,"f"),_i(this,Ei,"f").emit("disconnect"))
}
)),this.connect=this.connect.bind(this),this.disconnect=this.disconnect.bind(this),this.signTransaction=this.signTransaction.bind(this),this.signAllTransactions=this.signAllTransactions.bind(this),this.signAndSendTransaction=this.signAndSendTransaction.bind(this),this.signMessage=this.signMessage.bind(this),this.request=this.request.bind(this),this.on=_i(this,Ei,"f").on.bind(_i(this,Ei,"f")),this.addEventListener=_i(this,Ei,"f").on.bind(_i(this,Ei,"f")),this.addListener=_i(this,Ei,"f").on.bind(_i(this,Ei,"f")),this.once=_i(this,Ei,"f").once.bind(_i(this,Ei,"f")),this.off=_i(this,Ei,"f").off.bind(_i(this,Ei,"f")),this.removeEventListener=_i(this,Ei,"f").off.bind(_i(this,Ei,"f")),this.removeListener=_i(this,Ei,"f").off.bind(_i(this,Ei,"f")),this.eventNames=_i(this,Ei,"f").eventNames.bind(_i(this,Ei,"f")),this.listenerCount=_i(this,Ei,"f").listenerCount.bind(_i(this,Ei,"f")),this.listeners=_i(this,Ei,"f").listeners.bind(_i(this,Ei,"f")),this.removeAllListeners=_i(this,Ei,"f").removeAllListeners.bind(_i(this,Ei,"f"))
}
get publicKey(){
return _i(this,Si,"f")
}
get autoApprove(){
return!1
}
get isSolflare(){
return!0
}
get priorityFeesSupported(){
return!0
}
get isConnected(){
return _i(this,ki,"f")
}
async connect(t={

}
){
return _i(this,xi,"m",Ai).call(this,{
method:wi.Connect,params:t
}
)
}
async signTransaction(t){
const e=yi(t),{
transaction:r
}
=await _i(this,xi,"m",Ai).call(this,{
method:wi.SignTransaction,params:{
transaction:mi(e)
}

}
);
return gi(bi(r),pi(t))
}
async signAllTransactions(t){
const e=t.map(yi),{
transactions:r
}
=await _i(this,xi,"m",Ai).call(this,{
method:wi.SignAllTransactions,params:{
transactions:e.map(mi)
}

}
);
return r.map(((e,r)=>{
const n=t[r];
return gi(bi(e),pi(n))
}
))
}
async signAndSendTransaction(t,e){
const r=yi(t),{
signature:n
}
=await _i(this,xi,"m",Ai).call(this,{
method:wi.SignAndSendTransaction,params:{
transaction:mi(r),options:e
}

}
);
return{
signature:n,publicKey:this.publicKey?.toBase58()??""
}

}
async signMessage(t,e){
const{
signature:r
}
=await _i(this,xi,"m",Ai).call(this,{
method:wi.SignMessage,params:{
message:t,display:e
}

}
);
return{
signature:bi(r),publicKey:this.publicKey
}

}
async disconnect(){
await _i(this,xi,"m",Ai).call(this,{
method:wi.Disconnect,params:null
}
)
}
async request(t){
if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Invalid JSON-RPC request");
const{
method:e
}
=t;
if("string"!=typeof e||!e.trim())throw new Error("Invalid method name");
return _i(this,xi,"m",Ai).call(this,t)
}

}
(Bi);
((t,e)=>{
const r=new Proxy(e,{
deleteProperty:()=>!0,get:(t,e)=>t[e]
}
);
Object.defineProperty(window,"solflare",{
value:Object.freeze(r),enumerable:!0
}
)
}
)(0,Oi),Object.defineProperty(window,"solflareWalletStandardInitialized",{
value:!0
}
),Oi.connect({
silent:!0
}
).then((function(){
!function(t){
const e=({
register:e
}
)=>e(t);
try{
window.dispatchEvent(new s(e))
}
catch(t){
i.error("wallet-standard:register-wallet event could not be dispatched\n",t)
}
try{
window.addEventListener("wallet-standard:app-ready",(({
detail:t
}
)=>e(t)))
}
catch(t){
i.error("wallet-standard:app-ready event listener could not be added\n",t)
}

}
(new Y)
}
))
}
,"../../../node_modules/util/support/isBufferBrowser.js":t=>{
t.exports=function(t){
return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8
}

}
,"../../../node_modules/util/support/types.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/is-arguments/index.js"),o=r("../../../node_modules/is-generator-function/index.js"),i=r("../../../node_modules/which-typed-array/index.js"),s=r("../../../node_modules/is-typed-array/index.js");
function a(t){
return t.call.bind(t)
}
var u="undefined"!=typeof BigInt,c="undefined"!=typeof Symbol,l=a(Object.prototype.toString),f=a(Number.prototype.valueOf),h=a(String.prototype.valueOf),d=a(Boolean.prototype.valueOf);
if(u)var p=a(BigInt.prototype.valueOf);
if(c)var y=a(Symbol.prototype.valueOf);
function g(t,e){
if("object"!=typeof t)return!1;
try{
return e(t),!0
}
catch(t){
return!1
}

}
function m(t){
return"[object Map]"===l(t)
}
function b(t){
return"[object Set]"===l(t)
}
function w(t){
return"[object WeakMap]"===l(t)
}
function v(t){
return"[object WeakSet]"===l(t)
}
function x(t){
return"[object ArrayBuffer]"===l(t)
}
function k(t){
return"undefined"!=typeof ArrayBuffer&&(x.working?x(t):t instanceof ArrayBuffer)
}
function S(t){
return"[object DataView]"===l(t)
}
function M(t){
return"undefined"!=typeof DataView&&(S.working?S(t):t instanceof DataView)
}
e.isArgumentsObject=n,e.isGeneratorFunction=o,e.isTypedArray=s,e.isPromise=function(t){
return"undefined"!=typeof Promise&&t instanceof Promise||null!==t&&"object"==typeof t&&"function"==typeof t.then&&"function"==typeof t.catch
}
,e.isArrayBufferView=function(t){
return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):s(t)||M(t)
}
,e.isUint8Array=function(t){
return"Uint8Array"===i(t)
}
,e.isUint8ClampedArray=function(t){
return"Uint8ClampedArray"===i(t)
}
,e.isUint16Array=function(t){
return"Uint16Array"===i(t)
}
,e.isUint32Array=function(t){
return"Uint32Array"===i(t)
}
,e.isInt8Array=function(t){
return"Int8Array"===i(t)
}
,e.isInt16Array=function(t){
return"Int16Array"===i(t)
}
,e.isInt32Array=function(t){
return"Int32Array"===i(t)
}
,e.isFloat32Array=function(t){
return"Float32Array"===i(t)
}
,e.isFloat64Array=function(t){
return"Float64Array"===i(t)
}
,e.isBigInt64Array=function(t){
return"BigInt64Array"===i(t)
}
,e.isBigUint64Array=function(t){
return"BigUint64Array"===i(t)
}
,m.working="undefined"!=typeof Map&&m(new Map),e.isMap=function(t){
return"undefined"!=typeof Map&&(m.working?m(t):t instanceof Map)
}
,b.working="undefined"!=typeof Set&&b(new Set),e.isSet=function(t){
return"undefined"!=typeof Set&&(b.working?b(t):t instanceof Set)
}
,w.working="undefined"!=typeof WeakMap&&w(new WeakMap),e.isWeakMap=function(t){
return"undefined"!=typeof WeakMap&&(w.working?w(t):t instanceof WeakMap)
}
,v.working="undefined"!=typeof WeakSet&&v(new WeakSet),e.isWeakSet=function(t){
return v(t)
}
,x.working="undefined"!=typeof ArrayBuffer&&x(new ArrayBuffer),e.isArrayBuffer=k,S.working="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView&&S(new DataView(new ArrayBuffer(1),0,1)),e.isDataView=M;
var E="undefined"!=typeof SharedArrayBuffer?SharedArrayBuffer:void 0;
function A(t){
return"[object SharedArrayBuffer]"===l(t)
}
function I(t){
return void 0!==E&&(void 0===A.working&&(A.working=A(new E)),A.working?A(t):t instanceof E)
}
function j(t){
return g(t,f)
}
function _(t){
return g(t,h)
}
function B(t){
return g(t,d)
}
function O(t){
return u&&g(t,p)
}
function T(t){
return c&&g(t,y)
}
e.isSharedArrayBuffer=I,e.isAsyncFunction=function(t){
return"[object AsyncFunction]"===l(t)
}
,e.isMapIterator=function(t){
return"[object Map Iterator]"===l(t)
}
,e.isSetIterator=function(t){
return"[object Set Iterator]"===l(t)
}
,e.isGeneratorObject=function(t){
return"[object Generator]"===l(t)
}
,e.isWebAssemblyCompiledModule=function(t){
return"[object WebAssembly.Module]"===l(t)
}
,e.isNumberObject=j,e.isStringObject=_,e.isBooleanObject=B,e.isBigIntObject=O,e.isSymbolObject=T,e.isBoxedPrimitive=function(t){
return j(t)||_(t)||B(t)||O(t)||T(t)
}
,e.isAnyArrayBuffer=function(t){
return"undefined"!=typeof Uint8Array&&(k(t)||I(t))
}
,["isProxy","isExternal","isModuleNamespaceObject"].forEach((function(t){
Object.defineProperty(e,t,{
enumerable:!1,value:function(){
throw new Error(t+" is not supported in userland")
}

}
)
}
))
}
,"../../../node_modules/util/util.js":(t,e,r)=>{
var n=r("../../../node_modules/process/browser.js"),o=r("../../../node_modules/console-browserify/index.js"),i=Object.getOwnPropertyDescriptors||function(t){
for(var e=Object.keys(t),r={

}
,n=0;
n<e.length;
n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);
return r
}
,s=/%[sdj%]/g;
e.format=function(t){
if(!v(t)){
for(var e=[],r=0;
r<arguments.length;
r++)e.push(l(arguments[r]));
return e.join(" ")
}
r=1;
for(var n=arguments,o=n.length,i=String(t).replace(s,(function(t){
if("%%"===t)return"%";
if(r>=o)return t;
switch(t){
case"%s":return String(n[r++]);
case"%d":return Number(n[r++]);
case"%j":try{
return JSON.stringify(n[r++])
}
catch(t){
return"[Circular]"
}
default:return t
}

}
)),a=n[r];
r<o;
a=n[++r])b(a)||!S(a)?i+=" "+a:i+=" "+l(a);
return i
}
,e.deprecate=function(t,r){
if(void 0!==n&&!0===n.noDeprecation)return t;
if(void 0===n)return function(){
return e.deprecate(t,r).apply(this,arguments)
}
;
var i=!1;
return function(){
if(!i){
if(n.throwDeprecation)throw new Error(r);
n.traceDeprecation?o.trace(r):o.error(r),i=!0
}
return t.apply(this,arguments)
}

}
;
var a={

}
,u=/^$/;
if("MISSING_ENV_VAR".NODE_DEBUG){
var c="MISSING_ENV_VAR".NODE_DEBUG;
c=c.replace(/[|\\{

}
()[\]^$+?.]/g,"\\$&").replace(/\*/g,".*").replace(/,/g,"$|^").toUpperCase(),u=new RegExp("^"+c+"$","i")
}
function l(t,r){
var n={
seen:[],stylize:h
}
;
return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),m(r)?n.showHidden=r:r&&e._extend(n,r),x(n.showHidden)&&(n.showHidden=!1),x(n.depth)&&(n.depth=2),x(n.colors)&&(n.colors=!1),x(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=f),d(n,t,n.depth)
}
function f(t,e){
var r=l.styles[e];
return r?"["+l.colors[r][0]+"m"+t+"["+l.colors[r][1]+"m":t
}
function h(t,e){
return t
}
function d(t,r,n){
if(t.customInspect&&r&&A(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){
var o=r.inspect(n,t);
return v(o)||(o=d(t,o,n)),o
}
var i=function(t,e){
if(x(e))return t.stylize("undefined","undefined");
if(v(e)){
var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";
return t.stylize(r,"string")
}
return w(e)?t.stylize(""+e,"number"):m(e)?t.stylize(""+e,"boolean"):b(e)?t.stylize("null","null"):void 0
}
(t,r);
if(i)return i;
var s=Object.keys(r),a=function(t){
var e={

}
;
return t.forEach((function(t,r){
e[t]=!0
}
)),e
}
(s);
if(t.showHidden&&(s=Object.getOwnPropertyNames(r)),E(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return p(r);
if(0===s.length){
if(A(r)){
var u=r.name?": "+r.name:"";
return t.stylize("[Function"+u+"]","special")
}
if(k(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");
if(M(r))return t.stylize(Date.prototype.toString.call(r),"date");
if(E(r))return p(r)
}
var c,l="",f=!1,h=["{
","
}
"];
return g(r)&&(f=!0,h=["[","]"]),A(r)&&(l=" [Function"+(r.name?": "+r.name:"")+"]"),k(r)&&(l=" "+RegExp.prototype.toString.call(r)),M(r)&&(l=" "+Date.prototype.toUTCString.call(r)),E(r)&&(l=" "+p(r)),0!==s.length||f&&0!=r.length?n<0?k(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),c=f?function(t,e,r,n,o){
for(var i=[],s=0,a=e.length;
s<a;
++s)B(e,String(s))?i.push(y(t,e,r,n,String(s),!0)):i.push("");
return o.forEach((function(o){
o.match(/^\d+$/)||i.push(y(t,e,r,n,o,!0))
}
)),i
}
(t,r,n,a,s):s.map((function(e){
return y(t,r,n,a,e,f)
}
)),t.seen.pop(),function(t,e,r){
return t.reduce((function(t,e){
return e.indexOf("\n"),t+e.replace(/\u001b\[\d\d?m/g,"").length+1
}
),0)>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]
}
(c,l,h)):h[0]+l+h[1]
}
function p(t){
return"["+Error.prototype.toString.call(t)+"]"
}
function y(t,e,r,n,o,i){
var s,a,u;
if((u=Object.getOwnPropertyDescriptor(e,o)||{
value:e[o]
}
).get?a=u.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):u.set&&(a=t.stylize("[Setter]","special")),B(n,o)||(s="["+o+"]"),a||(t.seen.indexOf(u.value)<0?(a=b(r)?d(t,u.value,null):d(t,u.value,r-1)).indexOf("\n")>-1&&(a=i?a.split("\n").map((function(t){
return"  "+t
}
)).join("\n").slice(2):"\n"+a.split("\n").map((function(t){
return"   "+t
}
)).join("\n")):a=t.stylize("[Circular]","special")),x(s)){
if(i&&o.match(/^\d+$/))return a;
(s=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.slice(1,-1),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))
}
return s+": "+a
}
function g(t){
return Array.isArray(t)
}
function m(t){
return"boolean"==typeof t
}
function b(t){
return null===t
}
function w(t){
return"number"==typeof t
}
function v(t){
return"string"==typeof t
}
function x(t){
return void 0===t
}
function k(t){
return S(t)&&"[object RegExp]"===I(t)
}
function S(t){
return"object"==typeof t&&null!==t
}
function M(t){
return S(t)&&"[object Date]"===I(t)
}
function E(t){
return S(t)&&("[object Error]"===I(t)||t instanceof Error)
}
function A(t){
return"function"==typeof t
}
function I(t){
return Object.prototype.toString.call(t)
}
function j(t){
return t<10?"0"+t.toString(10):t.toString(10)
}
e.debuglog=function(t){
if(t=t.toUpperCase(),!a[t])if(u.test(t)){
var r=n.pid;
a[t]=function(){
var n=e.format.apply(e,arguments);
o.error("%s %d: %s",t,r,n)
}

}
else a[t]=function(){

}
;
return a[t]
}
,e.inspect=l,l.colors={
bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]
}
,l.styles={
special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"
}
,e.types=r("../../../node_modules/util/support/types.js"),e.isArray=g,e.isBoolean=m,e.isNull=b,e.isNullOrUndefined=function(t){
return null==t
}
,e.isNumber=w,e.isString=v,e.isSymbol=function(t){
return"symbol"==typeof t
}
,e.isUndefined=x,e.isRegExp=k,e.types.isRegExp=k,e.isObject=S,e.isDate=M,e.types.isDate=M,e.isError=E,e.types.isNativeError=E,e.isFunction=A,e.isPrimitive=function(t){
return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t
}
,e.isBuffer=r("../../../node_modules/util/support/isBufferBrowser.js");
var _=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function B(t,e){
return Object.prototype.hasOwnProperty.call(t,e)
}
e.log=function(){
var t,r;
o.log("%s - %s",(r=[j((t=new Date).getHours()),j(t.getMinutes()),j(t.getSeconds())].join(":"),[t.getDate(),_[t.getMonth()],r].join(" ")),e.format.apply(e,arguments))
}
,e.inherits=r("../../../node_modules/inherits/inherits_browser.js"),e._extend=function(t,e){
if(!e||!S(e))return t;
for(var r=Object.keys(e),n=r.length;
n--;
)t[r[n]]=e[r[n]];
return t
}
;
var O="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;
function T(t,e){
if(!t){
var r=new Error("Promise was rejected with a falsy value");
r.reason=t,t=r
}
return e(t)
}
e.promisify=function(t){
if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');
if(O&&t[O]){
var e;
if("function"!=typeof(e=t[O]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');
return Object.defineProperty(e,O,{
value:e,enumerable:!1,writable:!1,configurable:!0
}
),e
}
function e(){
for(var e,r,n=new Promise((function(t,n){
e=t,r=n
}
)),o=[],i=0;
i<arguments.length;
i++)o.push(arguments[i]);
o.push((function(t,n){
t?r(t):e(n)
}
));
try{
t.apply(this,o)
}
catch(t){
r(t)
}
return n
}
return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),O&&Object.defineProperty(e,O,{
value:e,enumerable:!1,writable:!1,configurable:!0
}
),Object.defineProperties(e,i(t))
}
,e.promisify.custom=O,e.callbackify=function(t){
if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');
function e(){
for(var e=[],r=0;
r<arguments.length;
r++)e.push(arguments[r]);
var o=e.pop();
if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");
var i=this,s=function(){
return o.apply(i,arguments)
}
;
t.apply(this,e).then((function(t){
n.nextTick(s.bind(null,null,t))
}
),(function(t){
n.nextTick(T.bind(null,t,s))
}
))
}
return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),Object.defineProperties(e,i(t)),e
}

}
,"../../../node_modules/uuid/dist/esm-browser/index.js":(t,e,r)=>{
"use strict";
r.d(e,{
v4:()=>n.Z
}
);
var n=r("../../../node_modules/uuid/dist/esm-browser/v4.js")
}
,"../../../node_modules/uuid/dist/esm-browser/rng.js":(t,e,r)=>{
"use strict";
var n;
r.d(e,{
Z:()=>i
}
);
var o=new Uint8Array(16);
function i(){
if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
return n(o)
}

}
,"../../../node_modules/uuid/dist/esm-browser/stringify.js":(t,e,r)=>{
"use strict";
r.d(e,{
Z:()=>s
}
);
for(var n=r("../../../node_modules/uuid/dist/esm-browser/validate.js"),o=[],i=0;
i<256;
++i)o.push((i+256).toString(16).substr(1));
const s=function(t){
var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(o[t[e+0]]+o[t[e+1]]+o[t[e+2]]+o[t[e+3]]+"-"+o[t[e+4]]+o[t[e+5]]+"-"+o[t[e+6]]+o[t[e+7]]+"-"+o[t[e+8]]+o[t[e+9]]+"-"+o[t[e+10]]+o[t[e+11]]+o[t[e+12]]+o[t[e+13]]+o[t[e+14]]+o[t[e+15]]).toLowerCase();
if(!(0,n.Z)(r))throw TypeError("Stringified UUID is invalid");
return r
}

}
,"../../../node_modules/uuid/dist/esm-browser/v4.js":(t,e,r)=>{
"use strict";
r.d(e,{
Z:()=>i
}
);
var n=r("../../../node_modules/uuid/dist/esm-browser/rng.js"),o=r("../../../node_modules/uuid/dist/esm-browser/stringify.js");
const i=function(t,e,r){
var i=(t=t||{

}
).random||(t.rng||n.Z)();
if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){
r=r||0;
for(var s=0;
s<16;
++s)e[r+s]=i[s];
return e
}
return(0,o.Z)(i)
}

}
,"../../../node_modules/uuid/dist/esm-browser/validate.js":(t,e,r)=>{
"use strict";
r.d(e,{
Z:()=>o
}
);
const n=/^(?:[0-9a-f]{
8
}
-[0-9a-f]{
4
}
-[1-5][0-9a-f]{
3
}
-[89ab][0-9a-f]{
3
}
-[0-9a-f]{
12
}
|00000000-0000-0000-0000-000000000000)$/i,o=function(t){
return"string"==typeof t&&n.test(t)
}

}
,"../../../node_modules/which-typed-array/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/for-each/index.js"),o=r("../../../node_modules/available-typed-arrays/index.js"),i=r("../../../node_modules/call-bind/index.js"),s=r("../../../node_modules/call-bind/callBound.js"),a=r("../../../node_modules/gopd/index.js"),u=s("Object.prototype.toString"),c=r("../../../node_modules/has-tostringtag/shams.js")(),l="undefined"==typeof globalThis?r.g:globalThis,f=o(),h=s("String.prototype.slice"),d=Object.getPrototypeOf,p=s("Array.prototype.indexOf",!0)||function(t,e){
for(var r=0;
r<t.length;
r+=1)if(t[r]===e)return r;
return-1
}
,y={
__proto__:null
}
;
n(f,c&&a&&d?function(t){
var e=new l[t];
if(Symbol.toStringTag in e){
var r=d(e),n=a(r,Symbol.toStringTag);
if(!n){
var o=d(r);
n=a(o,Symbol.toStringTag)
}
y["$"+t]=i(n.get)
}

}
:function(t){
var e=new l[t],r=e.slice||e.set;
r&&(y["$"+t]=i(r))
}
),t.exports=function(t){
if(!t||"object"!=typeof t)return!1;
if(!c){
var e=h(u(t),8,-1);
return p(f,e)>-1?e:"Object"===e&&function(t){
var e=!1;
return n(y,(function(r,n){
if(!e)try{
r(t),e=h(n,1)
}
catch(t){

}

}
)),e
}
(t)
}
return a?function(t){
var e=!1;
return n(y,(function(r,n){
if(!e)try{
"$"+r(t)===n&&(e=h(n,1))
}
catch(t){

}

}
)),e
}
(t):null
}

}
,"?6876":()=>{

}
,"../../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":t=>{
t.exports=function(t){
if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/asyncToGenerator.js":t=>{
function e(t,e,r,n,o,i,s){
try{
var a=t[i](s),u=a.value
}
catch(t){
return void r(t)
}
a.done?e(u):Promise.resolve(u).then(n,o)
}
t.exports=function(t){
return function(){
var r=this,n=arguments;
return new Promise((function(o,i){
var s=t.apply(r,n);
function a(t){
e(s,o,i,a,u,"next",t)
}
function u(t){
e(s,o,i,a,u,"throw",t)
}
a(void 0)
}
))
}

}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/classCallCheck.js":t=>{
t.exports=function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/createClass.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/toPropertyKey.js");
function o(t,e){
for(var r=0;
r<e.length;
r++){
var o=e[r];
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)
}

}
t.exports=function(t,e,r){
return e&&o(t.prototype,e),r&&o(t,r),Object.defineProperty(t,"prototype",{
writable:!1
}
),t
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/getPrototypeOf.js":t=>{
function e(r){
return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){
return t.__proto__||Object.getPrototypeOf(t)
}
,t.exports.__esModule=!0,t.exports.default=t.exports,e(r)
}
t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/inherits.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");
t.exports=function(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{
constructor:{
value:t,writable:!0,configurable:!0
}

}
),Object.defineProperty(t,"prototype",{
writable:!1
}
),e&&n(t,e)
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/interopRequireDefault.js":t=>{
t.exports=function(t){
return t&&t.__esModule?t:{
default:t
}

}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/typeof.js").default,o=r("../../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
t.exports=function(t,e){
if(e&&("object"==n(e)||"function"==typeof e))return e;
if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");
return o(t)
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/regeneratorRuntime.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/typeof.js").default;
function o(){
"use strict";
t.exports=o=function(){
return r
}
,t.exports.__esModule=!0,t.exports.default=t.exports;
var e,r={

}
,i=Object.prototype,s=i.hasOwnProperty,a=Object.defineProperty||function(t,e,r){
t[e]=r.value
}
,u="function"==typeof Symbol?Symbol:{

}
,c=u.iterator||"@@iterator",l=u.asyncIterator||"@@asyncIterator",f=u.toStringTag||"@@toStringTag";
function h(t,e,r){
return Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
}
),t[e]
}
try{
h({

}
,"")
}
catch(e){
h=function(t,e,r){
return t[e]=r
}

}
function d(t,e,r,n){
var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),s=new L(n||[]);
return a(i,"_invoke",{
value:_(t,r,s)
}
),i
}
function p(t,e,r){
try{
return{
type:"normal",arg:t.call(e,r)
}

}
catch(t){
return{
type:"throw",arg:t
}

}

}
r.wrap=d;
var y="suspendedStart",g="suspendedYield",m="executing",b="completed",w={

}
;
function v(){

}
function x(){

}
function k(){

}
var S={

}
;
h(S,c,(function(){
return this
}
));
var M=Object.getPrototypeOf,E=M&&M(M(P([])));
E&&E!==i&&s.call(E,c)&&(S=E);
var A=k.prototype=v.prototype=Object.create(S);
function I(t){
["next","throw","return"].forEach((function(e){
h(t,e,(function(t){
return this._invoke(e,t)
}
))
}
))
}
function j(t,e){
function r(o,i,a,u){
var c=p(t[o],t,i);
if("throw"!==c.type){
var l=c.arg,f=l.value;
return f&&"object"==n(f)&&s.call(f,"__await")?e.resolve(f.__await).then((function(t){
r("next",t,a,u)
}
),(function(t){
r("throw",t,a,u)
}
)):e.resolve(f).then((function(t){
l.value=t,a(l)
}
),(function(t){
return r("throw",t,a,u)
}
))
}
u(c.arg)
}
var o;
a(this,"_invoke",{
value:function(t,n){
function i(){
return new e((function(e,o){
r(t,n,e,o)
}
))
}
return o=o?o.then(i,i):i()
}

}
)
}
function _(t,r,n){
var o=y;
return function(i,s){
if(o===m)throw Error("Generator is already running");
if(o===b){
if("throw"===i)throw s;
return{
value:e,done:!0
}

}
for(n.method=i,n.arg=s;
;
){
var a=n.delegate;
if(a){
var u=B(a,n);
if(u){
if(u===w)continue;
return u
}

}
if("next"===n.method)n.sent=n._sent=n.arg;
else if("throw"===n.method){
if(o===y)throw o=b,n.arg;
n.dispatchException(n.arg)
}
else"return"===n.method&&n.abrupt("return",n.arg);
o=m;
var c=p(t,r,n);
if("normal"===c.type){
if(o=n.done?b:g,c.arg===w)continue;
return{
value:c.arg,done:n.done
}

}
"throw"===c.type&&(o=b,n.method="throw",n.arg=c.arg)
}

}

}
function B(t,r){
var n=r.method,o=t.iterator[n];
if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,B(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),w;
var i=p(o,t.iterator,r.arg);
if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,w;
var s=i.arg;
return s?s.done?(r[t.resultName]=s.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,w):s:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,w)
}
function O(t){
var e={
tryLoc:t[0]
}
;
1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)
}
function T(t){
var e=t.completion||{

}
;
e.type="normal",delete e.arg,t.completion=e
}
function L(t){
this.tryEntries=[{
tryLoc:"root"
}
],t.forEach(O,this),this.reset(!0)
}
function P(t){
if(t||""===t){
var r=t[c];
if(r)return r.call(t);
if("function"==typeof t.next)return t;
if(!isNaN(t.length)){
var o=-1,i=function r(){
for(;
++o<t.length;
)if(s.call(t,o))return r.value=t[o],r.done=!1,r;
return r.value=e,r.done=!0,r
}
;
return i.next=i
}

}
throw new TypeError(n(t)+" is not iterable")
}
return x.prototype=k,a(A,"constructor",{
value:k,configurable:!0
}
),a(k,"constructor",{
value:x,configurable:!0
}
),x.displayName=h(k,f,"GeneratorFunction"),r.isGeneratorFunction=function(t){
var e="function"==typeof t&&t.constructor;
return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))
}
,r.mark=function(t){
return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,h(t,f,"GeneratorFunction")),t.prototype=Object.create(A),t
}
,r.awrap=function(t){
return{
__await:t
}

}
,I(j.prototype),h(j.prototype,l,(function(){
return this
}
)),r.AsyncIterator=j,r.async=function(t,e,n,o,i){
void 0===i&&(i=Promise);
var s=new j(d(t,e,n,o),i);
return r.isGeneratorFunction(e)?s:s.next().then((function(t){
return t.done?t.value:s.next()
}
))
}
,I(A),h(A,f,"Generator"),h(A,c,(function(){
return this
}
)),h(A,"toString",(function(){
return"[object Generator]"
}
)),r.keys=function(t){
var e=Object(t),r=[];
for(var n in e)r.push(n);
return r.reverse(),function t(){
for(;
r.length;
){
var n=r.pop();
if(n in e)return t.value=n,t.done=!1,t
}
return t.done=!0,t
}

}
,r.values=P,L.prototype={
constructor:L,reset:function(t){
if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&s.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)
}
,stop:function(){
this.done=!0;
var t=this.tryEntries[0].completion;
if("throw"===t.type)throw t.arg;
return this.rval
}
,dispatchException:function(t){
if(this.done)throw t;
var r=this;
function n(n,o){
return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o
}
for(var o=this.tryEntries.length-1;
o>=0;
--o){
var i=this.tryEntries[o],a=i.completion;
if("root"===i.tryLoc)return n("end");
if(i.tryLoc<=this.prev){
var u=s.call(i,"catchLoc"),c=s.call(i,"finallyLoc");
if(u&&c){
if(this.prev<i.catchLoc)return n(i.catchLoc,!0);
if(this.prev<i.finallyLoc)return n(i.finallyLoc)
}
else if(u){
if(this.prev<i.catchLoc)return n(i.catchLoc,!0)
}
else{
if(!c)throw Error("try statement without catch or finally");
if(this.prev<i.finallyLoc)return n(i.finallyLoc)
}

}

}

}
,abrupt:function(t,e){
for(var r=this.tryEntries.length-1;
r>=0;
--r){
var n=this.tryEntries[r];
if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){
var o=n;
break
}

}
o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);
var i=o?o.completion:{

}
;
return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,w):this.complete(i)
}
,complete:function(t,e){
if("throw"===t.type)throw t.arg;
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),w
}
,finish:function(t){
for(var e=this.tryEntries.length-1;
e>=0;
--e){
var r=this.tryEntries[e];
if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),w
}

}
,catch:function(t){
for(var e=this.tryEntries.length-1;
e>=0;
--e){
var r=this.tryEntries[e];
if(r.tryLoc===t){
var n=r.completion;
if("throw"===n.type){
var o=n.arg;
T(r)
}
return o
}

}
throw Error("illegal catch attempt")
}
,delegateYield:function(t,r,n){
return this.delegate={
iterator:P(t),resultName:r,nextLoc:n
}
,"next"===this.method&&(this.arg=e),w
}

}
,r
}
t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":t=>{
function e(r,n){
return t.exports=e=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){
return t.__proto__=e,t
}
,t.exports.__esModule=!0,t.exports.default=t.exports,e(r,n)
}
t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/toPrimitive.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/typeof.js").default;
t.exports=function(t,e){
if("object"!=n(t)||!t)return t;
var r=t[Symbol.toPrimitive];
if(void 0!==r){
var o=r.call(t,e||"default");
if("object"!=n(o))return o;
throw new TypeError("@@toPrimitive must return a primitive value.")
}
return("string"===e?String:Number)(t)
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/toPropertyKey.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/typeof.js").default,o=r("../../../node_modules/@babel/runtime/helpers/toPrimitive.js");
t.exports=function(t){
var e=o(t,"string");
return"symbol"==n(e)?e:e+""
}
,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/helpers/typeof.js":t=>{
function e(r){
return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}
:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t
}
,t.exports.__esModule=!0,t.exports.default=t.exports,e(r)
}
t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports
}
,"../../../node_modules/@babel/runtime/regenerator/index.js":(t,e,r)=>{
var n=r("../../../node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
t.exports=n;
try{
regeneratorRuntime=n
}
catch(t){
"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)
}

}
,"../../../node_modules/available-typed-arrays/index.js":(t,e,r)=>{
"use strict";
var n=r("../../../node_modules/possible-typed-array-names/index.js"),o="undefined"==typeof globalThis?r.g:globalThis;
t.exports=function(){
for(var t=[],e=0;
e<n.length;
e++)"function"==typeof o[n[e]]&&(t[t.length]=n[e]);
return t
}

}

}
,e={

}
;
function r(n){
var o=e[n];
if(void 0!==o)return o.exports;
var i=e[n]={
id:n,loaded:!1,exports:{

}

}
;
return t[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports
}
r.n=t=>{
var e=t&&t.__esModule?()=>t.default:()=>t;
return r.d(e,{
a:e
}
),e
}
,r.d=(t,e)=>{
for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{
enumerable:!0,get:e[n]
}
)
}
,r.g=function(){
if("object"==typeof globalThis)return globalThis;
try{
return this||new Function("return this")()
}
catch(t){
if("object"==typeof window)return window
}

}
(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{
"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{
value:"Module"
}
),Object.defineProperty(t,"__esModule",{
value:!0
}
)
}
,r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),r("../../../node_modules/regenerator-runtime/runtime.js"),r("./src/scripts/inpage.ts")
}
)();
