document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F12" || event.key === "Escape") {
    event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
});




const userList = document.getElementById('userList');
const signOutButton = document.getElementById('signOutButton');




// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc2hQrNFOgBTVjFmK6PXHTHvTmmeY-RDE",
  authDomain: "kinolar-57498.firebaseapp.com",
  projectId: "kinolar-57498",
  storageBucket: "kinolar-57498.appspot.com",
  messagingSenderId: "440752215048",
  appId: "1:440752215048:web:33f514d74626d025d1adbd",
  measurementId: "G-06T6RPRBMX",
};





// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();




function signOut() {
  // Sign out the user
  auth.signOut();

  // Redirect to login page
  window.location.href = 'login.html';

};

// Tizimga kirish muvaffaqiyatli bo'lsa
function handleLoginSuccess() {
  document.cookie = "user=loggedIn; path=/"; // Cookie o'rnatish
  window.location.href = 'index.html'; // Bosh sahifaga yo'naltirish
}

function handleLogout() {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Cookie'ni o'chirish
  window.location.href = 'login.html'; // Login sahifasiga yo'naltirish
}



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = function() {
  const userCookie = getCookie('user'); // 'user' cookie'sini tekshirish
  if (!userCookie) {
    window.location.href = 'login.html';
  } else {
    window.location.href = 'index.html';
  }
};


window.onload = function() {
  const userCookie = getCookie('user'); // 'user' cookie'sini tekshirish
  if (!userCookie) {
    // Agar cookie mavjud bo'lmasa, login sahifasida qoldiring
    console.log("Foydalanuvchi tizimga kirmagan.");
  } else {
    window.location.href = 'login.html'; // Bosh sahifaga yo'naltirish
  }
};




// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;

      auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Successful signup
              const user = userCredential.user;
              console.log("User signed up successfully:", user);
              window.location.href = 'login.html'; // Redirect to login page
          })
          .catch((error) => {
              // Error handling
              const errorMessage = error.message;
              document.getElementById('signupError').textContent = errorMessage;
          });
  });
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Successful login
              const user = userCredential.user;
              console.log("User logged in successfully:", user);
              window.location.href = 'index.html'; // Redirect to home page
          })
          .catch((error) => {
              // Error handling
              const errorMessage = error.message;
              document.getElementById('loginError').textContent = errorMessage;
          });
  });
}
const firestore = firebase.firestore(); // Add Firestore initialization
const usersRef = firestore.collection('users'); // Reference to the users collection

// Function to fetch and display users
function fetchUsers() {
  usersRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(userData);
      const listItem = document.createElement('li');
      listItem.textContent = userData.email; // Assuming users have an 'email' field
      userList.appendChild(listItem);
    });
  }).catch((error) => {
    console.error("Error fetching users: ", error);
  });
}

// Call the function to fetch and display users
fetchUsers();

// Sign out functionality
signOutButton.addEventListener('click', () => {
  auth.signOut().then(() => {
    console.log("User signed out.");
  }).catch((error) => {
    console.error("Sign out error: ", error);
  });
});

