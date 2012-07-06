
routes = (app) -> 

	app.get '/login', (req, res) -> 
		res.render "#{__dirname}/views/login",
			title: "Login"
			stylesheet: "login"

  app.post '/sessions', (req, res) ->
    #TODO: Remove this crappy way of authentication
    if('demo' is req.body.user) and ('demo' is req.body.password)
      req.session.currentUser = req.body.user
      req.flash 'info', "You are now logged in as #{req.session.currentUser}."
      res.redirect '/login'
      return
    req.flash 'error', "Incorrect username and password combination"
    res.redirect '/login'

  app.del '/sessions', (req, res) ->
    req.session.regenerate (err) ->
    req.flash 'info', 'You have been logged out.'
    res.redirect '/login'

module.exports = routes