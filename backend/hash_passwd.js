// backend/hash_password.js
import bcrypt from "bcrypt";

const passwordToHash = "1234";
const saltRounds = 10;

bcrypt.hash(passwordToHash, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("----------------------------------------------------------------");
    console.log("New password hash for '1234':");
    console.log(hash);
    console.log("----------------------------------------------------------------");
});