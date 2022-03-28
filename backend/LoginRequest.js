
const express = require('express')
// const bodyParser = require('body-parser')
const mysql = require('mysql2');
const bcrypt = require("bcrypt")

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
app.post('/signup', async (req, res) => {
	const useremail = req.body.useremail;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

	connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM etc_stud WHERE email = ? "
        const searchQuery = mysql.format(sqlSearch, [useremail])
        const sqlInsert = "INSERT INTO etc_stud (email,password) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert, [useremail, hashedPassword])
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
app.post("/login", (req, res) => {
    const useremail = req.body.useremail;
	const password = req.body.password;

    connection.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM etc_stud WHERE email = ? "
        const searchQuery = mysql.format(sqlSearch, [useremail])
        connection.query(searchQuery, async (err, result) => {
            connection.release()

            if (err) throw (err)

            if (result.length === 0) {
                console.log("------user doesnot exists-------")

                res.status(404).json({
                    msg: "User does not exists. Please /register",
                });
            }
            else {
                const hashedPassword = result[0].password
                if (await bcrypt.compare(password, hashedPassword)) {
                    // const token = generateAccessToken({ user: result[0] })
                    // req.session.token = token
                    console.log("------user-logged-in-------")
                    res.status(200).json({
                        msg: 'Login Successful',
                        // "token": token,
                        user: result[0]
                    });
                } else {
                    console.log("------wrong password-------")

                    res.status(401).json({
                            msg: 'You entered the wrong password!'
                        });
                }
            }
        })
    })
}) // access tokens after login ends


// set app port
app.listen(3001, () => {
	console.log("running server successfully");
});
