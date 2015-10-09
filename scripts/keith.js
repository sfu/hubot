module.exports = function(robot) {
  robot.hear(/(keith|beef) me/i, function(res) {
    var images = {
      keith: 'https://i.imgflip.com/sb9aw.jpg',
      beef: 'https://i.imgflip.com/rwskl.jpg'
    };
    var image = images[res.match[1]];
    res.send(image);
  });
};


