const User = require('../models/User');
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.createUser = async (req, res) => {
    // check errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ errors: errors.array() })
    }
    
    //destructuring json from req
    const { email } = req.body

    try {
        // check that the user entered has a unique email
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({msg: 'User already registered'})
        }
        user = new User(req.body);
        await user.save();
        res.json({msg: 'User created successfully'})
    } catch (e) {
        console.log('Error userController', e);
        res.status(400).send('Error has ocurred')
    }
}

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const newUsersArray = [];
        const usersCollection = await User.find()
        usersCollection.map( user => {
            let userFormat = {
                total_items: usersCollection.length,
                data: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    address: {
                        street: user.address.street,
                        suite: user.address.suite,
                        city: user.address.city,
                        zipcode: user.address.zipcode,
                        geo: {
                            lat: user.address.geo.lat,
                            lng: user.address.geo.lng
                        }
                    },
                    phone: user.phone,
                    website: user.website,
                    company: {
                        name: user.company.name,
                        catchPhrase: user.company.catchPhrase,
                        bs: user.company.bs,
                    }
                }
            }
            newUsersArray.push(userFormat)
        })
        res.json(newUsersArray)
    } catch (e) {

        res.status(400).json({msg: 'An error has ocurred'})
    }
}

// Get all tasks for a single user
exports.getTaskByUserId = async (req, res) => {
    try {
        const idString = req.params.user_id
        const id = Number(idString)
        let newTaskArray = []
        const taskCollection = await Task.find();
        taskCollection.map(task => {
            if(task.user_id === id){
                let TaskByUserId = {
                    total_items: 0,
                    data: {
                        user_id: id,
                        id: task.id,
                        title: task.title,
                        completed: task.completed,
                    }
                }
                newTaskArray.push(TaskByUserId)
            }
        })
        newTaskArray.map(item => {
            item.total_items = newTaskArray.length
        })
        res.json(newTaskArray)
    } catch (e) {

        res.status(400).json({msg: 'An error has ocurred'})
    }
}

// Get a single user
exports.getUser = async (req, res) => {
    try {
        const idString = req.params.user_id
        const id = Number(idString)       
        const usersCollection = await User.find()
        usersCollection.find(user => {
            if(user.id === id) return res.json(user)
        })
    } catch (e) {
        res.status(400).json({msg: 'An error has ocurred'})
    }
}