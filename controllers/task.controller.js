import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
    const { title, description, dueDate, assignedTo } = req.body;
    
    try{
        const task = new Task({
            title,
            description,
            dueDate,
            createdBy: req.user.userId,
            assignedTo: assignedTo || req.user.userId,
        });
        await task.save();

        res.status(201).json({ task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTasks = async (req, res) => {
    const { status, assignedTo, search, sortBy } = req.query;

    try{
        const query = {};

        if(assignedTo){
            query.assignedTo = assignedTo;
        }else{
            query.assignedTo = req.user.userId;
        }

        if(status){
            query.status = status;
        }

        if(search){
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const sortOptions = {};
        if (sortBy === 'dueDate') sortOptions.dueDate = 1; // Sort by due date (ascending)
        else if (sortBy === 'createdAt') sortOptions.createdAt = -1; // Sort by creation date (descending)

        const tasks = await Task.find(query).sort(sortOptions);

        res.status(200).json({ tasks });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTaskById = async (req, res) => {
    const { id } = req.params;
    console.log("GET TASK BY ID")

    try{
        const task = await Task.findById(id);
        console.log(task)
        if (!task) return res.status(404).json({ message: `Task not found` });

        res.status(200).json({ task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    try{
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: `Task not found` });

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: `Task updated`, task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try{
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: `Task not found` });

        await task.remove();
        res.status(200).json({ message: `Task deleted` });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};