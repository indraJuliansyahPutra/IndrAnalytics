import { initHamburgerMenu } from './hamburgerMenu.js';
import { initRefresh } from './refresh.js';
import { initTypewriter } from './typeWriter.js';
import { initLoadMoreProjects } from './loadMoreProjects.js';
import { slideCertificate } from './slideCertificate.js';
import { initModalsProject } from './modalsProject.js';
import { removeSections } from './sections.js';
import { faqAnswer } from './faqAnswer.js';

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initRefresh();
  initTypewriter();
  initLoadMoreProjects();
  slideCertificate();
  initModalsProject();
  removeSections();
  faqAnswer();
});
