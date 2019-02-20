var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'bamazonDB',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
  });
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter the Id of the product you want to buy',
        name: 'product_id',
      },
      {
        type: 'input',
        message: 'How many would you like to buy?',
        name: 'quantity',
      },
    ])
    .then(function(answers) {
      connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
        [answers.quantity, answers.product_id],
        function(err, res) {
          if (err) throw err;
          console.log('Database updated');
        },
      );

      connection.query(
        'Select price FROM products WHERE item_id = ?',
        [answers.product_id],
        function(err, res) {
          if (err) throw err;
          console.log('This will cost $' + res[0].price * answers.quantity);
        },
      );
    });
}
