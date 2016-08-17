var active = 0;
var news_title_container = null;
var news_content_container = null;
var slideIndex = 1;

function removeNews(active){
	var li = news_title_container.children[active];
	var li_a = li.children[0];
	li_a.classList.remove("news_active");

	var dl = news_content_container.children[active];
	dl.style.display = "none";
}

function diplayNews(active){
	var li = news_title_container.children[active];
	var li_a = li.children[0];
	li_a.classList.add("news_active");

	var dl = news_content_container.children[active];
	dl.style.display = "inline-block";
}

function newsAnimation(){
	removeNews(active);
	if (active < news_title_container.children.length -1 ) {
		active++;
	}else{
		active = 0;
	}
	diplayNews(active);
}

function choiceNews(event){
	var li = event.target;
	var i ;
	for(i = 0;i<news_title_container.children.length;i++){
		if (news_title_container.children[i] === li) {
			removeNews (active);
			active = i;
			diplayNews(active);
		}
	}
}

/*
	slider
*/
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;} 
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

// function autoShowSlides() {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"; 
//     }
//     slideIndex++;
//     if (slideIndex> slides.length) {slideIndex = 1} 
//     slides[slideIndex-1].style.display = "block"; 
//     setTimeout(showSlides, 2000); // Change image every 2 seconds
// }

function init(){
	news_title_container = document.getElementById('news_title');
	news_content_container = document.getElementById('news_content');
	news_title_container.addEventListener('mouseover',choiceNews,false);
	setInterval(newsAnimation,3000);

	showSlides(slideIndex);
}

