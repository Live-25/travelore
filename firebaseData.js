import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"; // Import Realtime Database functions

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXvd-CqO7quMMpgrEzFi_cL3NpFCtu5no",
  authDomain: "travelore-88cad.firebaseapp.com",
  projectId: "travelore-88cad",
  storageBucket: "travelore-88cad.firebasestorage.app",
  messagingSenderId: "523870826671",
  appId: "1:523870826671:web:2e9c67832ff6cdabab645a",
  measurementId: "G-VT9H8RGF2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

// Function to fetch destinations from Realtime Database
async function fetchDestinations() {
  try {
    const destinationsRef = ref(db, 'destinations');
    const snapshot = await get(destinationsRef);

    if (snapshot.exists()) {
      const popularList = document.getElementById("popular-list");
      const data = snapshot.val(); 

      Object.keys(data).forEach((key) => {
        const destination = data[key];
        const listItem = document.createElement("li");
        listItem.classList.add("popular-item");

        listItem.innerHTML = `
          <div class="popular-card">
            <figure class="card-img">
              <img src="${destination.image}" alt="${destination.title}, ${destination.location}" loading="lazy">
            </figure>
            <div class="card-content">
              <div class="card-rating">
                ${getStarIcons(destination.rating)}
              </div>
              <p class="card-subtitle">
                <a href="#">${destination.location}</a>
              </p>
              <h3 class="h3 card-title">
                <a href="#">${destination.title}</a>
              </h3>
              <p class="card-text">
                ${destination.description}
              </p>
            </div>
          </div>
        `;
        popularList.appendChild(listItem);
      });
    } else {
      console.log("No destinations data available");
    }
  } catch (error) {
    console.error("Error fetching destinations data: ", error);
  }
}

// Function to fetch packages from Realtime Database
async function fetchPackages() {
  try {
    const packagesRef = ref(db, 'packages');
    const snapshot = await get(packagesRef);

    if (snapshot.exists()) {
      const packageList = document.getElementById("package-list");
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        const packageData = data[key];
        const listItem = document.createElement("li");
        listItem.classList.add("package-card-item");

        listItem.innerHTML = `
          <div class="package-card">
            <figure class="card-banner">
              <img src="${packageData.image}" alt="${packageData.title}" loading="lazy">
            </figure>
            <div class="card-content">
              <h3 class="h3 card-title">${packageData.title}</h3>
              <p class="card-text">${packageData.description}</p>
              <ul class="card-meta-list">
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="time"></ion-icon>
                    <p class="text">${packageData.duration}</p>
                  </div>
                </li>
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="people"></ion-icon>
                    <p class="text">pax: ${packageData.pax}</p>
                  </div>
                </li>
                <li class="card-meta-item">
                  <div class="meta-box">
                    <ion-icon name="location"></ion-icon>
                    <p class="text">${packageData.location}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-price">
              <p class="reviews">(${packageData.reviews} reviews)</p>
              <div class="card-rating">
                ${getStarIcons(packageData.rating)}
              </div>
              <p class="price">
                $${packageData.price}
                <span>/ per person</span>
              </p>
              <button class="btn btn-secondary">Book Now</button>
            </div>
          </div>
        `;
        packageList.appendChild(listItem);
      });
    } else {
      console.log("No packages data available");
    }
  } catch (error) {
    console.error("Error fetching packages data: ", error);
  }
}

// Function to generate star icons based on rating
function getStarIcons(rating) {
  let stars = '';
  for (let i = 0; i < rating; i++) {
    stars += '<ion-icon name="star"></ion-icon>';
  }
  return stars;
}

// Call fetchDestinations and fetchPackages when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchDestinations();
  fetchPackages();
});
