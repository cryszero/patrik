const sliderAbout = document.querySelector('.about__slider');
const sliderAboutButtons = [...sliderAbout.querySelectorAll('.about__switch')];
const slidesAbout = [...sliderAbout.querySelectorAll('.about__slide')];
let touchstartX = 0;
let touchendX = 0;

if (sliderAbout && sliderAboutButtons && slidesAbout) {
    sliderAboutButtons.forEach(button => button.addEventListener('click', slide));
    sliderAbout.addEventListener('touchstart', function(evt) {
        touchstartX = evt.touches[0].screenX;
    }, { passive: true });
    sliderAbout.addEventListener('touchend', function(evt) {
        touchendX = evt.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function slide() {
    sliderAboutButtons.forEach(button => button.classList.remove('about__switch--active'));
    this.classList.add('about__switch--active');
    slidesAbout.forEach(slide => slide.classList.add('about__slide--hidden'));
    slidesAbout[sliderAboutButtons.indexOf(this)].classList.remove('about__slide--hidden');
}

function handleSwipe() {
    var index = 0;
    sliderAboutButtons.forEach(button => {
        if (button.classList.contains('about__switch--active')) {
            index = sliderAboutButtons.indexOf(button);
        }
    });
    if (touchstartX > touchendX) {

        if (index < sliderAboutButtons.length - 1) {
            sliderAboutButtons[index].classList.remove('about__switch--active');
            sliderAboutButtons[index + 1].classList.add('about__switch--active');
            slidesAbout[index].classList.add('about__slide--hidden');
            slidesAbout[index + 1].classList.remove('about__slide--hidden');
        }
    } else if (touchstartX < touchendX) {
        if (index > 0) {
            sliderAboutButtons[index].classList.remove('about__switch--active');
            sliderAboutButtons[index - 1].classList.add('about__switch--active');
            slidesAbout[index].classList.add('about__slide--hidden');
            slidesAbout[index - 1].classList.remove('about__slide--hidden');
        }
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const statsWindow = document.querySelector('.about__statistics');
const statistics = [...document.querySelectorAll('.about__statistics-number')];

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


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

window.addEventListener('scroll', function statics(evt) {
    if (statistics && statsWindow) {
        if (getOffsetRect(statsWindow).top + statsWindow.offsetHeight / 2 < window.innerHeight + window.pageYOffset) {
            statistics.forEach(counting);
            window.removeEventListener('scroll', statics);
        }
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sliderPortfolio = document.querySelector('.portfolio__slider');
const slidesPortfolio = [...sliderPortfolio.querySelectorAll('.portfolio__slide')];
const buttonsPortfolio = sliderPortfolio.querySelectorAll('.portfolio__button');

buttonsPortfolio.forEach(button => button.addEventListener('click', () => {
    var current;
    slidesPortfolio.forEach(slide => slide.classList.contains('portfolio__slide--hidden') ? console.log('GOVNO') : current = slidesPortfolio.indexOf(slide));
    if (button.classList.contains('portfolio__button--prev') && current != 0) {
        slidesPortfolio.forEach(slide => slide.classList.add('portfolio__slide--hidden'));
        slidesPortfolio[current - 1].classList.remove('portfolio__slide--hidden');
    }
    if (button.classList.contains('portfolio__button--next') && current < slidesPortfolio.length - 1) {
        slidesPortfolio.forEach(slide => slide.classList.add('portfolio__slide--hidden'));

        slidesPortfolio[current + 1].classList.remove('portfolio__slide--hidden');
    }
    console.log(current);
}));

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '357',
        width: '636',
        videoId: 'bFj0TPcNkJY'
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~