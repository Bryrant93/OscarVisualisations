// Function to find pixel length of film titles. Used in both visualisations
//https://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text
//https://stackoverflow.com/questions/40199805/unable-to-use-a-google-font-on-canvas
let Catamaran = new FontFace(
    "Catamaran",
    "url(https://fonts.googleapis.com/css2?family=Catamaran:wght@100&display=swap)"
    );
function getWidth(text, fontSize, fontFace) {
    var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
    context.font = fontSize + 'px ' + fontFace;
    return context.measureText(text).width;
}

//First graph
//Adapted from https://d3-graph-gallery.com/graph/line_cursor.html 
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

d3.csv("https://raw.githubusercontent.com/Bryrant93/OscarVisualisations/main/Data%20Analysis/winnerLine.csv").then(function(data) {
    
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
    
    // Add the lines
    svg1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f5992b")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.Critic) })
        .curve(d3.curveStepAfter)
        );
    svg1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#00a1c1")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.User) })
        .curve(d3.curveStepAfter)
        );
    svg1.append("path")
      .datum(data.slice(4))
      .attr("fill", "none")
      .attr("stroke", "#f5992b")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x1(d.year) })
        .y(function(d) { return y1(d.Critic) })
        .curve(d3.curveStepAfter)
        );


    svg1.append("g")
      .attr("transform", `translate(0, ${height1})`)
      .call(d3.axisBottom(x1).ticks(30).tickFormat(d3.format("d")));

    svg1.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(557,525)")
        .call(x1)
        .append("text")
        .attr("fill", "white")
        .text("Oscar Year");

    svg1.append("g")
      .call(d3.axisLeft(y1));

    svg1.append("g")
        .attr('class', 'axis')
        .attr("transform","translate(-30,428)rotate(-90)")
        .call(y1)
        .append("text")
        .attr("fill", "white")
        .text("No. of Times a Group’s Highest Rated Film Won Best Picture");

    //The legend   
    svg1.append("rect").attr("x", 835).attr("y",250).attr("width",300).attr("height",185).attr("fill","#353535")
    svg1.append("rect").attr("x", 835).attr("y",248).attr("width",300).attr("height",20).attr("fill","#303030")
    svg1.append('text').attr("x", 940).attr("y",260).style("font-weight", "600").text("Line Legend").style("font-size", "17px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append("rect").attr("x", 835).attr("y",295).attr("width",300).attr("height",20).attr("fill","#303030")
    svg1.append('text').attr("x", 930).attr("y",305).style("font-weight", "600").text("Tooltip Legend").style("font-size", "17px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    
    //Film text and box
    svg1.append("rect").attr("x", 850).attr("y", 356.5).attr("width", 115).attr("height", 27).attr("fill","#383838").attr("stroke", "#474747").attr("stroke-width", 2).attr("stroke-linejoin","round")
    svg1.append('text').attr("x", 863).attr("y",370).text("2011: The Artist").style("font-size", "15px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append("line").attr("stroke-width", 3).attr("x1",965).attr("y1", 370).attr("x2",980).attr("y2",370).attr("stroke", "#474747")
    //Blue line
    svg1.append("line").attr("stroke-width", 3).attr("x1",849).attr("y1", 356.5).attr("x2",966).attr("y2",356.5).attr("stroke", "#00a1c1")
    svg1.append("line").attr("stroke-width", 3).attr("x1",910).attr("y1", 330.5).attr("x2",910).attr("y2",356.5).attr("stroke", "#00a1c1")
    svg1.append("line").attr("stroke-width", 3).attr("x1",908.5).attr("y1", 330.5).attr("x2",980).attr("y2",330.5).attr("stroke", "#00a1c1")
    //Orange line
    svg1.append("line").attr("stroke-width", 3).attr("x1",849).attr("y1", 382.5).attr("x2",966).attr("y2",382.5).attr("stroke", "#f5992b")
    svg1.append("line").attr("stroke-width", 3).attr("x1",910).attr("y1", 382.5).attr("x2",910).attr("y2",406).attr("stroke", "#f5992b")
    svg1.append("line").attr("stroke-width", 3).attr("x1",908.5).attr("y1", 406).attr("x2",980).attr("y2",406).attr("stroke", "#f5992b")
    //Words
    svg1.append('text').attr("x", 983).attr("y",326).text("This Best Picture winner was").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 984).attr("y",339).text("highest rated audience film.").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 983).attr("y",365).text("The Best Picture winner").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 984).attr("y",379).text("for the selected year.").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 983).attr("y",401).text("This Best Picture winner was").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 984).attr("y",414).text("highest rated critical film.").style("font-size", "12px").attr("font-weight",450).attr("fill","#F5FAFD").attr("alignment-baseline", "middle")
    svg1.append('text').attr("x", 848).attr("y",428).text("NB, either colour can appear above or below the film depending on the year.").style("font-size", "9px").attr("fill","#F5FAFD").attr("alignment-baseline", "middle")

    //Colour meaning
    svg1.append("rect").attr("x",995).attr("y",275).attr("width",13).attr("height",13).style("fill", "#f5992b")
    svg1.append("rect").attr("x",905).attr("y",275).attr("width",13).attr("height",13).style("fill", "#00a1c1")
    svg1.append("text").attr("x", 1015).attr("y", 283).text("Critical").style("font-size", "16px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    svg1.append("text").attr("x",925).attr("y", 283).text("Audience").style("font-size", "16px").attr("alignment-baseline","middle").attr("fill", "#f5f5f5")
    


    //Anything that appears as part of the tooltip
    var focusCritic = svg1
    .append("g")
    .append("line")
        .attr("fill", "none")
        .attr("stroke-width", 2.5)
        .style("opacity", 0)
    var focusUser = svg1
        .append("g")
        .append("line")
            .attr("fill", "none")
            .attr("stroke-width", 2.5)
            .style("opacity", 0)
    var focusBox = svg1
        .append("g")
        .append("rect")
        .style("opacity",0)
    var focusFilm = svg1
        .append('g')
        .append('text')
        .style("font-size", "15px")
        .attr("font-weight",450)
        .style("opacity", 0)
        .attr("fill","#F5FAFD")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")
    var focusMwin = svg1
        .append("g")
        .append("line")
            .attr("fill", "none")
            .attr("stroke-width", 2.25)
            .style("opacity", 0)
    var focusUwin = svg1
        .append("g")
        .append("line")
            .attr("fill", "none")
            .attr("stroke-width", 2.25)
            .style("opacity", 0)
    // invisible box to track the mouse
    svg1
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height+60)
        .on('mouseover', mouseover)
        .on("mousemove", e => mousemove(d3.pointer(e)))       
        .on('mouseout', mouseout);

    function mouseover() {
        focusCritic.style("opacity", 1)
        focusUser.style("opacity", 1)
        focusFilm.style("opacity",1)
        focusBox.style("opacity",1)
        focusMwin.style("opacity",1)
        focusUwin.style("opacity",1)
    }

    function mousemove(coord) {
        var x0 = Math.round(x1.invert(coord[0]));
        selectedData = data[x0-1996]
        if (selectedData.Mwin=="1"||selectedData.Uwin=="1") {
            yCoord = (y1(selectedData.Critic)+y1(selectedData.User-1))
        }
        else {
            yCoord = (y1(selectedData.Critic)+y1(selectedData.User))
        }
        console.log(((parseInt(selectedData.Critic)+parseInt(selectedData.User))-1)/2)
        console.log(((parseInt(selectedData.Critic)+parseInt(selectedData.User)))/2)

        filmWidth = getWidth(selectedData.year + ": " +selectedData.Winner, 16, Catamaran)*1.45
        focusCritic
        .attr("x1",x1(selectedData.year))
        .attr("y1", parseInt(selectedData.Critic)>parseInt(selectedData.User) ? y1(selectedData.Critic)+1: yCoord/2)
        .attr("x2",x1(selectedData.year))
        .attr("y2",parseInt(selectedData.User)>parseInt(selectedData.Critic) ? y1(selectedData.Critic)-1: yCoord/2)
        .attr("stroke", selectedData.Mwin == 1 ? "#f5992b" : "#474747")
        focusUser
        .attr("x1",x1(selectedData.year))
        .attr("y1", parseInt(selectedData.Critic)>parseInt(selectedData.User) ? y1(selectedData.User)-1: yCoord/2)
        .attr("x2",x1(selectedData.year))
        .attr("y2", parseInt(selectedData.User)>parseInt(selectedData.Critic) ? y1(selectedData.User)+1: yCoord/2)
        .attr("stroke", selectedData.Uwin == 1 ? "#00a1c1" : "#474747")
        focusFilm
            .html(selectedData.year + ": " +selectedData.Winner)
            .attr("x", selectedData.year < 1997 ? x1(selectedData.year)+7 : selectedData.year > 2019 ? width1-filmWidth+2: x1(selectedData.year)-filmWidth*.46)
            .attr("y", selectedData.year < 1999 ? yCoord/2-13.5: yCoord/2+1.5)
        focusBox
            .attr("x", selectedData.year < 1997 ? 1.5 : selectedData.year > 2019 ? width1-filmWidth : x1(selectedData.year)-filmWidth*.5)
            .attr("y", selectedData.year < 1999 ? yCoord/2-27.3: yCoord/2-13.5)
            .attr("width", filmWidth)
            .attr("height", 27)
            .attr("fill","#383838")
            .attr("stroke", "#474747")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin","round")
        focusMwin
        .style("opacity", selectedData.Mwin == 1 ? 1 : 0)
            .attr("x1", selectedData.year > 2019 ? width1-filmWidth-1 : x1(selectedData.year)-filmWidth*.5-.9)
            .attr("y1", parseInt(selectedData.Critic)>parseInt(selectedData.User) ? yCoord/2-13.5 : yCoord/2+13.5)
            .attr("x2", selectedData.year > 2019 ? width1+1 : x1(selectedData.year)+filmWidth*.5+.9)
            .attr("y2", parseInt(selectedData.Critic)>parseInt(selectedData.User) ? yCoord/2-13.5 : yCoord/2+13.5)
            .attr("stroke", "#f5992b")
        focusUwin
        .style("opacity", selectedData.Uwin == 1 ? 1 : 0)
        .attr("x1", x1(selectedData.year)-filmWidth*.5-.9)
        .attr("y1", parseInt(selectedData.User)>=parseInt(selectedData.Critic) ? yCoord/2-13.5 : yCoord/2+13.5)
        .attr("x2", x1(selectedData.year)+filmWidth*.5+.9)
        .attr("y2", parseInt(selectedData.User)>=parseInt(selectedData.Critic) ? yCoord/2-13.5 : yCoord/2+13.5)
        .attr("stroke", "#00a1c1")
    }

    function mouseout() {
        focusCritic.style("opacity", 0)
        focusUser.style("opacity", 0)
        focusFilm.style("opacity",0)
        focusBox.style("opacity",0)
        focusUwin.style("opacity",0)
        focusMwin.style("opacity",0)
    }
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
    
d3.csv("https://raw.githubusercontent.com/Bryrant93/OscarVisualisations/main/Data%20Analysis/oscarFrameFinal.csv").then( function(data) { 

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

            //Creating film list for the selected year then sorted according to the currently selected rating grou[]
            for (film of data){
                filmLength = getWidth(film.Film,16,"Catamaran")
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

// Jquery for indented button press
$('#Audience').on('click', function(){
    $('#Critic').removeClass('criticSelected');
    $(this).addClass('audienceSelected');
});
$('#Critic').on('click', function(){
    $('#Audience').removeClass('audienceSelected');
    $(this).addClass('criticSelected');
});