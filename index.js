let cart = []; // Array to store cart items

function showCategory(category) {
    const allCards = document.querySelectorAll('.menu-card');

    // Hide all cards first
    allCards.forEach(card => card.style.display = 'none');

    // Show only the selected category
    const selectedCards = document.querySelectorAll(`.menu-card-${category}`);
    selectedCards.forEach(card => card.style.display = 'block');
}

// --- NEW CART FUNCTIONS ---

// ... existing JavaScript ...

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count'); // 👈 Get the counter element

    let total = 0;
    let totalItems = 0; // 👈 New variable to track total quantity

    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        cartTotalElement.textContent = '0.00';
        cartCountElement.textContent = '0'; // 👈 Reset count to 0
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity; // 👈 Add item quantity to the total count

        const cartItemElement = document.createElement('div');
        // ... rest of the cart item creation ...
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₱ ${item.price.toFixed(2)}</span>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <span class="item-total">₱ ${itemTotal.toFixed(2)}</span>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = totalItems; // 👈 Update the counter with the total quantity!
}

// ... rest of the existing JavaScript ...


function addToCart(button) {
    const card = button.closest('.menu-card');
    const name = card.getAttribute('data-name');
    const price = parseFloat(card.getAttribute('data-price'));
    const id = name.replace(/\s/g, '-').toLowerCase(); // Simple unique ID

    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    // Optional: Provide feedback to the user
    alert(`${name} added to cart!`);

    updateCartDisplay();
    document.getElementById('cart-sidebar').classList.add('open'); // Open the cart sidebar
}

function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Remove item if quantity drops to 0 or less
            cart.splice(itemIndex, 1);
        }
    }

    updateCartDisplay();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

// ✅ On first load, show only the first menu category (All Time Favorites)
window.onload = function () {
    showCategory('all-time');
    updateCartDisplay(); // Initialize cart display
};