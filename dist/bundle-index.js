(()=>{var e,t,r,n={},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return n[e](r,r.exports,o),r.exports}o.m=n,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var a=Object.create(null);o.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var l=2&n&&r;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,o.d(a,i),a},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>"bundle-"+e+".js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},o.l=(e,t,n,a)=>{if(r[e])r[e].push(t);else{var i,l;if(void 0!==n)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var d=c[s];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")=="p6:"+n){i=d;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.setAttribute("data-webpack","p6:"+n),i.src=e),r[e]=[t];var u=(t,n)=>{i.onerror=i.onload=null,clearTimeout(p);var a=r[e];if(delete r[e],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(n))),t)return t(n)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=u.bind(null,i.onerror),i.onload=u.bind(null,i.onload),l&&document.head.appendChild(i)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e={826:0};o.f.j=(t,r)=>{var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,a)=>n=e[t]=[r,a]));r.push(n[2]=a);var i=o.p+o.u(t),l=new Error;o.l(i,(r=>{if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,n[1](l)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,a,[i,l,c]=r,s=0;for(n in l)o.o(l,n)&&(o.m[n]=l[n]);for(c&&c(o),t&&t(r);s<i.length;s++)a=i[s],o.o(e,a)&&e[a]&&e[a][0](),e[i[s]]=0},r=self.webpackChunkp6=self.webpackChunkp6||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();const i=document.querySelector(".section-artists"),l=document.querySelector(".main-navbar-redirection"),c=document.querySelectorAll(".tagLink"),s=window.location.search,d=new URLSearchParams(s).get("tag");c.forEach((e=>{e.innerText.toLowerCase()=="#"+d&&e.classList.add("main-navbar-list-clicked"),e.addEventListener("click",(function(t){e.innerText.toLowerCase()=="#"+d&&(t.preventDefault(),window.location="index.html")}))})),window.addEventListener("scroll",(function(){document.documentElement.scrollTop>10?l.style.display="block":l.style.display="none"})),function(e=d){o.e(927).then(o.t.bind(o,927,19)).then((t=>{t.photographers.forEach((t=>{for(var r=0;r<t.tags.length;r++)"sports"==t.tags[r]&&(t.tags[r]="sport");function n(){let e=document.createElement("div");e.setAttribute("aria-label","profil de "+t.name),e.className="card-artists";let r=document.createElement("a");r.setAttribute("href","photographer.html?id="+t.id),r.className="card-artists-link";let n=document.createElement("div");n.className="portrait-container",n.setAttribute("aria-label","portrait de "+t.name);let a="./images/Photographers%20ID%20Photos/"+t.portrait;n.setAttribute("style",`background-image: url(${a})`);let o=document.createElement("h2");o.innerHTML=t.name,o.className="artist-name";let l=document.createElement("p"),c=document.createElement("span");c.innerHTML=t.city+", "+t.country,c.className="artist-location";let s=document.createElement("span");s.innerHTML="<br>"+t.tagline,s.className="artist-tagline";let d=document.createElement("span");d.innerHTML="<br>"+t.price+"€/jour",d.className="artist-price";let u=document.createElement("ul");u.className="main-navbar-list artist-tags",t.tags.forEach((e=>{let t=e,r=document.createElement("li"),n=document.createElement("a");n.setAttribute("href","?tag="+t);let a=document.createElement("span");a.setAttribute("aria-label",t),a.innerHTML="#"+t,u.appendChild(r),r.appendChild(n),n.appendChild(a)})),i.appendChild(e),e.appendChild(r),r.appendChild(n),r.appendChild(o),e.appendChild(l),l.appendChild(c),l.appendChild(s),l.appendChild(d),e.appendChild(u)}if(null!==e)for(var a=0;a<t.tags.length;a++)t.tags[a]==d&&n();else null===e&&n()}))})).catch((e=>{console.log("erreur survenue"+e)}))}()})();