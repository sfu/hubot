# Description:
#   Celebrate: What you do when you're happy
#
# Commands:
#   hubot celebrate
#   hubot let's celebrate

module.exports = (robot) ->
  robot.respond /(let\'?s )?celebrate/i, (msg) ->
    msg.send "http://f.cl.ly/items/0O3T1y0c3u1a3X3O1n1R/ykr3.gif"
