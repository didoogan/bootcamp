var faker = require("faker");

console.log("********************")
console.log("Welcome to my shop *");
console.log("********************")

faker.locale = "ru";
for (var i = 0; i < 10; i++) {
    console.log(faker.commerce.product() + " - " + faker.commerce.price() + "$");
}