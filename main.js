document.addEventListener("DOMContentLoaded", () => {
    // Get the current URL
    const currentPath = window.location.pathname;

    // Temporarily hide `.html` for cosmetic purposes
    if (currentPath.endsWith(".html")) {
        const newPath = currentPath.replace(/\.html$/, "");
        window.history.replaceState({}, "", newPath); // Use replaceState to prevent history issues
    }
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
const form = document.getElementById('input_00');

form.addEventListener('submit', async (event) => {
    console.log("submitted");
    event.preventDefault();

    // Get input values dynamically
    const name = document.querySelector('input[name="fullname"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('div[name="message"]').innerText.trim();

    // Validate fields
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert form fields into a FormData object
    const formData = new FormData();
    formData.append('fullname', name);
    formData.append('email', email);
    formData.append('message', message);

    // Send the form via emailjs
    emailjs
        .sendForm('service_r3hx8aj', 'template_jaqzod9', form)
        .then(() => {
            alert('Message sent successfully!');
            form.reset(); // Clear the form
            document.querySelector('div[name="message"]').innerText = ''; // Clear the editable div
        })
        .catch((e) => {
            alert('Failed to send the message. Please try again later.');
            console.error(e);
        });
});