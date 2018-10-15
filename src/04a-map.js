import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-4a')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoAlbersUsa() // if you're working on the US, use this projection
let path = d3.geoPath().projection(projection)

d3.json(require('./data/counties_with_election_data.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {
  console.log(json.us_counties)
  let countries = topojson.feature(json, json.us_counties.geometries)
  console.log(geometries)
}

