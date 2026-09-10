/* Simple hotel chatbot widget. Include this file on any page. */
(function () {
	"use strict";

	var style = document.createElement("style");
	style.textContent =
		".hotel-chat{position:fixed;right:20px;bottom:20px;z-index:9999;font:14px Arial,sans-serif}.hotel-chat-toggle{border:0;border-radius:50%;width:58px;height:58px;background:#8b5e3c;color:#fff;font-size:25px;cursor:pointer;box-shadow:0 3px 12px #0004}.hotel-chat-box{display:none;flex-direction:column;width:320px;height:430px;margin-bottom:10px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px #0003;border:1px solid #ddd}.hotel-chat.open .hotel-chat-box{display:flex}.hotel-chat-header{padding:16px;background:#8b5e3c;color:#fff;font-weight:bold}.hotel-chat-messages{flex:1;padding:12px;overflow-y:auto;background:#fafafa}.hotel-chat-message{max-width:85%;margin:8px 0;padding:9px 11px;border-radius:12px;line-height:1.35;white-space:pre-wrap}.hotel-chat-bot{background:#eee;color:#222}.hotel-chat-user{margin-left:auto;background:#8b5e3c;color:#fff}.hotel-chat-form{display:flex;border-top:1px solid #ddd}.hotel-chat-input{flex:1;padding:12px;border:0;outline:0}.hotel-chat-send{padding:0 14px;border:0;background:#8b5e3c;color:#fff;cursor:pointer}@media(max-width:420px){.hotel-chat-box{width:calc(100vw - 40px)}}";
	document.head.appendChild(style);

	var root = document.createElement("div");
	root.className = "hotel-chat";
	root.innerHTML =
		'<div class="hotel-chat-box" role="dialog" aria-label="Hotel assistant">' +
		'<div class="hotel-chat-header">Hotel Assistant</div>' +
		'<div class="hotel-chat-messages" aria-live="polite"></div>' +
		'<form class="hotel-chat-form"><input class="hotel-chat-input" aria-label="Message" placeholder="Ask about our hotel..." autocomplete="off"><button class="hotel-chat-send" type="submit">Send</button></form></div>' +
		'<button class="hotel-chat-toggle" aria-label="Open hotel assistant">💬</button>';
	document.body.appendChild(root);

	var messages = root.querySelector(".hotel-chat-messages");
	var input = root.querySelector(".hotel-chat-input");
	var toggle = root.querySelector(".hotel-chat-toggle");

	function addMessage(text, type) {
		var item = document.createElement("div");
		item.className = "hotel-chat-message hotel-chat-" + type;
		item.textContent = text;
		messages.appendChild(item);
		messages.scrollTop = messages.scrollHeight;
	}

	function reply(message) {
		var text = message.toLowerCase();
		if (/hello|hi|hey/.test(text)) return "Hello! How can I help you today?";
		if (/book|reserv|room/.test(text)) return "You can book a room from our Reservations page. Please contact reception if you need assistance.";
		if (/check.?in/.test(text)) return "Check-in starts at 3:00 PM. Early check-in is available subject to room availability.";
		if (/check.?out/.test(text)) return "Check-out is at 11:00 AM. Please ask reception about late check-out.";
		if (/price|rate|cost/.test(text)) return "Room rates vary by date and room type. Visit our booking page for the latest availability and prices.";
		if (/amenit|pool|gym|wifi|breakfast/.test(text)) return "We offer complimentary Wi-Fi, breakfast, a swimming pool, and fitness facilities. Ask reception for current hours.";
		if (/location|address|where/.test(text)) return "Our reception team can provide directions and local recommendations. Please see the Contact page for our address.";
		if (/cancel|refund/.test(text)) return "Cancellation terms depend on your booking. Please review your confirmation or contact reception.";
		if (/thank/.test(text)) return "You're welcome!";
		return "I'm sorry, I don't have that information. Please contact our reception team for further assistance.";
	}

	toggle.addEventListener("click", function () {
		root.classList.toggle("open");
		if (root.classList.contains("open")) {
			if (!messages.children.length) addMessage("Welcome to our hotel! Ask me about rooms, booking, check-in, or amenities.", "bot");
			input.focus();
		}
	});

	root.querySelector(".hotel-chat-form").addEventListener("submit", function (event) {
		event.preventDefault();
		var message = input.value.trim();
		if (!message) return;
		addMessage(message, "user");
		input.value = "";
		window.setTimeout(function () { addMessage(reply(message), "bot"); }, 250);
	});
})();
