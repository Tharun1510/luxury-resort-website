// Toggle menu for mobile
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", function () {
    const arrivalInput = document.querySelector('input[name="arrival"]');
    const departureInput = document.querySelector('input[name="departure"]');

    if (arrivalInput && departureInput) {
        new Datepicker(arrivalInput, {
            format: 'yyyy-mm-dd'
        });
        new Datepicker(departureInput, {
            format: 'yyyy-mm-dd'
        });
    }
});

// Headline text animation
const texts = [
    "TOUCHING YOUR HEART",
    "EXTEND YOUR SUMMER"
];

let currentIndex = 0;
let fromLeft = true;

function changeHeadlineText() {
    const headline = document.getElementById("headline-text");
    headline.classList.remove('slide-in-left', 'slide-in-right');

    setTimeout(() => {
        headline.textContent = texts[currentIndex];
        headline.classList.add(fromLeft ? 'slide-in-left' : 'slide-in-right');
        currentIndex = (currentIndex + 1) % texts.length;
        fromLeft = !fromLeft;
    }, 50);
}



// Room Data
const rooms = [
    { name: "Budget Room", capacity: 1, maxChildren: 2, price: 77, img: "images/room1.jpg" },
    { name: "Classic Room", capacity: 2, maxChildren: 4, price: 90.2, img: "images/room2.jpg" },
    { name: "Luxury Room", capacity: 3, maxChildren: 4, price: 120, img: "images/room3.webp" },
    { name: "Premium Room", capacity: 4, maxChildren: 5, price: 155, img: "images/room4.avif" },
    { name: "Single Room", capacity: 1, maxChildren: 1, price: 60, img: "images/room5.jpg" }
];

