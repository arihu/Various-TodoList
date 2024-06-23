const Todo = require("../models/todo");

exports.getItems = (req, res) => {
    Todo.find()
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Item not found", error: err.message })
        );
};

exports.postItem = (req, res) => {
    Todo.create(req.body)
        .then((data) => res.json({ message: "Item added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add Item", error: err.message })
        );
};

exports.putItem = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update Item", error: err.message })
        );
};

exports.deleteItem = (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Todo not found" });
            }
            res.json({ message: "Todo deleted successfully", data });
        })
        .catch((err) => {
            res.status(500).json({ error: "Internal server error", message: err.message });
        });
};