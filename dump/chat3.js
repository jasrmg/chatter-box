// Profile Modal Functionality
const profileTrigger = document.getElementById("profile-trigger");
const profileModal = document.getElementById("profile-modal");
const modalClose = document.getElementById("modal-close");

profileTrigger.addEventListener("click", () => {
  profileModal.classList.remove("opacity-0");
  profileModal.classList.remove("pointer-events-none");
});

modalClose.addEventListener("click", () => {
  profileModal.classList.add("opacity-0");
  profileModal.classList.add("pointer-events-none");
});

// Close modal when clicking outside
profileModal.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.classList.add("opacity-0");
    profileModal.classList.add("pointer-events-none");
  }
});

// Mobile menu toggle
const menuButton = document.getElementById("menu-button");
const sidebar = document.querySelector(".bg-white.md\\:w-80");

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Hide sidebar by default on mobile
if (window.innerWidth < 768) {
  sidebar.classList.add("hidden");
  sidebar.classList.add("absolute");
  sidebar.classList.add("z-10");
  sidebar.classList.add("h-full");
  sidebar.classList.add("w-80");
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sidebar.classList.add("hidden");
    sidebar.classList.add("absolute");
    sidebar.classList.add("z-10");
    sidebar.classList.add("h-full");
    sidebar.classList.add("w-80");
  } else {
    sidebar.classList.remove("hidden");
    sidebar.classList.remove("absolute");
    sidebar.classList.remove("z-10");
  }
});

// Message input and sending functionality
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages-container");

// Function to handle sending messages
function sendMessage() {
  const messageText = messageInput.innerText.trim();
  if (messageText) {
    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    // Create new message element
    const newMessage = document.createElement("div");
    newMessage.className = "flex items-end justify-end";
    newMessage.innerHTML = `
            <div class="bg-primary rounded-lg rounded-br-none px-4 py-2 max-w-xs md:max-w-md shadow">
              <p class="font-robot text-sm text-white">${messageText}</p>
              <p class="text-xs text-white opacity-70 mt-1">${timeString}</p>
            </div>
          `;

    // Add to message container
    const spaceY = document.querySelector(".space-y-4");
    spaceY.appendChild(newMessage);

    // Clear input field
    messageInput.innerText = "";

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Handle send button click
sendButton.addEventListener("click", sendMessage);

// Handle Enter key press (send on Enter, new line on Shift+Enter)
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto-resize input based on content
messageInput.addEventListener("input", () => {
  // Reset height to auto to get the correct scrollHeight
  messageInput.style.height = "auto";

  // Set height based on content (with a maximum)
  const newHeight = Math.min(messageInput.scrollHeight, 120);
  messageInput.style.height = `${newHeight}px`;

  // Adjust border radius based on content
  if (messageInput.scrollHeight > 40) {
    messageInput.classList.remove("rounded-full");
    messageInput.classList.add("rounded-2xl");
  } else {
    messageInput.classList.remove("rounded-2xl");
    messageInput.classList.add("rounded-full");
  }
});

// Initial scroll to bottom of messages
messagesContainer.scrollTop = messagesContainer.scrollHeight;

messageInput.addEventListener("input", () => {
  messageInput.style.height = "auto"; // Reset height
  messageInput.style.height = messageInput.scrollHeight + "px"; // Adjust to content
});

//
