export default function calc() {

  const result = document.querySelector('.calculating__result span');
  let sex = localStorage.getItem('sex') ? +localStorage.getItem('sex') : localStorage.setItem('sex', 'female'),
    height,
    weight,
    age,
    ratio = localStorage.getItem('ratio') ? +localStorage.getItem('ratio') : localStorage.setItem('ratio', '1.375');

  sex = localStorage.getItem('sex');
  ratio = localStorage.getItem('ratio');

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
      el.classList.remove(activeClass);
      if (el.getAttribute('id') === localStorage.getItem('sex')) {
        el.classList.add(activeClass);
      }
      if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        el.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-ratio')) {
          ratio = +event.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = event.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        elements.forEach(el => {
          el.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.boxShadow = '0px 6px 15px rgba(255, 33, 33, 0.5)';
        console.log('ww')
      } else {
        input.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
      }

      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  };

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

};