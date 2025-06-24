export function initLoadMoreProjects() {
  const loadMoreBtn = document.getElementById('load-more');
  const projectCards = document.querySelectorAll('.project-card');
  if (!loadMoreBtn || projectCards.length === 0) return;

  let isExpanded = false;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function setInitialProjects() {
    projectCards.forEach((card, index) => {
      if (isMobile()) {
        if (index > 0) card.classList.add('hidden');
        else card.classList.remove('hidden');
      } else {
        if (index > 2) card.classList.add('hidden');
        else card.classList.remove('hidden');
      }
    });
  }

  function toggleProjects() {
    if (!isExpanded) {
      projectCards.forEach(card => card.classList.remove('hidden'));
      loadMoreBtn.textContent = 'Show Less';
      isExpanded = true;
    } else {
      setInitialProjects();
      loadMoreBtn.textContent = 'Load More';
      isExpanded = false;
    }
  }

  loadMoreBtn.addEventListener('click', toggleProjects);

  setInitialProjects();

  window.addEventListener('resize', () => {
    if (!isExpanded) setInitialProjects();
  });
}
