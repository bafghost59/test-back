import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'tonSecret',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }
}))



app.get("/", (req, res) => {
    res.json({message : "API de la TodoList !"});
});


app.use('/api', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('getAllUsers', async (req, res) => {
    try {
        const [users] = await bdd.query("SELECT * from users");
        res.status(200).json({message : "Utilisateurs récupérés avec succès", users})
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs");
    }
})

app.get('getAllTasks', async (req, res) => {
    try {
        const [tasks] = await bdd.query("SELECT * from tasks");
        res.status(200).json({message : "Tâches récupérés avec succès", tasks})
    } catch (error) {
        console.error("Erreur lors de la récupération des tâches");
    }
})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'API est lancé sur http://localhost:${process.env.SERVER_PORT}`);  
})



