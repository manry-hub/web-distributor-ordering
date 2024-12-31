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

// jumlah ayam
        document.addEventListener("click", (event) => {
    if (event.target.classList.contains("increment")) {
        const input = event.target.closest(".spinner").querySelector(".number");
        input.value = parseInt(input.value) + 1;
        calculateTotalPrice();
    }

    if (event.target.classList.contains("decrement")) {
        const input = event.target.closest(".spinner").querySelector(".number");
        const currentValue = parseInt(input.value);
        if (currentValue > 0) {
            input.value = currentValue - 1;
        }
        calculateTotalPrice();
    }
});



//memanipulasi order
function addOrderForm(amount) {
    const formContainer = document.querySelector('.output-manipulation-order');
    const orderForms = document.querySelectorAll('.manipulation-order');

    if (amount > 0) {
        // Clone elemen pertama
        const newForm = orderForms[0].cloneNode(true);
        const newIndex = orderForms.length + 1;
        newForm.setAttribute('data-order-index', newIndex);

        newForm.querySelectorAll('input').forEach((input) => {
            if (input.type === 'radio') {
                input.name = `chicken-${newIndex}`;
            } else if (input.type === 'number') {
                input.setAttribute('data-order-index', newIndex);
                input.value = 1;
            }
        });

        formContainer.appendChild(newForm);

        // Tambahkan event listener pada tombol increment dan decrement
        newForm.querySelector(".increment").addEventListener("click", function () {
            const input = this.closest(".spinner").querySelector(".number");
            input.value = parseInt(input.value) + 1;
            calculateTotalPrice();
        });

        newForm.querySelector(".decrement").addEventListener("click", function () {
            const input = this.closest(".spinner").querySelector(".number");
            const currentValue = parseInt(input.value);
            if (currentValue > 0) {
                input.value = currentValue - 1;
            }
            calculateTotalPrice();
        });
    } else if (amount < 0 && orderForms.length > 1) {
        formContainer.removeChild(orderForms[orderForms.length - 1]);
    }

    calculateTotalPrice();
}


          function calculateTotalPrice() {
               // Ambil jenis ayam yang dipilih
               const selectedChicken = document.querySelector('input[name="chicken"]:checked');
               const chickenType = selectedChicken ? selectedChicken.value : null;
           
               // Harga per jenis ayam
               const prices = {
                   broiler: 20000,
                   kampung: 50000,
               };
           
               // Ambil jumlah ayam
               const quantity = parseInt(document.getElementById("number").value) || 0;
           
               // Hitung total harga
               const pricePerChicken = prices[chickenType] || 0;
               const totalPrice = pricePerChicken * quantity;
           
               // Update tampilan total harga
               document.getElementById("id-total-harga").innerText = 
                   chickenType ? `Rp ${totalPrice.toLocaleString()}` : "Pilih jenis ayam!";
           }
           
           // Pasang event listener
           document.querySelectorAll('input[name="chicken"]').forEach((radio) => {
               radio.addEventListener("click", calculateTotalPrice);
           });
           
           document.getElementById("number").addEventListener("input", calculateTotalPrice);
           


const timeButton = document.getElementById("time-button");
const timeDropdown = document.getElementById("time-dropdown");
const selectedTimeDisplay = document.getElementById("selected-time");

// generate
const times = Array.from({ length: 13 }, (_, index) => {
    const hour = 7 + index; // dari 7 nyampe 19
    return `${hour.toString().padStart(2, "0")}:00`;
});

// dropdown menu
times.forEach((time) => {
    const timeOption = document.createElement("div");
    timeOption.textContent = time;

    timeOption.style.padding = "12px"; 
    timeOption.style.cursor = "pointer"; 
    timeOption.style.color = "#4a4a4a"; 

    // Add hover effect 
    timeOption.addEventListener("mouseover", () => {
        timeOption.style.backgroundColor = "#e5e7eb"; 
    });
    timeOption.addEventListener("mouseout", () => {
        timeOption.style.backgroundColor = "transparent";
    });

    // Handle click event
    timeOption.addEventListener("click", () => {
        timeButton.textContent = time; // munculin tombol
        timeDropdown.style.display = "none"; // sembunyiin dropdown
    });

    timeDropdown.appendChild(timeOption);
});

// Toggle dropdown yerlihat
timeButton.addEventListener("click", (event) => {
    event.stopPropagation(); 
    timeDropdown.style.display = timeDropdown.style.display === "none" || !timeDropdown.style.display ? "block" : "none";
});

// tutup dropdown
document.addEventListener("click", (event) => {
    if (!timeDropdown.contains(event.target)) {
        timeDropdown.style.display = "none"; // sembunyiin dropdown
    }
});

// Tombol dan elemen modal
const showButton = document.getElementById("show-section-confirm-btn");
const modalOverlay = document.getElementById("modal-overlay");
const closeButton = document.getElementById("close-btn");

// Fungsi untuk membuka modal
showButton.addEventListener("click", () => {
    modalOverlay.style.display = "flex"; // Tampilkan modal
});

// Fungsi untuk menutup modal
closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none"; // Sembunyikan modal
});

// Menutup modal jika klik di luar modal-content
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.style.display = "none";
    }
});
