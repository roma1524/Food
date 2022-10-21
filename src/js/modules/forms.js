import {openModal, closeModalWindow} from "./modal";
import {postData} from "../services/services";

export default function forms(formSelector, timerId) {

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: "Success! We'll call you",
    failure: 'Something wrong'
  };

  forms.forEach(form => {
    bindPostData(form);
  });

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
    openModal('.modal', timerId);

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
      closeModalWindow('.modal');
    }, 4000);
  }

};