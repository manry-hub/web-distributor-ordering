document.querySelectorAll('.transition-link-to-right').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah tautan langsung membuka halaman
        const target = this.href; // Mendapatkan URL target
        const container = document.querySelector('.slide-animation');

        // Tambahkan kelas untuk efek transisi
        container.classList.add('slide-out-left');

        // Tunggu transisi selesai sebelum pindah halaman
        setTimeout(() => {
            window.location.href = target;
        }, 500); // Waktu harus sama dengan CSS transition
    });
});



// slider
const imageNames = ["sliderr.png",
     "sliderr.png",
     "sliderr.png",
     "sliderr.png"];
const sliderItems = imageNames.concat(imageNames);
const sliders = document.querySelectorAll(".slide-track");

sliders.forEach((slider, index) => {
     slider.innerHTML = ""; // Kosongkan isi slider sebelum menambahkan gambar
     sliderItems.forEach((sliderItem) => {
          const img = document.createElement("img");
          img.src = "./img/" + sliderItem; 
          img.className = "slide-item";
          slider.appendChild(img);
     });
});

document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".slide1, .slide2, .slide3");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      // Cek setiap entry (elemen) yang terlihat di viewport
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ketika elemen terlihat, beri class 'visible' untuk animasi
          entry.target.classList.add("visible");
          // Setelah elemen pertama selesai muncul, baru bisa memantau elemen berikutnya
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 } // Elemen dianggap terlihat jika 10% masuk viewport
  );

  // Pantau setiap elemen
  boxes.forEach((box, index) => {
    // Setelah elemen pertama terlihat, pantau elemen berikutnya
    observer.observe(box);
  });
});



