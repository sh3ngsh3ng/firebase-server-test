const express = require("express");
const admin = require("firebase-admin");
const { getAuth, connectAuthEmulator } = require('firebase-admin/auth');
require("dotenv").config();

// create an instance of express app
let app = express();

const adminApp = admin.initializeApp({
    projectId: "firebase-server-test" // must match the project started by the emulator
});

console.log(adminApp)

// get all users
const getAllUsers = async () => {
    // console.log(await adminApp.auth().listUsers()) // same as below
    console.log(await adminApp.auth().listUsers())
}

// verify token
const getUserData = async (uid) => {
    console.log(await adminApp.auth().getUser(uid))
}

async function main() {
    // console.log(getAuth())
    // getAllUsers()
    getUserData("FufB7Y6diV5HQ0tRiEIUu9OCDGEA") // change it accordingly to what was created in emulator
}

main();

app.listen(3000, () => {
    console.log("Server has started");
});





// if (useEmulator) {
//     process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
// }

// process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
// const { useEmulator } = require('firebase-admin/auth');
// const firebaseApp = admin.initializeApp({ projectId: "firebase-server-test" });

// if (process.env.NODE_ENV === 'development') {
// useEmulator(admin.auth(), 'localhost:9099');
// }

// const auth = getAuth(firebaseApp)
// useEmulator(auth, process.env.FIREBASE_AUTH_EMULATOR_HOST)
