import bdd from '../config.js'

const fetchAllTasks = async () => {
    const getAllTasks = "SELECT id, title, description, status, priority, due_date, created_at, user_id from task";
    const [response] = await bdd.query(getAllTasks);
    return response;
}

const fetchTasksWithUsers = async () => {
    const getTasksWithUsers = "SELECT task.id, task.title, task.description, task.status, task.priority, task.due_date, task.created_at, users.id AS users_id, users.lastname, users.firstname, users.email FROM task INNER JOIN users ON task.user_id = users.id;";
  const [response] = await bdd.query(getTasksWithUsers);
  return response;
}

const fetchTasksByUserId = async (userId) => {
  const query = `
    SELECT 
      task.id,
      task.title,
      task.description,
      task.status,
      task.priority,
      task.due_date,
      task.created_at,
      task.user_id,
      users.lastname,
      users.firstname,
      users.email
    FROM task
    INNER JOIN users ON task.user_id = users.id
    WHERE task.user_id = ?;
  `;
  const [response] = await bdd.query(query, [userId]);
  return response; 
};

const fetchTaskById = async (id) => {
  const query = "SELECT id, title, description, status, priority, due_date, created_at, user_id FROM task WHERE id = ?";
  const [response] = await bdd.query(query, [id]);
  return response[0];
}

const fetchTaskByIdWithUser = async (id) => {
  const getTaskByIdWithUser = `
    SELECT task.id, task.title, task.description, task.status, task.priority, task.due_date, task.created_at, users.id AS user_id, users.lastname, users.firstname, users.email FROM task INNER JOIN users ON task.user_id = users.id
    WHERE task.id = ?
  `;
  const [response] = await bdd.query(getTaskByIdWithUser, [id]);
  return response[0];
}



const createTask = async (title, description, status, priority, due_date, user_id) => {
  const query = `
    INSERT INTO task (title, description, status, priority, due_date, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await bdd.query(query, [title, description, status, priority, due_date, user_id]);
  return result.insertId;
}

const updateTask = async (id, title, description, status, priority, due_date, user_id) => {
  const query = `
    UPDATE task SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, user_id = ?
    WHERE id = ?
  `;
  const [result] = await bdd.query(query, [title, description, status, priority, due_date, user_id, id]);
  return result.affectedRows; 
}

const deleteTask = async (id) => {
  const query = "DELETE FROM task WHERE id = ?";
  const [result] = await bdd.query(query, [id]);
  return result.affectedRows;
}

export default {
    fetchAllTasks,
    fetchTasksWithUsers,
    fetchTaskById,
    fetchTaskByIdWithUser,
    createTask,
    updateTask,
    deleteTask, 
    fetchTasksByUserId
}