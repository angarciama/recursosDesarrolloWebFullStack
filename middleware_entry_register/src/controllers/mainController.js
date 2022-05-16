module.exports = {
    index: (req,res) => {
        res.render('index');
    },
    admin: (req,res) => {
        res.send('Hola admin: ' + req.query.user);
    }
}