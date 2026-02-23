let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product + " added to cart!");
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    if (cartItems) {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            let li = document.createElement("li");

            li.innerHTML = `
                ${item.product} - $${item.price}
                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
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
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
    return false;
}

window.onload = displayCart;