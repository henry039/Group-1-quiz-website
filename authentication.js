const fs = require('fs');

module.exports = class Auth {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    login() {
        fs.readFile('./loginDetails.json', (err, data) => {
            if (err) throw err;

            let storedUserData = JSON.parse(data);
            let inputUserData = this.req.body;

            let emailMatchVal;
            let passwordMatchVal;
            //variable to be used to validate user details
            let userMatch;
            
            //if statement to check if email address matches
            if(storedUserData[0].email === inputUserData.loginEmail) {
                console.log("User email address matches");
                emailMatchVal = true;
            } else {
                console.log("User email address does not match");
                emailMatchVal = false;
            }

            //if statement to check if password matches
            if(storedUserData[0].password === inputUserData.loginPassword) {
                console.log("User password matches");
                passwordMatchVal = true;
            } else {
                console.log("User password does not match");
                emailMatchVal = false;
            }

            //if statement to check both email address and password are correct
            if(emailMatchVal === true && passwordMatchVal === true) {
                console.log("Both email address and password match");
                userMatch = true;
            }
        });
    }
    signup() {
        fs.readFile('./loginDetails.json', (err, data) => {
            if (err) throw err;

            let storedUserData = JSON.parse(data);
            let inputUserData = this.req.body;

            let updatedJSON;
            
            //if statement to check if both email address and password have been submitted
            //else part used to store data in json file if both email address and password are present
            if(inputUserData.email === '' || inputUserData.password === '') {
                console.log("Error. Please enter both email address and a password");
            } else {
                storedUserData.push(inputUserData);
                updatedJSON = JSON.stringify(storedUserData);
            }
            //used to to write the updated array to the JSON file
            fs.writeFile('./loginDetails.json', updatedJSON, (err) => {
                if (err) throw err;
                console.log("File has been saved");
            });
        });
    };
    // play() {

    // };
}