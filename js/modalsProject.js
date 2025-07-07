export function initModalsProject() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.close');
  const mainImage = document.getElementById('mainImage');
  const descriptionText = document.querySelector('.project-description');
  const viewProjectBtn = document.querySelector('.view-project');
  const closeModalBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  const projectData = {
    asl: {
      images: [
        'image/project/asl/step 1.png',
        'image/project/asl/step 2.png',
        'image/project/asl/step 3.png',
        'image/project/asl/step 4.png'
      ],
      description: 'Deteksi gesture tangan Bahasa Isyarat Amerika menggunakan MediaPipe dan Python.',
      github: 'https://github.com/indraJuliansyahPutra/ASL-Hand-Gesture' // ganti sesuai kebutuhan
    },
    cake: {
      images: [
        'image/project/cake/step 1.png',
        'image/project/cake/step 2.png'
      ],
      description: 'Klasifikasi gambar kue tradisional Indonesia menggunakan Convolutional Neural Network.',
      github: 'https://github.com/indraJuliansyahPutra/Klasifikasi-Kue-CNN'
    },
    scraping: {
      images: [
        'image/project/scraping/scrap-data-lib.gif',
        'image/project/scraping/scrap-data-sofa.gif',
        'image/project/scraping/scrap-data-trans.gif',
      ],
      description: 'Web scraping data statistik Liga 1 Indonesia dari situs resmi menggunakan Python dan BeautifulSoup, lalu disimpan dalam format terstruktur untuk analisis dan visualisasi lanjutan.',
      github: 'https://github.com/indraJuliansyahPutra/Liga-1-Indonesia'
    },
    bps: {
      images: [
        'image/project/bps/video.gif',
      ],
      description: 'Dashboard interaktif menggunakan Tableau untuk menampilkan data kependudukan Provinsi Sumatera Selatan berdasarkan data dari Badan Pusat Statistik (BPS), mencakup persebaran jumlah penduduk, rasio jenis kelamin, dan komposisi usia.',
      github: 'https://github.com/indraJuliansyahPutra/Liga-1-Indonesia'
    },
    liga1: {
      images: [
        'image/project/liga-1/video.gif',
      ],
      description: 'Dashboard statistik Liga 1 Indonesia menggunakan Power BI yang menampilkan performa pemain, distribusi gol, assist, kartu, dan metrik lainnya, hasil dari data hasil scraping yang telah dibersihkan.',
      github: 'https://public.tableau.com/app/profile/indra.juliansyah.putra/viz/DashboardBPSSumateraSelatan/Kependudukan'
    }
  };

  let currentProject = null;
  let currentIndex = 0;

  document.querySelectorAll('.preview-project').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const project = this.getAttribute('data-project');
      const data = projectData[project];

      if (data) {
        currentProject = data;
        currentIndex = 0;
        mainImage.src = data.images[currentIndex];
        descriptionText.textContent = data.description;
        viewProjectBtn.href = data.github;
        modal.style.display = 'block';
      }
    });
  });

  prevBtn.addEventListener('click', () => {
    if (!currentProject) return;
    currentIndex = (currentIndex - 1 + currentProject.images.length) % currentProject.images.length;
    mainImage.src = currentProject.images[currentIndex];
  });

  nextBtn.addEventListener('click', () => {
    if (!currentProject) return;
    currentIndex = (currentIndex + 1) % currentProject.images.length;
    mainImage.src = currentProject.images[currentIndex];
  });

  closeBtn.onclick = () => modal.style.display = 'none';
  closeModalBtn.onclick = () => modal.style.display = 'none';

  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  };
}
