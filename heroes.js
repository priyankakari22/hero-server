'use strict';
var hapi=require("@hapi/hapi");
var joi=require("@hapi/joi");
require("dotenv").config();
var mysql=require("mysql");
var server=new hapi.server({
	host:"localhost",
	port:1000,
	routes:{
		cors:true
	}
	});
server.route({
	method:"GET",
	path:"/hero",
	handler:(request,reply)=>{
		return new Promise ((resolve,reject)=>{
			var connection=mysql.createConnection({
				host:process.env.DB_HOST,
				user:process.env.DB_USER,
				database:process.env.DB_NAME
				
			})
			connection.connect();

             connection.query('select * from hero', function (error, hero, fields) {
                if (error) reject(error);
                console.log(hero);
                resolve(hero);
              });
               
              connection.end();
		
		})
	}
	})
server.start((err)=>{
    if(err) throw err;
})
console.log("Server is started");
