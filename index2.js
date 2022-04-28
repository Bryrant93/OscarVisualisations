
// set the dimensions and margins of the graph
const margin1 = {top: 10, right: 30, bottom: 20, left: 50},
    width1 = 1180 - margin1.left - margin1.right,
    height1 = 520 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + 40 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform",`translate(${margin1.left},${margin1.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/Bryrant93/OscarVisualisations/main/winnersFrameFinal.csv").then( function(data1) {
  // List of subgroups = header of the csv files = soil condition here
  const subgroups = data1.columns.slice(1)
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = data1.map(d => d.group)

  // Add X axis
  const x1 = d3.scaleBand()
      .domain(groups)
      .range([0, width1])
      .padding([0.2])
  svg1.append("g")
    .attr("transform", `translate(0, ${height1})`)
    .call(d3.axisBottom(x1).tickSize(0))
    .style("color","#ffffff");
  svg1.append("g")
    .attr('class', 'axis1')
    .attr("transform","translate(525,520)")
    .call(x1)
    .append("text")
    .attr("fill", "white")//set the fill here
    .text("Year");



  // Add Y axis
  const y1 = d3.scaleLinear()
    .domain([0, 5])
    .range([ height1, 0 ]);
    // add the Y gridlines
  svg1.append("g")			
    .attr("class", "grid1")
    .call(d3.axisLeft(y1)
        .ticks(5)
        .tickSize(-width1)
        .tickFormat("")
    )
  svg1.append("g")
    .call(d3.axisLeft(y1).ticks(5))
    .style("color","white");
  
  // Handmade legend
  svg1.append("rect").attr("x", 835).attr("y",35).attr("width",230).attr("height",75).attr("fill","#353535")
  svg1.append("rect").attr("x",850).attr("y",51).attr("width",14).attr("height",14).style("fill", "#f5992b")
  svg1.append("rect").attr("x",850).attr("y",81).attr("width",14).attr("height",14).style("fill", "#00a1c1")
  svg1.append("text").attr("x", 870).attr("y", 60).text("Metascore (Critical)").style("font-size", "20px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
  svg1.append("text").attr("x", 870).attr("y", 90).text("User Score (Audience)").style("font-size", "20px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")


  svg1.append("g")
    .attr('class', 'axis1')
    .attr("transform","translate(-30,400)rotate(-90)")
    .call(y1)
    .append("text")
    .attr("fill", "white")
    .text("No. of years the highest rated film won Best Picture");
  
    // svg1.append("line").attr("x1", 883).attr("y1",392).attr("x2",1060).attr("y2",392).style("stroke", "white").style("stroke-dasharray", "8,4").style("stroke-width", 3).style("opacity",0).transition().duration(1500).style("opacity",1)
    // svg1.append("text").attr("x", 883).attr("y", 367).text("Only two Academy Awards Ceremonies ").style("font-size", "12.5px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").style("opacity",0).transition().duration(1500).style("opacity",1)
    // svg1.append("text").attr("x", 883).attr("y", 382).text("have taken place so far this decade.").style("font-size", "12.5px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").style("opacity",0).transition().duration(1500).style("opacity",1)

  // Another scale for subgroup position?
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x1.bandwidth()])
    .padding([0.0])

  // color palette = one color per subgroup
  const color1 = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#f5992b','#00a1c1'])
        
  
  // Show the bars
    svg1.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data1)
      .join("g")
        .attr("transform", d => `translate(${x1(d.group)}, -.5)`)
      .selectAll("rect")
      .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
      .join("rect")
        .attr("x", d => xSubgroup(d.key)+4)
        .attr("y", 490)
        .attr("width", xSubgroup.bandwidth()*.9)
        .attr("height", 0)
        .attr("fill", d => color1(d.key))
      .transition().duration(1250)
        .attr("x", d => xSubgroup(d.key)+4)
        .attr("y", d => y1(d.value))
        .attr("width", xSubgroup.bandwidth()*.9)
        .attr("height", d => height1 - y1(d.value))
        .attr("fill", d => color1(d.key));

})