import{S as W,i as q,s as A,e as _,t as E,a as U,c as v,b as y,d as C,f,g as x,h as i,j as I,k as u,l as S,m as N,n as V,r as H}from"./index.50229bff.js";import{a as B}from"./backend.d5b3fe05.js";function O(r){let c,d,m,s,e,l,w,o,g,a,b,D,n,k,T,L;return{c(){c=_("h1"),d=E("Welcome Back!"),m=U(),s=_("div"),e=_("div"),l=_("input"),w=U(),o=_("input"),g=U(),a=_("button"),b=E("Login"),D=U(),n=_("a"),k=E("Don't have an account? Sign Up"),this.h()},l(t){c=v(t,"H1",{class:!0});var p=y(c);d=C(p,"Welcome Back!"),p.forEach(f),m=x(t),s=v(t,"DIV",{class:!0});var P=y(s);e=v(P,"DIV",{class:!0});var h=y(e);l=v(h,"INPUT",{type:!0,placeholder:!0,class:!0}),w=x(h),o=v(h,"INPUT",{type:!0,placeholder:!0,class:!0}),g=x(h),a=v(h,"BUTTON",{class:!0});var $=y(a);b=C($,"Login"),$.forEach(f),D=x(h),n=v(h,"A",{href:!0,class:!0});var j=y(n);k=C(j,"Don't have an account? Sign Up"),j.forEach(f),h.forEach(f),P.forEach(f),this.h()},h(){i(c,"class","text-center text-2xl font-bold pt-16"),i(l,"type","email"),i(l,"placeholder","Email"),i(l,"class","svelte-1c6llrt"),i(o,"type","password"),i(o,"placeholder","Password"),i(o,"class","svelte-1c6llrt"),i(a,"class","bg-gray-600 disabled:hover:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 disabled:opacity-50"),a.disabled=r[2],i(n,"href","/signup"),i(n,"class","text-center text-gray-500 hover:text-gray-700"),i(e,"class","w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5"),i(s,"class","flex justify-center")},m(t,p){I(t,c,p),u(c,d),I(t,m,p),I(t,s,p),u(s,e),u(e,l),S(l,r[0]),u(e,w),u(e,o),S(o,r[1]),u(e,g),u(e,a),u(a,b),u(e,D),u(e,n),u(n,k),T||(L=[N(l,"input",r[4]),N(o,"input",r[5]),N(a,"click",r[3])],T=!0)},p(t,[p]){p&1&&l.value!==t[0]&&S(l,t[0]),p&2&&o.value!==t[1]&&S(o,t[1]),p&4&&(a.disabled=t[2])},i:V,o:V,d(t){t&&f(c),t&&f(m),t&&f(s),T=!1,H(L)}}}function z(r,c,d){let m,{email:s=""}=c,e="";function l(){B.createEmailSession(s,e).then(a=>{console.log(a),document.cookie=`user=${a.userId}; expires=${new Date(Date.now()+30*24*60*60*1e3).toUTCString()}; path=/`,document.cookie=`userName=${a.providerUid.split("@")[0]}; expires=${new Date(Date.now()+30*24*60*60*1e3).toUTCString()}; path=/`;const b=B.getSession("current");document.cookie=`session=${b.$id}; expires=${new Date(Date.now()+30*24*60*60*1e3).toUTCString()}; path=/`,B.get().then(n=>{console.log(n),document.cookie=`userName=${n.name}; expires=${new Date(Date.now()+30*24*60*60*1e3).toUTCString()}; path=/`,window.location.href="/dashboard"},n=>{console.log(n)})},a=>{console.log(a)})}function w(){s=this.value,d(0,s)}function o(){e=this.value,d(1,e)}return r.$$set=g=>{"email"in g&&d(0,s=g.email)},r.$$.update=()=>{r.$$.dirty&3&&d(2,m=s===""||e==="")},[s,e,m,l,w,o]}class J extends W{constructor(c){super(),q(this,c,z,O,A,{email:0})}}export{J as default};
