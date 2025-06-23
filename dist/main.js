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
function saveToStorage(friend) {
    const existing = JSON.parse(localStorage.getItem('friends') || '[]');
    existing.push(friend);
    localStorage.setItem('friends', JSON.stringify(existing));
}
function removeFromStorage(friend) {
    const existing = JSON.parse(localStorage.getItem('friends') || '[]');
    const filtered = existing.filter((f) => f.name !== friend.name ||
        f.lastName !== friend.lastName ||
        f.age !== friend.age);
    localStorage.setItem('friends', JSON.stringify(filtered));
}
function createCard(friend) {
    const list = document.getElementById('friendsList');
    if (!list)
        return;
    const card = document.createElement('div');
    card.className = `
    card 
    w-full 
    sm:w-[280px] 
    md:w-[100%] 
    bg-white p-6 rounded-lg shadow-md flex justify-between
  `;
    card.innerHTML = `
    <div class="about-person">
      <p class="font-semibold text-lg">სახელი: <span class="text-gray-600">${friend.name}</span></p>
      <p class="font-semibold text-lg">გვარი: <span class="text-gray-600">${friend.lastName}</span></p>
      <p class="font-semibold text-lg">ასაკი: <span class="text-gray-600">${friend.age}</span></p>
      <p class="font-semibold text-lg">მეგობრები: <span class="text-gray-600">${friend.friends.join(', ')}</span></p>
    </div>
    <div>
      <span class="material-symbols-outlined text-red-600 cursor-pointer close-btn">close</span>
    </div>
  `;
    const closeBtn = card.querySelector('.close-btn');
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => {
        card.remove();
        removeFromStorage(friend);
        updateEmptyMessageVisibility();
    });
    list.appendChild(card);
    updateEmptyMessageVisibility();
}
function addCard() {
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const ageInput = document.getElementById('age');
    const friendsInput = document.getElementById('friends');
    if (!nameInput || !lastNameInput || !ageInput || !friendsInput)
        return;
    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    const name = capitalize(nameInput.value.trim());
    const lastName = capitalize(lastNameInput.value.trim());
    const ageStr = ageInput.value.trim();
    const friendsStr = friendsInput.value.trim();
    if (!name || !lastName || !ageStr) {
        alert('გთხოვ, შეავსე ყველა ველი');
        return;
    }
    const isOnlyNumbers = (text) => /^\d+$/.test(text);
    if (isOnlyNumbers(name) || isOnlyNumbers(lastName)) {
        alert('სახელი და გვარი არ შეიძლება იყოს მხოლოდ რიცხვები');
        return;
    }
    const newFriend = {
        name,
        lastName,
        age: Number(ageStr),
        friends: friendsStr ? friendsStr.split(',').map((f) => f.trim()) : [],
    };
    createCard(newFriend);
    saveToStorage(newFriend);
    const form = document.getElementById('friendForm');
    form === null || form === void 0 ? void 0 : form.reset();
    toggleButton();
}
document.addEventListener('DOMContentLoaded', () => {
    updateEmptyMessageVisibility();
    const stored = localStorage.getItem('friends');
    if (stored) {
        const friends = JSON.parse(stored);
        friends.forEach(createCard);
    }
    const addBtn = document.querySelector('#addFriendBtn');
    const toggleBtn = document.querySelector('#toggleForm');
    const closeFormBtn = document.getElementById('formCloseBtn');
    addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', addCard);
    toggleBtn === null || toggleBtn === void 0 ? void 0 : toggleBtn.addEventListener('click', toggleButton);
    closeFormBtn === null || closeFormBtn === void 0 ? void 0 : closeFormBtn.addEventListener('click', toggleButton);
});
export {};
