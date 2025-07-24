import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'covoiturage'
});


// Vérification de l'email si il figure dans la BDD
app.post('/check-email', (req, res) => {
    const { email } = req.body;
    const sql = "SELECT * FROM utilisateur WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Une erreur s\'est produite:', err);
            return res.status(500).json({ status: 'error', message: 'Une erreur s\'est produite lors de la vérification de l\'email.' });
        }
        if (result.length > 0) {
            return res.json({ status: 'success', message: 'Email found' });
        } else {
            return res.json({ status: 'error', message: 'Email not found' });
        }
    }); 
});



app.get('/notifications/:userId', (req, res) => {
    const userId = req.params.userId;
    const sq = 'SELECT * FROM notification_combined WHERE Id_User = ? and etat=?';
    db.query(sq, [userId,'0'], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des notifications:', err);
            return res.status(500).send(err);
        }
        res.send(results);
    });
});
// Mettre à jour une notification
app.put('/notifications/:notificationId', (req, res) => {
    const notificationId = req.params.notificationId;
    const { etat } = req.body;
    const sq = 'UPDATE notification SET etat = ? WHERE id_notif = ?';
    db.query(sq, [etat, notificationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de la notification:', err);
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});
app.put('/reservation_notification_view/:notificationId', async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        // Requête pour mettre à jour l'entrée correspondante dans la table
        const updatedEntry = await ReservationNotificationView.findOneAndUpdate(
            { id_pass: notificationId },
            { statut: 'reservation_notification_view' },
            { new: true } // Pour renvoyer la version mise à jour de l'entrée
        );
        res.json(updatedEntry); // Réponse avec l'entrée mise à jour
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'entrée:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entrée' });
    }
});
// Supprimer une notification
app.delete('/notifications/:notificationId', (req, res) => {
    const notificationId = req.params.notificationId;
    const sq = 'DELETE FROM notification WHERE id_notif = ?';
    db.query(sq, [notificationId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression de la notification:', err);
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});
























//recuperer tous les conducteurs qui figurent dans la BDD
app.get('/api/conducteurs', (req, res) => {
    const sql = 'SELECT * FROM   utilisateur_conducteur_view';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des conducteurs:', err);
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

//recuperer tout les utilisateurs qui figurent dans la BDD
app.get('/api/utilisateurs', (req, res) => {
    const sql = 'SELECT * FROM utilisateur'; // Requête SQL pour récupérer tous les utilisateurs
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            return res.status(500).send(err); // Renvoyer une réponse HTTP avec un code 500 en cas d'erreur
        }
        res.send(results); // Renvoyer les résultats sous forme de réponse JSON
    });
});


app.get('/api/Reclamationss', (req, res) => {
    const sqll = 'SELECT * FROM `reclamations_with_utilisateur` WHERE 1'; // Requête SQL pour récupérer tous les utilisateurs
    db.query(sqll, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            return res.status(500).send(err); // Renvoyer une réponse HTTP avec un code 500 en cas d'erreur
        }
        res.send(results); // Renvoyer les résultats sous forme de réponse JSON
    });
});
//quand l'admin clique sur validé un compte son champ valide sera automatiquement =1 'validé'
app.put('/api/validationcompte/:id', (req, res) => {
    const userId = req.params.id;
    const { valide } = req.body;
    const sql = 'UPDATE conducteur SET valide = ? WHERE Id_User = ?';

    db.query(sql, [valide, userId], (err, result) => {
        if (err) {
            
            console.error('Erreur lors de la mise à jour de la validation:', err);
            return res.status(500).send(err);
        }
        else{
            res.send({ message: 'Validation mise à jour avec succès' });
           
        }
    });
});

