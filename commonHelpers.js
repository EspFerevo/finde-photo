import{S as c,i}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();async function l(t){const n=`https://pixabay.com/api/?key=43322409-71cdbf6ef8f62fb1f69ac5609&q=${t}&image_type=photo&orientation=horizontal&safesearch=true`,s=await fetch(n);if(!s.ok)throw new Error("Network response was not ok");return s.json()}const d=new c("#gallery .image-card",{captionsData:"alt",captionsPosition:"bottom",captionDelay:250});async function m(t){const r=document.getElementById("gallery"),n=await Promise.all(t.map(async s=>await u(s)));r.append(...n),d.refresh()}async function u(t){const r=`
    <a class="image-card" href="${t.largeImageURL}">
      <img src="${t.webformatURL}" alt="${t.tags}">
      <div class="metadata-container">
        <p>Likes: ${t.likes}</p>
        <p>Views: ${t.views}</p>
        <p>Comments: ${t.comments}</p>
        <p>Downloads: ${t.downloads}</p>
      </div>
    </a>
  `,n=document.createElement("div");return n.innerHTML=r,n.firstElementChild}document.getElementById("search-form").addEventListener("submit",async function(t){t.preventDefault();const r=document.getElementById("search-input").value.trim();if(r===""){i.error({title:"Error",message:"Please enter a search keyword."});return}const n=document.getElementById("gallery");n.innerHTML="",document.getElementById("search-input").value="";const s=document.getElementById("loader");s.style.display="block";try{const e=await l(r);if(e.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");m(e.hits)}catch(e){i.error({title:"Error",message:e.message})}finally{s.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
