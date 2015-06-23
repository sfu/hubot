// Description:
//   script to get the provide a link to ServiceNow when an Incident Number (INCdddddddd) is pasted into the chat
//
// Configuration:
//   Username: a SNOW user with access to the API
//   Password: the password for the above SNOW user
//
// Commands:
//   INC\d+ - responds with a direct link to the SNOW ticket
//
// Author:
//   grahamb

var snow_api = 'https://sfuprod.service-now.com/api/now/table/incident?number='
var url_template = 'https://sfuprod.service-now.com/nav_to.do?uri=incident.do%3Fsys_id=';
var inc_regex = /INC\d+/;
var auth = 'Basic ' + new Buffer(process.env.HUBOT_SNOW_USER + ':' + process.env.HUBOT_SNOW_PASS).toString('base64')
module.exports = function(robot) {

  robot.hear(inc_regex, function(res) {
    var inc_number = res.match[0];
    var cached = robot.brain.get(inc_number);
    if (cached) {
      res.send(url_template + cached);
      return;
    }

    robot.http(snow_api + inc_number)
         .headers({
            Authorization: auth,
            Accept: 'application/json'
         })
         .get()(function(err, response, body) {
          if (err) {
            res.send('Encountered an error trying to do your bidding: ' + err);
            return;
          }
          if (response.statusCode === 200 && body) {
            body = JSON.parse(body);
            var sys_id = body.result[0].sys_id;
            robot.brain.set(inc_number, sys_id);
            res.send(url_template + sys_id);
          } else {
            res.send(body);
          }

         });
  });

}
