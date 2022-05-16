let admins = ['Ada', 'Greta', 'Vim', 'Tim'];

function admin(req, res, next) {
        let user = req.query.user;

        // if(user ){
        //     admins.forEach(admin => {
        //         if (user = admin){
        //             next();
        //         }
        //     });
        // } else {
        //     res.send('No tienes los privilegios para ingresar');
        // }

        user && admins.includes(user) ? next() : res.send('No tienes los privilegios para ingresar');
    }

    module.exports = admin;



//Se puede hacer de este modo pero en la ruta hay que colocar .admin
//router.get('/admin', adminMiddleware.admin, controller.admin);
// module.exports = {
//     admin: (req, res, next) => {
//         let user = req.query.user;

//         // if(user ){
//         //     admins.forEach(admin => {
//         //         if (user = admin){
//         //             next();
//         //         }
//         //     });
//         // } else {
//         //     res.send('No tienes los privilegios para ingresar');
//         // }

//         user && admins.includes(user) ? next() : res.send('No tienes los privilegios para ingresar');
//     }
// }
