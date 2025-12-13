// let name = "adi";
// let age = 19;

// let num1 = 25;
// let num2 = 25;
// let sum = num1 + num2;

// Get DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');

// Array of bot responses
const botResponses = [
    "Welcome to Wishlistz 👋",
    "How can I help you today?",
    "Your wishlist has been updated.",
    "I'm here to assist you with your wishlist!",
    "That's a great choice! Added to your wishlist.",
    "Would you like to see your current wishlist?",
    "I can help you organize your wishes! 🎁",
    "Let me know what you'd like to add.",
    "Your wishlist is looking great!",
    "I'm processing your request... Done! ✅"
];

//    Helper Function: Get Current Time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}

//    Helper Function: Scroll to Bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//    Function: Add Message to Chat
function addMessage(text, isUser = false) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Create message text
    const messageText = document.createElement('p');
    messageText.textContent = text;

    // Create timestamp
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();

    // Append elements
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

//    Function: Show Typing Indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';

    // Create three dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingIndicator.appendChild(dot);
    }

    typingContent.appendChild(typingIndicator);
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);

    scrollToBottom();
}

//    Function: Remove Typing Indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

//    Function: Get Random Bot Response
function getRandomBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

//    Function: Send Bot Response
function sendBotResponse() {
    // Show typing indicator
    showTypingIndicator();

    // Simulate bot thinking time (1-2 seconds)
    const thinkingTime = Math.random() * 1000 + 1000;

    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();

        // Add bot message
        const botMessage = getRandomBotResponse();
        addMessage(botMessage, false);
    }, thinkingTime);
}

//    Function: Handle Send Message
function handleSendMessage() {
    // Get message text and trim whitespace
    const messageText = messageInput.value.trim();

    // Check if message is not empty
    if (messageText === '') {
        return;
    }

    // Add user message to chat
    addMessage(messageText, true);

    // Clear input field
    messageInput.value = '';

    // Focus back on input
    messageInput.focus();

    // Send bot response after a short delay
    sendBotResponse();
}

//    Event Listeners

// Send button click event
sendButton.addEventListener('click', handleSendMessage);

// Enter key press event
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});

// Input field focus on page load
window.addEventListener('load', () => {
    messageInput.focus();

    // Add a slight delay before scrolling to ensure DOM is ready
    setTimeout(scrollToBottom, 100);
});

//    Optional: Disable send button when input is empty
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() === '') {
        sendButton.style.opacity = '0.5';
        sendButton.style.cursor = 'not-allowed';
    } else {
        sendButton.style.opacity = '1';
        sendButton.style.cursor = 'pointer';
    }
});

// Initialize button state
if (messageInput.value.trim() === '') {
    sendButton.style.opacity = '0.5';
    sendButton.style.cursor = 'not-allowed';
}