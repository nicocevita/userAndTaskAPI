const { parse } = require("dotenv");
const Task = require("../models/Task");
const User = require("../models/User");

// Get all the tasks
exports.getTasks = async (req, res) => {
  try {
    const newTasksArray = [];
    const taskCollection = await Task.find();
    taskCollection.map((task) => {
      let taskFormat = {
        total_items: taskCollection.length,
        data: {
          user_id: task.user_id,
          id: task.id,
          title: task.title,
          completed: task.completed,
        },
      };
      newTasksArray.push(taskFormat);
    });
    res.json(newTasksArray);
  } catch (e) {
    res.status(400).json({ msg: "An error has ocurred" });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const idString = req.params.user_id;
    const id = Number(idString);
    const tasksCollection = await Task.find();
    tasksCollection.find((task) => {
      if (task.id === id) return res.json(task);
    });
  } catch (e) {
    res.status(400).json({ msg: "An error has ocurred" });
  }
};

exports.getTaskByStatus = async (req, res) => {
  try {
    const newTasksArray = [];
    let flag;
    const option = req.params.status;
    if(option === '1'){
        flag = true;
    }else if(option === '2'){
        flag = false;
    }
    const tasksCollection = await Task.find();
    tasksCollection.find((task) => {
      if (task.completed == flag) {
        let TaskByUserId = {
            total_items: tasksCollection.length,
            data: {
                user_id: task.user_id,
                id: task.id,
                title: task.title,
                completed: task.completed,
            }
        }
        newTasksArray.push(TaskByUserId)
      } else if (task.completed == flag) {
        let TaskByUserId = {
            total_items: 0,
            data: {
                user_id: id,
                id: task.id,
                title: task.title,
                completed: task.completed,
            }
        }
        newTasksArray.push(TaskByUserId)
      }
    });
    return res.json(newTasksArray)
  } catch (e) {
    res.status(400).json({ msg: "An error has ocurred" });
  }
};
