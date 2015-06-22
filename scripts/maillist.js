// Description:
//   script to get the membership of a SFU maillist
//
// Configuration:
//   ART: an ART token for the SFU Rest Server that has the ability to retreive maillist members
//
// Commands:
//   hubot <trigger> - <what the respond trigger does>
//   <trigger> - <what the hear trigger does>
//
// Author:
//   grahamb

var token = process.env['ART'];
var rest_url = 'https://rest.its.sfu.ca/cgi-bin/WebObjects/AOBRestServer.woa/rest/maillist/members.js?listname=LIST&art=' + token;
module.exports = function(robot) {
  robot.respond(/maillist (.*)?/i, function(res) {
    if (!token) {
      res.send('No maillist token. Consult my masters for assistance.');
      return;
    }
    var list = res.match[1];
    robot.http(rest_url.replace(/LIST/, list)).header('Accept', 'application/json').get()(function(err, response, body) {

      if (err) {
        res.send('Encountered an error trying to do your bidding: ' + err);
        return;
      }

      var members = JSON.parse(body);
      if (!members.length) {
        res.send ('Maillist ' + list + ' either has no members, or is not a valid list');
      } else {
        var message = 'Members of maillist ' + list + ':\n\n' + members.join('\n');
        res.send(message);
      }
    });
  });
}
