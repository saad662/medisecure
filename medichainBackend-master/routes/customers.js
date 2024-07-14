const express = require('express');
const router = express.Router();
const Customers = require('../models/Customers').Customers;
const verifyToken = require('../middlewares/verifyToken').DistributorVerifyToken;

//protected route
router.get('/getAll', (req, res) => {
    try {
        const customers = Customers.find();
        console.log(customers, 'Customers');

        customers.then((allCustomers) => {
            res.send({ result: allCustomers })
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
    const user = new Customers(userInfo);

    user.save().then(() => {
        res.send({ result: "Registered Successfully!", error: false })
    }).catch(e => {
        res.send({ message: e.message, error: true });
    })
})

router.post('/login', async (req, res) => {
    const userInfo = req.body;
    console.log("loginnnn");
    //check email
    const user = await Customers.findOne({ email: userInfo.email });

    if (!user) {
        res.send({ message: "Invalid email or password!", error: true });
    }

    //check password
    const matchPassword = user.comparePassword(userInfo.password);

    if (!matchPassword) {
        res.send({ message: "Invalid email or password!", error: true });
    }

    //generate token
    await user.generateToken();
    user.password = null;
    delete user["password"];
    res.send({ user: user, error: false });
})


router.get('/getUser/:id', (req, res) => {
    var id = req.params.id
    console.log(id, 'id');
    const customers = Customers.findOne({ id });

    customers.then((allCustomers) => {
        allCustomers.token = null;
        res.send({ result: allCustomers })
    }).catch(e => {
        res.send({ message: e.message });
    })
})

router.post('/addUser', (req, res) => {
    const user = req.body;
    const newUser = new Customers(user);

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