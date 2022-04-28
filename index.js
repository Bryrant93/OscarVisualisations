//https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

// set the dimensions and margins of the graph
const margin1 = {top: 10, right: 30, bottom: 20, left: 50},
    width1 = 1260 - margin1.left - margin1.right,
    height1 = 520 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 +40 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform",`translate(${margin1.left},${margin1.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/Bryrant93/OscarVisualisations/main/winnerLine.csv").then(function(data) {
    
    // Add X axis 
    const x1 = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year }))
      .range([ 0, width1 ]);          

    // Add Y axis
    const y1 = d3.scaleLinear()
      .domain([0, 10])
      .range([ height1, 0 ]);
    svg1.append("g")			
      .attr("class", "grid")
      .call(d3.axisLeft(y1).ticks(10)
          .tickSize(-width1)
          .tickFormat("")
        )
    
    // Add the line
    svg1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.Meta) })
        );
    svg1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.Critic) })
        );
    svg1.append("path")
      .datum(data.slice(10))
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.Meta) })
        );


    svg1.append("g")
      .attr("transform", `translate(0, ${height1})`)
      .call(d3.axisBottom(x1).ticks(30).tickFormat(d3.format("d")));

    svg1.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(577,525)")
        .call(x1)
        .append("text")
        .attr("fill", "white")
        .text("Year");

    svg1.append("g")
      .call(d3.axisLeft(y1));

    svg1.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(-30,400)rotate(-90)")
        .call(y1)
        .append("text")
        .attr("fill", "white")
        .text("No. of years the highest rated film won Best Picture");
    svg1.append("rect").attr("x", 915).attr("y",380).attr("width",230).attr("height",75).attr("fill","#353535")
    svg1.append("rect").attr("x",930).attr("y",396).attr("width",14).attr("height",14).style("fill", "#f5992b")
    svg1.append("rect").attr("x",930).attr("y",426).attr("width",14).attr("height",14).style("fill", "#00a1c1")
    svg1.append("text").attr("x", 950).attr("y", 405).text("Metascore (Critical)").style("font-size", "20px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    svg1.append("text").attr("x", 950).attr("y", 435).text("User Score (Audience)").style("font-size", "20px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
      

})


//SECOND GRAPH
// https://www.d3-graph-gallery.com/graph/scatter_basic.html

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1260 - margin.left - margin.right,
    height = 471 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz2")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 131 + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top+125})`);
    
