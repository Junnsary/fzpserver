var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var usersRouter = require('./routes/users')
var articleRouter = require('./routes/article')
var videoRouter = require('./routes/video')
var commentRouter = require('./routes/comment')
var favoritesRouter = require('./routes/favorites')
var sourcesRouter = require('./routes/sources')
var tagsRouter = require('./routes/tags')
var managerRouter = require('./routes/manager')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//设置路由
app.use('/api/users', usersRouter)
app.use('/api/article', articleRouter)
app.use('/api/video', videoRouter)
app.use('/api/comment', commentRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/sources', sourcesRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/manager', managerRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
