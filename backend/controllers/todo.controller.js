const httpStatus = require("http-status").status
const catchAsync = require("../utils/CatchAsync")
const todoService = require("../services/todo.service")
const path = require("path");

const createTodo = catchAsync(async (req,res) => {
    // console.log(req.body,req.file);
    const filePath = req.file ? req.file.filename : null;

    let todo = await todoService.createTodos(req.body,filePath);
    res.status(httpStatus.CREATED).json(todo);
})

const getTodo = catchAsync(async (req,res) => {
    let allTodos = await todoService.getTodos();
    res.status(httpStatus.OK).json(allTodos)
})

const updateTodo = catchAsync(async (req,res) => {
    let id = req.params.id;
    // console.log(id);
    let updatedTask = await todoService.updateTodos(id,req.body);
    res.status(httpStatus.OK).json(updatedTask);
})

const deleteTodo = catchAsync(async (req,res) => {
    let id = req.params.id;
    let deleteTask = await todoService.deleteTodos(id,req.body);
    res.status(httpStatus.NO_CONTENT).json(deleteTask);
})

const updateStatus = catchAsync(async (req,res) => {
    let id = req.params.id;
    // console.log(id,req.body.status);
    let updatedStatus = await todoService.updateStatus(id,req.body.status);
    res.status(httpStatus.OK).json(updatedStatus);
})

const downloadFile = catchAsync((req, res) => {
  const { filename } = req.params;
  // console.log(filename);
  const filePath = path.join(process.cwd(), "uploads", filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
})

const previewFile = catchAsync((req, res) => {
  const { filename } = req.params;
  // console.log(filename);
  const filePath = path.join(process.cwd(), "uploads", filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
})

module.exports = {createTodo,getTodo,updateTodo,deleteTodo,updateStatus,downloadFile,previewFile}
