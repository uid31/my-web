let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Custom toast
function closeToast() {
    document.getElementById("toast-overlay").classList.remove("show");
}

function showToast(htmlContent, duration = 2200, autoClose = true) {
    let overlay = document.getElementById("toast-overlay");
    let box = document.getElementById("toast-box");
    if (!overlay) return;
    box.innerHTML = htmlContent;
    overlay.classList.add("show");
    if (autoClose) {
        setTimeout(() => overlay.classList.remove("show"), duration);
    }
}

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`<span class="toast-icon">🛒</span>${product} added to cart!`);
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    if (!cartItems) return;
    cartItems.innerHTML = "";

    let grouped = {};
    cart.forEach((item) => {
        if (!grouped[item.product]) {
            grouped[item.product] = { product: item.product, price: item.price, count: 0 };
        }
        grouped[item.product].count++;
    });

    Object.values(grouped).forEach(group => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="cart-item-name">${group.product} — $${group.price}</span>
            <div class="qty-controls">
                <button class="qty-btn" onclick="decreaseItem('${group.product}')">−</button>
                <span class="qty-count">${group.count}</span>
                <button class="qty-btn" onclick="increaseItem('${group.product}', ${group.price})">+</button>
                <button class="remove-btn" onclick="removeAll('${group.product}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
        total += group.price * group.count;
    });

    document.getElementById("totalPrice").textContent = "Total: $" + total;
}

function increaseItem(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function decreaseItem(product) {
    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].product === product) {
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeAll(product) {
    cart = cart.filter(item => item.product !== product);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    // Check if cart is empty
    if (cart.length === 0) {
        showToast('<span class="toast-icon">🛒</span>Your cart is empty!<br><span style="font-size:13px;opacity:0.6;">Add some products before placing an order.</span>', 2200, true);
        return false;
    }

    // Validate all required fields
    const name = document.querySelector('.pickup-fields input[type="text"]');
    const phone = document.querySelector('.pickup-fields input[type="tel"]');
    const location = document.querySelector('.pickup-fields select');

    if (!name || !name.value.trim()) {
        name.focus();
        name.style.borderColor = '#ff6b6b';
        setTimeout(() => name.style.borderColor = '', 2000);
        return false;
    }
    if (!phone || !phone.value.trim()) {
        phone.focus();
        phone.style.borderColor = '#ff6b6b';
        setTimeout(() => phone.style.borderColor = '', 2000);
        return false;
    }
    if (!location || !location.value) {
        location.style.borderColor = '#ff6b6b';
        setTimeout(() => location.style.borderColor = '', 2000);
        return false;
    }

    // Generate order details
    const orderNum = "ES-" + Math.floor(100000 + Math.random() * 900000);
    const locations = ["Lulu Mall", "Fujairah Mall", "Century Mall"];
    const selectedLocation = document.querySelector(".pickup-fields select")?.value || locations[0];

    // Pickup window: 1–3 business days from today
    const today = new Date();
    const pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + Math.floor(Math.random() * 2) + 1);
    const dateStr = pickupDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

    // Pickup time window
    const times = ["10:00 AM – 1:00 PM", "1:00 PM – 4:00 PM", "4:00 PM – 7:00 PM"];
    const timeSlot = times[Math.floor(Math.random() * times.length)];

    const confirmationHTML = `
        <button onclick="closeToast(); setTimeout(()=>{ window.location.href='home.html'; }, 200);" style="position:absolute;top:14px;right:18px;background:none;border:none;color:rgba(255,255,255,0.5);font-size:22px;cursor:pointer;line-height:1;padding:0;z-index:10;">✕</button>
        <span class="toast-icon">✅</span>
        <div style="font-family:'Orbitron',sans-serif; font-size:15px; letter-spacing:1px; margin-bottom:10px;">Order Confirmed!</div>
        <div style="font-size:13px; opacity:0.9; margin-bottom:14px;">
            Order <span style="color:#c9b8ff; font-weight:700;">${orderNum}</span> has been placed
        </div>
        <div style="font-size:12.5px; line-height:2; opacity:0.8; text-align:left; background:rgba(255,255,255,0.05); border-radius:12px; padding:14px 18px; border:1px solid rgba(201,184,255,0.15);">
            📍 <b>Pickup at:</b> ${selectedLocation || "Selected Branch"}<br>
            📅 <b>Ready by:</b> ${dateStr}<br>
            🕐 <b>Time window:</b> ${timeSlot}<br>
            💬 <b>Confirmation SMS</b> will be sent shortly<br>
            📧 <b>Order tracking</b> details sent to your email
        </div>
        <div style="font-size:11px; opacity:0.45; margin-top:12px;">Please bring a valid ID when picking up your order</div>
    `;

    localStorage.removeItem("cart");
    cart = [];

    showToast(confirmationHTML, 6000, false);



    return false;
}

window.onload = displayCart;