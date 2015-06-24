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

  function speak(res, data) {
    res.send(data.summary + ' (' + data.caller + ')');
    res.send(url_template + data.sys_id);
  }

  robot.hear(inc_regex, function(res) {
    var inc_number = res.match[0];
    var cached = robot.brain.get(inc_number);
    if (cached) {
      speak(res, JSON.parse(cached));
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
            robot.logger.error(err);
            return;
          }
          if (response.statusCode === 200 && body) {
            body = JSON.parse(body);
            var sys_id = body.result[0].sys_id;
            var summary = body.result[0].u_derived_mail_subject;
            var caller = body.result[0].u_derived_caller;
            var data = {
              sys_id: sys_id,
              summary: summary,
              caller: caller
            };
            robot.brain.set(inc_number, JSON.stringify(data));
            speak(res, data);
          } else if (response.statusCode === 404) {
            res.send('Sorry, I don\'t know what ' + inc_number + ' is.');
          } else {
            robot.logger.error(body);
          }
         });
  });
}
