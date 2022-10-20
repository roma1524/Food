import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";

window.addEventListener("DOMContentLoaded", () => {

  // Tabs

  tabs();

  // Timer

  timer();

  // Modal

  modal('[data-modal]', '.modal');

  // Add menu item in html (OOP)

  cards();

  // Forms

  forms();

  // Slider and pagination

  slider();

  // Calculating

  calc();

});