'use strict';

var deepEquals = require('deep-equals');
var MAJOR_ROAD_TYPES = [
  'motorway',
  'trunk',
  'motorway_link',
  'trunk_link',
  'primary',
  'primary_link'
];

function getHighwayType(feature) {
  return feature.properties.highway;
}

function isMajorRoad(feature) {
  var highwayType = getHighwayType(feature);
  return MAJOR_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function getGeometry(feature) {
  return feature.geometry;
}

function geometryChanged(newVersion, oldVersion) {
  if (!oldVersion || newVersion.deleted) {
    return false;
  }

  if (isMajorRoad(oldVersion)) {
    if (!deepEquals(getGeometry(oldVersion), getGeometry(newVersion))) {
      return {
        'result:motorway_trunk_geometry_changed': true
      };
    }
  }
  return false;
}

module.exports = geometryChanged;
