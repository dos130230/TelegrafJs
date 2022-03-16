const dotenv = require('dotenv')
dotenv.config()

require('./core')
require('./auth')
require('./action')
require('./middlewares')
require('./controllers')