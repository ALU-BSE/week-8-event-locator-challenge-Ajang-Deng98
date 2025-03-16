document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.getAttribute("data-page");

    // ✅ Home Page Search Functionality
    if (page === "index") {
        document.querySelector(".search-btn").addEventListener("click", function () {
            const nameQuery = document.getElementById("event-name").value.trim();
            const dateQuery = document.getElementById("event-date").value;
            const categoryQuery = document.getElementById("event-category").value;

            if (!nameQuery && !dateQuery && !categoryQuery) {
                alert("Please enter at least one search criterion!");
                return;
            }

            localStorage.setItem("searchCriteria", JSON.stringify({ nameQuery, dateQuery, categoryQuery }));
            window.location.href = "events.html"; 
        });
    }

    // ✅ Events Page Functionality
    if (page === "events") {
        const eventContainer = document.getElementById("featured-events");

        const events = [
            { id: 1, name: "Crude Oil and Refined Products Sales", date: "2025-03-03", location: "Kigali, Rwanda", description: "5-day course on crude oil trading and risk management.", category: "workshop" },
            { id: 2, name: "Digital Diplomacy Course", date: "2025-03-03", location: "Kigali, Rwanda", description: "Examining digital diplomacy impacts on global affairs.", category: "workshop" },
            { id: 3, name: "HOLOCENE FEST 3.0", date: "2025-03-01", location: "Kigali, Rwanda", description: "An exciting festival in Kigali.", category: "festival" },
            { id: 4, name: "Rwanda Cycling World Championships 2025", date: "2025-09-01", location: "Kigali, Rwanda", description: "Historic UCI Road World Championships in Africa.", category: "sports" },
            { id: 5, name: "Formula One Grand Prix Bid Announcement", date: "2024-12-13", location: "Kigali, Rwanda", description: "Rwanda's bid to host an F1 Grand Prix.", category: "sports" }
        ];

        localStorage.setItem("eventsList", JSON.stringify(events));

        const searchCriteria = JSON.parse(localStorage.getItem("searchCriteria")) || {};

        function filterEvents(nameQuery, dateQuery, categoryQuery) {
            return events.filter(event => {
                return (!nameQuery || event.name.toLowerCase().includes(nameQuery.toLowerCase())) &&
                       (!dateQuery || event.date === dateQuery) &&
                       (!categoryQuery || event.category.toLowerCase() === categoryQuery.toLowerCase());
            });
        }

        const filteredEvents = filterEvents(searchCriteria.nameQuery, searchCriteria.dateQuery, searchCriteria.categoryQuery);

        eventContainer.innerHTML = filteredEvents.length
            ? filteredEvents.map(event => `
                <div class="col-md-4">
                    <div class="card p-3">
                        <h5>${event.name}</h5>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <button class="btn btn-primary" onclick="viewEvent(${event.id})">View Details</button>
                    </div>
                </div>
            `).join("")
            : `<p class="text-center text-danger">No events found.</p>`;
    }

    // ✅ Event Details Page Functionality
    if (page === "event-details") {
        const selectedEvent = JSON.parse(localStorage.getItem("selectedEvent"));

        if (selectedEvent) {
            document.getElementById("event-name").textContent = selectedEvent.name;
            document.getElementById("event-date").textContent = `📅 Date: ${selectedEvent.date}`;
            document.getElementById("event-location").textContent = `📍 Location: ${selectedEvent.location}`;
            document.getElementById("event-description").textContent = `📝 ${selectedEvent.description}`;
        } else {
            document.getElementById("event-details").innerHTML = "<p class='text-center text-danger'>Event not found.</p>";
        }
    }
});

// ✅ Function to save selected event and navigate to details page
function viewEvent(eventId) {
    const events = JSON.parse(localStorage.getItem("eventsList"));
    const selectedEvent = events.find(event => event.id === eventId);
    localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
    window.location.href = "event-details.html";
}
