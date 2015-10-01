module.exports = function(robot) {
  robot.hear(/(keith|beef) me/i, function(res) {
    var images = {
      keith: 'https://i.imgflip.com/rws2v.jpg',
      beef: 'https://i.imgflip.com/rwskl.jpg'
    };
    var image = images[res.match[1]];
    res.send(image);
  });
};


