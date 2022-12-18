let position = 0;
let slidesToShow = 3;
let currentSlide = 0;
const slidesCount = 9;
const slideMargin = 40;
const slides = [
    {
        img: './img/slider1.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: 'Increasing Prosperity With Positive Thinking'
    },
    {
        img: './img/slider2.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: 'Motivation Is The First Step To Success'
    },
    {
        img: './img/slider3.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: 'Success Steps For Your Personal Or Business Lif'
    },
    {
        img: './img/slider1.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '4 slide'
    },
    {
        img: './img/slider2.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '5 slide'
    },
    {
        img: './img/slider3.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '6 slide'
    },
    {
        img: './img/slider1.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '7 slide'
    },
    {
        img: './img/slider2.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '8 slide'
    },
    {
        img: './img/slider3.png',
        alt: 'Slide',
        authorText: `By <span>Abdullah</span> 03 March 2019`,
        titleText: '9 slide'
    },
];

// при изменении размера экрана, каждый раз доходя до определенной отметки размера экрана в медиа заросе
// изменять это значение
// и потом при очередном изменении экрана смотреть, если текущее значение не сильно отличается, то ничего не делать
// это нужно будет чтобы не пришлось при изменении размера экрана хотя бы на пиксел отрисовывать заново все блоки
let controlPoint = 0;
const controlPoints = [1160, 768];

function getStrategiesInnerBlock() {
    return document.querySelector('.strategies__inner');
}

function createDivWithClassName(...classList) {
    const div = document.createElement('div');
    if (classList.length) {
        div.classList.add(...classList);
    }
    return div;
}

function createSlide(slideData) {
    const slideBlock = createDivWithClassName('slide');
    const slideContent = `
        <div class="slide__header">
            <img src="${slideData.img}" alt="${slideData.alt}">
        </div>
        <div class="slide__info">
            <div class="slide__author">${slideData.authorText}</div>
            <div class="slide__title">${slideData.titleText}</div>
        </div>
    `;

    slideBlock.insertAdjacentHTML('afterbegin', slideContent);
    return slideBlock;
}

function createSlider() {
    const slider = createDivWithClassName('slider');
    const sliderTrack = createDivWithClassName('slider__track');
    slider.appendChild(sliderTrack);
    return slider;
}

function renderSlider() {
    const strategiesInnerBlock = getStrategiesInnerBlock();
    const slider = createSlider();
    const sliderTrack = slider.getElementsByClassName('slider__track')[0];

    for (const slide of slides) {
        sliderTrack.appendChild(createSlide(slide));
    }

    strategiesInnerBlock.appendChild(slider);
}

function createDotButtonsGroupBlock() {
    return createDivWithClassName('button-group', 'flex', 'align-items-center', 'justify-content-center');
}

function createDotButton(dotNumber) {
    const btnBlock = createDivWithClassName('btn-dot');
    btnBlock.setAttribute('data-dot', dotNumber);
    btnBlock.addEventListener('click', () => changeSlide(dotNumber));
    return btnBlock;
}

function renderDotButtons() {
    const groupButtonsBlock = createDotButtonsGroupBlock();
    const strategiesInnerBlock = getStrategiesInnerBlock();
    const dotCount = slidesCount / slidesToShow;

    for (let i = 0; i < dotCount; i++) {
        groupButtonsBlock.appendChild(createDotButton(i));
    }

    strategiesInnerBlock.appendChild(groupButtonsBlock);
}

function changeSlide(slideNumber) {
    changeActiveDot(slideNumber);
    scrollSliderTrack(slideNumber);
    currentSlide = slideNumber;
}

function changeActiveDot(slideNumber) {
    const buttons = document.getElementsByClassName('btn-dot');
    for (const btn of buttons) {
        if (+btn.getAttribute('data-dot') === slideNumber) {
            btn.classList.add('btn-dot-active');
        } else {
            btn.classList.remove('btn-dot-active');
        }
    }
}

function scrollSliderTrack(slideNumber) {
    const slide = document.querySelector('.slide');
    const slideWidth = slide.clientWidth;
    const sliderTrack = document.querySelector('.slider__track');
    const sliderTrackWidth = sliderTrack.clientWidth;

    if (slideNumber === currentSlide) {
        return;
    } else if (slideNumber === 0) {
        position = 0;
    } else {
        position = -(slideNumber * (slideWidth * slidesToShow + (slideMargin * (slidesToShow - 1))));
    }

    moveSlider(sliderTrack);
}

function moveSlider(sliderTrack) {
    sliderTrack.style.transform = `translateX(${position}px)`;
}

function windowResizeHandler() {
    window.addEventListener('resize', e => {
        const innerWidth = e.target.innerWidth;

        if (controlPoints.includes(innerWidth)) {
            console.log('here')
            controlPoint = controlPoints.find(i => i === innerWidth);
            console.log(controlPoint)
        }

        // if (innerWidth > 1160) {
        //     return;
        // }
        //
        // if (innerWidth > 768 && innerWidth < controlPoint) {
        //     return;
        // }
        //
        // if (innerWidth <= 1160) {
        //     console.log('here');
        //     controlPoint = innerWidth;
        //     slidesToShow = 2;
        //     deleteAllForSlider();
        //     renderAllForSlider();
        // }
    });
}

function deleteSlider() {
    const strategiesBlock = getStrategiesInnerBlock();
    strategiesBlock.querySelector('.slider').remove();
}

function deleteDotButtons() {
    const strategiesBlock = getStrategiesInnerBlock();
    strategiesBlock.querySelector('.button-group').remove();
}

function deleteAllForSlider() {
    deleteSlider();
    deleteDotButtons();
}

function renderAllForSlider() {
    renderSlider();
    renderDotButtons();
    changeActiveDot(currentSlide);
}

function main() {
    renderAllForSlider();
    windowResizeHandler();
}

main();

