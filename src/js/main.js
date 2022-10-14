window.addEventListener("DOMContentLoaded", () => {

  // Tabs

  const tabContainer = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsHeaderItem = document.querySelectorAll('.tabheader__item');


  function hideTabContent() {
    tabsContent.forEach(el => {
      el.classList.add('display_hide');
      el.classList.remove('display_show', 'fade');
    })
    tabsHeaderItem.forEach(el => {
      el.classList.remove('tabheader__item_active');
    })
  };

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('display_show', 'fade');
    tabsContent[i].classList.remove('display_hide');
    tabsHeaderItem[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabsHeaderItem.forEach((el, i) => {
        if (target == el) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })

  // Timer

  const deadLine = '2022-10-18';

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date());

    if (t < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / (1000 / 60) % 60);
      seconds = Math.floor(t / 1000) % 60;
    }

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Вызываем первый раз вручную, чтобы избежать задержки таймера

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = t.days < 10 ? `0${t.days}` : t.days;
      hours.innerHTML = t.hours < 10 ? `0${t.hours}` : t.hours;
      minutes.innerHTML = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
      seconds.innerHTML = t.seconds < 10 ? `0${t.seconds}` : t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine);

  // Modal

  const btns = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');

  function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  btns.forEach(btn => {
    btn.addEventListener('click', openModal)
  })

  function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      closeModalWindow();
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  });

  const modalTimerId = setTimeout(openModal, 15000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // Add menu item in html (OOP)

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    });

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: "Success! We'll call you",
    failure: 'Something wrong'
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {'Content-type': 'application/json; charset=utf-8'},
      body: data
    });
    return await res.json();
  };

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;`
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()))  // Преобразуем объект FormData в формат JSON

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showMessage(message.success);
        }).catch(() => {
        showMessage(message.failure);
      }).finally(() => {
        form.reset();
        statusMessage.remove();
      })
    })
  }

  function showMessage(message) {
    const elementToHide = document.querySelector('.modal__dialog');

    elementToHide.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `<div class='modal__content'>
                              <div class="modal__close" data-close>X</div>
                              <div class="modal__title">${message}</div>
                              </div>`;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      elementToHide.classList.add('show');
      elementToHide.classList.remove('hide');
      closeModalWindow();
    }, 4000);
  }

  // Slider

  const slide = document.querySelectorAll('.offer__slide'),
    prevBtn = document.querySelector('.offer__slider-prev'),
    nextBtn = document.querySelector('.offer__slider-next'),
    currentSlid = document.querySelector('#current'),
    totalSlide = document.querySelector('#total');
  let slidIndex = 1;

  totalSlide.textContent = slide.length > 10 ? slide.length :`0${slide.length}`;

  showSlides(slidIndex);

  function showSlides(n) {
    if (n > slide.length) {
      slidIndex = 1;
    }
    if (n < 1) {
      slidIndex = slide.length;
    }

    slide.forEach(item => item.style.display = 'none');
    slide[slidIndex - 1].style.display = 'block';
    currentSlid.textContent = slidIndex > 10 ? slidIndex :`0${slidIndex}`;
  }

  function changeSlide(n) {
    showSlides(slidIndex += n);
  }

  prevBtn.addEventListener('click', () => {
    changeSlide(-1);
  });
  nextBtn.addEventListener('click', () => {
    changeSlide(1);
  });
});