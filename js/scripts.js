const sliderButtons = [...document.querySelectorAll('.about__switch')];
const slides = [...document.querySelectorAll('.about__slide')];

if (sliderButtons && slides) {
    sliderButtons.forEach(button => button.addEventListener('click', function() {
        sliderButtons.forEach(button => button.classList.remove('about__switch--active'));
        this.classList.add('about__switch--active');
        slides.forEach(slide => slide.classList.add('about__slide--hidden'));
        slides[sliderButtons.indexOf(this)].classList.remove('about__slide--hidden');
    }));
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
        if (getOffsetRect(statsWindow).top + statsWindow.offsetHeight/2 < window.innerHeight + window.pageYOffset && !alreadyDone) {
            statistics.forEach(counting);
            alreadyDone = true;
        }
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~