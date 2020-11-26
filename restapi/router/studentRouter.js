const express = require('express');
const router = express.Router();
const Student = require('../models/studentSchema');


router.post('/students',async (req,res)=>{

    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
    
})

router.get('/students',async (req,res) =>{

    try{
        const studentData = await Student.find();
        res.status(200).send(studentData);
    }catch(e){
        res.status(404).send(e);
    }
})

router.get('/students/:name',async (req,res)=>{

    try{
        console.log(req.params)
        /* 
            req.params is an object that contains value of all the
            parameters in the link, here it is 
            { name: 'data attatched to the API' } 
        */

        const name = req.params.name;
        const studentData = await Student.findOne({name:name}).exec();//{_id:_id} is same as _id
        console.log(studentData)
        if(!studentData){
           res.status(404).send('Data not found');            
        }else{
            res.status(200).send(studentData);               
        }

    }catch(e){
        res.status(500).send(e);    
    }
})

router.patch('/students/:id',async (req,res)=>{

    try{
        console.log(req.body)
        /* 
            req.body is an object that contains value of all the
            parameters in the body area that we want to update through postman. 
        */

        const _id = req.params.id;
        const updateData = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });//{_id:_id} is same as _id

        if(!updateData){
           res.status(404).send('Data not found');            
        }else{
            res.status(200).send(updateData);               
        }

    }catch(e){
        res.status(500).send(e);    
    }
})

router.delete('/students/:name',async (req,res)=>{

    try{    
        const name = req.params.name;
        const deleteStudent = await Student.findOneAndDelete({name:name});
        console.log(deleteStudent);
        if(!deleteStudent){
            res.status(404).send('Not found');
        }else{
            res.status(200).send(deleteStudent);
        }

    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;
