import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"; 
import ENV from "../config.js";
import otpGenerator from 'otp-generator';


/** middleware for verify user */
export async function verifyUser(req,res,next){
    try{

        const {username} = req.method == "GET" ? req.query : req.body;

        //check the user existance
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error: "Can't find User!"});
        next();
    }catch(error){
        return res.status(404).send({error: "Authentication Error...!"})
    }
}


/** POST: http://localhost:8070/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req,res){
    
    try{
        const { username, password,profile,email } = req.body;

        //check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({username})
            .then((username) => {
                if(username) reject({error : "Please use unique username"});
                resolve();
            }).catch((err)=>{
                console.log(err);
            });
        });

        //check the existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({username})
                .then((email) => {
                    if(email) reject({error : "Please use unique email"});
                    resolve();
                }).catch((err)=>{
                    console.log(err);
                });
        });

        Promise.all([existUsername,existEmail])
            .then(()=>{
                if(password){
                    bcrypt.hash(password,10)
                        .then( hashedPassword => {
                            console.log("inside save")
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            //return save result as a response
                            user.save()
                                .then(result => res.status(201).send({msg: "User Register Successfully",
                                result:result}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error: "Unable to hashed password"
                            });
                        });
                }
            }).catch(error => {
                return res.status(500).send({error});
            });
    } catch(error){
        return res.status(500).send(error);
    }


}

/** POST: http://localhost:8070/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
    
    const {username,password} = req.body;
    try{
        UserModel.findOne()
            .then(user=>{
                bcrypt.compare(password,user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status(400).send({error: "Don't Have Password"})

                        // create jwt token
                        const token = jwt.sign({
                                            userId: user._id,
                                            username: user.username
                                        },ENV.JWT_SECRET,{expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        })
                    })
                    .catch(error=> {
                        return res.status(400).send({error : "Password does not Match"})
                    })
            })
            .catch(error => {
                return res.status(404).send({error : "Username not Found"});
            })
    }catch (error){
        return res.status(500).send({error});
    }
}

/** GET: http://localhost:8070/api/user/example123 */
export async function getUser(req,res){
    
    const { username } = req.params;

    try{

        if(!username) return res.status(501).send({error : "Invalid Username"});

        UserModel.findOne({username})
            .then(user => {
                if(!user) return res.status(501).send({error : "Could't Find the User"});

                //remove password from user
                // mongoose return unnecessary data with object so convert it into json
                const {password, ...rest} = Object.assign({}, user.toJSON());
                return res.status(201).send(rest);
            })
            .catch(error => {
                return res.status(404).send({error : "Username not Found"});
            })
    }catch (error){
        return res.status(404).send({error : "Cannot Find User Data"});
    }
}

/** PUT: http://localhost:8070/api/updateUser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req,res){
    console.log("inside update")
    try{
        //const id = req.query.id;
        const { userId } = req.user;
        console.log("userId",userId);
        if(userId){
            const body = req.body;
            //update the data
            console.log(userId);
            UserModel.updateOne({_id : userId},body,function(err,data){
                if(err) throw err;

                return res.status(201).send({msg : "Record Updated...!"});
            })
        }else{
            return res.status(401).send({error: "User Not Found."});
        }
    }catch(error){
        return res.status(401).send({error});
    }
}

/** GET: http://localhost:8070/api/generateOTP */
export async function generateOTP(req,res){
   req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false,specialChars:false})

   res.status(201).send({code : req.app.locals.OTP});
}

/** GET: http://localhost:8070/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP  = null;// reset the otp value
        req.app.locals.resetSession = true; // start session for reset password

        return res.status(201).send({msg : "Verify Successfully!"});
    }
    return res.status(400).send({error : "Invalid OTP"})
}


/** GET: http://localhost:8070/api/createResetSession */
export async function createResetSession(req,res){
    res.json('createResetSession route');
}


/** PUT: http://localhost:8070/api/resetPassword */
export async function resetPassword(req,res){
    res.json('resetPassword route');
}