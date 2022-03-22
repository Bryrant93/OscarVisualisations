//https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

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

d3.csv("https://raw.githubusercontent.com/Bryrant93/DataVisCW2/main/winnersFrame9.csv").then( function(data) {
  // List of subgroups = header of the csv files = soil condition here
  const subgroups = data.columns.slice(1)
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = data.map(d => d.group)
  //https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
  function make_y1_gridlines() {		
    return d3.axisLeft(y1)
        .ticks(6)
    }
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
  .attr("transform","translate(520,520)")
  .call(x1)
  .append("text")
  .attr("fill", "white")//set the fill here
  .text("Decade");

  // Add Y axis
  const y1 = d3.scaleLinear()
    .domain([0, 6])
    .range([ height1, 0 ]);
    // add the Y gridlines
  svg1.append("g")			
    .attr("class", "grid1")
    .call(make_y1_gridlines()
        .tickSize(-width1)
        .tickFormat("")
    )
  svg1.append("g")
    .call(d3.axisLeft(y1).ticks(6))
    .style("color","white");
  
  // Handmade legend
  svg1.append("rect").attr("x", 795).attr("y",15).attr("width",300).attr("height",180).attr("fill","#353535")
  svg1.append("circle").attr("cx",820).attr("cy",60).attr("r", 6).style("fill", "#e87411")
  svg1.append("circle").attr("cx",820).attr("cy",90).attr("r", 6).style("fill", "#f5992b")
  svg1.append("circle").attr("cx",820).attr("cy",145).attr("r", 6).style("fill", "#004c6d")
  svg1.append("circle").attr("cx",820).attr("cy",175).attr("r", 6).style("fill", "#00a1c1")
  svg1.append("text").attr("x", 810).attr("y", 35).text("Critics").style("font-size", "17px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("font-weight",500)
  svg1.append("text").attr("x", 830).attr("y", 60).text("Rotten Tomatoes Tomatometer").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
  svg1.append("text").attr("x", 830).attr("y", 90).text("Metacritic MetaScore").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
  svg1.append("text").attr("x", 810).attr("y", 120).text("Audience").style("font-size", "17px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("font-weight",500)
  svg1.append("text").attr("x", 830).attr("y", 145).text("Rotten Tomatoes Audience Score").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
  svg1.append("text").attr("x", 830).attr("y", 175).text("Metacritic User Score").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")


  svg1.append("g")
    .attr('class', 'axis1')
    .attr("transform","translate(-30,440)rotate(-90)")
    .call(y1)
    .append("text")
    .attr("fill", "white")//set the fill here
    .text("No. of years the highest rated film won Best Picture");
  

  // Another scale for subgroup position?
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x1.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  const color1 = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e87411','#f5992b','#004c6d','#00a1c1'])

  // create selection rectangle
  svg1.append("rect")
    .attr("x", -50)
    .attr("y", 0)
    .attr("width",1180)
    .attr("height",520)
    .attr("fill","transparent")
    .attr("class","selectrect")
        
  
  // Show the bars
  svg1.selectAll(".selectrect").on("mouseenter", function(d, i) {
    svg1.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .join("g")
        .attr("transform", d => `translate(${x1(d.group)}, -.5)`)
      .selectAll("rect")
      .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
      .join("rect")
        .attr("x", d => xSubgroup(d.key))
        .attr("y", 490)
        .attr("width", xSubgroup.bandwidth())
        .attr("height", 0)
        .attr("fill", d => color1(d.key))
      .transition().duration(1250)
        .attr("x", d => xSubgroup(d.key))
        .attr("y", d => y1(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height1 - y1(d.value))
        .attr("fill", d => color1(d.key));

  })
})

// https://www.d3-graph-gallery.com/graph/scatter_basic.html

var highest = "HighestMS"
var group = "MetaScore"
var ghostGroup = "MetaScore"
var legend = "Critic's"
var colour = "#f5992b"
var ghostColour = "#f5992b"
var noFilmText = false

d3.select("#Critic").on("click", function(d, i) {
    highest = "HighestMS"
    ghostGroup = group
    group = "MetaScore"
    legend = "Critic's"
    colour = "#f5992b"
    ghostColour = "#00a1c1"
    if (group != ghostGroup) {
        switchRating();
    } 
  });
d3.select("#Audience").on("click", function(d, i) {
    highest = "HighestUS"
    ghostGroup = group
    group = "UserScore"
    legend = "Audience's"
    colour = "#00a1c1"
    ghostColour = "#f5992b"
    if (group != ghostGroup) {
        switchRating();
    } 
  });
// d3.select("#Reset").on("click", function(d, i) {
//     console.log("Hello")
//     d3.selectAll(".filmbox").remove();
//     d3.selectAll(".filmtext").remove();
//     d3.selectAll(".vertbox").style("fill","#383838");
//   });

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 1260 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz2")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 140 + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top+125})`);

        //https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
    function make_y_gridlines() {		
        return d3.axisLeft(y)
            .ticks(10)
    }

    // Add X axis
    const x = d3.scaleLinear()
        .domain([1989, 2020])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(30).tickFormat(d3.format("d")))
        .style("color","#ffffff");
    svg.append("g")
        .append("line")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("x2",1177)
        .attr("y2",height)
        .attr("stroke","white")


    svg.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(545,460)")
        .call(x)
        .append("text")
        .attr("fill", "white")
        .text("Oscar Year");
    //Janky fix for 1989 x-axis tick
    svg.append("g")
        .append("rect")
        .attr("x", -11)
        .attr("y",427)
        .attr("width",25)
        .attr("height", 10)
        .style("fill","#333333")
                   
    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0])
    // Add the Y gridlines
    svg.append("g")
        .call(d3.axisLeft(y))
        .style("color","#ffffff");
    //Create y-gridlines
    svg.append("g")			
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    )  
    svg.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(-30,303)rotate(-90)")
        .call(y)
        .append("text")
        .attr("fill", "white")
        .text("Critic/Audience  rating  %");
    svg.append("rect").attr("x", 545).attr("y",-132).attr("width",265).attr("height",115).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "2.967,3")
    svg.append("line").attr("x1", 737).attr("y1",-17).attr("x2",737).attr("y2",420).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "3,3")
    svg.append("text").text("In 2009 the Academy increased the number ")
        .attr("x", 549).attr("y",-118).style("font-size", "12px")
    svg.append("text").text("of films allowed to be nominated for Best ")
        .attr("x", 549).attr("y",-103).style("font-size", "12px")
    svg.append("text").text("Picture to ten, in an effort to allow more ")
        .attr("x", 549).attr("y",-88).style("font-size", "12px")
    svg.append("text").text("unconventional picks to be nominated. ")
        .attr("x", 549).attr("y",-73).style("font-size", "12px")
    svg.append("text").text("They also changed the voting method for ")
        .attr("x", 549).attr("y",-58).style("font-size", "12px")
    svg.append("text").text("determining the winner, which has proved")
        .attr("x", 549).attr("y",-43).style("font-size", "12px")
    svg.append("text").text("controversial with some movie fans.")
        .attr("x", 549).attr("y",-28).style("font-size", "12px")
    d3.csv("https://raw.githubusercontent.com/Bryrant93/DataVisCW2/main/oscarFrameFinal2.csv").then( function(data) {
    //Create graphic year rectangles
    svg.append('g')
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("class", function(d) {return "vertbox box"+d.Year})
        .attr("x", function(d) {return (d.Year-1989)*37.74-7})
        .attr("y",-.4)
        .attr("width",14)
        .attr("height",419.6)
        .attr("fill","#383838")
        .attr("cursor","pointer")
    })
