const textarea = document.getElementById('input_3');

// Function to resize the textarea dynamically
function autoResize() {
    console.log('resize');
    // Reset the height to auto to calculate the correct height
    textarea.style.height = 'auto';
    // Set the new height based on the scrollHeight
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Event listener to trigger on input
textarea.addEventListener('input', autoResize);

// Optional: Initialize the height when the page loads, in case there's initial content
window.addEventListener('load', autoResize);


document.addEventListener("DOMContentLoaded", () => {


    // nav bar
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector(".nav2");
    const navClose = document.querySelector(".nav-close");

    // Open the nav when the hamburger is clicked
    hamburger.addEventListener("click", () => {

        nav.classList.toggle("active");
    });

    // Close the nav when the close button is clicked
    navClose?.addEventListener("click", () => {
        nav.classList.remove("active");
    });

    // Optional: Close the nav when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove("active");
        }
    });


    // scroll effect

    const container = document.querySelector(
        '.beforeLg\\:flex-grow.beforeLg\\:relative.lg\\:top-0.lg\\:z-1.lg\\:pointer-events-none.overflow-hidden.lg\\:h-lview.lg\\:sticky'
    );



    if (!container) {
        console.error("Container not found");
        return;
    }

    let hasReachedTop = false; // Flag to check if the container has reached the top
    const revealedWidth = 66.6666666667; // The fixed width that will be revealed (in percentage)
    let clipPathWidth = 100;

    // Define the IntersectionObserver to track when the container hits the top of the viewport

    if (window.innerWidth > 889) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio === 1) {

                        hasReachedTop = true;
                    }
                });
            },
            {
                rootMargin: "0px 0px 0px 0px", // Track when the container reaches the top of the viewport
                threshold: 1.0 // Ensure the whole container is in view before triggering the effect
            }
        );

        // Start observing the container
        observer.observe(container);
    }


    // Define the observer options
    const options = {
        root: null, // null means the viewport
        rootMargin: '0px', // You can adjust this to add a margin around the viewport
        threshold: 0 // Trigger when any part of the container is out of the viewport
    };

    // Define the callback function to run when visibility changes
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

            } else {

                clipPathWidth = 100;
                container.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
                hasReachedTop = false;
            }
        });
    };

    // Create the observer instance
    const observer2 = new IntersectionObserver(observerCallback, options);

    // Start observing the container
    if (container) {
        observer2.observe(container);
    }

    // Handle the scroll event to shrink the image
    function handleScroll() {
        if (!hasReachedTop) return; // Ensure the effect only starts once the container has reached the top



        // Set the clipPath to reveal the content behind the image gradually
        if (clipPathWidth < revealedWidth) {
            return
        }
        const clipPath = `polygon(0% 0%, ${clipPathWidth}% 0%, ${clipPathWidth}% 100%, 0% 100%)`;
        clipPathWidth -= 3;

        container.style.clipPath = clipPath;

        // this as i scroll down, the image shrinks to reveal the content behind it
        // this is the effect that is achieved

    }

    // Add the scroll event listener
    document.addEventListener("scroll", handleScroll);

    // Ensure full width on page load (initial state)
    container.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";



});

// images

let currentImageIndex = 0;
const images = [
    './media/IMG-8102.jpg',
    './media/IMG_3553.jpg',
    './media/IMG_3556.jpg',
    './media/IMG_3557.jpg',
    './media/IMG_3800.jpg',
    './media/IMG_3832.jpg',
    './media/IMG_3833.jpg',
    './media/IMG_3850.jpg',
    './media/IMG_3851.jpg',
    './media/IMG_3907.jpg',
    './media/IMG_3922.jpg',
    './media/IMG_3970.jpg',
    './media/IMG_3973.jpg',
    './media/IMG_4014.jpg'
];

function openModal(index) {

    currentImageIndex = index;
    document.getElementById("modalImage").src = images[currentImageIndex];
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {

    document.getElementById("myModal").style.display = "none";
}

function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    document.getElementById("modalImage").src = images[currentImageIndex];
}








(function () {
    emailjs.init('BNYx2BsJ-s1E9oy_o');
})();


const form = document.querySelector('.formkit-form');
const nameInput = form.querySelector('input[name="fullname"]');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="body"]');

function validateForm() {
    clearMessages();
    let isValid = true;

    // Clear previous messages
    clearMessages();

    // Validate Full Name
    if (!nameInput.value.trim()) {
        showMessage("Full name is required.", "error", nameInput);
        isValid = false;
    }

    // Validate Email
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
        showMessage("Email is required.", "error", emailInput);
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        showMessage("Please enter a valid email address.", "error", emailInput);
        isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
        showMessage("Message cannot be empty.", "error", messageInput);
        isValid = false;
    }

    return isValid;
}

function showMessage(text, type, field) {
    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.className = 'formkit-message';
    messageElement.dataset.messageType = type;
    messageElement.innerText = text;

    // Style based on type
    if (type === "error") {
        messageElement.style.color = "#ff3a28";
    } else if (type === "success") {
        messageElement.style.color = "#28a745";
    }

    // Insert the message after the field
    field.closest('.formkit-outer').appendChild(messageElement);

    // Highlight the field (optional)
    field.style.borderColor = type === "error" ? "#ff3a28" : "";
}

function successMessage() {
    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.className = 'formkit-message';
    messageElement.dataset.messageType = "success";
    messageElement.innerText = "Message sent successfully!";

    console.log('Message sent successfully!');

    // Insert the message after the field
    messageInput.closest('.formkit-outer').appendChild(messageElement);

}

function errorMessage() {
    // Create a message element
    const messageElement = document.createElement('div');
    messageElement.className = 'formkit-message';
    messageElement.dataset.messageType = "error";
    messageElement.innerText = "Failed to send the message. Please try again later.";

    console.log('Failed to send the message. Please try again later.');

    // Insert the message after the field
    messageInput.closest('.formkit-outer').appendChild(messageElement);

}


function clearMessages() {
    const messages = form.querySelectorAll('.formkit-message');
    messages.forEach(msg => msg.remove());

    const inputs = form.querySelectorAll('input, div[name="message"]');
    inputs.forEach(input => input.style.borderColor = '');
}

form.addEventListener('submit', async (event) => {

    event.preventDefault();
    if (!validateForm()) return;

    // const formData = new FormData();
    // formData.append('fullname', nameInput.value.trim());
    // formData.append('email', emailInput.value.trim());
    // formData.append('body', messageInput.innerText.trim());
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    try {
        await emailjs.sendForm('service_r3hx8aj', 'template_jaqzod9', form);
        successMessage();
        messageInput.value = '';
        emailInput.value = '';
        nameInput.value = '';
    } catch (error) {
        console.error(error);
        errorMessage();
    };
});