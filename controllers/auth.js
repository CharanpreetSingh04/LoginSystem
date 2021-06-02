const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

exports.register = (req,res) => {
    console.log(req.body);
    const {name,email,password,passwordConfirm}=req.body;
    db.query('SELECT email from users WHERE email=?',[email],async (error,results) => {
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return  res.render('register', {
                message: "That email is already in use"
            })
        }
        else if(password!=passwordConfirm){
            return  res.render('register', {
                message: "Passwords Dont match"
            })
        }
        let hashedPassword=await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashedPassword},(error,results) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.render('register',{
                    message: 'User Registered'
                });
            }
        });
    });

}
exports.login = async (req,res) => {
    try {
        const {email,password}=req.body;
        if(!email|| !password){
            return res.status(400).render('login',{
                message: 'Please provide an email or password'
            })
        }
        db.query('SELECT * FROM users WHERE email=?', [email], async (error,results) => {
            if(!results || !(await bcrypt.compare(password,results[0].password))){
                return res.status(401).render('login',{
                    message: 'Email or Password is Incorrect'
                })
            }
            else{
                const name=results[0].name;
                /*const token=jwt.sign({id: id},process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: " + token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt',token, cookieOptions);*/
                return res.status(200).render("upload",{
                    message: name
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}