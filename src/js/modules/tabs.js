export default function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabContainer = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsHeaderItem = document.querySelectorAll(tabsSelector);


  function hideTabContent() {
    tabsContent.forEach(el => {
      el.classList.add('display_hide');
      el.classList.remove('display_show', 'fade');
    })
    tabsHeaderItem.forEach(el => {
      el.classList.remove(activeClass);
    })
  };

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('display_show', 'fade');
    tabsContent[i].classList.remove('display_hide');
    tabsHeaderItem[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabsHeaderItem.forEach((el, i) => {
        if (target == el) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  });
};