
const cartItems = [
    { id: 1, name: "Item 1", price: 10.00, quantity: 1 },
    { id: 2, name: "Item 2", price: 15.00, quantity: 1 },
    { id: 3, name: "Item 3", price: 20.00, quantity: 1 }
];


function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="toggleLike(${item.id})" class="like-button">❤️</button>
            <button onclick="removeItem(${item.id})">Delete</button>
        `;
        itemDiv.dataset.id = item.id;
        cartDiv.appendChild(itemDiv);
    });
    updateTotalPrice();
}


function changeQuantity(id, delta) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {                item.quantity = 1; // Ensure quantity doesn't go below 1
    }
    renderCart(); // Re-render the cart to reflect changes
}
}


function toggleLike(id) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.liked = !item.liked; // Toggle the liked status
        const likeButton = document.querySelector(`.cart-item[data-id='${id}'] .like-button`);
        likeButton.textContent = item.liked ? '❤️' : '🤍'; // Change the button text based on liked status
    }
}


function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id); // Remove the item from the cart
    renderCart(); // Re-render the cart
}


function updateTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalDiv = document.getElementById('total-price');
    totalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`; // Update the total price display
}


// Initial render of the cart
// Initial render of the cart
renderCart();


// Set an interval to continually update the cart every 5 seconds (5000 milliseconds)
setInterval(() => {
renderCart(); // Re-render the cart to reflect any changes
}, 5000);