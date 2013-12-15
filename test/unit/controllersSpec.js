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
    var scope, ctrl, routeParams, $httpBackend;

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

      routeParams = {
        documentId: 'reforma-educativa'
      };

      scope = $rootScope.$new();
      ctrl = $controller('DocumentCtrl', {
        $scope: scope,
        $routeParams: routeParams
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
  });

  describe('PartCtrl', function() {
    var scope, ctrl, routeParams, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/static/data/reforma-educativa/document.json')
        .respond({
          "title": "t",
          "reference": "r",
          "parts": [{
            "paragraphs": [
              "1A"
            ]
          }, {
            "paragraphs": [
              "2A",
              "2B"
            ]
          }, {
            "paragraphs": [
              "3A"
            ]
          }, {
            "paragraphs": [
              "4A"
            ]
          }]
        });

      routeParams = {
        documentId: 'reforma-educativa',
        partId: '2'
      };

      scope = $rootScope.$new();
      ctrl = $controller('PartCtrl', {
        $scope: scope,
        $routeParams: routeParams
      });
    }));


    it('should make initially visible actual part, one before and one after', function() {
      expect(scope.visibleParts).toEqualData([]);
      $httpBackend.flush();

      expect(scope.visibleParts[0]).toEqualData({
        'active': false,
        id: 1,
        paragraphs: [
          '1A'
        ]
      });
      expect(scope.visibleParts[1]).toEqualData({
        'active': true,
        'id': 2,
        "paragraphs": [
          '2A',
          '2B'
        ]
      });
      expect(scope.visibleParts[2]).toEqualData({
        'active': false,
        'id': 3,
        "paragraphs": [
          "3A"
        ]
      });
    });
  });

});