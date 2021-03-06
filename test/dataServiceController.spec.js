'use strict';

require('mocha-given')
var chai    = require('chai')
var expect  = chai.expect
var scenario = describe

var dataServiceControllerFactory = require('../lib/dataServiceController')

var dataServicesConfig = [
  {
    name: 'dataSource1',
    type: 'singlePoll',
    request: {
      url: '...'
    }
  }
]

var dataServiceController = dataServiceControllerFactory(dataServicesConfig)

describe('The DataService Controller', () => {

  scenario('Creating DataServices from config', () => {
    var firstService

    Given(() => firstService = dataServiceController.dataServices[dataServicesConfig[0].name])
    Then(() => expect(firstService).to.be.an('object'))
  })

  scenario('Getting a DataService for a layer', () => {
    var dataService
    var layerConfig

    Given(() => {
      layerConfig = {
        dataSource: 'dataSource1'
      }
    })
    When(() => dataService = dataServiceController.getDataServiceForLayer(layerConfig))
    Then(() => expect(dataService).to.be.an('object'))
  })
})
