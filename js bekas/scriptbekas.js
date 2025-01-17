

function calculateTotalPrice() {
               const forms = document.querySelectorAll('.manipulation-order');
               let totalPrice = 0;
               forms.forEach((form) => {
                    const index = form.getAttribute('data-order-index');
                    const selectedChicken = form.querySelector(`input[name="chicken-${index}"]:checked`);
                    const chickenType = selectedChicken ? selectedChicken.value : null;

                    const prices = {
                         broiler: 35000,
                         kampung: 80000,
                    };

                    const quantity = parseInt(form.querySelector(`.number`).value) || 0;
                    const pricePerChicken = prices[chickenType] || 0;

                    totalPrice += pricePerChicken * quantity;
               });

               document.getElementById('id-total-harga').innerText = `Rp ${totalPrice.toLocaleString()}`;
          }

          function addOrderForm(amount) {
               const formContainer = document.querySelector('.output-manipulation-order');
               const orderForms = document.querySelectorAll('.manipulation-order');

               if (amount > 0) {
                    const newForm = orderForms[0].cloneNode(true);
                    const newIndex = orderForms.length + 1;
                    newForm.setAttribute('data-order-index', newIndex);

                    newForm.querySelectorAll('input').forEach((input) => {
                         if (input.type === 'radio') {
                              input.name = `chicken-${newIndex}`;
                              input.checked = false;
                         } else if (input.type === 'number') {
                              input.setAttribute('data-order-index', newIndex);
                              input.value = 0;
                         }
                    });

                    newForm.querySelector('.increment_jumlah').addEventListener('click', function () {
                         const input = this.closest('.spinner').querySelector('.number');
                         input.value = parseInt(input.value) + 1;
                         calculateTotalPrice();
                    });

                    newForm.querySelector('.decrement_jumlah').addEventListener('click', function () {
                         const input = this.closest('.spinner').querySelector('.number');
                         const currentValue = parseInt(input.value);
                         if (currentValue > 0) {
                              input.value = currentValue - 1;
                         }
                         calculateTotalPrice();
                    });

                    formContainer.appendChild(newForm);
               } else if (amount < 0 && orderForms.length > 1) {
                    formContainer.removeChild(orderForms[orderForms.length - 1]);
               }
               calculateTotalPrice();
          }

          document.addEventListener('click', (event) => {
               if (event.target.classList.contains('increment_jumlah')) {
                    const input = event.target.closest('.spinner').querySelector('.number');
                    input.value = parseInt(input.value) + 1;
                    calculateTotalPrice();
               }

               if (event.target.classList.contains('decrement_jumlah')) {
                    const input = event.target.closest('.spinner').querySelector('.number');
                    const currentValue = parseInt(input.value);
                    if (currentValue > 0) {
                         input.value = currentValue - 1;
                    }
                    calculateTotalPrice();
               }
          });

          document.querySelectorAll('input[name^="chicken"]').forEach((radio) => {
               radio.addEventListener('change', calculateTotalPrice);
          });

          document.querySelectorAll('.number').forEach((input) => {
               input.addEventListener('input', calculateTotalPrice);
          });