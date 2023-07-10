var K=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Q(v){return v&&v.__esModule&&Object.prototype.hasOwnProperty.call(v,"default")?v.default:v}var O={exports:{}};(function(v,e){var t=typeof self<"u"?self:K,i=function(){function r(){this.fetch=!1,this.DOMException=t.DOMException}return r.prototype=t,new r}();(function(r){(function(a){var c={searchParams:"URLSearchParams"in r,iterable:"Symbol"in r&&"iterator"in Symbol,blob:"FileReader"in r&&"Blob"in r&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in r,arrayBuffer:"ArrayBuffer"in r};function f(o){return o&&DataView.prototype.isPrototypeOf(o)}if(c.arrayBuffer)var p=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],h=ArrayBuffer.isView||function(o){return o&&p.indexOf(Object.prototype.toString.call(o))>-1};function w(o){if(typeof o!="string"&&(o=String(o)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(o))throw new TypeError("Invalid character in header field name");return o.toLowerCase()}function R(o){return typeof o!="string"&&(o=String(o)),o}function q(o){var d={next:function(){var u=o.shift();return{done:u===void 0,value:u}}};return c.iterable&&(d[Symbol.iterator]=function(){return d}),d}function m(o){this.map={},o instanceof m?o.forEach(function(d,u){this.append(u,d)},this):Array.isArray(o)?o.forEach(function(d){this.append(d[0],d[1])},this):o&&Object.getOwnPropertyNames(o).forEach(function(d){this.append(d,o[d])},this)}m.prototype.append=function(o,d){o=w(o),d=R(d);var u=this.map[o];this.map[o]=u?u+", "+d:d},m.prototype.delete=function(o){delete this.map[w(o)]},m.prototype.get=function(o){return o=w(o),this.has(o)?this.map[o]:null},m.prototype.has=function(o){return this.map.hasOwnProperty(w(o))},m.prototype.set=function(o,d){this.map[w(o)]=R(d)},m.prototype.forEach=function(o,d){for(var u in this.map)this.map.hasOwnProperty(u)&&o.call(d,this.map[u],u,this)},m.prototype.keys=function(){var o=[];return this.forEach(function(d,u){o.push(u)}),q(o)},m.prototype.values=function(){var o=[];return this.forEach(function(d){o.push(d)}),q(o)},m.prototype.entries=function(){var o=[];return this.forEach(function(d,u){o.push([u,d])}),q(o)},c.iterable&&(m.prototype[Symbol.iterator]=m.prototype.entries);function g(o){if(o.bodyUsed)return Promise.reject(new TypeError("Already read"));o.bodyUsed=!0}function U(o){return new Promise(function(d,u){o.onload=function(){d(o.result)},o.onerror=function(){u(o.error)}})}function L(o){var d=new FileReader,u=U(d);return d.readAsArrayBuffer(o),u}function _(o){var d=new FileReader,u=U(d);return d.readAsText(o),u}function x(o){for(var d=new Uint8Array(o),u=new Array(d.length),M=0;M<d.length;M++)u[M]=String.fromCharCode(d[M]);return u.join("")}function D(o){if(o.slice)return o.slice(0);var d=new Uint8Array(o.byteLength);return d.set(new Uint8Array(o)),d.buffer}function B(){return this.bodyUsed=!1,this._initBody=function(o){this._bodyInit=o,o?typeof o=="string"?this._bodyText=o:c.blob&&Blob.prototype.isPrototypeOf(o)?this._bodyBlob=o:c.formData&&FormData.prototype.isPrototypeOf(o)?this._bodyFormData=o:c.searchParams&&URLSearchParams.prototype.isPrototypeOf(o)?this._bodyText=o.toString():c.arrayBuffer&&c.blob&&f(o)?(this._bodyArrayBuffer=D(o.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(o)||h(o))?this._bodyArrayBuffer=D(o):this._bodyText=o=Object.prototype.toString.call(o):this._bodyText="",this.headers.get("content-type")||(typeof o=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):c.searchParams&&URLSearchParams.prototype.isPrototypeOf(o)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c.blob&&(this.blob=function(){var o=g(this);if(o)return o;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?g(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(L)}),this.text=function(){var o=g(this);if(o)return o;if(this._bodyBlob)return _(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c.formData&&(this.formData=function(){return this.text().then(N)}),this.json=function(){return this.text().then(JSON.parse)},this}var F=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function C(o){var d=o.toUpperCase();return F.indexOf(d)>-1?d:o}function k(o,d){d=d||{};var u=d.body;if(o instanceof k){if(o.bodyUsed)throw new TypeError("Already read");this.url=o.url,this.credentials=o.credentials,d.headers||(this.headers=new m(o.headers)),this.method=o.method,this.mode=o.mode,this.signal=o.signal,!u&&o._bodyInit!=null&&(u=o._bodyInit,o.bodyUsed=!0)}else this.url=String(o);if(this.credentials=d.credentials||this.credentials||"same-origin",(d.headers||!this.headers)&&(this.headers=new m(d.headers)),this.method=C(d.method||this.method||"GET"),this.mode=d.mode||this.mode||null,this.signal=d.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&u)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(u)}k.prototype.clone=function(){return new k(this,{body:this._bodyInit})};function N(o){var d=new FormData;return o.trim().split("&").forEach(function(u){if(u){var M=u.split("="),b=M.shift().replace(/\+/g," "),y=M.join("=").replace(/\+/g," ");d.append(decodeURIComponent(b),decodeURIComponent(y))}}),d}function H(o){var d=new m,u=o.replace(/\r?\n[\t ]+/g," ");return u.split(/\r?\n/).forEach(function(M){var b=M.split(":"),y=b.shift().trim();if(y){var A=b.join(":").trim();d.append(y,A)}}),d}B.call(k.prototype);function j(o,d){d||(d={}),this.type="default",this.status=d.status===void 0?200:d.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in d?d.statusText:"OK",this.headers=new m(d.headers),this.url=d.url||"",this._initBody(o)}B.call(j.prototype),j.prototype.clone=function(){return new j(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new m(this.headers),url:this.url})},j.error=function(){var o=new j(null,{status:0,statusText:""});return o.type="error",o};var V=[301,302,303,307,308];j.redirect=function(o,d){if(V.indexOf(d)===-1)throw new RangeError("Invalid status code");return new j(null,{status:d,headers:{location:o}})},a.DOMException=r.DOMException;try{new a.DOMException}catch{a.DOMException=function(d,u){this.message=d,this.name=u;var M=Error(d);this.stack=M.stack},a.DOMException.prototype=Object.create(Error.prototype),a.DOMException.prototype.constructor=a.DOMException}function T(o,d){return new Promise(function(u,M){var b=new k(o,d);if(b.signal&&b.signal.aborted)return M(new a.DOMException("Aborted","AbortError"));var y=new XMLHttpRequest;function A(){y.abort()}y.onload=function(){var E={status:y.status,statusText:y.statusText,headers:H(y.getAllResponseHeaders()||"")};E.url="responseURL"in y?y.responseURL:E.headers.get("X-Request-URL");var P="response"in y?y.response:y.responseText;u(new j(P,E))},y.onerror=function(){M(new TypeError("Network request failed"))},y.ontimeout=function(){M(new TypeError("Network request failed"))},y.onabort=function(){M(new a.DOMException("Aborted","AbortError"))},y.open(b.method,b.url,!0),b.credentials==="include"?y.withCredentials=!0:b.credentials==="omit"&&(y.withCredentials=!1),"responseType"in y&&c.blob&&(y.responseType="blob"),b.headers.forEach(function(E,P){y.setRequestHeader(P,E)}),b.signal&&(b.signal.addEventListener("abort",A),y.onreadystatechange=function(){y.readyState===4&&b.signal.removeEventListener("abort",A)}),y.send(typeof b._bodyInit>"u"?null:b._bodyInit)})}return T.polyfill=!0,r.fetch||(r.fetch=T,r.Headers=m,r.Request=k,r.Response=j),a.Headers=m,a.Request=k,a.Response=j,a.fetch=T,Object.defineProperty(a,"__esModule",{value:!0}),a})({})})(i),i.fetch.ponyfill=!0,delete i.fetch.polyfill;var n=i;e=n.fetch,e.default=n.fetch,e.fetch=n.fetch,e.Headers=n.Headers,e.Request=n.Request,e.Response=n.Response,v.exports=e})(O,O.exports);var X=O.exports;function l(v,e,t,i){function n(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function c(h){try{p(i.next(h))}catch(w){a(w)}}function f(h){try{p(i.throw(h))}catch(w){a(w)}}function p(h){h.done?r(h.value):n(h.value).then(c,f)}p((i=i.apply(v,e||[])).next())})}class I{constructor(e){this.client=e}static flatten(e,t=""){let i={};for(const n in e){let r=e[n],a=t?`${t}[${n}]`:n;Array.isArray(r)?i=Object.assign(i,this.flatten(r,a)):i[a]=r}return i}}I.CHUNK_SIZE=5*1024*1024;class s extends Error{constructor(e,t=0,i="",n=""){super(e),this.name="AppwriteException",this.message=e,this.code=t,this.type=i,this.response=n}}class z{constructor(){this.config={endpoint:"https://HOSTNAME/v1",endpointRealtime:"",project:"",jwt:"",locale:""},this.headers={"x-sdk-name":"Web","x-sdk-platform":"client","x-sdk-language":"web","x-sdk-version":"11.0.0","X-Appwrite-Response-Format":"1.0.0"},this.realtime={socket:void 0,timeout:void 0,url:"",channels:new Set,subscriptions:new Map,subscriptionsCounter:0,reconnect:!0,reconnectAttempts:0,lastMessage:void 0,connect:()=>{clearTimeout(this.realtime.timeout),this.realtime.timeout=window?.setTimeout(()=>{this.realtime.createSocket()},50)},getTimeout:()=>{switch(!0){case this.realtime.reconnectAttempts<5:return 1e3;case this.realtime.reconnectAttempts<15:return 5e3;case this.realtime.reconnectAttempts<100:return 1e4;default:return 6e4}},createSocket:()=>{var e,t;if(this.realtime.channels.size<1)return;const i=new URLSearchParams;i.set("project",this.config.project),this.realtime.channels.forEach(r=>{i.append("channels[]",r)});const n=this.config.endpointRealtime+"/realtime?"+i.toString();(n!==this.realtime.url||!this.realtime.socket||((e=this.realtime.socket)===null||e===void 0?void 0:e.readyState)>WebSocket.OPEN)&&(this.realtime.socket&&((t=this.realtime.socket)===null||t===void 0?void 0:t.readyState)<WebSocket.CLOSING&&(this.realtime.reconnect=!1,this.realtime.socket.close()),this.realtime.url=n,this.realtime.socket=new WebSocket(n),this.realtime.socket.addEventListener("message",this.realtime.onMessage),this.realtime.socket.addEventListener("open",r=>{this.realtime.reconnectAttempts=0}),this.realtime.socket.addEventListener("close",r=>{var a,c,f;if(!this.realtime.reconnect||((c=(a=this.realtime)===null||a===void 0?void 0:a.lastMessage)===null||c===void 0?void 0:c.type)==="error"&&((f=this.realtime)===null||f===void 0?void 0:f.lastMessage.data).code===1008){this.realtime.reconnect=!0;return}const p=this.realtime.getTimeout();console.error(`Realtime got disconnected. Reconnect will be attempted in ${p/1e3} seconds.`,r.reason),setTimeout(()=>{this.realtime.reconnectAttempts++,this.realtime.createSocket()},p)}))},onMessage:e=>{var t,i;try{const n=JSON.parse(e.data);switch(this.realtime.lastMessage=n,n.type){case"connected":const r=JSON.parse((t=window.localStorage.getItem("cookieFallback"))!==null&&t!==void 0?t:"{}"),a=r?.[`a_session_${this.config.project}`],c=n.data;a&&!c.user&&((i=this.realtime.socket)===null||i===void 0||i.send(JSON.stringify({type:"authentication",data:{session:a}})));break;case"event":let f=n.data;if(f?.channels){if(!f.channels.some(h=>this.realtime.channels.has(h)))return;this.realtime.subscriptions.forEach(h=>{f.channels.some(w=>h.channels.includes(w))&&setTimeout(()=>h.callback(f))})}break;case"error":throw n.data;default:break}}catch(n){console.error(n)}},cleanUp:e=>{this.realtime.channels.forEach(t=>{e.includes(t)&&(Array.from(this.realtime.subscriptions).some(([n,r])=>r.channels.includes(t))||this.realtime.channels.delete(t))})}}}setEndpoint(e){return this.config.endpoint=e,this.config.endpointRealtime=this.config.endpointRealtime||this.config.endpoint.replace("https://","wss://").replace("http://","ws://"),this}setEndpointRealtime(e){return this.config.endpointRealtime=e,this}setProject(e){return this.headers["X-Appwrite-Project"]=e,this.config.project=e,this}setJWT(e){return this.headers["X-Appwrite-JWT"]=e,this.config.jwt=e,this}setLocale(e){return this.headers["X-Appwrite-Locale"]=e,this.config.locale=e,this}subscribe(e,t){let i=typeof e=="string"?[e]:e;i.forEach(r=>this.realtime.channels.add(r));const n=this.realtime.subscriptionsCounter++;return this.realtime.subscriptions.set(n,{channels:i,callback:t}),this.realtime.connect(),()=>{this.realtime.subscriptions.delete(n),this.realtime.cleanUp(i),this.realtime.connect()}}call(e,t,i={},n={}){var r,a;return l(this,void 0,void 0,function*(){e=e.toUpperCase(),i=Object.assign({},this.headers,i);let c={method:e,headers:i,credentials:"include"};if(typeof window<"u"&&window.localStorage&&(i["X-Fallback-Cookies"]=(r=window.localStorage.getItem("cookieFallback"))!==null&&r!==void 0?r:""),e==="GET")for(const[f,p]of Object.entries(I.flatten(n)))t.searchParams.append(f,p);else switch(i["content-type"]){case"application/json":c.body=JSON.stringify(n);break;case"multipart/form-data":let f=new FormData;for(const p in n)Array.isArray(n[p])?n[p].forEach(h=>{f.append(p+"[]",h)}):f.append(p,n[p]);c.body=f,delete i["content-type"];break}try{let f=null;const p=yield X.fetch(t.toString(),c);if(!((a=p.headers.get("content-type"))===null||a===void 0)&&a.includes("application/json")?f=yield p.json():f={message:yield p.text()},400<=p.status)throw new s(f?.message,p.status,f?.type,f);const h=p.headers.get("X-Fallback-Cookies");return typeof window<"u"&&window.localStorage&&h&&(window.console.warn("Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint."),window.localStorage.setItem("cookieFallback",h)),f}catch(f){throw f instanceof s?f:new s(f.message)}})}}class G extends I{constructor(e){super(e)}get(){return l(this,void 0,void 0,function*(){let e="/account",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("get",i,{"content-type":"application/json"},t)})}create(e,t,i,n){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "email"');if(typeof i>"u")throw new s('Missing required parameter: "password"');let r="/account",a={};typeof e<"u"&&(a.userId=e),typeof t<"u"&&(a.email=t),typeof i<"u"&&(a.password=i),typeof n<"u"&&(a.name=n);const c=new URL(this.client.config.endpoint+r);return yield this.client.call("post",c,{"content-type":"application/json"},a)})}updateEmail(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "email"');if(typeof t>"u")throw new s('Missing required parameter: "password"');let i="/account/email",n={};typeof e<"u"&&(n.email=e),typeof t<"u"&&(n.password=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("patch",r,{"content-type":"application/json"},n)})}createJWT(){return l(this,void 0,void 0,function*(){let e="/account/jwt",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("post",i,{"content-type":"application/json"},t)})}listLogs(e){return l(this,void 0,void 0,function*(){let t="/account/logs",i={};typeof e<"u"&&(i.queries=e);const n=new URL(this.client.config.endpoint+t);return yield this.client.call("get",n,{"content-type":"application/json"},i)})}updateName(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "name"');let t="/account/name",i={};typeof e<"u"&&(i.name=e);const n=new URL(this.client.config.endpoint+t);return yield this.client.call("patch",n,{"content-type":"application/json"},i)})}updatePassword(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "password"');let i="/account/password",n={};typeof e<"u"&&(n.password=e),typeof t<"u"&&(n.oldPassword=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("patch",r,{"content-type":"application/json"},n)})}updatePhone(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "phone"');if(typeof t>"u")throw new s('Missing required parameter: "password"');let i="/account/phone",n={};typeof e<"u"&&(n.phone=e),typeof t<"u"&&(n.password=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("patch",r,{"content-type":"application/json"},n)})}getPrefs(){return l(this,void 0,void 0,function*(){let e="/account/prefs",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("get",i,{"content-type":"application/json"},t)})}updatePrefs(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "prefs"');let t="/account/prefs",i={};typeof e<"u"&&(i.prefs=e);const n=new URL(this.client.config.endpoint+t);return yield this.client.call("patch",n,{"content-type":"application/json"},i)})}createRecovery(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "email"');if(typeof t>"u")throw new s('Missing required parameter: "url"');let i="/account/recovery",n={};typeof e<"u"&&(n.email=e),typeof t<"u"&&(n.url=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("post",r,{"content-type":"application/json"},n)})}updateRecovery(e,t,i,n){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "secret"');if(typeof i>"u")throw new s('Missing required parameter: "password"');if(typeof n>"u")throw new s('Missing required parameter: "passwordAgain"');let r="/account/recovery",a={};typeof e<"u"&&(a.userId=e),typeof t<"u"&&(a.secret=t),typeof i<"u"&&(a.password=i),typeof n<"u"&&(a.passwordAgain=n);const c=new URL(this.client.config.endpoint+r);return yield this.client.call("put",c,{"content-type":"application/json"},a)})}listSessions(){return l(this,void 0,void 0,function*(){let e="/account/sessions",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("get",i,{"content-type":"application/json"},t)})}deleteSessions(){return l(this,void 0,void 0,function*(){let e="/account/sessions",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("delete",i,{"content-type":"application/json"},t)})}createAnonymousSession(){return l(this,void 0,void 0,function*(){let e="/account/sessions/anonymous",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("post",i,{"content-type":"application/json"},t)})}createEmailSession(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "email"');if(typeof t>"u")throw new s('Missing required parameter: "password"');let i="/account/sessions/email",n={};typeof e<"u"&&(n.email=e),typeof t<"u"&&(n.password=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("post",r,{"content-type":"application/json"},n)})}createMagicURLSession(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "email"');let n="/account/sessions/magic-url",r={};typeof e<"u"&&(r.userId=e),typeof t<"u"&&(r.email=t),typeof i<"u"&&(r.url=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("post",a,{"content-type":"application/json"},r)})}updateMagicURLSession(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "secret"');let i="/account/sessions/magic-url",n={};typeof e<"u"&&(n.userId=e),typeof t<"u"&&(n.secret=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}createOAuth2Session(e,t,i,n){if(typeof e>"u")throw new s('Missing required parameter: "provider"');let r="/account/sessions/oauth2/{provider}".replace("{provider}",e),a={};typeof t<"u"&&(a.success=t),typeof i<"u"&&(a.failure=i),typeof n<"u"&&(a.scopes=n);const c=new URL(this.client.config.endpoint+r);a.project=this.client.config.project;for(const[f,p]of Object.entries(I.flatten(a)))c.searchParams.append(f,p);if(typeof window<"u"&&window?.location)window.location.href=c.toString();else return c}createPhoneSession(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "phone"');let i="/account/sessions/phone",n={};typeof e<"u"&&(n.userId=e),typeof t<"u"&&(n.phone=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("post",r,{"content-type":"application/json"},n)})}updatePhoneSession(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "secret"');let i="/account/sessions/phone",n={};typeof e<"u"&&(n.userId=e),typeof t<"u"&&(n.secret=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}getSession(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "sessionId"');let t="/account/sessions/{sessionId}".replace("{sessionId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("get",n,{"content-type":"application/json"},i)})}updateSession(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "sessionId"');let t="/account/sessions/{sessionId}".replace("{sessionId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("patch",n,{"content-type":"application/json"},i)})}deleteSession(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "sessionId"');let t="/account/sessions/{sessionId}".replace("{sessionId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("delete",n,{"content-type":"application/json"},i)})}updateStatus(){return l(this,void 0,void 0,function*(){let e="/account/status",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("patch",i,{"content-type":"application/json"},t)})}createVerification(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "url"');let t="/account/verification",i={};typeof e<"u"&&(i.url=e);const n=new URL(this.client.config.endpoint+t);return yield this.client.call("post",n,{"content-type":"application/json"},i)})}updateVerification(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "secret"');let i="/account/verification",n={};typeof e<"u"&&(n.userId=e),typeof t<"u"&&(n.secret=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}createPhoneVerification(){return l(this,void 0,void 0,function*(){let e="/account/verification/phone",t={};const i=new URL(this.client.config.endpoint+e);return yield this.client.call("post",i,{"content-type":"application/json"},t)})}updatePhoneVerification(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "userId"');if(typeof t>"u")throw new s('Missing required parameter: "secret"');let i="/account/verification/phone",n={};typeof e<"u"&&(n.userId=e),typeof t<"u"&&(n.secret=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}}class J extends I{constructor(e){super(e)}listDocuments(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "databaseId"');if(typeof t>"u")throw new s('Missing required parameter: "collectionId"');let n="/databases/{databaseId}/collections/{collectionId}/documents".replace("{databaseId}",e).replace("{collectionId}",t),r={};typeof i<"u"&&(r.queries=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("get",a,{"content-type":"application/json"},r)})}createDocument(e,t,i,n,r){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "databaseId"');if(typeof t>"u")throw new s('Missing required parameter: "collectionId"');if(typeof i>"u")throw new s('Missing required parameter: "documentId"');if(typeof n>"u")throw new s('Missing required parameter: "data"');let a="/databases/{databaseId}/collections/{collectionId}/documents".replace("{databaseId}",e).replace("{collectionId}",t),c={};typeof i<"u"&&(c.documentId=i),typeof n<"u"&&(c.data=n),typeof r<"u"&&(c.permissions=r);const f=new URL(this.client.config.endpoint+a);return yield this.client.call("post",f,{"content-type":"application/json"},c)})}getDocument(e,t,i,n){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "databaseId"');if(typeof t>"u")throw new s('Missing required parameter: "collectionId"');if(typeof i>"u")throw new s('Missing required parameter: "documentId"');let r="/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}",e).replace("{collectionId}",t).replace("{documentId}",i),a={};typeof n<"u"&&(a.queries=n);const c=new URL(this.client.config.endpoint+r);return yield this.client.call("get",c,{"content-type":"application/json"},a)})}updateDocument(e,t,i,n,r){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "databaseId"');if(typeof t>"u")throw new s('Missing required parameter: "collectionId"');if(typeof i>"u")throw new s('Missing required parameter: "documentId"');let a="/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}",e).replace("{collectionId}",t).replace("{documentId}",i),c={};typeof n<"u"&&(c.data=n),typeof r<"u"&&(c.permissions=r);const f=new URL(this.client.config.endpoint+a);return yield this.client.call("patch",f,{"content-type":"application/json"},c)})}deleteDocument(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "databaseId"');if(typeof t>"u")throw new s('Missing required parameter: "collectionId"');if(typeof i>"u")throw new s('Missing required parameter: "documentId"');let n="/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}",e).replace("{collectionId}",t).replace("{documentId}",i),r={};const a=new URL(this.client.config.endpoint+n);return yield this.client.call("delete",a,{"content-type":"application/json"},r)})}}class $ extends I{constructor(e){super(e)}listFiles(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');let n="/storage/buckets/{bucketId}/files".replace("{bucketId}",e),r={};typeof t<"u"&&(r.queries=t),typeof i<"u"&&(r.search=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("get",a,{"content-type":"application/json"},r)})}createFile(e,t,i,n,r=a=>{}){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');if(typeof i>"u")throw new s('Missing required parameter: "file"');let a="/storage/buckets/{bucketId}/files".replace("{bucketId}",e),c={};typeof t<"u"&&(c.fileId=t),typeof i<"u"&&(c.file=i),typeof n<"u"&&(c.permissions=n);const f=new URL(this.client.config.endpoint+a);if(!(i instanceof File))throw new s('Parameter "file" has to be a File.');const p=i.size;if(p<=I.CHUNK_SIZE)return yield this.client.call("post",f,{"content-type":"multipart/form-data"},c);let h,w;const R={"content-type":"multipart/form-data"};let q=0;const m=Math.ceil(p/I.CHUNK_SIZE);if(t!="unique()")try{w=yield this.client.call("GET",new URL(this.client.config.endpoint+a+"/"+t),R),q=w.chunksUploaded}catch{}for(q;q<m;q++){const g=q*I.CHUNK_SIZE,U=Math.min(q*I.CHUNK_SIZE+I.CHUNK_SIZE-1,p);R["content-range"]="bytes "+g+"-"+U+"/"+p,h&&(R["x-appwrite-id"]=h);const L=i.slice(g,U+1);c.file=new File([L],i.name),w=yield this.client.call("post",f,R,c),h||(h=w.$id),r&&r({$id:w.$id,progress:Math.min((q+1)*I.CHUNK_SIZE-1,p)/p*100,sizeUploaded:U,chunksTotal:w.chunksTotal,chunksUploaded:w.chunksUploaded})}return w})}getFile(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let i="/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}",e).replace("{fileId}",t),n={};const r=new URL(this.client.config.endpoint+i);return yield this.client.call("get",r,{"content-type":"application/json"},n)})}updateFile(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let n="/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}",e).replace("{fileId}",t),r={};typeof i<"u"&&(r.permissions=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("put",a,{"content-type":"application/json"},r)})}deleteFile(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let i="/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}",e).replace("{fileId}",t),n={};const r=new URL(this.client.config.endpoint+i);return yield this.client.call("delete",r,{"content-type":"application/json"},n)})}getFileDownload(e,t){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let i="/storage/buckets/{bucketId}/files/{fileId}/download".replace("{bucketId}",e).replace("{fileId}",t),n={};const r=new URL(this.client.config.endpoint+i);n.project=this.client.config.project;for(const[a,c]of Object.entries(I.flatten(n)))r.searchParams.append(a,c);return r}getFilePreview(e,t,i,n,r,a,c,f,p,h,w,R,q){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let m="/storage/buckets/{bucketId}/files/{fileId}/preview".replace("{bucketId}",e).replace("{fileId}",t),g={};typeof i<"u"&&(g.width=i),typeof n<"u"&&(g.height=n),typeof r<"u"&&(g.gravity=r),typeof a<"u"&&(g.quality=a),typeof c<"u"&&(g.borderWidth=c),typeof f<"u"&&(g.borderColor=f),typeof p<"u"&&(g.borderRadius=p),typeof h<"u"&&(g.opacity=h),typeof w<"u"&&(g.rotation=w),typeof R<"u"&&(g.background=R),typeof q<"u"&&(g.output=q);const U=new URL(this.client.config.endpoint+m);g.project=this.client.config.project;for(const[L,_]of Object.entries(I.flatten(g)))U.searchParams.append(L,_);return U}getFileView(e,t){if(typeof e>"u")throw new s('Missing required parameter: "bucketId"');if(typeof t>"u")throw new s('Missing required parameter: "fileId"');let i="/storage/buckets/{bucketId}/files/{fileId}/view".replace("{bucketId}",e).replace("{fileId}",t),n={};const r=new URL(this.client.config.endpoint+i);n.project=this.client.config.project;for(const[a,c]of Object.entries(I.flatten(n)))r.searchParams.append(a,c);return r}}class W extends I{constructor(e){super(e)}list(e,t){return l(this,void 0,void 0,function*(){let i="/teams",n={};typeof e<"u"&&(n.queries=e),typeof t<"u"&&(n.search=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("get",r,{"content-type":"application/json"},n)})}create(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "name"');let n="/teams",r={};typeof e<"u"&&(r.teamId=e),typeof t<"u"&&(r.name=t),typeof i<"u"&&(r.roles=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("post",a,{"content-type":"application/json"},r)})}get(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');let t="/teams/{teamId}".replace("{teamId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("get",n,{"content-type":"application/json"},i)})}updateName(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "name"');let i="/teams/{teamId}".replace("{teamId}",e),n={};typeof t<"u"&&(n.name=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}delete(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');let t="/teams/{teamId}".replace("{teamId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("delete",n,{"content-type":"application/json"},i)})}listMemberships(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');let n="/teams/{teamId}/memberships".replace("{teamId}",e),r={};typeof t<"u"&&(r.queries=t),typeof i<"u"&&(r.search=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("get",a,{"content-type":"application/json"},r)})}createMembership(e,t,i,n,r,a,c){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "roles"');if(typeof i>"u")throw new s('Missing required parameter: "url"');let f="/teams/{teamId}/memberships".replace("{teamId}",e),p={};typeof n<"u"&&(p.email=n),typeof r<"u"&&(p.userId=r),typeof a<"u"&&(p.phone=a),typeof t<"u"&&(p.roles=t),typeof i<"u"&&(p.url=i),typeof c<"u"&&(p.name=c);const h=new URL(this.client.config.endpoint+f);return yield this.client.call("post",h,{"content-type":"application/json"},p)})}getMembership(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "membershipId"');let i="/teams/{teamId}/memberships/{membershipId}".replace("{teamId}",e).replace("{membershipId}",t),n={};const r=new URL(this.client.config.endpoint+i);return yield this.client.call("get",r,{"content-type":"application/json"},n)})}updateMembershipRoles(e,t,i){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "membershipId"');if(typeof i>"u")throw new s('Missing required parameter: "roles"');let n="/teams/{teamId}/memberships/{membershipId}".replace("{teamId}",e).replace("{membershipId}",t),r={};typeof i<"u"&&(r.roles=i);const a=new URL(this.client.config.endpoint+n);return yield this.client.call("patch",a,{"content-type":"application/json"},r)})}deleteMembership(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "membershipId"');let i="/teams/{teamId}/memberships/{membershipId}".replace("{teamId}",e).replace("{membershipId}",t),n={};const r=new URL(this.client.config.endpoint+i);return yield this.client.call("delete",r,{"content-type":"application/json"},n)})}updateMembershipStatus(e,t,i,n){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "membershipId"');if(typeof i>"u")throw new s('Missing required parameter: "userId"');if(typeof n>"u")throw new s('Missing required parameter: "secret"');let r="/teams/{teamId}/memberships/{membershipId}/status".replace("{teamId}",e).replace("{membershipId}",t),a={};typeof i<"u"&&(a.userId=i),typeof n<"u"&&(a.secret=n);const c=new URL(this.client.config.endpoint+r);return yield this.client.call("patch",c,{"content-type":"application/json"},a)})}getPrefs(e){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');let t="/teams/{teamId}/prefs".replace("{teamId}",e),i={};const n=new URL(this.client.config.endpoint+t);return yield this.client.call("get",n,{"content-type":"application/json"},i)})}updatePrefs(e,t){return l(this,void 0,void 0,function*(){if(typeof e>"u")throw new s('Missing required parameter: "teamId"');if(typeof t>"u")throw new s('Missing required parameter: "prefs"');let i="/teams/{teamId}/prefs".replace("{teamId}",e),n={};typeof t<"u"&&(n.prefs=t);const r=new URL(this.client.config.endpoint+i);return yield this.client.call("put",r,{"content-type":"application/json"},n)})}}class Y{static custom(e){return e}static unique(){return"unique()"}}const Z=new z,S=Z.setEndpoint("https://cloud.appwrite.io/v1").setProject("648bc5020fbda818412e"),ee=new J(S);new $(S);const te=new G(S);new W(S);export{Y as I,te as a,ee as b,Q as g};
