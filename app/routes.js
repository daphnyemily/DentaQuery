const { ObjectID } = require("bson");

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

// PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
            db.collection('savedQuestions').find({
                userId: ObjectID(req.user._id)

            }).toArray((err2, result2) => {
                if (err) return console.log(err)
                res.render('profile.ejs', {
                user : req.user,
                messages: result,
                queryForm: result2
            }, console.log(result2)  )      
          })
        })
    });

// LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// SEARCH =========================================================================
    app.get('/search', function(req, res) {
      res.render('search.ejs', { message: req.flash('search') });
     
  });

// SEARCH RESULT TO QUERY PAGE  =========================
    app.get('/query/:id', isLoggedIn, function(req, res){
      db.collection('messages').find().toArray((err, result) => {
        if (err) return console.log(err)
            res.render('query.ejs', {
                user : req.user,
                message: result,
            })
        })
      })

 // SEARCH RESULT TO QUERY PAGE  =========================
    app.get('/query2/:id', isLoggedIn, function(req, res){
        db.collection('messages').find().toArray((err, result) => {
            db.collection('savedQuestions').find({
                userId: ObjectID(req.user._id)
            }).toArray((err2, result2) => {
                if (err) return console.log(err)
              res.render('query2.ejs', {
                  user : req.user,
                  message: result,
                  queryForm: result2
                })
              })
          })
        })


    // app.get('/query/:id', !isLoggedIn, function(req, res){
    //     res.redirect('login.ejs')
            
    // })

    // app.get('/query/:id', function(req, res){
    //   res.render('login.ejs', { message: req.flash('loginMessage') })
    // })
 
// COMMON QUESTIONS & TOOLS ========================================================
app.get('/commonQuestions', function(req, res) {
  res.render('commonQuestions.ejs', { message: req.flash('commonQuestions') });
});

// QUERY PAGE =========================================================================
app.get('/query', function(req, res) {
  res.render('query.ejs', { message: req.flash('search') });
});

app.post("/saveToProfile", isLoggedIn, function(req, res){
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let dd = String(today.getDate()).padStart(2, '0');
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
    today = mm + '/' + dd + '/' + yyyy + " " + time    

    db.collection('savedQuestions').updateOne({
        _id: ObjectID(req.user._id)
    }, {
        $set:{
            userId: ObjectID(req.user._id),
            name: req.user.local.name,
    },
        $push:{
            savedDocs: [req.body, today] 
        }    
    },{
        upsert: true
    },
     (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
    })
    res.redirect("/profile")
})

app.post("/updateProfile", isLoggedIn, function(req, res){
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let dd = String(today.getDate()).padStart(2, '0');
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
    today = mm + '/' + dd + '/' + yyyy + " " + time    

    db.collection('savedQuestions').updateOne({
        _id: ObjectID(req.user._id)
    }, {
        $set:{
            userId: ObjectID(req.user._id),
            name: req.user.local.name,
            savedDocs: [[req.body, today]]
    }   
    },{
        upsert: true
    },
     (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
    })
    res.redirect("/profile")
})

// ABOUT PAGE =========================================================================
app.get('/about', function(req, res) {
  res.render('about.ejs', { message: req.flash('search') });

});



// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('login.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}



// message board routes ===============================================================

    // app.post('/messages', (req, res) => {
    //   db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/profile')
    //   })
    // })

   
    // app.delete('/messages', (req, res) => {
    //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })