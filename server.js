const express = require("express");
const admin = require("firebase-admin");
const { getAuth } = require('firebase-admin/auth');
require("dotenv").config();

// create an instance of express app
let app = express();

const adminApp = admin.initializeApp({
    projectId: "firebase-server-test" // must match the project started by the emulator
});

console.log(adminApp)

// get all users
const getAllUsers = async () => {
    // console.log(await getAuth().listUsers()) // same as below
    console.log(await adminApp.auth().listUsers())
}

// verify token
const getUserData = async (uid) => {
    console.log(await adminApp.auth().getUser(uid))
}

async function main() {
    // console.log(getAuth())
    getAllUsers()
    // getUserData("FufB7Y6diV5HQ0tRiEIUu9OCDGEA") // change it accordingly to what was created in emulator
}

main();

app.listen(3000, () => {
    console.log("Server has started");
});
