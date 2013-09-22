// initialize our faux database
var data = {
  "reforma-educativa": {
    "p1": [{
      "user": "Josue",
      "comment": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr... "
    }, {
      "user": "Pedro",
      "comment": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr... "
    }],
    "p2": [{
      "user": "Pedro",
      "comment": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr... "
    }]
  }
};

// GET
exports.comments = function(req, res) {
  var documentId = req.params.documentId,
    paragraphId = req.params.paragraphId,
    comments = [],
    paragraphData = data[documentId][paragraphId];
  if (paragraphData) {
    paragraphData.forEach(function(comment, i) {
      comments.push({
        id: i,
        user: comment.user,
        comment: comment.comment
      });
    });
  }
  res.json(comments);
};

exports.addComments = function(req, res) {
  var documentId = req.params.documentId,
    paragraphId = req.params.paragraphId,
    paragraphData = data[documentId][paragraphId];
  if (!paragraphData) {
    data[documentId][paragraphId] = [];
  }
  console.log('req.body' + req.body);
  data[documentId][paragraphId].push(req.body);
  res.json(req.body);
};