// Booking Form Logic
document.querySelector('.booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const adults = parseInt(this.querySelector('select[name="adults"]').value);
    const children = parseInt(this.querySelector('select[name="children"]').value);
    const roomResults = document.getElementById("room-results");

    // Hide hero
    document.querySelector(".hero").style.display = "none";
    //Hide Explore Section
    document.querySelector(".explore-section").style.display = "none";
    // hide Room options 
    document.querySelector(".room-options").style.display = "none";
    // hide review section
    document.querySelector(".review-section").style.display = "none";
    // Filter rooms
    const filteredRooms = rooms.filter(room =>
        room.capacity >= adults && room.maxChildren >= children
    );

    // Pick random 2–5 rooms
    const numberToShow = Math.min(filteredRooms.length, Math.floor(Math.random() * 4) + 2);
    const selectedRooms = filteredRooms.sort(() => 0.5 - Math.random()).slice(0, numberToShow);

    roomResults.innerHTML = '';

    if (selectedRooms.length === 0) {
        roomResults.innerHTML = `<p style="font-size: 18px;">Sorry, no rooms match your search.</p>`;
    } else {
        selectedRooms.forEach(room => {
            const card = document.createElement("div");
            card.classList.add("room-card");
            card.innerHTML = `
                <img src="${room.img}" alt="${room.name}">
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p>Capacity: ${room.capacity} Adult(s)</p>
                    <p>Max Children: ${room.maxChildren}</p>
                    <p>Price: <strong>$${room.price.toFixed(2)}</strong></p>
                    <button class="select-btn">SELECT THIS ROOM</button>
                </div>
            `;
            roomResults.appendChild(card);

            card.classList.add("loading");

            const loaderOverlay = document.createElement("div");
            loaderOverlay.classList.add("loader-overlay");
            loaderOverlay.innerHTML = `<div class="spinner"></div>`;
            card.appendChild(loaderOverlay);

            setTimeout(() => {
                // Remove loading spinner
                card.classList.remove("loading");
                loaderOverlay.remove();

                // Step 1: Initially show only basic room info + "SELECT THIS ROOM" button
                card.innerHTML = `
        <img src="${room.img}" alt="${room.name}">
        <div class="room-info">
            <h3>${room.name}</h3>
            <p>Capacity: ${room.capacity} Adult(s)</p>
            <p>Max Children: ${room.maxChildren}</p>
            <p>Price: <strong>$${room.price.toFixed(2)}</strong></p>
            <button class="select-btn">SELECT THIS ROOM</button>
        </div>
    `;

                // Step 2: Add click listener to the "SELECT THIS ROOM" button
                const selectBtn = card.querySelector(".select-btn");
                selectBtn.addEventListener("click", () => {
                    // Show detailed info + optional extras + "BOOK NOW" button
                    card.innerHTML = `
            <img src="${room.img}" alt="${room.name}">
            <div class="room-info">
                <h3>${room.name}</h3>
                <p>Capacity: ${room.capacity} &nbsp;&nbsp;&nbsp; Max Children: ${room.maxChildren}</p>
                <p>Price: <strong>$${room.price.toFixed(2)}</strong> <a href="#">(View price breakdown)</a></p>
                
                <h4>Optional Extras 🧳</h4>
                <label style="font-weight: bold;">
                    <input type="checkbox"> Airport Transfers
                </label>
                <p><strong>$11.00</strong> <em>/ Package</em></p>
                <button class="add-cart-btn">BOOK NOW</button>
            </div>
        `;

                    // Step 3: Add listener to "BOOK NOW" button
                    card.querySelector(".add-cart-btn").addEventListener("click", () => {
                        // Show success message
                        card.innerHTML = `
                <div class="success-message">
                    ✅ Room booked successfully!
                </div>
            `;

                        // Step 4: Reset UI after 2 seconds
                        setTimeout(() => {
                            // Show hero and explore sections again
                            document.querySelector(".hero").style.display = "block";
                            document.querySelector(".explore-section").style.display = "block";
                            //show Room options again
                            document.querySelector(".room-options").style.display = "block";
                            // Show review section again
                            document.querySelector(".review-section").style.display = "block";
                            // Hide room results section
                            document.querySelector("#room-results").style.display = "none";

                            // Reset the booking form fields
                            document.querySelector('.booking-form').reset();

                            // Restart headline text animation from the beginning
                            currentIndex = 0;
                            changeHeadlineText();

                            // Scroll back to top
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 2000);
                    });
                });
            }, 2000); // End of initial 2-second timeout after form submission

        });
    }

    // Re-trigger fade animation
    roomResults.classList.remove("fade-in");
    void roomResults.offsetWidth;
    roomResults.style.display = "grid";
    roomResults.classList.add("fade-in");
});
function displayRooms() {
    const container = document.getElementById("all-room-cards");
    rooms.forEach(room => {
        const card = document.createElement("div");
        card.classList.add("room-card");
        card.innerHTML = `
        <img src ="${room.img}" alt="${room.name}"/>
        <div class="room-info">
        <h3>${room.name}</h3>
        <p>All our Deluxe rooms have big windows to help you take a broad view of the cityscape and nature. We offer bigger bed and every</p>
        <hr>
        <h3>from $${room.price}/night</h3><span><button onclick="scrollToBooking()" type="button">Check Availability</button></span>
        </div>
        `;
        container.appendChild(card);
    });
}
const reviews = [
    {
        title: "Amazing Experience!",
        text: "I had a wonderful stay at this hotel. The staff were friendly and the room was clean and comfortable. Highly recommend!",
        stars: 5,
        name: "John Doe",
        date: "May 20, 2019",
        img: "images/user1.png"
    },
    {
        title: "Great Value for Money",
        text: "The hotel offered great amenities at a reasonable price. The breakfast was delicious and the location was perfect for exploring the city.",
        stars: 4,
        name: "Jane Smith",
        date: "June 15, 2019",
        img: "images/user2.png"
    },
    {
        title: "Not What I Expected",
        text: "The room was smaller than advertised and the service was slow. I expected more for the price I paid.",
        stars: 2,
        name: "Mike Johnson",
        date: "July 10, 2019",
        img: "images/user3.png"
    },
    {
        title: "Perfect for Families",
        text: "We had a great time with our kids. The hotel had a lot of family-friendly activities and the staff were very accommodating.",
        stars: 5,
        name: "Sarah Brown",
        date: "August 5, 2019",
        img: "images/user4.png"
    }
]
let currentReview = 0;
function displayReview(index) {
    const container = document.getElementById("review-content");

    // Add fade-out class
    container.classList.add("fade-out");

    // Wait for the fade-out transition to finish (match with CSS duration)
    setTimeout(() => {
        const review = reviews[index];
        container.innerHTML = `
            <h3>${review.title}</h3>
            <p>${review.text}</p>
            <div class="stars">${"★".repeat(review.stars)}</div>
            <div class="user-info">
                <img src="${review.img}" alt="${review.name}">
                <h4>${review.name}</h4>
                <span>${review.date}</span>
            </div>
        `;

        // Remove fade-out and add fade-in class
        container.classList.remove("fade-out");
        container.classList.add("fade-in");

        // Optional: remove fade-in after it's done to reset state
        setTimeout(() => {
            container.classList.remove("fade-in");
        }, 400); // match CSS transition duration
    }, 400); // match CSS transition duration
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    displayReview(currentReview);
}
function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    displayReview(currentReview);
}
//scrollTo Book Section
function scrollToBooking() {
    const formSection = document.getElementById("booking-form");
    const yOffset = -325;

    const y = formSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
}
function scrollToTop(e) {
    e.preventDefault();
    // show hero
    document.querySelector(".hero").style.display = "block";
    //show Explore Section
    document.querySelector(".explore-section").style.display = "block";
    // show Room options
    document.querySelector(".room-options").style.display = "block";
    // show review section
    document.querySelector(".review-section").style.display = "block";
    // hide room results section
    document.querySelector("#room-results").style.display = "none";
    // Reset booking form
    document.querySelector('.booking-form').reset();

    // Restart the headline animation
    currentIndex = 0;
    changeHeadlineText();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
function scrollToContact(e) {
    e.preventDefault();
    const contact = document.getElementById("contact");
    const yOffset = -300;
    const y = contact.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: y,
        behavior: "smooth"
    })
}
function scrollToAbout(e) {
    e.preventDefault();
    // show hero
    document.querySelector(".hero").style.display = "block";
    //show Explore Section
    document.querySelector(".explore-section").style.display = "block";
    // show Room options
    document.querySelector(".room-options").style.display = "block";
    // show review section
    document.querySelector(".review-section").style.display = "block";
    // hide room results section
    document.querySelector("#room-results").style.display = "none";
    // Reset booking form
    document.querySelector('.booking-form').reset();

    // Restart the headline animation
    currentIndex = 0;
    changeHeadlineText();
    const about = document.getElementById("About");
    const yOffset = -600;
    const y = about.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: y,
        behavior: "smooth"
    })
}
function scrollToRooms(e) {
    e.preventDefault();
    // show hero
    document.querySelector(".hero").style.display = "block";
    //show Explore Section
    document.querySelector(".explore-section").style.display = "block";
    // show Room options
    document.querySelector(".room-options").style.display = "block";
    // show review section
    document.querySelector(".review-section").style.display = "block";
    // hide room results section
    document.querySelector("#room-results").style.display = "none";
    // Reset booking form
    document.querySelector('.booking-form').reset();
    // Restart the headline animation
    currentIndex = 0;
    changeHeadlineText();
    const rooms = document.getElementById("Rooms");
    const YOffset = -85;
    const y = rooms.getBoundingClientRect().top + window.pageYOffset + YOffset;
    window.scrollTo({
        top: y,
        behavior: "smooth"
    })
}
window.addEventListener("DOMContentLoaded", () => {
    changeHeadlineText();
    setInterval(changeHeadlineText, 10000);
    displayRooms();
    displayReview(currentReview);
});