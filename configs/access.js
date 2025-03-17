require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;

//export the configuration object
module.exports = accessToken;
