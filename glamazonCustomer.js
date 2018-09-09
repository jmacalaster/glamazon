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
  
//For the function show inventory, first create and show a table of all of the inventory in the database 

function showInventory() {
  var query = "SELECT product_id, product_name, department_name, price, stock_quantity FROM inventory";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].product_id + " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: $" + res[i].price + " || Available Inventory: " + res[i].stock_quantity);
    };
  });
  pickaProduct();
};

//Run inquirer to see what product the consumer would like to purchase and how many items they would like to purchase 
//This function still works in the terminal, but has a bug where the question is asked before the inventory is 
//shown on the terminal. The user can still enter a number and the question will then bump back down to the lowest line

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

function pickaProduct(){
  inquirer.prompt(questions)
  .then(function(answer){
    var query2 = "SELECT stock_quantity, product_name FROM inventory WHERE ?";
    connection.query(query2, { product_id: answer.ProductID }, function(err, res) {
      if (res[0].stock_quantity >= answer.ProductQuant){
        console.log("Purchase sucessful! You just purchased " + answer.ProductQuant + " " + res[0].product_name + "s");
      }
    var updatedQuantity = parseInt(res[0].stock_quantity -= answer.ProductQuant);
    updateInventory(updatedQuantity);
    });
    function updateInventory(updatedQuantity){
      var query3 = "UPDATE inventory SET stock_quantity = " + updatedQuantity + "WHERE product_id=" + answer.ProductID;
    connection.query(query3, function(err, result) {
      if (err) throw err;
        console.log(result.affectedRows + " records updated");
      });
        console.log(answer.ProductID);
        console.log(updatedQuantity);
    }
  });
}


