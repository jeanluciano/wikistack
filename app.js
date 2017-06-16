const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const makesRouter = require('./routes');
const bodyParser = require('body-parser');
const models = require('./models')
 // how to render html templates
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json());

app.use(express.static('/public'))
app.use('/', makesRouter)


models.db.sync({})
    .then(function(){
        app.listen(3000,function(){
            console.log('SERVER LISTENING ON PORT 3000')
        })
    })
    .catch(console.error.bind(console))