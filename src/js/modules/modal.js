function openModal(modalSelector, timerId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (timerId) {
    clearInterval(modalTimerId);
  }
}

function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
  document.body.style.overflow = '';
}

export default function modal(triggerSelector, modalSelector) {

  const btns = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);


  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(modalSelector)
    });
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      closeModalWindow(modalSelector);
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModalWindow(modalSelector);
    }
  });

  const modalTimerId = setTimeout(openModal, 15000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

};

export {openModal, closeModalWindow};