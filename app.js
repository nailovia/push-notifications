import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js";

// Yahan Firebase Console se apna Config paste karein
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

window.requestPermission = function() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // VAPID key Firebase Console -> Cloud Messaging -> Web Push certificates se milegi
            getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_HERE' }).then((currentToken) => {
                if (currentToken) {
                    console.log('Token generated:', currentToken);
                    alert("Notifications Enabled Successfully!");
                    // Yahan aap is token ko apne database (Firestore) mein save karne ka code lagayenge
                    // window.location.href = "https://yourblog.blogspot.com"; 
                } else {
                    console.log('No registration token available.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}
