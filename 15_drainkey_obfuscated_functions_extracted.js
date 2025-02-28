function o(t){
if(!(t instanceof Uint8Array))throw new TypeError("b must be a Uint8Array")
}

function i(t){
return o(t),n.Buffer.from(t.buffer,t.byteOffset,t.length)
}

function a(t,e){
return e.property?t+"["+e.property+"]":t
}

function d(t){
const e=Math.floor(t/h);
return{
hi32:e,lo32:t-e*h
}

function p(t,e){
return t*h+e
}

function i(t){
return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}

function x(){
var t=r("../../../node_modules/assert/build/internal/util/comparisons.js");
s=t.isDeepEqual,a=t.isDeepStrictEqual
}

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

function I(){
for(var t=arguments.length,e=new Array(t),r=0;
r<t;
r++)e[r]=arguments[r];
A.apply(void 0,[I,e.length].concat(e))
}

function t(e,r,i,s,a){
var u,c=arguments.length;
if(0===c?u="Failed":1===c?(i=e,e=void 0):(!1===k&&(k=!0,(n.emitWarning?n.emitWarning:o.warn.bind(o))("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.","DeprecationWarning","DEP0094")),2===c&&(s="!=")),i instanceof Error)throw i;
var l={
actual:e,expected:r,operator:void 0===s?"fail":s,stackStartFn:a||t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
e!=r&&E({
actual:e,expected:r,message:n,operator:"==",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
e==r&&E({
actual:e,expected:r,message:n,operator:"!=",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),s(e,r)||E({
actual:e,expected:r,message:n,operator:"deepEqual",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),s(e,r)&&E({
actual:e,expected:r,message:n,operator:"notDeepEqual",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),a(e,r)||E({
actual:e,expected:r,message:n,operator:"deepStrictEqual",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
void 0===s&&x(),a(e,r)&&E({
actual:e,expected:r,message:n,operator:"notDeepStrictEqual",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
v(e,r)||E({
actual:e,expected:r,message:n,operator:"strictEqual",stackStartFn:t
}

function t(e,r,n){
if(arguments.length<2)throw new d("actual","expected");
v(e,r)&&E({
actual:e,expected:r,message:n,operator:"notStrictEqual",stackStartFn:t
}

function t(e,r,n){
var o=this;
!function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}

function _(t,e,r,n){
if("function"!=typeof e){
if(b(e))return e.test(t);
if(2===arguments.length)throw new l("expected",["Function","RegExp"],e);
if("object"!==i(t)||null===t){
var o=new p({
actual:t,expected:e,message:r,operator:"deepStrictEqual",stackStartFn:n
}

function B(t){
if("function"!=typeof t)throw new l("fn","Function",t);
try{
t()
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

function L(t,e,r,n){
if("string"==typeof r){
if(4===arguments.length)throw new l("error",["Object","Error","Function","RegExp"],r);
if("object"===i(e)&&null!==e){
if(e.message===r)throw new c("error/message",'The error message "'.concat(e.message,'" is identical to the message.'))
}

function P(t,e,r,n){
if(e!==M){
if("string"==typeof r&&(n=r,r=void 0),!r||_(e,r)){
var o=n?": ".concat(n):".",i="doesNotReject"===t.name?"rejection":"exception";
E({
actual:e,expected:r,operator:t.name,message:"Got unwanted ".concat(i).concat(o,"\n")+'Actual message: "'.concat(e&&e.message,'"'),stackStartFn:t
}

function N(){
for(var t=arguments.length,e=new Array(t),r=0;
r<t;
r++)e[r]=arguments[r];
A.apply(void 0,[N,e.length].concat(e))
}

function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
L.apply(void 0,[t,B(e)].concat(n))
}

function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
return T(e).then((function(e){
return L.apply(void 0,[t,e].concat(n))
}

function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
P.apply(void 0,[t,B(e)].concat(n))
}

function t(e){
for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;
o<r;
o++)n[o-1]=arguments[o];
return T(e).then((function(e){
return P.apply(void 0,[t,e].concat(n))
}

function t(e){
if(null!=e){
var r="ifError got unwanted exception: ";
"object"===i(e)&&"string"==typeof e.message?0===e.message.length&&e.constructor?r+=e.constructor.name:r+=e.message:r+=y(e);
var n=new p({
actual:e,expected:null,operator:"ifError",message:r,stackStartFn:t
}

function o(t,e,r){
return e in t?Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
}

function i(t,e){
for(var r=0;
r<e.length;
r++){
var n=e[r];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)
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

function c(t,e,r){
return c=function(){
if("undefined"==typeof Reflect||!Reflect.construct)return!1;
if(Reflect.construct.sham)return!1;
if("function"==typeof Proxy)return!0;
try{
return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){

}

function l(t,e){
return l=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t
}

function f(t){
return f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t)
}

function h(t){
return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}

function y(t,e,r){
return(void 0===r||r>t.length)&&(r=t.length),t.substring(r-e.length,r)===e
}

function x(t){
var e=Object.keys(t),r=Object.create(Object.getPrototypeOf(t));
return e.forEach((function(e){
r[e]=t[e]
}

function k(t){
return d(t,{
compact:!1,customInspect:!1,depth:1e3,maxArrayLength:1/0,showHidden:!1,breakLength:1/0,showProxy:!1,sorted:!0,getters:!0
}

function e(t){
var r;
if(function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}

function n(t){
return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}

function o(t){
return o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t)
}

function i(t,e){
return i=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t
}

function c(t,e,r){
r||(r=Error);
var s=function(r){
function s(r,i,a){
var u,c,l;
return function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")
}

function l(t,e){
if(Array.isArray(t)){
var r=t.length;
return t=t.map((function(t){
return String(t)
}

function n(t,e){
return function(t){
if(Array.isArray(t))return t
}

function o(t){
return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}

function f(t){
return t.call.bind(t)
}

function O(t){
if(0===t.length||t.length>10)return!0;
for(var e=0;
e<t.length;
e++){
var r=t.charCodeAt(e);
if(r<48||r>57)return!0
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

function U(t,e,r,n){
if(t===e)return 0!==t||!r||u(t,e);
if(r){
if("object"!==o(t))return"number"==typeof t&&l(t)&&l(e);
if("object"!==o(e)||null===t||null===e)return!1;
if(Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1
}

function D(t,e){
return e.filter((function(e){
return d(t,e)
}

function q(t,e,r,i,u,l){
if(5===arguments.length){
l=Object.keys(t);
var f=Object.keys(e);
if(l.length!==f.length)return!1
}

function W(t,e,r,n){
for(var o=s(t),i=0;
i<o.length;
i++){
var a=o[i];
if(U(e,a,r,n))return t.delete(a),!0
}

function C(t){
switch(o(t)){
case"undefined":return null;
case"object":return;
case"symbol":return!1;
case"string":t=+t;
case"number":if(l(t))return!1
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

function n(t,e){
if(!t)throw new Error(e||"Assertion failed")
}

function o(t,e){
t.super_=e;
var r=function(){

}

function i(t,e,r){
if(i.isBN(t))return t;
this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==e&&"be"!==e||(r=e,e=10),this._init(t||0,e||10,r||"be"))
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

function l(t,e){
t.words=e.words,t.length=e.length,t.negative=e.negative,t.red=e.red
}

function f(){
return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"
}

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

function b(t,e,r){
return m(t,e,r)
}

function w(t,e){
this.x=t,this.y=e
}

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

function I(t){
A.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new i(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)
}

function g(t,e,r){
const n=r.value;
r.value=function(...t){
try{
return n.apply(this,t)
}

function b(t){
return t.charAt(0).toUpperCase()+t.slice(1)
}

function w(t,e,r,n,o){
try{
if("string"==typeof n)o[`write${
b(n)
}

function v(t,e,r){
if("function"==typeof e.borshSerialize)return void e.borshSerialize(r);
const n=t.get(e.constructor);
if(!n)throw new p(`Class ${
e.constructor.name
}

function x(t,e,r,n){
try{
if("string"==typeof r)return n[`read${
b(r)
}

function k(t,e,r){
if("function"==typeof e.borshDeserialize)return e.borshDeserialize(r);
const n=t.get(e);
if(!n)throw new p(`Class ${
e.name
}

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

function l(t,e,r){
if("string"==typeof t)return function(t,e){
if("string"==typeof e&&""!==e||(e="utf8"),!c.isEncoding(e))throw new TypeError("Unknown encoding: "+e);
const r=0|g(t,e);
let n=u(r);
const o=n.write(t,e);
return o!==r&&(n=n.slice(0,o)),n
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

function v(t,e,r,n,o){
let i,s=1,a=t.length,u=e.length;
if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){
if(t.length<2||e.length<2)return-1;
s=2,a/=2,u/=2,r/=2
}

function c(t,e){
return 1===s?t[e]:t.readUInt16BE(e*s)
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

function W(t,e,r){
q[t]=class extends r{
constructor(){
super(),Object.defineProperty(this,"message",{
value:e.apply(this,arguments),writable:!0,configurable:!0
}

function C(t){
let e="",r=t.length;
const n="-"===t[0]?1:0;
for(;
r>=n+4;
r-=3)e=`_${
t.slice(r-3,r)
}

function F(t,e,r,n,o,i){
if(t>r||t<e){
const n="bigint"==typeof e?"n":"";
let o;
throw o=i>3?0===e||e===BigInt(0)?`>= 0${
n
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

function G(t){
return o.toByteArray(function(t){
if((t=(t=t.split("=")[0]).trim().replace(H,"")).length<2)return"";
for(;
t.length%4!=0;
)t+="=";
return t
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

function X(t){
return"undefined"==typeof BigInt?tt:t
}

function tt(){
throw new Error("BigInt not supported")
}

function i(){
return(new Date).getTime()
}

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

function t(e){
var r;
if("%AsyncFunction%"===e)r=h("async function () {

}

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

function d(t,e){
this.fun=t,this.array=e
}

function p(){

}

function u(t,e,r){
return Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
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

function l(t,e,r){
try{
return{
type:"normal",arg:t.call(e,r)
}

function g(){

}

function m(){

}

function b(){

}

function S(t){
["next","throw","return"].forEach((function(e){
u(t,e,(function(t){
return this._invoke(e,t)
}

function M(t,e){
function r(o,i,s,a){
var u=l(t[o],t,i);
if("throw"!==u.type){
var c=u.arg,f=c.value;
return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){
r("next",t,s,a)
}

function i(){
return new e((function(e,o){
r(t,n,e,o)
}

function E(t,r){
var n=t.iterator[r.method];
if(n===e){
if(r.delegate=null,"throw"===r.method){
if(t.iterator.return&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return y;
r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")
}

function A(t){
var e={
tryLoc:t[0]
}

function I(t){
var e=t.completion||{

}

function j(t){
this.tryEntries=[{
tryLoc:"root"
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

function B(){
return{
value:e,done:!0
}

function r(){
for(;
e.length;
){
var n=e.pop();
if(n in t)return r.value=n,r.done=!1,r
}

function o(n,o){
return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o
}

function c(t,e,r){
return e=(0,a.default)(e),(0,s.default)(t,l()?Reflect.construct(e,r||[],(0,a.default)(t).constructor):e.apply(t,r))
}

function l(){
try{
var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){

}

function t(){
(0,o.default)(this,t)
}

function i(t,e){
for(var r in t)e[r]=t[r]
}

function s(t,e,r){
return o(t,e,r)
}

function r(t,e,r){
return e<=t&&t<=r
}

function n(t){
if(void 0===t)return{

}

function o(t){
this.tokens=[].slice.call(t)
}

function s(t,e){
if(t)throw TypeError("Decoder error");
return e||65533
}

function u(t,e){
if(!(this instanceof u))return new u(t,e);
if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");
e=n(e),this._streaming=!1,this._BOMseen=!1,this._decoder=null,this._fatal=Boolean(e.fatal),this._ignoreBOM=Boolean(e.ignoreBOM),Object.defineProperty(this,"encoding",{
value:"utf-8"
}

function c(t,e){
if(!(this instanceof c))return new c(t,e);
if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");
e=n(e),this._streaming=!1,this._encoder=null,this._options={
fatal:Boolean(e.fatal)
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

function p(t){
return d.includes(t)
}

function s(t){
try{
u(n.next(t))
}

function a(t){
try{
u(n.throw(t))
}

function u(t){
var e;
t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){
t(e)
}

function X(t){
if(!Number.isSafeInteger(t)||t<0)throw new Error(`positive integer expected, not ${
t
}

function tt(t,...e){
if(!((r=t)instanceof Uint8Array||null!=r&&"object"==typeof r&&"Uint8Array"===r.constructor.name))throw new Error("Uint8Array expected");
var r;
if(e.length>0&&!e.includes(t.length))throw new Error(`Uint8Array expected of length ${
e
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

function lt(t){
const e=e=>t().update(ut(e)).digest(),r=t();
return e.outputLen=r.outputLen,e.blockLen=r.blockLen,e.create=()=>t(),e
}

function ft(t=32){
if(nt&&"function"==typeof nt.getRandomValues)return nt.getRandomValues(new Uint8Array(t));
if(nt&&"function"==typeof nt.randomBytes)return nt.randomBytes(t);
throw new Error("crypto.getRandomValues must be defined")
}

function gt(t,e=!1){
return e?{
h:Number(t&pt),l:Number(t>>yt&pt)
}

function mt(t,e=!1){
let r=new Uint32Array(t.length),n=new Uint32Array(t.length);
for(let o=0;
o<t.length;
o++){
const{
h:i,l:s
}

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

function Ut(t){
if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);
return BigInt(""===t?"0":`0x${
t
}

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

function Gt(...t){
let e=0;
for(let r=0;
r<t.length;
r++){
const n=t[r];
Lt(n),e+=n.length
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

function Qt(t,e,r){
return Yt(t)&&Yt(e)&&Yt(r)&&e<=t&&t<r
}

function Xt(t,e,r,n){
if(!Qt(e,r,n))throw new Error(`expected valid ${
t
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

function se(t,e,r){
if("number"!=typeof t||t<2)throw new Error("hashLen must be a number");
if("number"!=typeof e||e<2)throw new Error("qByteLen must be a number");
if("function"!=typeof r)throw new Error("hmacFn must be a function");
let n=oe(t),o=oe(t),i=0;
const s=()=>{
n.fill(1),o.fill(0),i=0
}

function ue(t,e,r={

}
){
const n=(e,r,n)=>{
const o=ae[r];
if("function"!=typeof o)throw new Error(`Invalid validator "${
r
}

function le(t){
const e=new WeakMap;
return(r,...n)=>{
const o=e.get(r);
if(void 0!==o)return o;
const i=t(r,...n);
return e.set(r,i),i
}

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

function Se(t,e){
const r=void 0!==e?e:t.toString(2).length;
return{
nBitLength:r,nByteLength:Math.ceil(r/8)
}

function Me(t,e,r=!1,n={

}
){
if(t<=fe)throw new Error(`Expected Field ORDER > 0, got ${
t
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

function Oe(t,e){
const r=(t,e)=>{
const r=e.negate();
return t?r:e
}

function Te(t,e,r,n){
if(!Array.isArray(r)||!Array.isArray(n)||n.length!==r.length)throw new Error("arrays of points and scalars must have equal length");
n.forEach(((t,r)=>{
if(!e.isValid(t))throw new Error(`wrong scalar at index ${
r
}

function Le(t){
return ue(t.Fp,ke.reduce(((t,e)=>(t[e]="function",t)),{
ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"
}

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

function y(t,e){
Xt("coordinate "+t,e,Pe,c)
}

function g(t){
if(!(t instanceof w))throw new Error("ExtendedPoint expected")
}

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

function A(t=new Uint8Array,...e){
const r=Gt(...e);
return M(i(p(r,Vt("context",t),!!o)))
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

function dr(t,e){
const r=yr(t,e,{
coerce:!0
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

function gr(t,e){
return new hr({
type:t,schema:null,validator:e
}

function mr(t){
return new hr({
type:"array",schema:t,*entries(e){
if(t&&Array.isArray(e))for(const[r,n]of e.entries())yield[r,n,t]
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

function xr(t){
return new hr({
...t,validator:(e,r)=>null===e||t.validator(e,r),refiner:(e,r)=>null===e||t.refiner(e,r)
}

function kr(){
return gr("number",(t=>"number"==typeof t&&!isNaN(t)||"Expected a number, but received: "+ur(t)))
}

function Sr(t){
return new hr({
...t,validator:(e,r)=>void 0===e||t.validator(e,r),refiner:(e,r)=>void 0===e||t.refiner(e,r)
}

function Mr(t,e){
return new hr({
type:"record",schema:null,*entries(r){
if(ar(r))for(const n in r){
const o=r[n];
yield[n,n,t],yield[n,o,e]
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

function Ir(t){
const e=Object.keys(t);
return new hr({
type:"type",schema:t,*entries(r){
if(ar(r))for(const n of e)yield[n,r[n],t[n]]
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

function _r(){
return gr("unknown",(()=>!0))
}

function Br(t,e,r){
return new hr({
...t,coercer:(n,o)=>pr(n,e)?t.coercer(r(n,o),o):t.coercer(n,o)
}

function Gr(t){
void 0!==t.lowS&&Pt("lowS",t.lowS),void 0!==t.prehash&&Pt("prehash",t.prehash)
}

function en(t){
const e=function(t){
const e=Le(t);
return ue(e,{
hash:"hash",hmac:"function",randomBytes:"function"
}

function s(t){
return be(t,n)
}

function a(t){
return xe(t,n)
}

function s(t){
const{
a:n,b:o
}

function a(t){
const{
allowedPrivateKeyLengths:r,nByteLength:n,wrapPrivateKey:o,n:i
}

function u(t){
if(!(t instanceof f))throw new Error("ProjectivePoint expected")
}

function d(t){
return t>n>>Xr
}

function m(t){
const e=Tt(t),r="string"==typeof t,n=(e||r)&&t.length;
return e?n===o||n===i:r?n===2*o||n===2*i:t instanceof u
}

function x(t){
return Xt(`num < 2^${
e.nBitLength
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

function pn(t){
try{
return Je.ExtendedPoint.fromHex(t),!0
}

function Ln(t,e){
const r=t=>{
if(t.span>=0)return t.span;
if("function"==typeof t.alloc)return t.alloc(e[t.property]);
if("count"in t&&"elementLayout"in t){
const n=e[t.property];
if(Array.isArray(n))return n.length*r(t.elementLayout)
}

function Pn(t){
let e=0,r=0;
for(;
;
){
let n=t.shift();
if(e|=(127&n)<<7*r,r+=1,!(128&n))break
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

function zn(t,e){
if(!t)throw new Error(e||"Assertion failed")
}

function Dn(t){
if(0===t.length)throw new Error(Un);
return t.shift()
}

function qn(t,...e){
const[r]=e;
if(2===e.length?r+(e[1]??0)>t.length:r>=t.length)throw new Error(Un);
return t.splice(...e)
}

function Qn(t,e,r,n){
const o=n&&{
skipPreflight:n.skipPreflight,preflightCommitment:n.preflightCommitment||n.commitment,maxRetries:n.maxRetries,minContextSlot:n.minContextSlot
}

function Xn(t){
return new Promise((e=>setTimeout(e,t)))
}

function to(t,e){
const r=t.layout.span>=0?t.layout.span:Ln(t,e),n=Q.Buffer.alloc(r),o=Object.assign({
instruction:t.index
}

function lo(t){
return jr([Ir({
jsonrpc:vr("2.0"),id:Er(),result:t
}

function ho(t){
return Br(lo(t),fo,(e=>"error"in e?e:{
...e,result:dr(e.result,t)
}

function po(t){
return ho(Ir({
context:Ir({
slot:kr()
}

function yo(t){
return Ir({
context:Ir({
slot:kr()
}

function a(t){
return t.call.bind(t)
}

function g(t,e){
if("object"!=typeof t)return!1;
try{
return e(t),!0
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

function l(t,r){
var n={
seen:[],stylize:h
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

function p(t){
return"["+Error.prototype.toString.call(t)+"]"
}

function y(t,e,r,n,o,i){
var s,a,u;
if((u=Object.getOwnPropertyDescriptor(e,o)||{
value:e[o]
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

function B(t,e){
return Object.prototype.hasOwnProperty.call(t,e)
}

function T(t,e){
if(!t){
var r=new Error("Promise was rejected with a falsy value");
r.reason=t,t=r
}

function e(){
for(var e,r,n=new Promise((function(t,n){
e=t,r=n
}

function e(){
for(var e=[],r=0;
r<arguments.length;
r++)e.push(arguments[r]);
var o=e.pop();
if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");
var i=this,s=function(){
return o.apply(i,arguments)
}

function i(){
if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
return n(o)
}

function e(t,e,r,n,o,i,s){
try{
var a=t[i](s),u=a.value
}

function a(t){
e(s,o,i,a,u,"next",t)
}

function u(t){
e(s,o,i,a,u,"throw",t)
}

function o(t,e){
for(var r=0;
r<e.length;
r++){
var o=e[r];
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)
}

function e(r){
return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){
return t.__proto__||Object.getPrototypeOf(t)
}

function o(){
"use strict";
t.exports=o=function(){
return r
}

function h(t,e,r){
return Object.defineProperty(t,e,{
value:r,enumerable:!0,configurable:!0,writable:!0
}

function d(t,e,r,n){
var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),s=new L(n||[]);
return a(i,"_invoke",{
value:_(t,r,s)
}

function p(t,e,r){
try{
return{
type:"normal",arg:t.call(e,r)
}

function v(){

}

function x(){

}

function k(){

}

function I(t){
["next","throw","return"].forEach((function(e){
h(t,e,(function(t){
return this._invoke(e,t)
}

function j(t,e){
function r(o,i,a,u){
var c=p(t[o],t,i);
if("throw"!==c.type){
var l=c.arg,f=l.value;
return f&&"object"==n(f)&&s.call(f,"__await")?e.resolve(f.__await).then((function(t){
r("next",t,a,u)
}

function i(){
return new e((function(e,o){
r(t,n,e,o)
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

function T(t){
var e=t.completion||{

}

function L(t){
this.tryEntries=[{
tryLoc:"root"
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

function t(){
for(;
r.length;
){
var n=r.pop();
if(n in e)return t.value=n,t.done=!1,t
}

function n(n,o){
return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o
}

function e(r,n){
return t.exports=e=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){
return t.__proto__=e,t
}

function e(r){
return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t
}

function r(n){
var o=e[n];
if(void 0!==o)return o.exports;
var i=e[n]={
id:n,loaded:!1,exports:{

}