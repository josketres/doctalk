'use strict';

describe('DocTalk Controllers', function() {

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('doctalk'));
  beforeEach(module('doctalkServices'));

  describe('DocumentCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/static/data/reforma-educativa/document.json')
        .respond({
          "title": "La reforma educativa",
          "reference": "http://pactopormexico.org/Reforma-Educativa.pdf",
          "parts": [{
            "paragraphs": [
              "foo",
              "bar"
            ]
          }]
        });

      scope = $rootScope.$new();
      ctrl = $controller('DocumentCtrl', {
        $scope: scope
      });
    }));


    it('should create "document" model with document fetched from xhr', function() {
      expect(scope.doc).toEqualData({});
      $httpBackend.flush();

      expect(scope.doc).toEqualData({
        "title": "La reforma educativa",
        "reference": "http://pactopormexico.org/Reforma-Educativa.pdf",
        "parts": [{
          "paragraphs": [
            "foo",
            "bar"
          ]
        }]
      });
    });

    it("should activate pharagraph 1 and load its comments", function() {
      $httpBackend.expectGET('/api/document/reforma-educativa/p0/comments')
        .respond([{
          id: 1,
          user: 'josue',
          comment: 'foobar'
        }]);

      expect(scope.activeParagraph.isActive()).toBe(false);

      scope.activateParagraph(0);
      $httpBackend.flush();

      expect(scope.activeParagraph.isActive()).toBe(true);
      expect(scope.activeParagraph.comments).toEqualData([{
        id: 1,
        user: 'josue',
        comment: 'foobar'
      }]);
    });
  });
});