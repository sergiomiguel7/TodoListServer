module.exports = (app) => {

        app.use('/api/auth', require('../routes/auth'))
        app.use('/api/todos', require('../routes/todos'));

}