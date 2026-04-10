let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Custom toast instead of alert
function showToast(message) {
    let overlay = document.getElementById("toast-overlay");
    let box = document.getElementById("toast-box");
    if (!overlay) return;
    box.innerHTML = `<span class="toast-icon">🛒</span>${message}`;
    overlay.classList.add("show");
    setTimeout(() => {
        overlay.classList.remove("show");
    }, 2000);
}

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(product + " added to cart!");
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    if (cartItems) {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${item.product} — $${item.price}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });

        document.getElementById("totalPrice").textContent =
            "Total: $" + total;
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    alert("✅ Order placed successfully! Your items will be ready for pickup.");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
    return false;
}

window.onload = displayCart;
