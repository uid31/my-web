const responses = [
    {
        keywords: ['location', 'locations', 'where', 'branch', 'branches', 'store', 'stores', 'mall'],
        reply: "We have 3 pickup locations! 📍<br><br>• <b>Lulu Mall</b><br>• <b>Fujairah Mall</b><br>• <b>Century Mall</b><br><br>You can choose your preferred branch at checkout."
    },
    {
        keywords: ['pickup', 'pick up', 'collect', 'collection', 'how to get', 'receive'],
        reply: "To pick up your order ⚡<br><br>1. Add items to your cart<br>2. Go to checkout & fill in your details<br>3. Select your nearest branch<br>4. Place your order<br>5. Come to the store with a <b>valid ID</b> on the pickup date!"
    },
    {
        keywords: ['delivery', 'deliver', 'ship', 'shipping', 'home delivery', 'send'],
        reply: "We currently offer <b>in-store pickup only</b> 🏪<br><br>No home delivery at this time. This ensures every product is personally inspected and handed to you in perfect condition!"
    },
    {
        keywords: ['pay', 'payment', 'cash', 'card', 'how to pay', 'price'],
        reply: "We accept both 💵 <b>Cash</b> and 💳 <b>Card</b> payments — collected at the time of pickup at the store. No online payment required!"
    },
    {
        keywords: ['laptop', 'computer', 'pc'],
        reply: "💻 Our <b>Laptop</b> is priced at <b>$800</b>.<br><br>It's a 14\" FHD display running Windows 11 Pro — great for work and everyday use!"
    },
    {
        keywords: ['phone', 'smartphone', 'mobile', 'iphone'],
        reply: "📱 Our <b>Smartphone</b> is priced at <b>$500</b>.<br><br>A sleek, high-performance device perfect for everyday use. Add it to your cart now!"
    },
    {
        keywords: ['headphone', 'headphones', 'earphone', 'earphones', 'audio', 'sony'],
        reply: "🎧 Our <b>Headphones</b> are priced at <b>$150</b>.<br><br>Sony noise-cancelling over-ear headphones — perfect for music lovers!"
    },
    {
        keywords: ['watch', 'smartwatch', 'smart watch', 'apple watch', 'wearable'],
        reply: "⌚ Our <b>Smart Watch</b> is priced at <b>$250</b>.<br><br>Apple Watch with a sport loop band — stylish and functional!"
    },
    {
        keywords: ['console', 'gaming', 'playstation', 'ps', 'game'],
        reply: "🎮 Our <b>Gaming Console</b> is priced at <b>$600</b>.<br><br>The PlayStation Portal — a portable gaming experience like no other!"
    },
    {
        keywords: ['speaker', 'bluetooth', 'sound', 'music'],
        reply: "🔊 Our <b>Bluetooth Speaker</b> is priced at <b>$120</b>.<br><br>Compact and powerful with a built-in clock display. Great for any room!"
    },
    {
        keywords: ['products', 'items', 'sell', 'selling', 'catalogue', 'catalog', 'what do you have', 'available'],
        reply: "Here's what we carry at ElectroShop ⚡<br><br>💻 Laptop — $800<br>📱 Smartphone — $500<br>🎧 Headphones — $150<br>⌚ Smart Watch — $250<br>🎮 Gaming Console — $600<br>🔊 Bluetooth Speaker — $120"
    },
    {
        keywords: ['order', 'track', 'tracking', 'status', 'my order'],
        reply: "After placing your order, you'll receive an <b>SMS confirmation</b> and <b>email with tracking details</b> 📧<br><br>Your order number starts with <b>ES-</b> — keep it handy when you visit the store!"
    },
    {
        keywords: ['id', 'identification', 'bring', 'require', 'need'],
        reply: "Please bring a <b>valid ID</b> when picking up your order 🪪<br><br>This helps us verify your identity and ensure your order is handed to the right person."
    },
    {
        keywords: ['return', 'refund', 'exchange', 'warranty'],
        reply: "For returns, refunds, or warranty inquiries, please visit any of our store branches directly with your <b>order number and ID</b>. Our staff will be happy to assist you! 🏪"
    },
    {
        keywords: ['hours', 'open', 'opening', 'timing', 'time', 'close', 'closing'],
        reply: "Our stores are open 🕐<br><br>• <b>Sat–Thu:</b> 10:00 AM – 10:00 PM<br>• <b>Friday:</b> 2:00 PM – 10:00 PM<br><br>Pickup time slots: 10AM–1PM, 1PM–4PM, or 4PM–7PM."
    },
    {
        keywords: ['hello', 'hi', 'hey', 'howdy', 'sup', 'greetings'],
        reply: "Hey there! 👋⚡ Welcome to ElectroShop!<br><br>I'm Volt, your virtual assistant. Ask me about our products, locations, pickup process, or anything else!"
    },
    {
        keywords: ['thanks', 'thank you', 'thank', 'thx', 'appreciated'],
        reply: "You're welcome! 😊⚡ Feel free to ask if you need anything else. Happy shopping at ElectroShop!"
    },
    {
        keywords: ['help', 'assist', 'support', 'question'],
        reply: "I'm here to help! ⚡ You can ask me about:<br><br>• 📦 Products & prices<br>• 📍 Store locations<br>• 🚗 Pickup process<br>• 💳 Payment methods<br>• 📋 Order tracking"
    }
];

const fallback = "Hmm, I'm not sure about that one! 🤔<br><br>Try asking me about our <b>products</b>, <b>locations</b>, <b>pickup process</b>, or <b>payment methods</b>. I'm happy to help! ⚡";

let chatOpen = false;
let greeted = false;

const suggestions = [
    "📍 Store locations",
    "📦 How to pickup?",
    "💳 Payment methods",
    "📋 All products",
    "🎮 Gaming Console",
    "💻 Laptop price",
    "🕐 Opening hours",
    "🔄 Returns policy"
];

function useSuggestion(text) {
    document.getElementById('chat-input').value = text;
    sendMessage();
}

function toggleChat() {
    chatOpen = !chatOpen;
    const win = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    if (chatOpen) {
        win.classList.add('open');
        fab.innerHTML = '✕';
        if (!greeted) {
            greeted = true;
            renderSuggestions();
            setTimeout(() => appendBotMessage("Hey there! 👋⚡ I'm <b>Volt</b>, your ElectroShop assistant.<br><br>Ask me anything about our products, locations, pickup, or payments!"), 400);
        }
    } else {
        win.classList.remove('open');
        fab.innerHTML = '💬';
    }
}

function renderSuggestions() {
    const container = document.getElementById('chat-suggestions');
    if (!container) return;
    container.innerHTML = suggestions.map(s =>
        `<button class="suggestion-chip" onclick="useSuggestion('${s.replace(/'/g, "\'")}')">${s}</button>`
    ).join('');
}

function appendBotMessage(text) {
    const msgs = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `<span class="chat-avatar">⚡</span><div class="chat-bubble">${text}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function appendUserMessage(text) {
    const msgs = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function appendTyping() {
    const msgs = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `<span class="chat-avatar">⚡</span><div class="chat-bubble typing"><span></span><span></span><span></span></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
}

function getReply(text) {
    const lower = text.toLowerCase();
    for (const item of responses) {
        if (item.keywords.some(k => lower.includes(k))) {
            return item.reply;
        }
    }
    return fallback;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    appendUserMessage(text);
    const typingEl = appendTyping();

    // Simulate a short delay for realism
    setTimeout(() => {
        typingEl.remove();
        appendBotMessage(getReply(text));
    }, 800 + Math.random() * 400);
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}