d3.csv("https://raw.githubusercontent.com/Bryrant93/OscarVisualisations/main/oscarFrameFinal.csv").then( function(data) { 

    var highest = "HighestMS"
    var group = "MetaScore"
    var ghostGroup = "MetaScore"
    var legend = "Critic's"
    var colour = "#f5992b"
    var ghostColour = "#f5992b"
    var metaOrUser = 1

    d3.select("#Critic").on("click", function(d, i) {
        highest = "HighestMS"
        ghostGroup = group
        group = "MetaScore"
        metaOrUser = 1
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
        metaOrUser = 2
        legend = "Audience's"
        colour = "#00a1c1"
        ghostColour = "#f5992b"
        if (group != ghostGroup) {
            switchRating();
        } 
    });

    // Add X-axis
    const x = d3.scaleLinear()
        .domain([1995, 2021])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(30).tickFormat(d3.format("d")))
        .style("color","#ffffff");
    svg.append("g")
        .append("line")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("x2",1179)
        .attr("y2",height)
        .attr("stroke","white")
    // Add X-axis label
    svg.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(574,466)")
        .call(x)
        .append("text")
        .attr("fill", "white")
        .text("Oscar Year");
    //Janky fix for 1989 x-axis tick
    svg.append("g")
        .append("rect")
        .attr("x", -11)
        .attr("y",438)
        .attr("width",25)
        .attr("height", 10)
        .style("fill","#2c2c2c")
    
    // Add Y-axis
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0])
    // Add the Y-axis ticks
    svg.append("g")
        .call(d3.axisLeft(y))
        .style("color","#ffffff");
    // Add the Y-axis gridlines
    svg.append("g")			
    .attr("class", "grid")
    .call(d3.axisLeft(y).ticks(10)
        .tickSize(-width)
        .tickFormat("")
    ) 
    // Add the Y-Axis label 
    svg.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(-30,288)rotate(-90)")
        .call(y)
        .append("text")
        .attr("fill", "white")
        .text("Critic/Audience  rating  %");

    //Add red-box and red-line
    svg.append("rect").attr("x", 410).attr("y",-127).attr("width",396).attr("height",115).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "4,3").style("stroke-width","2.5px")
    svg.append("line").attr("x1", 608).attr("y1",-13.1).attr("x2",608).attr("y2",430.4).attr("fill","#383838").style("stroke", "red").style("stroke-dasharray", "4,3").style("stroke-width","2.5px")
    // svg.append("rect").attr("x", -15).attr("y",-127).attr("width",410).attr("height",115).attr("fill","#383838")
    svg.append("text").attr("x", -12).attr("y", -90).text(`Critical Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", `${colour}`).attr("class", "title").attr("letter-spacing", "3px")
    svg.append("text").attr("x", -12).attr("y", -42).text(`Audience Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", "#343434").attr("class", "title")


    //Add legend
    svg.append("rect").attr("x", 820).attr("y",-127).attr("width",359.5).attr("height",115).attr("fill","#383838")
    svg.append("circle").attr("cx",840).attr("cy",-107).attr("r", 6).style("fill", "grey")
    svg.append("circle").attr("cx",840).attr("cy",-77).attr("r", 6).style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend")
    svg.append("path").attr('d', d3.symbol().type(d3.symbolStar).size(100)).attr("transform", "translate(839.5,-40)").style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend").transition()
    svg.append("text").attr("x", 860).attr("y", -107.5).text("Best Picture nominee").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    svg.append("text").attr("x", 860).attr("y", -77.5).text("Best Picture winner").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    svg.append("text").attr("x", 860).attr("y", -47).text(`${legend} highest rated film`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
    svg.append("text").attr("x", 860).attr("y", -27).text(`is the Best Picture winner`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    
    
    //Create graphic year rectangles
    svg.append('g')
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("class", function(d) {return "vertbox box"+d.Year})
        .attr("x", function(d) {return (d.Year-1995)*45-9})
        .attr("y",-.5)
        .attr("width",18)
        .attr("height",430.8)
        .attr("fill","#383838")
        .attr("cursor","pointer")

    //Variables for remembering if film box is open, and whether it should be shut or not
    var filmBoxOpen = null
    var currentYear = 0
    
    
    //Function for everything that happens when a verticle box is selected
    const highlight = function(event,d){
        filmBoxOpen = false
        d3.selectAll(".filmbox").remove();
        d3.selectAll(".filmtext").remove();
        d3.selectAll(".vertbox").style("fill","#383838");
        //If the vert-box just clicked is not the same year as the last vert-box clicked, then a new filmbox containing filmtext is created.
        if (d.Year != currentYear) {
            currentYear = d.Year
            d3.selectAll(".box"+d.Year).style("fill","#474747");
            selectedYear = d.Year
            filmList = []
            longestFilmTitle = 0
            
            //https://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text
            //https://stackoverflow.com/questions/40199805/unable-to-use-a-google-font-on-canvas
            // Function to find text pixel length
            let Catamaran = new FontFace(
                "Catamaran",
                "url(https://fonts.googleapis.com/css2?family=Catamaran:wght@100&display=swap)"
              );
            var BrowserText = (function () {
                var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d');

                function getWidth(text, fontSize, fontFace) {
                    context.font = fontSize + 'px ' + fontFace;
                    return context.measureText(text).width;
                }
                return {
                    getWidth: getWidth
                };
            })(); 

            //Creating film list for the selected year then sorted according to the currently selected rating grou[]
            for (film of data){
                filmLength = BrowserText.getWidth(film.Film,16,"Catamaran")
                if (film.Year == selectedYear){
                    if (filmLength > longestFilmTitle) {
                        longestFilmTitle = filmLength
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

            //create filmbox to contain filmtext
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()    
                .append("rect")
                    .attr("class","filmbox")
                    .attr("x", selectedYear < 2009 ? (d.Year-1995)*45+8.5 :(d.Year-1995)*45-(longestFilmTitle + 50.5))
                    .attr("y",423.5-(20*selectedList.length+1))
                    .attr("width",longestFilmTitle+42)
                    .attr("height", d.Year == 2021 ? 20*selectedList.length+7 : 20*selectedList.length+7)
                    .attr("fill","#383838")
            filmBoxOpen = true;
            
            var i = -1
            var j = -1
            var k = -1
            //create filmtext
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("text")
                    .attr("class", "filmtext")
                    .text(function(d) {if (i < selectedList.length-1) {i++; return selectedList[i][0] + " - " + selectedList[i][metaOrUser]+"%"}})
                    .attr("x", selectedYear < 2009 ? (d.Year-1995)*45+14 :(d.Year-1995)*45-(longestFilmTitle + 44))
                    .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (436.5-(20*selectedList.length+1))+(j*20.5)}})
                    .attr("alignment-baseline","middle")
                    .style("font-size", "15px")
                    .style("fill", function(d) {
                        k++; 
                        if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                        else { };
                    })
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("text")
                    .attr("class", "filmtext")
    
        }
        //If the vert-box just clicked is the same year as the last vert-box clicked, the vert-box is deselected
        else {
            currentYear = 0;
        }
    }
    
    // Add dots to plot
    svg.append('g')
    .attr("class","dots")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
        .on("click", highlight)
        .attr("transform", function(d) {
            return `translate(${[x(d.Year), y(d[group])]})`;
        })
        .attr("d", function(d) {
            const path = d3.path();
            d[highest] == "Yes" && d.Award == "Winner" ? d3.symbolStar.draw(path,100) : d3.symbolCircle.draw(path,10);
            return path.toString();
        })
        //https://bl.ocks.org/d3noob/464c92429ac05c6a19a1
        .style("fill", function(d) {
            if (d.Award == "Winner") {return `${colour}`}
            else {return "grey"};
        })
        .attr("cursor","pointer")
    d3.selectAll(".vertbox").on("click",highlight)
    
    //function to switch between critics and audience
    function switchRating() {
        svg.selectAll(".dots").remove();
        svg.selectAll(".filmtext").remove();
        svg.selectAll(".legend").remove();
        //https://stackoverflow.com/questions/64688719/how-to-make-a-scatterplot-based-upon-certain-criteria-using-d3-js
        // Move dots to new position and changes shapes and colours
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
                d[highest] == "Yes" && d.Award == "Winner" ? d3.symbolStar.draw(path,100) : d3.symbolCircle.draw(path,10);
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

        //Changing elements of the legend that need changing
        svg.append("circle").attr("cx",840).attr("cy",-77).attr("r", 6).style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend")
        svg.append("path").attr('d', d3.symbol().type(d3.symbolStar).size(100)).attr("transform", "translate(839.5,-40)").style("fill", `${ghostColour}`).transition().duration(750).style("fill", `${colour}`).attr("class","legend")
        svg.append("text").attr("x", 860).attr("y", -47).text(`${legend} highest rated film`).style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5").attr("class","legend")
        
        svg.selectAll(".title").remove();
        if (group == "MetaScore") {
            svg.append("text").attr("x", -12).attr("y", -90).text(`Critical Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", `#343434`).transition().duration(500).style("fill", `${colour}`).attr("class","title").attr("letter-spacing", "3px")
            svg.append("text").attr("x", -12).attr("y", -42).text(`Audience Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", `${ghostColour}`).transition().duration(500).style("fill", `#343434`).attr("class","title")
        }
        if (group == "UserScore") {
            svg.append("text").attr("x", -12).attr("y", -90).text(`Critical Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", `${ghostColour}`).transition().duration(500).style("fill", `#343434`).attr("class","title").attr("letter-spacing", "3px")
            svg.append("text").attr("x", -12).attr("y", -42).text(`Audience Ratings`).style("font-size", "43.5px").attr("alignment-baseline","middle").attr("fill", `#343434`).transition().duration(500).style("fill", `${colour}`).attr("class","title")
    
        }
    
        //Changing order of filmtext within the film box depending on changing
        if (filmBoxOpen == true) {
            selectedList = filmList.sort((a, b) => b[metaOrUser] - a[metaOrUser])
            svg.selectAll(".filmtext").remove();

            var i = -1
            var j = -1
            var k = -1
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("text")
                    .attr("class", "filmtext")
                    .text(function(d) {if (i < selectedList.length-1) {i++; return selectedList[i][0] + " - " + selectedList[i][metaOrUser]+"%"}})
                    .attr("x", selectedYear < 2009 ? (selectedYear-1995)*45+14 :(selectedYear-1995)*45-(longestFilmTitle + 44))
                    .attr("y", function(d) {if (j < selectedList.length-1) {j++; return (436.5-(20*selectedList.length+1))+(j*20.5)}})
                    .attr("alignment-baseline","middle")
                    .style("font-size", "15px")
                    .style("fill", function(d) {
                        k++; 
                        if (k < selectedList.length && selectedList[k][3] == "Winner") {return `${colour}`}
                        else { };
                    });     
        }   
    }
})