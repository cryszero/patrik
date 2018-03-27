const sliderButtons = [...document.querySelectorAll('.about__switch')];
const slides = [...document.querySelectorAll('.about__slide')];

if(sliderButtons && slides) {
sliderButtons.forEach(button => button.addEventListener('click', function() {
		sliderButtons.forEach(button => button.classList.remove('about__switch--active'));
		this.classList.add('about__switch--active');
		slides.forEach(slide => slide.classList.add('about__slide--hidden'));
		slides[sliderButtons.indexOf(this)].classList.remove('about__slide--hidden');
}));
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const statistics = [...document.querySelectorAll('.about__statistics-number')];

	function counting(el) {
		const item = el;
		const num = parseInt(item.innerHTML);
		var i = 0;
		const inter = setInterval(function(){
			if(i < num) {
			item.innerHTML = i;
			}
			i++;
		}, 2);
	}

	if(statistics) {
		statistics.forEach(counting);
	}