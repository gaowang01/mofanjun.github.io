function removeNews(e){var n=news_title_container.children[e],t=n.children[0];t.classList.remove("news_active");var i=news_content_container.children[e];i.style.display="none"}function diplayNews(e){var n=news_title_container.children[e],t=n.children[0];t.classList.add("news_active");var i=news_content_container.children[e];i.style.display="inline-block"}function newsAnimation(){removeNews(active),active<news_title_container.children.length-1?active++:active=0,diplayNews(active)}function choiceNews(e){var n=e.target,t;for(t=0;t<news_title_container.children.length;t++)news_title_container.children[t]===n&&(removeNews(active),active=t,diplayNews(active))}function showSlides(e){var n,t=document.getElementsByClassName("mySlides"),i=document.getElementsByClassName("dot");for(e>t.length&&(slideIndex=1),1>e&&(slideIndex=t.length),n=0;n<t.length;n++)t[n].style.display="none";for(n=0;n<i.length;n++)i[n].className=i[n].className.replace("active","");t[slideIndex-1].style.display="block",i[slideIndex-1].className+=" active"}function plusSlides(e){showSlides(slideIndex+=e)}function currentSlide(e){showSlides(slideIndex=e)}function init(){news_title_container=document.getElementById("news_title"),news_content_container=document.getElementById("news_content"),news_title_container.addEventListener("mouseover",choiceNews,!1),setInterval(newsAnimation,3e3),showSlides(slideIndex)}var active=0,news_title_container=null,news_content_container=null,slideIndex=1;