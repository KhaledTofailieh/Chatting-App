module.exports = {
    development: {
      port: process.env.PORT || 3000,
      session : {
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { 
            secure: false,
            signed: true,
            expires: null
        }
       },
    cors : {
        origin : true,
        methods : true,
        allowedHeaders : true, 
        exposedHeaders : true
       }

    },
    test:{

    },

    production:{

    }
    
  }