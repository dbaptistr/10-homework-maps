import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

let svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let projection = d3.geoEqualEarth()

let path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('./data/world.topojson')),
  d3.csv(require('./data/world-cities.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([json, datapoints]) {
  console.log(json.objects) // to find out how the layer you need is called
  let countries = topojson.feature(json, json.objects.countries)

  console.log(datapoints)

  svg
    .selectAll('.world-map')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'world-map')
    .attr('d', path)
    .attr('fill', 'lightgrey')
    .attr('stroke', 'black')

  svg
    .append('path')
    .datum({ type: 'Sphere' })
    .attr('d', path)
    .attr('fill', 'lightblue')
    .attr('stroke', 'black')
    .lower()
}
