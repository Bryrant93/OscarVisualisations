//SECOND GRAPH
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
        .attr("x2",1178)
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
        .style("fill","#2e2e2e")
                   
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
    svg.append("rect").attr("x", 545).attr("y",-132).attr("width",290).attr("height",115).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "2.967,3")
    svg.append("line").attr("x1", 737).attr("y1",-17).attr("x2",737).attr("y2",420).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "3,3")
    // svg.append("text").text("In 2009 the Academy changed the rules for")
    //     .attr("x", 549).attr("y",-118).style("font-size", "12px")
    // svg.append("text").text("voting on nominees and winners for the")
    //     .attr("x", 549).attr("y",-103).style("font-size", "12px")
    // svg.append("text").text("Best Picture Oscar, this included increasing ")
    //     .attr("x", 549).attr("y",-88).style("font-size", "12px")
    // svg.append("text").text("the number of nominees to ten and ")
    //     .attr("x", 549).attr("y",-73).style("font-size", "12px")
    // svg.append("text").text("introduce runoff voting. Changes that")
    //     .attr("x", 549).attr("y",-58).style("font-size", "12px")
    // svg.append("text").text("proved controversial with some, claiming it ")
    //     .attr("x", 549).attr("y",-43).style("font-size", "12px")
    // svg.append("text").text("would promote more generic winners.")
    //     .attr("x", 549).attr("y",-28).style("font-size", "12px")
    d3.csv("https://raw.githubusercontent.com/Bryrant93/DataVisCW2/main/oscarFrameFinal2.csv").then( function(data) {
    //Create graphic year rectangles
    svg.append('g')
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("class", function(d) {return "vertbox box"+d.Year})
        .attr("x", function(d) {if (d.Award == "Winner") {return (d.Year-1989)*37.74-8} else {return -100}})
        .attr("y",-.5)
        .attr("width",16)
        .attr("height",419.8)
        .attr("fill","#383838")
        .attr("cursor","pointer")
    })
var filmBoxOpen = null
var currentYear = 0

        svg.append("rect").attr("x", -8).attr("y",-132).attr("width",543).attr("height",115).attr("fill","#383838")
        svg.append("rect").attr("x", 844).attr("y",-132).attr("width",334).attr("height",115).attr("fill","#383838")
        svg.append("circle").attr("cx",860).attr("cy",-112).attr("r", 6).style("fill", "grey")
        svg.append("text").attr("x", 880).attr("y", -110).text("Best Picture nominee").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
        svg.append("text").attr("x", 880).attr("y", -80).text("Best Picture winner").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
        svg.append("text").attr("x", 880).attr("y", -30).text(`with Academy winner`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")


function switchRating() {
    svg.selectAll(".dots").remove();
    svg.selectAll(".filmtext").remove();
    svg.selectAll(".legend").remove();
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
                        .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+7 :(selected_year-1989)* 37.74-(longestFilmTitle*7+(75-longestFilmTitle))-7)
                        .attr("y",412.5-(20*selectedList.length+1))
                        .attr("width",longestFilmTitle*7+(75-longestFilmTitle))
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
                        .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+13 :(selected_year-1989)* 37.74-(longestFilmTitle*7+(75-longestFilmTitle))-2)
                        .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (425.5-(20*selectedList.length+1))+(j*20.5)}})
                        .attr("alignment-baseline","middle")
                        .style("font-size", "15px")
                        .style("fill", function(d) {
                            k++; 
                            if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                            else { return "#e9eff1" };
                        })
            }
            else {
                currentYear = 0;
            }
        }
        d3.selectAll(".vertbox").on("click",highlight)
        
 
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
                d[highest] == "Yes" && d.Award == "Winner" ? d3.symbolStar.draw(path,75) : d3.symbolCircle.draw(path,10);
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

        // legend
        svg.append("circle").attr("cx",860).attr("cy",-82).attr("r", 6).style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend")
        svg.append("path").attr('d', d3.symbol().type(d3.symbolStar).size(80)).attr("transform", "translate(860.5,-42)").style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend").transition()
        svg.append("text").attr("x", 880).attr("y", -50).text(`${legend} winner agrees`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
        
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
                    .attr("x", selected_year < 2009 ? (selected_year-1989)*37.74+13 :(selected_year-1989)* 37.74-(longestFilmTitle*7+(75-longestFilmTitle))-2)
                    .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (425.5-(20*selectedList.length+1))+(j*20.5)}})
                    .attr("alignment-baseline","middle")
                    .style("font-size", "15px")
                    .style("fill", function(d) {
                        k++; 
                        if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                        else { return "e9eff1"};
                    });     
        }   
    })
}

switchRating()