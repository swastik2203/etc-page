
const express = require('express')
// const bodyParser = require('body-parser')
const mysql = require('mysql2');
// const cors = require('cors');
// const axios = require('axios')

const app = express();
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors());
// app.use(
// 	cors({
// 	origin: ['http://localhost:3000'],
// 	methods: ['GET', 'POST'],
// 	credentials: true,
// 	})
//    );

// create mysql coonection
const connection = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'students'
});
// connect to the database
connection.getConnection(function(error){
    if(error) throw error
    else console.log('Connected to the student database successfully!')
    
  });  
// module.exports = connection;  
app.post('/signup', (req, res) => {
	const useremail = req.body.useremail;
	const password = req.body.password;

	connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM etc_stud WHERE email = ? OR password = ?"
        const searchQuery = mysql.format(sqlSearch, [useremail, password])
        const sqlInsert = "INSERT INTO etc_stud (email,password) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert, [useremail, password])
        // ? will come from client in order


		 connection.query(searchQuery, async (err, result) => {
            if (err) throw (err)
            if (result.length !== 0) {
                connection.release()
                console.log("-------- user already exists --------")
                res.status(409).json({
                    msg: "User already Exists",
                });
            }
            else {
                connection.query(insert_query, (err, result) => {
					connection.release();
					if (err)
						throw (err);
					console.log("-------- new user created --------");
					res.status(201).json({
						msg: "New User Created",
						user: {
							// user_id: result.insertId,
							user_email: useremail
						}
					});
				})
            }
        })

		
    })
})
// app.post("/signup", (req,res) =>{
// 	const username = req.body.username;
// 	console.log(req.body.username);
// 	const password = req.body.password;
// 	console.log(req.body.password);


// 	connection.query(
// 		"INSERT INTO etc_studs (Email,Pass) VALUES (?,?)",
// 		[username,password],
// 		(err, result) => {
// 			console.log(err);
// 		}
// 	);
// });

// app.get('/',(req,res)=>{
// 	res.send("hahahah");
// });


// set app port
app.listen(3001, () => {
	console.log("running server successfully");
});
