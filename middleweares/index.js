module.exports = (app) => {
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const morgan = require('morgan');
    const helmet = require('helmet');
    require('dotenv').config(); 

    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(helmet());

    
}