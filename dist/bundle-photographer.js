(()=>{var e,t,n,r={},i={};function l(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return r[e](n,n.exports,l),n.exports}l.m=r,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"==typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"==typeof n.then)return n}var i=Object.create(null);l.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var o=2&r&&n;"object"==typeof o&&!~e.indexOf(o);o=t(o))Object.getOwnPropertyNames(o).forEach((e=>a[e]=()=>n[e]));return a.default=()=>n,l.d(i,a),i},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((t,n)=>(l.f[n](e,t),t)),[])),l.u=e=>"bundle-"+e+".js",l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},l.l=(e,t,r,i)=>{if(n[e])n[e].push(t);else{var a,o;if(void 0!==r)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var s=d[c];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")=="p6:"+r){a=s;break}}a||(o=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,l.nc&&a.setAttribute("nonce",l.nc),a.setAttribute("data-webpack","p6:"+r),a.src=e),n[e]=[t];var u=(t,r)=>{a.onerror=a.onload=null,clearTimeout(p);var i=n[e];if(delete n[e],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(r))),t)return t(r)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),o&&document.head.appendChild(a)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;l.g.importScripts&&(e=l.g.location+"");var t=l.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e})(),(()=>{var e={512:0};l.f.j=(t,n)=>{var r=l.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((n,i)=>r=e[t]=[n,i]));n.push(r[2]=i);var a=l.p+l.u(t),o=new Error;l.l(a,(n=>{if(l.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;o.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",o.name="ChunkLoadError",o.type=i,o.request=a,r[1](o)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,i,[a,o,d]=n,c=0;for(r in o)l.o(o,r)&&(l.m[r]=o[r]);for(d&&d(l),t&&t(n);c<a.length;c++)i=a[c],l.o(e,i)&&e[i]&&e[i][0](),e[a[c]]=0},n=self.webpackChunkp6=self.webpackChunkp6||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();const a=window.location.search,o=new URLSearchParams(a).get("id"),d=document.querySelector(".photographer-section-contact"),c=document.getElementById("media-contenant"),s=document.getElementById("modal-header"),u=document.querySelector(".photographer-belowElements"),p=document.getElementById("modal-initial"),m=document.getElementById("modal-header-close"),h=document.getElementById("dialog"),g=document.getElementById("dialog-img-container"),f=document.getElementById("dialog-close"),b=document.getElementById("title-dialog"),y=document.getElementById("dialog-previous"),v=document.getElementById("dialog-next"),E=document.getElementById("order-by-trigger"),k=document.getElementById("order-by-trigger-text"),C=document.getElementById("order-by-dropdown"),L=document.querySelectorAll(".order-by-dropdown-element"),w=document.getElementById("first"),I=document.getElementById("last"),B=document.getElementById("email"),T=document.getElementById("message"),A=document.getElementById("alerte-first"),x=document.getElementById("alerte-last"),M=document.getElementById("alerte-email"),j=document.getElementById("alerte-message"),$="Veuillez entrer 2 caractères ou plus pour le champ !",H="Veuillez renseigner une adresse email correcte !",O=document.getElementById("submitBtn");let P={"aria-label":"likes",class:"fa fa-heart"};m.addEventListener("click",(function(){p.style.display="none"})),f.addEventListener("click",(function(){h.style.display="none"}));var N=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;function S(e,t,n,r){e?_(t,r,n):function(e,t){e.innerHTML=q,e.style.color="white",t.style.border="none"}(t,n)}function z(e,t){let n=""===t.value.substr(1);console.log(t.value),S(n,e,t,$)}function _(e,t,n){e.innerHTML=t,e.style.color="black",n.style.border="2px solid black"}w.addEventListener("input",(function(){z(A,w)})),I.addEventListener("input",(function(){z(x,I)})),B.addEventListener("input",(function(){var e,t;e=M,t=B,S(!N.test(t.value),e,t,H)})),T.addEventListener("input",(function(){z(j,T)}));let q="Champ correctement rempli.";function W(e,t,n,r){t.textContent!=q&&(e.preventDefault(),_(t,r,n))}function D(e="popularite"){l.e(927).then(l.t.bind(l,927,19)).then((t=>{console.log(t),c.innerHTML="",d.innerHTML="";const n=t.photographers.find((e=>e.id==o));s.innerHTML="Contactez-moi<br>"+n.name;let r=document.createElement("div");r.className="portrait-container";let i="./images/Photographers%20ID%20Photos/"+n.portrait;r.setAttribute("style",`background-image: url(${i.replace(" ","%20")})`),r.setAttribute("aria-label",n.name);let l=V("button",{class:"contact-button"});l.innerHTML="Contactez-moi",l.setAttribute("aria-label","Contactez-moi"),l.addEventListener("click",(function(){p.style.display="block",p.setAttribute("aria-labelledby","modal-header")}));let a=document.createElement("div");a.className="contact-div";let u=document.createElement("div");u.className="contact-div-button";let m=document.createElement("div");m.className="contact-text";let f=V("h1",{class:"artist-name artist-name-contact"});f.innerHTML=n.name;let E=document.createElement("p"),k=V("span",{class:"artist-location"});k.innerHTML=n.city+", "+n.country;let C=V("span",{class:"artist-tagline"});C.innerHTML="<br>"+n.tagline;let L,w=V("ul",{class:"main-navbar-list artist-tags"});if(n.tags.forEach((e=>{let t=e;"sports"===e&&(t="sport");let n=document.createElement("li"),r=document.createElement("a");r.setAttribute("href","tags.html?tag="+t),r.setAttribute("aria-label",t),r.innerHTML="#"+t,w.appendChild(n),n.appendChild(r)})),d.appendChild(r),d.appendChild(a),a.appendChild(u),a.appendChild(m),u.appendChild(l),m.appendChild(f),m.appendChild(E),E.appendChild(k),E.appendChild(C),m.appendChild(w),L=n.name.split(" ")[0],L.split("-").length>1){let e=L.split("-")[0];for(var I=1;I<=L.split("-").length-1;I++)e+=" "+L.split("-")[I];L=e}var B=t.media;let T=[];B.forEach((e=>{e.photographerId==o&&T.push(e)})),T=function(e,t){let n="titre"==t?1:-1,r="titre"==t?-1:1,i="likes";return"date"==t?i="date":"titre"==t&&(i="title"),e.sort(((e,t)=>e[i]>t[i]?n:r))}(T,e),T.forEach((e=>{let t=document.createElement("div");t.className="media-card media-card-page-display";let n=document.createElement("div");n.setAttribute("aria-label",e.title),n.className="image-container",n.addEventListener("click",(function(){let t=T.findIndex((t=>t==e));function n(){if(T[t].image){g.firstElementChild&&g.removeChild(g.firstElementChild);let e="./images/"+L+"/"+T[t].image;g.setAttribute("style",`background-image: url(${e.replace(" ","%20")});`),g.setAttribute("aria-label",T[t].title)}else if(T[t].video){let e=V("source",{src:"./images/"+L+"/"+T[t].video,type:"video/mp4"}),n=V("video",{preload:"auto",controls:!0,class:"photographer-image"});n.setAttribute("style","background: black;"),n.appendChild(e),g.setAttribute("aria-label",T[t].title),g.appendChild(n)}b.innerHTML=T[t].title}h.style.display="flex",n(),y.addEventListener("click",(function(){0==t?t=T.length-1:t--,n()})),v.addEventListener("click",(function(){t==T.length-1?t=0:t++,n()}))})),c.appendChild(t);let r=t.clientWidth,i=r;if(e.image){let l="./images/"+L+"/"+e.image;n.setAttribute("style",`background-image: url(${l.replace(" ","%20")}); width: ${r}px; height: ${i}px`),window.addEventListener("resize",(function(){r=t.clientWidth,i=r,n.setAttribute("style",`background-image: url(${l.replace(" ","%20")}); width: ${r}px; height: ${i}px`)}))}else if(e.video){let l=V("source",{src:"./images/"+L+"/"+e.video,type:"video/mp4"}),a={preload:"auto",controls:!0,class:"photographer-image"};window.addEventListener("resize",(function(){r=t.clientWidth,i=r,o.setAttribute("style",`background: black; width: ${r}px; height: ${i}px`)}));let o=V("video",a);o.appendChild(l),n.appendChild(o),o.setAttribute("style",`background: black ; width: ${r}px; height: ${i}px`)}let l=document.createElement("div");l.className="banner-media";let a=document.createElement("h3");a.innerHTML=e.title;let o=document.createElement("div");o.innerHTML=e.likes+" ";let d=V("i",P);t.appendChild(n),t.appendChild(l),l.appendChild(a),l.appendChild(o),o.appendChild(d)}))})).catch((e=>{console.log("erreur survenue",e)}))}function V(e,t){let n=document.createElement(e);for(const e in t)n.setAttribute(e,t[e]);return n}O.addEventListener("click",(function(e){W(e,A,w,$),W(e,x,I,$),W(e,M,B,H),W(e,j,T,$)})),D(),l.e(927).then(l.t.bind(l,927,19)).then((e=>{const t=e.photographers.find((e=>e.id==o));console.log(t);let n=V("i",P),r=document.createElement("div"),i=0;var l=e.media;let a=[];l.forEach((e=>{e.photographerId==o&&a.push(e)})),a.forEach((e=>{i+=e.likes})),console.log(a),r.innerHTML=i+" ";let d=document.createElement("div");d.innerHTML=t.price+"€ / jour",u.appendChild(r),r.appendChild(n),u.appendChild(d)})).catch((e=>{console.log("erreur survenue dans belowElements"+e)})),E.addEventListener("click",(function(){E.style.display="none",C.style.display="block"})),L.forEach((e=>{e.addEventListener("click",(function(){D(e.value),k.innerText=e.innerText,C.style.display="none",E.style.display="block"}))}))})();