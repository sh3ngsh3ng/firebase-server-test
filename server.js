const express = require("express");
const admin = require("firebase-admin");
const { getAuth, verifyIdToken } = require('firebase-admin/auth');
require("dotenv").config();

// create an instance of express app
let app = express();

const adminApp = admin.initializeApp({
    projectId: "firebase-server-test" // must match the project started by the emulator
});

// get all users
const getAllUsers = async () => {
    // console.log(await getAuth().listUsers()) // same as below
    console.log(await adminApp.auth().listUsers())
}

const getUserData = async (uid) => {
    console.log(await adminApp.auth().getUser(uid))
}

const verifyTokenInEmulator = async (idToken) => {
    let checkRevoked = true
    getAuth().verifyIdToken(idToken, checkRevoked).then((payload) => console.log("token is valid =>", payload)).catch((error) => {
        if (error.code == "auth/id-token-revoked") {
            console.log("token is revoked")
        } else {
            console.log("token is invalid")
        }
    })
}

const revokeRefreshTokenInEmulator = async (uid) => {
    try {
        const result = await adminApp.auth().revokeRefreshTokens(uid)
        console.log(result)
    } catch (e) {
        console.log("err => ", e)
    }

}

async function main() {
    verifyTokenInEmulator("eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiZmF3ZSIsImVtYWlsIjoic3VwZXJ1c2VyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYXV0aF90aW1lIjoxNzAyMzcxMTc0LCJ1c2VyX2lkIjoidGQ4SmZ5NU5wV0wyMkNlWWNDbEU3bE0xQnE0WSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VwZXJ1c2VyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn0sImlhdCI6MTcwMjM3MTE3NCwiZXhwIjoxNzAyMzc0Nzc0LCJhdWQiOiJmaXJlYmFzZS1zZXJ2ZXItdGVzdCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9maXJlYmFzZS1zZXJ2ZXItdGVzdCIsInN1YiI6InRkOEpmeTVOcFdMMjJDZVljQ2xFN2xNMUJxNFkifQ.")

    // revokeRefreshTokenInEmulator("td8Jfy5NpWL22CeYcClE7lM1Bq4Y")

    // getUserData("FufB7Y6diV5HQ0tRiEIUu9OCDGEA") // change it accordingly to what was created in emulator
}

main();

app.listen(3000, () => {
    console.log("Server has started");
});
