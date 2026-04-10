// chatbot.js
// Gemini UPI-powered chatbot for Solar Explorer

// Placeholder for Gemini UPI API integration
// Replace with actual Gemini UPI API calls as needed

const GEMINI_UPI_API_KEY = 'AIzaSyCWASB5gsTt86DZS_HrsNOXI_hm0TYBWas'; // Replace with your actual key


// Expanded knowledge base for the chatbot
const planetFacts = {
  mercury: "Mercury is the closest planet to the Sun and circles the Sun faster than all other planets.",
  venus: "Venus is named after the Roman goddess of love and beauty. It is the second planet from the Sun.",
  earth: "Earth is our home and the only planet known to support life.",
  mars: "Mars is known as the Red Planet and is a focus for future human exploration.",
  jupiter: "Jupiter is the largest planet in the solar system and is known for its Great Red Spot.",
  saturn: "Saturn is famous for its beautiful rings and is the second largest planet.",
  uranus: "Uranus is notable for its dramatic tilt and pale blue color.",
  neptune: "Neptune is the farthest planet from the Sun and is known for its deep blue color.",
  pluto: "Pluto is a dwarf planet in the Kuiper Belt, once considered the ninth planet."
};

const knowledgeBase = {
  'solar system': 'The Solar System consists of the Sun and the objects that orbit it, including planets, moons, asteroids, and comets.',
  'future human life': 'Scientists are exploring the possibility of human life on Mars and other planets. Technologies like space habitats and terraforming are being researched.',
  'book ticket': 'To book a ticket for a planet, please visit the booking page and select your destination.'
};

function getGeminiResponse(question) {
  question = question.toLowerCase();
  // Planet-specific answers
  for (const planet in planetFacts) {
    if (question.includes(planet)) return planetFacts[planet];
  }
  // General topics
  if (question.includes('solar system')) return knowledgeBase['solar system'];
  if (question.includes('future') || question.includes('human life') || question.includes('life on')) return knowledgeBase['future human life'];
  if (question.includes('book') || question.includes('ticket') || question.includes('reservation')) return knowledgeBase['book ticket'];
  // Booking page
  if (question.includes('how') && question.includes('book')) return knowledgeBase['book ticket'];
  return "I'm sorry, I can answer questions about the solar system, planets, future human life on other planets, or booking tickets. Try asking about a specific planet!";
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value;
  if (!userMessage.trim()) return;
  chatBox.innerHTML += `<div class='user-msg'>${userMessage}</div>`;
  const botResponse = getGeminiResponse(userMessage);
  chatBox.innerHTML += `<div class='bot-msg'>${botResponse}</div>`;
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Chatbot toggle logic

document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
  }

  // Suggested questions click handler
  const suggestions = document.querySelectorAll('.chat-suggestion');
  suggestions.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = document.getElementById('chat-input');
      input.value = btn.textContent;
      chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // Toggle button logic
  const chatbotContainer = document.getElementById('chatbot-container');
  let toggleBtn = document.getElementById('chatbot-toggle-btn');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'chatbot-toggle-btn';
    toggleBtn.title = 'Chat with Solar Explorer';
    toggleBtn.innerHTML = '<i class="fa fa-comments"></i>';
    document.body.appendChild(toggleBtn);
  }
  // Initial state: chatbot hidden
  if (chatbotContainer) {
    chatbotContainer.style.display = 'none';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '90px';
    chatbotContainer.style.right = '24px';
    chatbotContainer.style.width = '320px';
    chatbotContainer.style.maxWidth = '90vw';
    chatbotContainer.style.zIndex = '9999';
    chatbotContainer.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
    chatbotContainer.style.borderRadius = '12px';
    chatbotContainer.style.overflow = 'hidden';
  }
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '24px';
  toggleBtn.style.right = '24px';
  toggleBtn.style.background = '#222';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.width = '56px';
  toggleBtn.style.height = '56px';
  toggleBtn.style.fontSize = '28px';
  toggleBtn.style.zIndex = '10000';
  toggleBtn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.fontFamily = "'Montserrat', Arial, sans-serif";

  toggleBtn.onclick = function() {
    if (chatbotContainer.style.display === 'none') {
      chatbotContainer.style.display = 'block';
    } else {
      chatbotContainer.style.display = 'none';
    }
  };
});
