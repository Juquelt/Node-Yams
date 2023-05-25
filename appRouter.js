const { Router } = require('express')
const UserModel = require('./models/user')
const bcrypt = require('bcrypt')

const router = new Router()

// Handling get request
router.get('/', function (req, res) {
    // Rendering your form
    res.render('home');
});

// Handling data after submission of form
router.post("/register", async function (req, res) {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await UserModel.create({
            username,
            password: hashedPassword,
            wins: []
        })
        res.redirect('/yams')
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur serveur lors de la création de l\'utilisateur')
    }
})

router.get('/yams', (req, res) => {
    res.render('yams')
})

module.exports = router;