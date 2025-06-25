import { initHamburgerMenu } from './hamburgerMenu.js';
import { initTypewriter } from './typeWriter.js';
import { initLoadMoreProjects } from './loadMoreProjects.js';
import { slideCertificate } from './slideCertificate.js';
import { initModalsProject } from './modalsProject.js';

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initTypewriter();
  initLoadMoreProjects();
  slideCertificate();
  initModalsProject();
});