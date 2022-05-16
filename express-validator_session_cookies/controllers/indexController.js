const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        if (req.session.name) {
            let data = req.session;
            return res.render('index', { data })
        }
        res.render('index')
    },
    store: (req, res) => {
        console.log(req.body)

        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render('index', { errors: errors.errors});
        }

        req.session.name = req.body.name;
        req.session.color = req.body.color;
        req.session.email = req.body.email;
        req.session.age = req.body.age;
        
        if(req.body.remember) {
            res.cookie('color', req.body.color, { maxAge: 60 * 1000 });
        }

        res.redirect('/');

    },

    borrar: (req,res) => {
        req.session.color = null;
        res.cookie('color', null, { maxAge: -1 });
        res.send('Color borrado');
    }
}