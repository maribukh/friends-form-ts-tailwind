"use strict";
function toggleButton() {
    const form = document.getElementById('friendForm');
    if (!form)
        return;
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden', 'animate-slide-up');
        form.classList.add('animate-slide-down');
    }
    else {
        form.classList.remove('animate-slide-down');
        form.classList.add('animate-slide-up');
        setTimeout(() => {
            form.classList.add('hidden');
        }, 400);
    }
}
function updateEmptyMessageVisibility() {
    const message = document.getElementById('emptyMessage');
    const list = document.getElementById('friendsList');
    if (!message || !list)
        return;
    const hasCards = list.querySelectorAll('.card').length > 0;
    if (hasCards) {
        message.classList.add('opacity-0', '-translate-y-2');
        message.classList.remove('opacity-100', 'translate-y-0');
    }
    else {
        message.classList.remove('opacity-0', '-translate-y-2');
        message.classList.add('opacity-100', 'translate-y-0');
    }
}
function addCard() {
    const list = document.getElementById('friendsList');
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const ageInput = document.getElementById('age');
    const friendsInput = document.getElementById('friends');
    if (!list || !nameInput || !lastNameInput || !ageInput || !friendsInput)
        return;
    const name = nameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const age = ageInput.value.trim();
    const friends = friendsInput.value.trim();
    if (!name || !lastName || !age) {
        alert('გთხოვ, შეავსე ყველა ველი');
        return;
    }
    const card = document.createElement('div');
    card.className = `
  card 
  w-full 
  sm:w-[280px] 
  md:w-[320px] 
  bg-white p-6 rounded-lg shadow-md flex justify-between
`;
    card.innerHTML = `
  <div class="about-person">
    <p class="font-semibold text-lg">სახელი: <span class="text-gray-600">${name}</span></p>
    <p class="font-semibold text-lg">გვარი: <span class="text-gray-600">${lastName}</span></p>
    <p class="font-semibold text-lg">ასაკი: <span class="text-gray-600">${age}</span></p>
    <p class="font-semibold text-lg">მეგობრები: <span class="text-gray-600">${friends}</span></p>
  </div>
  <div>
    <span class="material-symbols-outlined text-red-600 cursor-pointer close-btn">close</span>
  </div>
`;
    const closeBtn = card.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            card.remove();
            updateEmptyMessageVisibility();
        });
    }
    list.appendChild(card);
    updateEmptyMessageVisibility();
    const form = document.getElementById('friendForm');
    form === null || form === void 0 ? void 0 : form.reset();
    toggleButton();
}
document.addEventListener('DOMContentLoaded', () => {
    updateEmptyMessageVisibility();
});
