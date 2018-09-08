//NPM packages we require 

var mysql = require("mysql");
var inquirer = require("inquirer");

//Require dotenv for secure storage of my server password 

require('dotenv').config();

//Create a variable for the password

var serverPassword = process.env.SERVER_PASSWORD;

//Connect to your local server

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: serverPassword,
  database: "glamazon"
});

//Once the connection is established, run the functions showInventory and runSearch 

connection.connect(function(err) {
  if (err) throw err;
  showInventory();
});
  
//For the function run inventory, first create and show a table of all of the inventory in the database 

function showInventory() {
  var query = "SELECT product_id, product_name, department_name, price, stock_quantity FROM inventory";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].product_id + " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: $" + res[i].price + " || Available Inventory: " + res[i].stock_quantity);
    };
  });
    inquirer.prompt(questions, processAnswers);
};

//Run inquirer to see what product the consumer would like to purchase and how many items they would like to purchase 

var questions = [
  {
    name: "ProductID",
    type: "input",
    message: "What product would you list to purchase? Write the product ID below:"
  },
  {
    name: "ProductQuant",
    type: "input",
    message: "How many would you like?"
  }

];

function processAnswers(answers){
  console.log("And your answers were: " + answers);
};


