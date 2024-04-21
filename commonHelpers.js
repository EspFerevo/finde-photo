import{S as l,i}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();function d(r){const n=`https://pixabay.com/api/?key=43322409-71cdbf6ef8f62fb1f69ac5609&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(n).then(e=>{if(!e.status)throw new Error("Network response was not ok");return e.json()})}const c=new l("#gallery .image-card",{captionsData:"alt",captionsPosition:"bottom",captionDelay:250});c.refresh();function u(r){const o=document.getElementById("gallery"),n=r.map(e=>f(e));o.append(...n),c.refresh()}function f(r){const o=`
    <a class="image-card" href="${r.largeImageURL}">
      <img src="${r.webformatURL}" alt="${r.tags}">
      <div class="metadata-container">
        <p>Likes: ${r.likes}</p>
        <p>Views: ${r.views}</p>
        <p>Comments: ${r.comments}</p>
        <p>Downloads: ${r.downloads}</p>
      </div>
    </a>
  `,n=document.createElement("div");return n.innerHTML=o,n.firstElementChild}document.getElementById("search-form").addEventListener("submit",function(r){r.preventDefault();const o=document.getElementById("search-input").value.trim();if(o===""){i.error({title:"Error",message:"Please enter a search keyword."});return}gallery.innerHTML="",document.getElementById("search-input").value="";const n=document.getElementById("loader");n.style.display="block",d(o).then(e=>{if(e.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return e.hits}).then(e=>{e.length!==0&&u(e)}).catch(e=>{i.error({title:"Error",message:e.message})}).finally(()=>{n.style.display="none"})});
//# sourceMappingURL=commonHelpers.js.map
