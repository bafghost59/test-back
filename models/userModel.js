import bdd from '../config.js';

const getAllUsers = async () => {
    const selectAllUsers = `
        SELECT id, firstname, lastname, email, password, role, created_at 
        FROM users;
    `;
    const [response] = await bdd.query(selectAllUsers);
    return response;
}

const getInfoUser = async () => {
    const selectInfoUser = `
        SELECT firstname, lastname, email, role 
        FROM users;
    `;
    const [response] = await bdd.query(selectInfoUser);
    return response;
}

const getUserById = async (id) => {
    const selectUserById = `
        SELECT firstname, lastname, email, role
        FROM users
        WHERE id = ?;
    `;
    const [response] = await bdd.query(selectUserById, [id]);
    return response[0]; // retour d'un seul utilisateur
};

const getUserByEmail = async (email) => {
    const selectUserByEmail = `
        SELECT * FROM users WHERE email = ?;
    `;
    const [response] = await bdd.query(selectUserByEmail, [email]);
    return response[0]; 
};

const addUser = async (firstname, lastname, email, password, role) => {
    const insertUser = `
        INSERT INTO users (firstname, lastname, email, password, role)
        VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await bdd.query(insertUser, [firstname, lastname, email, password, role]);
    return result;
}

const updateUser = async (firstname, lastname, email, password, id) => {
    const updateUser = `
        UPDATE users
        SET firstname = ?, lastname = ?, email = ?, password = ?
        WHERE id = ?;
    `;
    const [result] = await bdd.query(updateUser, [firstname, lastname, email, password, id]);
    return result;
};

 const deleteUser = async (id) => {
    const deleteUser = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const [result] = await bdd.query(deleteUser, [id]);
    return result;
};

const ConnexionUser = async (email) => {
    const findByEmail = `
        SELECT * FROM users WHERE email = ?;
    `;
    const [response] = await bdd.query(findByEmail, [email]);
    return response[0];
}


export default {
    getAllUsers, 
    getInfoUser,
    getUserById, 
    getUserByEmail, 
    addUser, 
    updateUser, 
    deleteUser,
    ConnexionUser, 
}