app.put('/api/reclamations/:id', (req, res) => {
    const id = req.params.id;
    const newState = 'Résolue';
    const query = 'UPDATE reclamation SET etat = ? WHERE id_reclam = ?';
    db.query(query, [newState, id], (error, results) => {
      if (error) {
        console.error('Erreur lors de la mise à jour de l\'état de la réclamation:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'état de la réclamation.' });
      } else {
        console.log(`Réclamation avec l'ID ${id} mise à jour avec succès.`);
        res.status(200).json({ message: `Réclamation avec l'ID ${id} mise à jour avec succès.` });
      }
    });
  });


//Ladmin supprime un compte d'un Conducteur 
//On supprime de la table utilisateur car y a un trigger dans la bdd qui supprime les conducteurs
//dans utilisateurs
app.delete('/api/utilisateur/:Id_User', (req, res) => {
    const { Id_User } = req.params;
    const sql = 'DELETE FROM utilisateur WHERE Id_User = ?';

    db.query(sql, [Id_User], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du conducteur:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du conducteur.' });
        }
        res.json({ message: 'Le conducteur a été supprimé avec succès.' });
    });
});

// Le login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM utilisateur WHERE email = ? AND mot_de_passe_ = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ status: 'error', message: 'Login failed' });
        if (data.length > 0) {
            const user = data[0];
            return res.json({ 
                status: 'success', 
                userId: user.Id_User,
                Type:user.Type,
                username: user.username, 
                Type: user.Type, 
                message: 'Login successful' 
            });
        } else {
            return res.json({ status: 'error', message: 'Informations erronées, essayez un autre mot de passe' });
        }
    });
 //Mes trajets 
});
app.post('/api/user-trips', (req, res) => {
    const username = req.body.username;

    if (!username) {
        return res.json({ status: 'error', message: 'Username is required' });
    }

    const sql = `
        SELECT * FROM reservation
        INNER JOIN trajet ON reservation.id_trj = trajet.id
        WHERE reservation.id_pass = ?`;

    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json({ status: 'error', message: 'Failed to retrieve trips' });
        }

        if (data.length > 0) {
            return res.json({ status: 'success', trips: data });
        } else {
            return res.json({ status: 'success', trips: [] }); // No trips found
        }
    });
});

// Recherche d'un trajet qui correspond a 'Orignine / destination / N° places
app.post('/search', (req, res) => {
    const { origin, destination, numberOfSeats } = req.body;

    db.query('SELECT * FROM trajet WHERE origin = ? AND destination = ? AND seats >= ?', [origin, destination, numberOfSeats], (err, result) => {
        if (err) {
            console.error('Une erreur s\'est produite:', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche.' });
        } else {
            res.json(result);
        }
    });
});

// Réinitialisation du mot de passe
app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    const sql = "UPDATE utilisateur SET mot_de_passe_ = ? WHERE email = ?";

    db.query(sql, [newPassword, email], (err, result) => {
        if (err) {
            console.error('Une erreur s\'est produite:', err);
            return res.status(500).json({ status: 'error', message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
        }
        if (result.affectedRows > 0) {
            return res.json({ status: 'success', message: 'Mot de passe mis à jour avec succès.' });
        } else {
            return res.json({ status: 'error', message: 'Email non trouvé.' });
        }
    });
});

const createTrajetTable = `
    CREATE TABLE IF NOT EXISTS trajet (
        id INT AUTO_INCREMENT PRIMARY KEY,
        origin VARCHAR(255),
        destination VARCHAR(255),
        idConducteur  VARCHAR(30),
        type VARCHAR(255),
        date DATE,
        time TIME,
        seats INT,
        babySeat BOOLEAN,
        price VARCHAR(255),
        paymentMethod VARCHAR(255),
        companyGender VARCHAR(255),
        comfort_airConditioning BOOLEAN,
        comfort_wifi BOOLEAN,
        comfort_music BOOLEAN,
        stops BOOLEAN,
        petsAllowed BOOLEAN,
        autoReservation BOOLEAN
    )
`;

db.query(createTrajetTable, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('Trajet table created or already exists');
});

//recuperer le user Id du UserName
app.post('/api/get-user-id', (req, res) => {
    const { idConducteur } = req.body;

    if (!idConducteur) {
        return res.status(400).json({ status: 'error', message: 'idConducteur is required' });
    }

    const sql = 'SELECT Id_User FROM utilisateur WHERE username= ?';

    db.query(sql, [idConducteur], (err, result) => {
        if (err) {
            console.error('Error fetching user ID:', err);
            return res.status(500).json({ status: 'error', message: 'Error fetching user ID' });
        }

        if (result.length === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const idUser = result[0].Id_User;
        res.json({ status: 'success', idUser });
    });
});

//Ajouter un trajet
app.post('/api/trajets', (req, res) => {
    const trajet = req.body;
    const sql = 'INSERT INTO trajet SET ?';
    db.query(sql, trajet, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send({ id: result.insertId, ...trajet });
    });
});


