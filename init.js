const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log("Connection failed:", err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ChatterBox");
}

const allChats = [
    { from: "neha", to: "priya", msg: "send me your exam sheet" },
    { from: "rohit", to: "aman", msg: "Let's meet at 5 PM" },
    { from: "ananya", to: "neha", msg: "Did you complete the project?" },
    { from: "priya", to: "rohit", msg: "Good luck for the test!" },
    { from: "aman", to: "ananya", msg: "Happy Birthday! Have a great day!" }
];

async function insertChats() {
    try {
        await Chat.insertMany(allChats);
        console.log("Chats inserted successfully!");
    } catch (error) {
        console.error("Error inserting chats:", error);
    } finally {
        mongoose.connection.close();
    }
}

insertChats();
