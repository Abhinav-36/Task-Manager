const express = require("express");
const { getTodo, createTodo, updateTodo, deleteTodo , updateStatus, downloadFile, previewFile} = require("../controllers/todo.controller");
const { validateTask } = require("../middleware/validation");
const upload = require("../middleware/multer");
const router = express.Router();


router.get("/",getTodo)
router.post("/",validateTask,upload.single("file"),createTodo)
router.put("/:id",validateTask,updateTodo)
router.delete("/:id",deleteTodo)
router.patch("/:id/status",updateStatus)
router.get("/download/:filename",downloadFile)
router.get("/preview/:filename",previewFile)


module.exports = router;