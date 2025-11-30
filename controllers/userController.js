import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("une erreur est survenue", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des utilisateurs." });
  }
};

const getInfoUser = async (req, res) => {
  try {
    const infoUser = await userModel.getInfoUser();
    res.status(200).json(infoUser);
  } catch (error) {
    console.error("Une erreur est survenue", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des infos utilisateurs." });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userById = await userModel.getUserById(id);
    if (!userById) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(userById);
  } catch (error) {
    console.error("une erreur est survenue", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'utilisateur." });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const userByEmail = await userModel.getUserByEmail(email);
    if (!userByEmail) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(userByEmail);
  } catch (error) {
    console.error("une erreur est survenue", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'utilisateur." });
  }
};

const addUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  try {
    const mdpHash = bcrypt.hashSync(password, 10);
    const user = await userModel.addUser(firstname, lastname, email, mdpHash, role);
    res.status(201).json({ message: "utilisateur créé", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création de l'utilisateur." });
  }
};

const updateUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const id = req.params.id;

  try {
    const existant = await userModel.getUserById(id);

    if (!existant) {
      return res.status(404).json({ message: "utilisateur inconnu" });
    }

    const mdpHash = bcrypt.hashSync(password, 10);
    const updatedUser = await userModel.updateUser(firstname, lastname, email, mdpHash, id);
    res.status(200).json({ message: "utilisateur modifié", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'utilisateur." });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const existant = await userModel.getUserById(id);
    if (!existant) {
      return res.status(404).json({ message: "utilisateur inconnu" });
    }
    const deletedUser = await userModel.deleteUser(id);
    res.status(200).json({ message: "utilisateur supprimé", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur." });
  }
};

const ConnexionUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userindb = await userModel.ConnexionUser(email);
    if (!userindb) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const isPasswordValid = await bcrypt.compare(password, userindb.password);

    const payload = {
  id: userindb.id,
  email: userindb.email,
  role: userindb.role
};

const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

console.log('Token généré:', token);

    return res.status(200).json({
      message: "Connexion réussie",
      userId: userindb.id,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

const DeconnexionUser = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Déconnexion réussie" });
    })
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
    DeconnexionUser
}
