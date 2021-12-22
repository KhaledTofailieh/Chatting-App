
const routes = require('./routes/index')
const api = require('./api/index')
const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
const router = express.Router();
const api_router = express.Router();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname,'config/config.js'))[env]

const appsocket = require(path.join(__dirname,'sockets/index.js'))(io)
app.set('view engine', 'ejs'); 

router.use(session(config.session))
router.use(cookieParser()) 
router.use(bodyParser.json());

api_router.use(session(config.session))
api_router.use(cookieParser()) 
api_router.use(bodyParser.json());

app.use(express.static('./'))
app.use(session(config.session))
app.use(cookieParser()) 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api',api(api_router))
app.use('/', routes(router))

server.listen(config.port, () => {
  console.log(`Socket.IO server running at http://localhost:${config.port}/`);
});
app.get('/',(req,res)=>{
 res
})
exports = app
