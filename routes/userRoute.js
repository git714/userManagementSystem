var express = require('express');
const multer = require('multer');

const path = require("path")

var app = express();
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt")
const User = require('../models/User');


const router = express.Router()
// router.use(express.static(__dirname+"./public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
});

var upload = multer({
    storage: storage
}).single('file')
// get method to render showuser ejsfile
router.get('/', function (req, res) {
    User.find().then((result) => {

        res.render("showuser", { userData: result })
        // res.render("login", { userData: result })
    })
})
// get method to render user ejs file
router.get('/add', function (req, res) {
    res.render('registeruser', {})

})

// Post method for posting data from body to database(mongodb)

router.post('/add', upload, function (req, res) {

    console.log(req.file)
    const bcryptpassword = bcrypt.hashSync(req.body.password, 4)
    // console.log(hashpassword)
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcryptpassword,
        file: req.file.filename

    });
    // save new user in db
    user.save().then((docs) => {


        // return res.status(200).json({
        //     message: 'Data inserted successfully',
        //     success: true,
        //     data: docs
        // })

        // redirecting page after successfull data insertion
        res.redirect("/users")

    }).catch((err) => {
        return res.status(401).json({
            message: 'Error in adding new user',
            success: false,
            error: err.message
        })
    });
});


// .......for deleting data using frontend


router.get("/delete/:id", (req, res) => {

    User.deleteOne({ _id: req.params.id }).then((result) => {
        // res.status(200).json({
        //     message: 'data deleted successfully',
        //     success: true,
        //     userData: result
        res.redirect("/users");
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in deleting user',
            success: false,
            error: err.message
        })
    })
})


// ................for updating data using frontend
router.get("/update/:id", (req, res) => {
   
    User.findById({ _id: req.params.id }).then((result) => {
        console.log(result)
        app.use('update',express.static(path.resolve(__dirname,'./public')))

        res.render("updateuser", { user: result })
    })
})


router.post("/update/:id", upload, (req, res) => {
    console.log(req.body)
    const bcryptpassword = bcrypt.hashSync(req.body.password,4)
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email ,password: bcryptpassword } }).then((result) => {
        // res.status(200).json({
        //     message: 'data updated successfully',
        //     success: true,
        //     userData: result
        // })

        res.redirect("/users")
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in updating user',
            success: false,
            error: err.message
        })
    })
})

// update image using frontend
router.get("/updateimage/:id", (req, res) => {
   
    User.findById({ _id: req.params.id }).then((result) => {
        console.log(result)
        app.use('update',express.static(path.resolve(__dirname,'./public')))

        res.render("updateimage", { user: result })
    })
})


router.post("/updateimage/:id", upload, (req, res) => {
    
    User.findOneAndUpdate({ _id: req.params.id }, { $set: {file:req.file.filename } }).then((result) => {
        // res.status(200).json({
        //     message: 'data updated successfully',
        //     success: true,
        //     userData: result
        // })

        res.redirect("/users")
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in updating user',
            success: false,
            error: err.message
        })
    })
})




// get method to render login ejs file
router.get('/login', function (req, res) {
    res.render('login', {})

})

// login using frontend---------
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        // console.log(email)
        const password = req.body.password;
        const userfind = await User.findOne({ email: email });

        const bcryptpassword = bcrypt.compareSync(password, userfind.password);
        //  console.log(userfind.password);
        //  console.log(password);

        if (bcryptpassword === true) {
            // res.status(200).json({
            //     message: "login successfull",
            //     success: true,
            // })
            res.redirect("/users")
        } else {
            res.status(401).json({
                message: "invalid password",
                success: false
            })
        }

    } catch (error) {
        res.status(401).json({
            message: "invalid login details",
            success: false
        })

    }

})

// =======================================================================================













// get method for finding data from database

router.get('/find', function (req, res) {
    User.find().then((result) => {
        res.status(200).json({
            message: 'data finded successfully',
            success: true,
            userData: result
        })
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in finding user',
            success: false,
            error: err.message
        })
    })
})



// get method for finding data by Id from database

router.get('/find/:id', function (req, res) {

    User.findById(req.params.id).then((result) => {
        res.status(200).json({
            message: 'data finded successfully',
            success: true,
            userData: result
        })
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in finding  user',
            success: false,
            error: err.message
        })
    })
})

//>>>>>>>>>>delete method for deleting data from database
router.delete("/delete/:id", (req, res) => {

    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({
            message: 'data deleted successfully',
            success: true,
            userData: result
        })
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in deleting user',
            success: false,
            error: err.message
        })
    })
})

// put method for updating user data by id from database
// we can use findByidAndUpdate
router.put("/update/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password } }).then((result) => {
        res.status(200).json({
            message: 'data updated successfully',
            success: true,
            userData: result
        })
    }).catch((err) => {
        res.status(401).json({
            message: 'Error in updating user',
            success: false,
            error: err.message
        })
    })
})





//------>>>>>>>>>>>>> User signup......<<<<<<<<<<<<<<<<<<<<<


router.post('/register', function (req, res) {

    const bcryptpassword = bcrypt.hashSync(req.body.password, 4)
    // console.log(hashpassword)
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,

        password: bcryptpassword
    });
    // save new user in db
    user.save().then((docs) => {


        return res.status(200).json({
            message: 'Data inserted successfully',
            success: true,
            data: docs
        })

    })

        .catch((err) => {
            return res.status(401).json({
                message: 'Error in adding new user',
                success: false,
                error: err.message
            })
        });
});

// -------->>>>>>>>Userlogin------<<<<<<<<<<<<<<<<<<<<<<<<<<

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email)
        const password = req.body.password;
        const userfind = await User.findOne({ email: email });

        const bcryptpassword = bcrypt.compareSync(password, userfind.password);
        //  console.log(userfind.password);
        //  console.log(password);

        if (bcryptpassword === true) {
            res.status(200).json({
                message: "login successfull",
                success: true,
            })
        } else {
            res.status(401).json({
                message: "invalid password",
                success: false
            })
        }

    } catch (error) {
        res.status(401).json({
            message: "invalid login details",
            success: false
        })

    }

})



module.exports = router