// Configuration de multer pour gérer les fichiers uploadés

// Route pour l'inscription d'un utilisateur
//affichage des trajets disponibles
app.get('/api/trajets', (req, res) => {
    const sql = 'SELECT * FROM trajet';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});
// Route pour l'inscription d'un utilisateur
app.post('/api/register-user', (req, res) => {
    // Extraction des données du corps de la requête
    const { username, nom, prenom, date_de_naissance, Adresse, wilaya, commune, statut, genre, email, Téléphone, mot_de_passe_, Type } = req.body;

    // Requête SQL pour insérer un nouvel utilisateur dans la base de données
    const query = 'INSERT INTO utilisateur (username, nom, prenom, date_de_naissance, Adresse, wilaya, commune, statut, genre, email, Téléphone, mot_de_passe_, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let mdp=Math.floor(10000000 + Math.random() * 90000000).toString();
    // Exécution de la requête SQL avec les données de l'utilisateur
    db.query(query, [username, nom, prenom, date_de_naissance, Adresse, wilaya, commune, statut, genre, email, Téléphone, mdp, Type], (err, result) => {
        // Gestion des erreurs
        if (err) {
            console.error(err);
            // Envoi d'une réponse d'erreur en cas d'échec de l'inscription
            res.status(500).json({ status: 'error', message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
        } else {
            // Envoi d'une réponse de succès avec les détails de l'utilisateur enregistré
            res.status(200).json({ status: 'success', message: 'Utilisateur enregistré avec succès', username, userId: result.insertId, Type });
        }
    });
});

// Recherche d'un trajet qui correspond a 'Orignine / destination / N° places
app.post('/api/recherche', (req, res) => {
    const { origin, destination, numberOfSeats } = req.body;

    const sql = 'SELECT * FROM trajet WHERE origin = ? AND destination = ? AND seats >= ?';
    db.query(sql, [origin, destination, numberOfSeats], (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche:', err);
            return res.status(500).json({ error: 'Erreur lors de la recherche.' });
        }
        res.json(results);
    });
});
// demander une reservation 
app.post('/api/reservation', (req, res) => {
    const reservationData = req.body;
    const sql = 'INSERT INTO reservation SET ?';
    db.query(sql, reservationData, (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la réservation:', err);
            return res.status(500).json({ error: 'Erreur lors de la création de la réservation.' });
        }
        res.status(201).json({ id: result.insertId, ...reservationData });
    });
});
   