var filmBoxOpen = null
var currentYear = 0
function switchRating() {
    //Read the data
    d3.csv("https://raw.githubusercontent.com/Bryrant93/DataVisCW2/main/oscarFrameFinal3.csv").then( function(data) { 
        //Create film list box on mouseover        
        metaOrUser = 1
            if (group == "MetaScore"){
                metaOrUser = 1
            }
            else {
                metaOrUser = 2
            }
        
        
        const highlight = function(event,d){
            filmBoxOpen = false
            d3.selectAll(".filmbox").remove();
            d3.selectAll(".filmtext").remove();
            d3.selectAll(".vertbox").style("fill","#383838");
            if (d.Year != currentYear) {
                currentYear = d.Year
                d3.selectAll(".box"+d.Year).style("fill","#474747");
                globalThis.selected_year = d.Year
                //MetaScore = 1, UserScore = 2
                globalThis.filmList = []
                globalThis.longestFilmTitle = 0
                for (film of data){
                    if (film.Year == selected_year){
                        if (film.Film.length > longestFilmTitle) {
                            longestFilmTitle = film.Film.length
                        }
                        filmList.push([film.Film, film.MetaScore, film.UserScore, film.Award])
                    }
                }
                //https://www.codingem.com/javascript-sort-an-array-of-arrays/#:~:text=To%20sort%20the%20array%20of,magnitude%20of%20the%20second%20elements.
                selectedList = filmList.sort((a, b) => b[metaOrUser] - a[metaOrUser])
                //https://stackoverflow.com/questions/872310/javascript-swap-array-elements
                if (selectedList[0][metaOrUser]==selectedList[1][metaOrUser]){
                    [selectedList[0], selectedList[1]] = [selectedList[1], selectedList[0]]
                }
                //filmbox
                svg.append("g")
                    .selectAll("rect")
                    .data(data)
                    .enter()    
                    .append("rect")
                        .attr("class","filmbox")
                        .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+7 :(selected_year-1989)* 37.74-(longestFilmTitle*8.5+(75-longestFilmTitle))-7)
                        .attr("y",412.5-(20*selectedList.length+1))
                        .attr("width",longestFilmTitle*8.5+(75-longestFilmTitle))
                        .attr("height", 20*selectedList.length+7)
                        .attr("fill","#383838")
                filmBoxOpen = true;

                var i = -1
                var j = -1
                var k = -1
                //filmtext
                svg.append("g")
                    .selectAll("rect")
                    .data(data)
                    .enter()
                    .append("text")
                        .attr("class", "filmtext")
                        .text(function(d) {if (i < selectedList.length-1) {i++; return selectedList[i][0] + " - " + selectedList[i][metaOrUser]+"%"}})
                        .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+13 :(selected_year-1989)* 37.74-(longestFilmTitle*8.5+(75-longestFilmTitle))-2)
                        .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (425.5-(20*selectedList.length+1))+(j*20.5)}})
                        .attr("alignment-baseline","middle")
                        .style("font-size", "15px")
                        .style("fill", function(d) {
                            k++; 
                            if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                            else { return "grey" };
                        })
            }
            else {
                currentYear = 0;
            }
        }
        d3.selectAll(".vertbox").on("click",highlight)
        console.log("run")
        
 
        //https://stackoverflow.com/questions/64688719/how-to-make-a-scatterplot-based-upon-certain-criteria-using-d3-js
        // Add dots
        svg.append('g')
        .attr("class","dots")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
            .attr("transform", function(d) {
                return `translate(${[x(d.Year), y(d[ghostGroup])]})`;
            })
            .attr("d", function(d) {
                const path = d3.path();
                d[highest] == "Yes" && d.Award == "Winner" ? d3.symbolStar.draw(path,60) : d3.symbolCircle.draw(path,15);
                return path.toString();
            })
            .on("click", highlight)
            //https://bl.ocks.org/d3noob/464c92429ac05c6a19a1
            .style("fill", function(d) {
                if (d.Award == "Winner") {return `${ghostColour}`}
                else { return "grey" };
            })
            .attr("cursor","pointer")
            .transition().duration(1000)
            .style("fill", function(d) {
                if (d.Award == "Winner") {return `${colour}`}
                else { return "grey" };
            })
            .attr("transform", function(d) {
                return `translate(${[x(d.Year), y(d[group])]})`;
            })        

            // Handmade legend
        svg.append("rect").attr("x", -35).attr("y",-137).attr("width",570).attr("height",125).attr("fill","#383838").attr("class","legend")
        svg.append("rect").attr("x", 825).attr("y",-132).attr("width",353).attr("height",115).attr("fill","#383838").attr("class","legend")
        svg.append("circle").attr("cx",840).attr("cy",-112).attr("r", 6).style("fill", "grey").attr("class","legend")
        svg.append("circle").attr("cx",840).attr("cy",-82).attr("r", 6).style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend")
        svg.append("path").attr('d', d3.symbol().type(d3.symbolStar).size(80)).attr("transform", "translate(840.5,-42)").style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend").transition()
        svg.append("text").attr("x", 860).attr("y", -110).text("Best Picture nominee").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
        svg.append("text").attr("x", 860).attr("y", -80).text("Best Picture winner").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
        svg.append("text").attr("x", 860).attr("y", -50).text(`${legend} winner agrees`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
        svg.append("text").attr("x", 860).attr("y", -30).text(`with Academy winner`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")

        if (filmBoxOpen == true) {
            selectedList = filmList.sort((a, b) => b[metaOrUser] - a[metaOrUser])
            
            var i = -1
            var j = -1
            var k = -1
            //filmtext
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("text")
                    .attr("class", "filmtext")
                    .text(function(d) {if (i < selectedList.length-1) {i++; return selectedList[i][0] + " - " + selectedList[i][metaOrUser]+"%"}})
                    .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+13 :(selected_year-1989)* 37.74-(longestFilmTitle*8.5+(75-longestFilmTitle))-2)
                    .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (425.5-(20*selectedList.length+1))+(j*20.5)}})
                    .attr("alignment-baseline","middle")
                    .style("font-size", "15px")
                    .style("fill", function(d) {
                        k++; 
                        if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                        else { return "grey" };
                    });     
        }   
    })
    svg.selectAll(".dots").remove();
    svg.selectAll(".legend").remove();
    // svg.selectAll(".filmbox").remove();
    svg.selectAll(".filmtext").remove();
}

switchRating();