
assert 	= require 'assert'
request = require 'request'
app 	= require '../../server'

describe "authentication", ->
  describe "GET /login", ->
    body = null
    before (done) ->
      options =
        uri: "http://localhost:3000/login" 
      request options, (err, response, _body) ->
        body = _body
        done()
    it "has a user field", ->
      assert.ok /user/.test(body)