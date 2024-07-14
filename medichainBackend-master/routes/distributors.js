const express = require('express');
const router = express.Router();
const Distributors = require('../models/Distributors').Distributors;
const verifyToken = require('../middlewares/verifyToken').DistributorVerifyToken;

//protected route
router.get('/getAll', (req, res) => {
    try {
        const distributors = Distributors.find();

        distributors.then((allDistributors) => {
            res.send({ result: allDistributors })
        }).catch(e => {
            res.send({ message: e.message });
        })
    } catch (e) {
        res.send({ message: "invalid request" });
    }
})

router.post('/register', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo, "userInfo")
    const user = new Distributors(userInfo);

    user.save().then(() => {
        res.send({ result: "Registered Successfully!" })
    }).catch(e => {
        res.send({ message: e.message });
    })
})

router.post('/login', async (req, res) => {
    try {

        const userInfo = req.body;
        console.log(userInfo, 'distributorLogin')
        //check email
        const user = await Distributors.findOne({ email: userInfo.email });
        console.log(user, 'user')
        if (!user) {
            res.send({ message: "Invalid email or password!" });
        }

        //check password
        const matchPassword = user.comparePassword(userInfo.password);
        console.log(matchPassword, 'matchPassword');
        if (!matchPassword) {
            res.send({ message: "Invalid email or password!" });
        }

        //generate token
        await user.generateToken();
        user.password = null;
        delete user["password"];
        res.send(user);
    } catch (e) {
        console.log(e.message, 'err');
        res.send({ error: true, message: e.message })
    }
})


router.get('/getUser/:id', (req, res) => {
    var id = req.params.id
    console.log(id, 'id');
    const distributor = Distributors.findOne({ id });

    distributor.then((allDistributors) => {
        allDistributors.token = null;
        res.send({ result: allDistributors })
    }).catch(e => {
        res.send({ message: e.message });
    })
})

router.post('/addUser', (req, res) => {
    const user = req.body;
    const newUser = new Distributors(user);

    newUser.save()
        .then(() => {
            res.send({ message: "User added successfully!" })
        })
        .catch(e => {
            console.log('e ===>', e);
            res.send({ message: e.message })
        })
})

module.exports = router;