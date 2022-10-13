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

  const deadLine = '2022-10-14';

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

  class MenuItems {
    constructor(container = '.menu__field .container') {
      this.container = container;
      this.menuItemsArr = [];
      this._fetchMenu();
      this.render()
    }

    _fetchMenu() {
      this.menuItemsArr = [
        {
          imgScr: 'img/tabs/vegy.jpg',
          title: 'Меню "Фитнес',
          alt: 'vegy',
          description: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих 
            овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой 
            и высоким качеством!`,
          price: '229'
        },
        {
          imgScr: 'img/tabs/elite.jpg',
          title: 'Меню “Премиум”',
          alt: 'elite',
          description: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
          качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в
          ресторан!`,
          price: '550'
        },
        {
          imgScr: 'img/tabs/post.jpg',
          title: 'Меню “Премиум”',
          alt: 'post',
          description: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
          продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество
          белков за счет тофу и импортных вегетарианских стейков.`,
          price: '430'
        }
      ]
    }

    render() {
      const menuItemContainer = document.querySelector(this.container);

      this.menuItemsArr.forEach(item => {
        const element = new ItemMenu(item);

        menuItemContainer.innerHTML += element.render();
      })
    }
  }

  class ItemMenu {
    constructor({imgScr, title, description, price, alt}) {
      this.imgSrc = imgScr;
      this.title = title;
      this.description = description;
      this.price = price;
      this.alt = alt;
    }

    render() {
      return `<div class="menu__item">
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`
    }
  }

  new MenuItems();

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: "Success! We'll call you",
    failure: 'Something wrong'
  };

  forms.forEach(form => {
    postData(form);
  })

  function postData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;`
      form.insertAdjacentElement('afterend', statusMessage);


      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const dataToJson = JSON.stringify(object)

      request.send(dataToJson);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showMessage(message.success);
          statusMessage.remove();
          form.reset();
        } else {
          showMessage(message.failure);
          statusMessage.remove();
          form.reset();
        }
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
});