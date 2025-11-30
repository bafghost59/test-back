import taskModel from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.fetchAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Erreur serveur lors de la récupération des tâches." });
  }
}

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskModel.fetchTaskById(id);
    if (task) {
      res.status(200);
      res.json(task);
    } else {
      res.status(404);
      res.json({ message: "Tâche non trouvée." });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Erreur serveur lors de la récupération de la tâche." });
  }
}

const getTasksWithUsers = async (req, res) => {
  try {
    const tasksWithUsers = await taskModel.fetchTasksWithUsers();
    res.status(200).json(tasksWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des tâches" });
  }
}

const getTasksByUserId = async (req, res) => {
  const { userId } = req.params;
    console.log("getTasksByUserId - userId (param):", userId);
  try {
    const tasks = await taskModel.fetchTasksByUserId(userId);
    console.log("getTasksByUserId - tasks from DB:", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches par userId:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des tâches." });
  }
};

const getTaskByIdWithUser = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.fetchTaskByIdWithUser(id);

    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération de la tâche" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const user_id = req.user.id; 
    const newTaskId = await taskModel.createTask(title, description, status, priority, due_date, user_id);
    res.status(201).json({ id: newTaskId });
  } catch (error) {
    console.error(error);    
    res.status(500).json({ message: "Erreur serveur lors de la création de la tâche." });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status, priority, due_date, user_id } = req.body;
    const result = await taskModel.updateTask(id, title, description, status, priority, due_date, user_id);
    if (result === 0) {
      res.status(404);
      res.json({ message: "Tâche non trouvée." });
    } else {
      res.status(200);
      res.json({ message: "Tâche mise à jour." });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Erreur serveur lors de la mise à jour de la tâche." });
  }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await taskModel.deleteTask(id);
        if (result === 0) {
            res.status(404);
            res.json({ message: "Tâche non trouvée." });
        } else {
            res.status(200);
            res.json({ message: "Tâche supprimée." });
        }
    } catch (error) {
        console.error(error)
        res.status(500);
        res.json({ message: "Erreur serveur lors de la suppression de la tâche." });
    }
}

export default {
    getAllTasks,
    getTaskById,
    getTasksWithUsers,
    getTaskByIdWithUser,
    createTask,
    updateTask,
    deleteTask,
    getTasksByUserId
}
