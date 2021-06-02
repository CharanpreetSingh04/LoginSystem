const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const mysqlConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

/*router.get('/init',(req,res) =>{
	mysqlConnection.query("SELECT * from user", function(err, rows, fields) {
		if(err) throw err;
		//console.log(rows);
		res.send(rows);
	});
});*/
module.exports = router;