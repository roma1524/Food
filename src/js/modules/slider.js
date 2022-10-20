export default function slider() {

  const slides = document.querySelectorAll('.offer__slide'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    nextBtn = document.querySelector('.offer__slider-next'),
    currentSlid = document.querySelector('#current'),
    totalSlide = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slidIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '.5s all';
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => slide.style.width = width);

  function setZero() {
    if (slides.length > 10) {
      totalSlide.textContent = slides.length;
      currentSlid.textContent = slidIndex
    } else {
      totalSlide.textContent = `0${slides.length}`;
      currentSlid.textContent = `0${slidIndex}`;
    }
  }

  setZero();

  // ------------------------------------- Pagination-------------------------------------------------


  const divElement = document.createElement('div'),
    divElementParent = document.querySelector('.pagination');

  divElement.classList.add('pagination__wrapp');

  for (let i = 0; i < slides.length; i++) {
    (i == 0) ? divElement.innerHTML += `<span class='pagination_span active' data-slide-to=${i + 1}></span>` :
      divElement.innerHTML += `<span class='pagination_span' data-slide-to=${i + 1}></span>`;
  }

  divElementParent.append(divElement);

  const paginationDots = document.querySelectorAll('.pagination_span');

  paginationDots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to');
      slidIndex = slideTo;

      offset = parseInt(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      setZero();
      addActiveClassFromDots();
    })
  })

  function addActiveClassFromDots() {
    paginationDots.forEach(dot => dot.classList.remove('active'));
    paginationDots[slidIndex - 1].classList.add('active');
  }

  // ------------------------------------- Pagination-------------------------------------------------

  nextBtn.addEventListener('click', () => {
    (offset == parseInt(width) * (slides.length - 1)) ? offset = 0 : offset += parseInt(width);

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slidIndex == slides.length) {
      slidIndex = 1;
    } else {
      slidIndex += 1;
    }
    setZero();
    addActiveClassFromDots();
  })

  prevBtn.addEventListener('click', () => {
    (offset == 0) ? offset = parseInt(width) * (slides.length - 1) : offset -= parseInt(width);

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slidIndex == 1) {
      slidIndex = slides.length;
    } else {
      slidIndex -= 1;
    }
    setZero();
    addActiveClassFromDots();
  });

};