// Récupérer les messages entre deux utilisateurs
app.post('/api/messages', (req, res) => {
    const { userId1, userId2 } = req.body;

    const sql = `
        SELECT 
            m.Id_mess,
            m.contenu,
            m.heure,
            m.date,
            m.Id_recepteur,
            m.Id_emetteur,
            u1.username as senderName,
            u2.username as receiverName
        FROM 
            message m
        JOIN 
            utilisateur u1 ON m.Id_emetteur = u1.Id_User
        JOIN 
            utilisateur u2 ON m.Id_recepteur = u2.Id_User
        WHERE 
            (m.Id_emetteur = ? AND m.Id_recepteur = ?) 
            OR 
            (m.Id_emetteur = ? AND m.Id_recepteur = ?)
        ORDER BY 
            m.date ASC, m.heure ASC
    `;

    db.query(sql, [userId1, userId2, userId2, userId1], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des messages:', err);
            return res.status(500).json({ status: 'error', message: 'Erreur lors de la récupération des messages.' });
        }
 
        res.json(result);
    });
});
// Récupérer les conversations pour un utilisateur donné
app.post('/api/conversations', (req, res) => {
    const { userId } = req.body;

    const sql = `
        SELECT 
            m.Id_mess,
            m.contenu,
            m.heure,
            m.date,
            m.Id_recepteur,
            m.Id_emetteur,
            u1.username as sender,
            u2.username as receiver,
            u1.email as senderEmail,
            u2.email as receiverEmail
        FROM 
            message m
        JOIN 
            utilisateur u1 ON m.Id_emetteur = u1.Id_User
        JOIN 
            utilisateur u2 ON m.Id_recepteur = u2.Id_User
        WHERE 
            m.Id_recepteur = ? OR m.Id_emetteur = ?
        ORDER BY 
            m.date DESC, m.heure DESC
    `;

    db.query(sql, [userId, userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des messages:', err);
            return res.status(500).json({ status: 'error', message: 'Erreur lors de la récupération des messages.' });
        }

        // Structurer les données
        const conversations = {};
        result.forEach(row => {
            const interlocutorId = row.Id_emetteur === userId ? row.Id_recepteur : row.Id_emetteur;
            const interlocutorName = row.Id_emetteur === userId ? row.receiver : row.sender;
            const interlocutorEmail = row.Id_emetteur === userId ? row.receiverEmail : row.senderEmail;

            if (!conversations[interlocutorId]) {
                conversations[interlocutorId] = {
                    interlocutorId,
                    interlocutorName,
                    interlocutorEmail,
                    messages: []
                };
            }

            conversations[interlocutorId].messages.push({
                id: row.Id_mess,
                text: row.contenu,
                time: row.heure,
                date: row.date,
                sender: row.Id_emetteur === userId ? 'me' : 'them'
            });
        });

        const formattedConversations = Object.values(conversations).map(conv => ({
            ...conv,
            lastMessage: conv.messages[0]
        }));

        res.json(formattedConversations);
    });
});
// Rechercher un conducteur par username// Recherche des conducteurs par username, nom, prénom ou email
app.get('/api/search-conducteurs', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ status: 'error', message: 'Query is required' });
    }

    const sql = `
        SELECT * FROM vueutilisateurconducteur 
        WHERE username LIKE ? 
        OR nom LIKE ? 
        OR prenom LIKE ? 
        OR email LIKE ?
    `;

    const searchQuery = `%${query}%`;
    db.query(sql, [searchQuery, searchQuery, searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche des conducteurs:', err);
            return res.status(500).json({ status: 'error', message: 'Erreur lors de la recherche des conducteurs.' });
        }
        res.json(results);
    });
});



// Endpoint pour créer une réclamation
app.post('/api/reclamations', (req, res) => {
    const { description, currentCondId ,userId} = req.body;
  
    // Insertion de la réclamation dans la base de données
    const sql = 'INSERT INTO reclamation (date_Creation, description, etat, priorite, Id_pass, Id_Admin, Id_Cond) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const dateCreation = '2024-06-06';
    const etat = 'En attente';
    const priorite = 'Moyenne';
    const Id_Admin =0; // Peut-être à remplir si l'administrateur est impliqué
    db.query(sql, [dateCreation, description, etat, priorite, userId, Id_Admin, currentCondId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la réclamation:', err);
            return res.status(500).json({ error: 'Erreur lors de la création de la réclamation.' });
        }
        res.status(201).json({ status: 'success', message: 'Réclamation créée avec succès.', id: result.insertId });
    });
});

// Envoyer un nouveau message
app.post('/api/send-message', (req, res) => {
    const { contenu, heure, date, Id_recepteur, Id_emetteur } = req.body;

    const sql = 'INSERT INTO message (contenu, heure, date, Id_recepteur, Id_emetteur) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [contenu, heure, date, Id_recepteur, Id_emetteur], (err, result) => {
        if (err) {
            console.error('Error sending message:', err); // Log the error
            return res.status(500).json({ error: 'Error sending message.' });
        }
        res.status(201).json({ id: result.insertId, contenu, heure, date, Id_recepteur, Id_emetteur });
    });
});



app.delete('/api/trajets/:id', (req, res) => {
    const trajetId = req.params.id;
    const sql = 'DELETE FROM trajet WHERE id = ?';

    db.query(sql, [trajetId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du trajet:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du trajet.' });
        }
        res.json({ message: 'Le trajet a été supprimé avec succès.' });
    });
});
app.listen(8081, () => {
    console.log('listening on port 8081...');
});
