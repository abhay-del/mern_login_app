import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"; 



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
                        jwt.sign()
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
    res.json('getUser route');
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
    res.json('updateUser route');
}

/** GET: http://localhost:8070/api/generateOTP */
export async function generateOTP(req,res){
    res.json('generateOTP route');
}

/** GET: http://localhost:8070/api/verifyOTP */
export async function verifyOTP(req,res){
    res.json('verifyOTP route');
}


/** GET: http://localhost:8070/api/createResetSession */
export async function createResetSession(req,res){
    res.json('createResetSession route');
}


/** PUT: http://localhost:8070/api/resetPassword */
export async function resetPassword(req,res){
    res.json('resetPassword route');
}