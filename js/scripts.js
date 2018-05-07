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

const aboutSliderCurrentSlide = () =>  {
    let currentSlide = 0;
    sliderAboutButtons.forEach((button) => {
        if(button.classList.contains('about__switch--active')) {
            currentSlide = sliderAboutButtons.indexOf(button);
        }
    });
    slideTimer(currentSlide);
}

let aboutSliderTimer = setTimeout(aboutSliderCurrentSlide, 8000);

function slide() {
    clearTimeout(aboutSliderTimer);
    sliderAboutButtons.forEach(button => button.classList.remove('about__switch--active'));
    this.classList.add('about__switch--active');
    slidesAbout.forEach(slide => slide.classList.add('about__slide--hidden'));
    slidesAbout[sliderAboutButtons.indexOf(this)].classList.remove('about__slide--hidden');
    aboutSliderTimer = setTimeout(aboutSliderCurrentSlide, 8000);
}

function slideTimer(slideIndex) {
    clearTimeout(aboutSliderTimer);
    sliderAboutButtons.forEach(button => button.classList.remove('about__switch--active'));
    slidesAbout.forEach(slide => slide.classList.add('about__slide--hidden'));
    if(slideIndex < sliderAboutButtons.length-1) {
        sliderAboutButtons[slideIndex+1].classList.add('about__switch--active');
        slidesAbout[slideIndex+1].classList.remove('about__slide--hidden');
    }
    else {
        sliderAboutButtons[0].classList.add('about__switch--active');
        slidesAbout[0].classList.remove('about__slide--hidden');
    }
    aboutSliderTimer = setTimeout(aboutSliderCurrentSlide, 8000);
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
const videoSrc = ['https://www.youtube.com/embed/09JKksaAM-Y?enablejsapi=1&widgetid=1', 'https://www.youtube.com/embed/Q_q4gdOfctg', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/414747102&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'];
let playerWindow = document.getElementById('player');
const portfolioLink = document.getElementById('portfolio-link');
const videos = [
    {
        title: 'YouTube',
        src: 'https://www.youtube.com/embed/09JKksaAM-Y?enablejsapi=1&widgetid=1'
    },

    {
        title: 'YouTube',
        src: 'https://www.youtube.com/embed/Q_q4gdOfctg'
    },
    {
        title: 'SoundCloud',
        src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/414747102&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
    },
    {
        title: 'Null',
        src: null
    }
];

// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/player_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// function onYouTubePlayerAPIReady() {
//     player = new YT.Player('player', {
//         height: '357',
//         width: '636',
//         videoId: 'Rs1UrDFGEG4'
//     });
//     player.getIframe().src = videoSrc[0];
//     playerWindow = document.getElementById('player');
// }

player = document.createElement('iframe');
player.id = 'iframe';
player.frameborder = '0';
player.allowfullscreen='1';
player.allow='autoplay; encrypted-media';
player.title='YT player';
player.width = '636';
player.height='357';
player.src= videos[0].src;
player.style.border='0';
playerWindow.appendChild(player);

function playerSlide(list, index) {
    if(playerWindow.firstChild)
        playerWindow.removeChild(playerWindow.firstChild);
    player = document.createElement('iframe');
    player.id = 'iframe';
    player.width = '636';
    player.height='357';
    player.src= list[index].src;
    player.style.border='0';
    switch(list[index].title) {
        case 'YouTube':
            player.allowfullscreen='1';
            player.frameborder = '0';
            player.allow='autoplay; encrypted-media';
            player.title='YT player';
            playerWindow.appendChild(player);
            break;
        case 'SoundCloud':
            player.scrolling='no';
            player.frameborder = 'no';
            player.allow='autoplay';
            player.title='SoundCloud player'
            playerWindow.appendChild(player);
            break;
        case 'Null':
            portfolioLink.classList.remove('portfolio__minus-link--hidden');
            break;
    }
    if(list[index].title != 'Null') {
        portfolioLink.classList.add('portfolio__minus-link--hidden');
    }
}

buttonsPortfolio.forEach(button => button.addEventListener('click', () => {
    var current;
    slidesPortfolio.forEach(slide => {
        if(!slide.classList.contains('portfolio__slide--hidden')) {
            current = slidesPortfolio.indexOf(slide);
        } 
    });
    
    if (button.classList.contains('portfolio__button--prev') && current != 0) {
        slidesPortfolio.forEach(slide => slide.classList.add('portfolio__slide--hidden'));
        slidesPortfolio[current - 1].classList.remove('portfolio__slide--hidden');
        // player.getIframe().src = videoSrc[current-1] || videoSrc[0];
        playerSlide(videos, current-1);
    }
    if (button.classList.contains('portfolio__button--next') && current < slidesPortfolio.length - 1) {
        slidesPortfolio.forEach(slide => slide.classList.add('portfolio__slide--hidden'));
        slidesPortfolio[current + 1].classList.remove('portfolio__slide--hidden');
        // player.getIframe().src = videoSrc[current+1] || videoSrc[0];
        playerSlide(videos, current+1);

    }
}));


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const footerSectionButton = [...document.querySelectorAll('.footer__sections-control')];
const footerContent = [...document.querySelector('.footer__content').children];

footerSectionButton.forEach(button => button.addEventListener('click', () => {
    footerSectionButton.forEach(active => active.classList.remove('footer__sections-control--active'));
    const currentButton = footerSectionButton.indexOf(button);
    button.classList.add('footer__sections-control--active');

    footerContent.forEach(block => {
        block.classList.add(block.classList[0]+'--hidden');
    });
    footerContent[currentButton].classList.remove([...footerContent[currentButton].classList].slice(-1));
}));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Отзывы

const reviewButtons = [...document.querySelectorAll('.reviews__button')];
const reviewSlides = [...document.querySelectorAll('.reviews__item')];
const reviewPages = [...document.querySelectorAll('.reviews__page')];

reviewButtons.forEach(button => button.addEventListener('click', () => {
    let current = 0;
    reviewSlides.forEach(slide => {
        if (slide.classList.contains('reviews__item--visible')) {
            current = reviewSlides.indexOf(slide);
    }

    });
    if(button.classList.contains('reviews__button--left') && current > 0) {
        reviewSlides.forEach(slide => slide.classList.remove('reviews__item--visible'));
        reviewSlides[current-1].classList.add('reviews__item--visible');
        reviewPages.forEach(page => page.classList.remove('reviews__page--active'));
        reviewPages[current-1].classList.add('reviews__page--active');
    } else if(button.classList.contains('reviews__button--left') && current === 0) {
        reviewSlides.forEach(slide => slide.classList.remove('reviews__item--visible'));
        reviewSlides[reviewSlides.length-1].classList.add('reviews__item--visible');
        reviewPages.forEach(page => page.classList.remove('reviews__page--active'));
        reviewPages[reviewSlides.length-1].classList.add('reviews__page--active');
    } else if(button.classList.contains('reviews__button--right') && current < reviewSlides.length-1) {
        reviewSlides.forEach(slide => slide.classList.remove('reviews__item--visible'));
        reviewSlides[current+1].classList.add('reviews__item--visible');
        reviewPages.forEach(page => page.classList.remove('reviews__page--active'));
        reviewPages[current+1].classList.add('reviews__page--active');
    } else {
        reviewSlides.forEach(slide => slide.classList.remove('reviews__item--visible'));
        reviewSlides[0].classList.add('reviews__item--visible');
        reviewPages.forEach(page => page.classList.remove('reviews__page--active'));
        reviewPages[0].classList.add('reviews__page--active');
    }
}));


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const orderForm = document.getElementById('order-form');

function serialize (form) {
    if (!form || form.nodeName !== "FORM") {
            return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        }                                               
                        break;
                }
                break;
                case 'file':
                break; 
            case 'TEXTAREA':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
            }
        }
    return q.join("&");
}

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let error = false;
    const formData = new FormData(orderForm);

    const request = new XMLHttpRequest();
    request.onReadyStateChange = function() {
        console.log(request.responseText);
    }
    console.log(formData.get('attachfile'));
    request.open('POST', 'send3.php');
    request.send(formData);
    return false;
});