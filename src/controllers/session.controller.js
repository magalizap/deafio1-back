
/*export const testLogin = (req, res, next) => {
    const {email, password} = req.body
    try {
        if(email == 'emailuser@gmail.com' && password == '1234'){
            req.session.login = true
            res.status(200).json({message: 'Usuario logueado'})
        }else{
            res.status(401).json({message: 'Usuario no logueado'})
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const destroySession = (req, res, next) => {
    if(req.session.destroy){
        req.session.destroy(() => {
            res.status(200).json({message: 'Sesión destruida'})
        })
    }
}

export const getSession = (req, res, next) => {
    if(req.session.login){
        res.status(200).json({message: 'Sesion activa'})
    }else{
        res.status(401).json({message: 'Sesión no activa'})
    }
    //res.render('realtimeproducts', {name: req.session.name})
}*/