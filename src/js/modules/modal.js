function openModal(modalSelector, timerId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (timerId) {
    clearInterval(timerId);
  }
}

function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, timerId) {

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);


  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, timerId));
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModalWindow(modalSelector);
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModalWindow(modalSelector);
    }
  });


  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, timerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

};

export default modal;
export {openModal, closeModalWindow};