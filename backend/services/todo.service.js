const todoModel = require("../models/todo.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status").status

const createTodos = async (task,fileName) => {
    const {title,description,status,deadline} = task;
    const todoItem = await todoModel.create({title,description,status,deadline,fileName});
    return todoItem;
}

const getTodos = async () => {
    const tasks = await todoModel.find();
    if(!tasks){
        throw new ApiError(httpStatus.NOT_FOUND,"Todo list is empty")
    }
    return tasks;
}


const updateTodos = async (id,updateTask) => {
    // console.log(id);
    const task = await todoModel.findByIdAndUpdate(id,updateTask,{new:true});
    if(!task){
        throw new ApiError(httpStatus.NOT_FOUND,"Task Not found");
    }
    return task;
}


const deleteTodos = async (id) => {
    const task = await todoModel.findByIdAndDelete(id);
    if(!task){
        throw new ApiError(httpStatus.NOT_FOUND,"Task Not found");
    }
    return task;
}

const updateStatus = async (id,todoStatus) => {

    if(!(todoStatus === "TODO" || todoStatus === "DONE")){
        throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Status");
    }
    const task = await todoModel.findByIdAndUpdate(id,{$set : {status: todoStatus}},{new:true});
    if(!task){
        throw new ApiError(httpStatus.NOT_FOUND,"Task Not found");
    }
    return task;
}


module.exports = {createTodos,getTodos,updateTodos,deleteTodos,updateStatus};