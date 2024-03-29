import Questions from "../model/Question.model.js";
import Results from "../model/Result.model.js";
import questions, {answers} from "../database/data.js";

/** get all questions */
export async function getQuestions(req,res){
    try{
        const queue = await Questions.find();
        res.json(queue);
    } catch(error){
        res.json({error});
    }
}

/** insert all questions */
export async function insertQuestions(req,res){
    try{
        Questions.insertMany({questions: questions, answers : answers}, function(err, data){
            res.json({msg : "Data saved successfully!"})
        })
    } catch(error){
        res.json({error});
    } 
}

/** delete questions */
export async function dropQuestions(req,res){
    try{
        await Questions.deleteMany();
        res.json({msg : "Questions Deleted Successfully."})
    } catch(error){
        res.json({error});
    }
}

/** get all result */
export async function getResult(req,res){
    
    try{
        const answers = await Results.find();
        res.json(answers);
    } catch(error){
        res.json({error});
    }
}

/** save all result */
export async function storeResult(req,res){
    try{
        const { username, result, attempts, points, achived } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');
        Results.create({ username, result, attempts, points, achived }, function(err,data){
            res.json({msg : "Result Saved Successfully...!"});
        });
    }catch(error){
        res.json({error});
    }
}

/** delete result */
export async function deleteResult(req,res){
    try{
        await Results.deleteMany();
        res.json({msg : "Result Deleted Successfully...!"});
    } catch(error){
        res.json({error});
    }
}