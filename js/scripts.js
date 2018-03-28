const slider = document.querySelector('.about__slider');
const sliderButtons = [...slider.querySelectorAll('.about__switch')];
const slides = [...slider.querySelectorAll('.about__slide')];
let touchstartX = 0;
let touchendX = 0;

if (slider && sliderButtons && slides) {
    sliderButtons.forEach(button => button.addEventListener('click', slide));
    slider.addEventListener('touchstart', function(evt) {
        touchstartX = evt.screenX;
    });
    slider.addEventListener('touchend', function(evt) {
        touchendX = evt.screenX;
        handleSwipe();
    });
}

function slide() {
    sliderButtons.forEach(button => button.classList.remove('about__switch--active'));
    this.classList.add('about__switch--active');
    slides.forEach(slide => slide.classList.add('about__slide--hidden'));
    slides[sliderButtons.indexOf(this)].classList.remove('about__slide--hidden');
}

function handleSwipe() {
    var index = 0;
    if (touchstartX > touchendX) {
        sliderButtons.forEach(button => function() {
            if (button.classList.contains('about__switch--active')) {
                index = sliderButtons.indexOf(this);
            }
        });
        if (index < sliderButtons.length - 1) {
            sliderButtons[index].classList.remove('about__switch--active');
            sliderButtons[index + 1].classList.add('about__switch--active');
            slides[index].classList.add('about__slide--hidden');
            slides[index + 1].classList.remove('about__slide--hidden');
        }
    }

    if (touchstartX < touchendX) {
        sliderButtons.forEach(button => function() {
            if (button.classList.contains('about__switch--active')) {
                index = sliderButtons.indexOf(this);
            }
        });
        if (index > 0) {
            sliderButtons[index].classList.remove('about__switch--active');
            sliderButtons[index - 1].classList.add('about__switch--active');
            slides[index].classList.add('about__slide--hidden');
            slides[index - 1].classList.remove('about__slide--hidden');
        }
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const statsWindow = document.querySelector('.about__statistics');
const statistics = [...document.querySelectorAll('.about__statistics-number')];
let alreadyDone = false;

function counting(el) {
    const item = el;
    const num = parseInt(item.innerHTML);
    let i = 0;
    const inter = setInterval(function() {
        if (i <= num) {
            item.innerHTML = i;
        }
        i++;
    }, 2);
}

function getOffsetRect(el) {
    let box = el.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

window.addEventListener('scroll', function() {
    if (statistics && statsWindow) {
        if (getOffsetRect(statsWindow).top + statsWindow.offsetHeight / 2 < window.innerHeight + window.pageYOffset && !alreadyDone) {
            statistics.forEach(counting);
            alreadyDone = true;
        }
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~