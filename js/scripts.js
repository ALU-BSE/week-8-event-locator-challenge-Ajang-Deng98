document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.getAttribute("data-page"); // Identify the current page

    // ✅ If the user is on the Home Page (index.html)
    if (page === "index") {
        document.querySelector(".btn-light").addEventListener("click", function () {
            const nameQuery = document.querySelector('input[type="text"]').value.trim();
            const dateQuery = document.querySelector('input[type="date"]').value;
            const categoryQuery = document.querySelector('select').value;

            if (!nameQuery && !dateQuery && !categoryQuery) {
                alert("Please enter at least one search criterion!");
                return;
            }

            localStorage.setItem("searchCriteria", JSON.stringify({ nameQuery, dateQuery, categoryQuery }));
            window.location.href = "events.html"; // Redirect to event list page
        });
    }

    // ✅ If the user is on the Events Page (events.html)
    if (page === "events") {
        const eventContainer = document.getElementById("featured-events");

        const events = [
            { id: 1, name: "Crude Oil and Refined Products Sales", date: "2025-03-03", location: "Kigali, Rwanda", description: "5-day course on crude oil trading and risk management.", category: "Workshop" },
            { id: 2, name: "Digital Diplomacy Course", date: "2025-03-03", location: "Kigali, Rwanda", description: "Examining digital diplomacy impacts on global affairs.", category: "Workshop" },
            { id: 3, name: "HOLOCENE FEST 3.0", date: "2025-03-01", location: "Kigali, Rwanda", description: "An exciting festival in Kigali.", category: "Festival" },
            { id: 4, name: "Rwanda Cycling World Championships 2025", date: "2025-09-01", location: "Kigali, Rwanda", description: "Historic UCI Road World Championships in Africa.", category: "Sports" },
            { id: 5, name: "Formula One Grand Prix Bid Announcement", date: "2024-12-13", location: "Kigali, Rwanda", description: "Rwanda's bid to host an F1 Grand Prix.", category: "Sports" }
        ];

        // Store all events in localStorage (so details page can access them)
        localStorage.setItem("eventsList", JSON.stringify(events));

        // Retrieve search criteria
        const searchCriteria = JSON.parse(localStorage.getItem("searchCriteria")) || {};

        function filterEvents(nameQuery, dateQuery, categoryQuery) {
            return events.filter(event => {
                const matchesName = nameQuery ? event.name.toLowerCase().includes(nameQuery.toLowerCase()) : true;
                const matchesDate = dateQuery ? event.date === dateQuery : true;
                const matchesCategory = categoryQuery ? event.category.toLowerCase() === categoryQuery.toLowerCase() : true;
                return matchesName && matchesDate && matchesCategory;
            });
        }

        // Filter and display events
        const filteredEvents = filterEvents(searchCriteria.nameQuery, searchCriteria.dateQuery, searchCriteria.categoryQuery);

        if (filteredEvents.length > 0) {
            eventContainer.innerHTML = filteredEvents.map(event => `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p><strong>Date:</strong> ${event.date}</p>
                            <p><strong>Location:</strong> ${event.location}</p>
                            <button class="btn btn-primary" onclick="viewEvent(${event.id})">View Details</button>
                        </div>
                    </div>
                </div>`).join("");
        } else {
            eventContainer.innerHTML = `<p class="text-center text-danger">No events found.</p>`;
        }
    }

    // ✅ If the user is on the Event Details Page (event-details.html)
    if (page === "event-details") {
        const selectedEvent = JSON.parse(localStorage.getItem("selectedEvent"));

        if (selectedEvent) {
            document.getElementById("event-name").textContent = selectedEvent.name;
            document.getElementById("event-date").textContent = selectedEvent.date;
            document.getElementById("event-location").textContent = selectedEvent.location;
            document.getElementById("event-description").textContent = selectedEvent.description;
        } else {
            document.getElementById("event-details").innerHTML = "<p class='text-center'>Event not found.</p>";
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
