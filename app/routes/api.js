// initialize our faux database
var data = {
  "reforma-educativa": {}
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
  res.header("Cache-Control", "no-cache");
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