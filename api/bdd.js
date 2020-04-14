// https://github.com/mysqljs/mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tp-ang'
});

connection.connect();

connection.query('SELECT * from users', function(error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();