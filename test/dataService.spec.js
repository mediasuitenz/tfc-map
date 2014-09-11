'use strict';

/*
data service
- pull geojson data from various endpoints
- receives sse for updates
- notify listeners when data changes
- add listeners
- node-event-emitter
 */
require('chai').should()
var assert = require('assert')
var geojsonIsValid = require('geojson-is-valid')

var dataServiceFactory = require('../lib/dataService')

var validGeojson = {
  "type": "FeatureCollection",
  "features": [
    {
        "type": "Feature",
        "id": "way/4243736",
        "properties": {
            "highway": "trunk"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [
                    172.5498622,
                    -43.4932694
                ],
                [
                    172.5498622,
                    -43.4932694
                ]
            ]
        }
    }
  ]
}

describe('DataService', () => {
  var validConfig = {
    url: '...',
    type: 'longPoll',
    refresh: 10000
  }

  describe('Creating a DataService with config', () => {
    it('should require a valid config object', () => {
      //Given
      var config = validConfig

      //Then
      assert.doesNotThrow(() => { dataServiceFactory(config) }, 'Invalid config')
    })

    it('should balk at an invalid config object', () => {
      //Given
      var config = {}

      //Then
      assert.throws(
        () => { dataServiceFactory(config) },
        (err) => {
          return err.message === 'DataService config missing required key: url'
        },
        'DataService did not throw expected error'
      )
    })

    it('should freak out at a null config object', () => {
      //Then
      assert.throws(
        () => { dataServiceFactory() },
        (err) => {
          return err.message === 'DataService missing config object'
        },
        'DataService did not throw expected error'
      )
    })

    it('should bail when given a string for a config object', () => {
      //Then
      assert.throws(
        () => { dataServiceFactory('wtf are you thinking?') },
        (err) => {
          return !!err.message
        },
        'DataService did not throw an error'
      )
    })
  })

  describe('#load', () => {
    it('should load geojson from the server', done => {
      //Given
      var dataService = dataServiceFactory(validConfig)

      //When
      dataService.load( (err, res) => {
        //Then
        assert.equal(err, null)
        res.should.be.an('object')
        done()
      })
    })
  })

  describe('#getData', () => {
    it('should return its latest geojson', () => {
      //Given
      var dataService = dataServiceFactory(validConfig)
      dataService.data = validGeojson

      //When
      var geojson = dataService.getData()

      //Then
      geojson.should.be.an('object')
      geojsonIsValid(geojson).should.equal(true)

    })
  })

  describe('#addListener', () => {

  })

  describe('#notify', () => {

  })

})
