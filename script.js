document.addEventListener('DOMContentLoaded', () => {
    // Product data with stable, high-quality image URLs
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 2, name: 'Smartwatch', price: 199.99, image: 'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 3, name: 'Portable Speaker', price: 89.99, image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 4, name: 'HD Camera', price: 249.99, image: 'https://images.pexels.com/photos/274996/pexels-photo-274996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 5, name: 'Gaming Mouse', price: 49.99, image: 'https://images.pexels.com/photos/17921932/pexels-photo-17921932/free-photo-of-gaming-mouse-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 6, name: 'Ergonomic Keyboard', price: 79.99, image: 'https://images.pexels.com/photos/1381676/pexels-photo-1381676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 7, name: '4K Monitor', price: 349.99, image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 8, name: 'LED Desk Lamp', price: 29.99, image: 'https://images.pexels.com/photos/1569426/pexels-photo-1569426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ];

    const productGrid = document.getElementById('product-grid');
    const cartButton = document.getElementById('cart-button');
    const cartElement = document.getElementById('cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const closeCartButton = document.getElementById('close-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render products on the page
    const renderProducts = () => {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    };

    // Function to update the cart UI
    const updateCartUI = () => {
        cartItemsList.innerHTML = ''; // Clear the current list
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsList.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2);
        cartButton.textContent = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
    };

    // Function to add a product to the cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    };

    // Event Listeners
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });

    cartButton.addEventListener('click', () => {
        cartElement.classList.add('active');
    });

    closeCartButton.addEventListener('click', () => {
        cartElement.classList.remove('active');
    });

    // Initial render
    renderProducts();
    updateCartUI();
});