// Necesary variables
var startid = 0;
var endid = 0;
var cost = 10000000;
var path = [];
var run = 0;
var gridsize = 3;

function dijkstra(){

}

function pathfind() {
    grid = gridToArray(gridsize);
    console.log(grid);
    console.log(startid, endid);
}

function gridToArray(n){
    // this function takes the grid and makes it an array
    var counter = -1;
    var grid = [];

    // Setting up the ids
    $("#container").find('div').each(function () {
        counter += 1;
        $(this).attr('id',counter)
    })

    var counter = -1;
    $("#container").find('div').each(function () {
        // Counter tells the id of the node
        counter += 1;

        // Init connections
        var connections = [];

        // Get all nodes
        var totalNodes = n*n;

        if ($('#'+counter).css('background-color') == "rgb(0, 0, 0)") {
            // It is a wall
            for (var node = 0;node < (totalNodes - 1);node++) {
                connections.push(0);
            }
            grid.push(connections);
        } else {
            // Not a wall
            for (var node = 0; node < (totalNodes - 1); node++) {
                if ((node == (counter-1)) || (node == (counter+1)) || (node == (counter+n)) || (node == (counter-n))){
                    // console.log($('#'+node).css('background-color'));
                    if ($('#'+node).css('background-color') == "rgb(0, 0, 0)") {
                        connections.push(0);
                    } else {
                        connections.push(1);
                    }
                } else {
                    connections.push(0);
                }
            }
            grid.push(connections);
        }
    })
    return grid;
}


// function that clears the grid
function clearGrid(){
    $(".grid").remove();
};

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    var z = 0;
    while (z < 3){
        z = prompt("How many nodes per side? Must be 3 or more");
    }
    clearGrid();
    createGrid(z);
    gridsize = z;
};

function createGrid(x) {
    var x1 = Math.floor(Math.random() * x);
    var y1 = Math.floor(Math.random() * x);
    var x2 = Math.floor(Math.random() * x);
    var y2 = Math.floor(Math.random() * x);
    while ((x1 == x2) && (y1 == y2)) {
        x2 = Math.floor(Math.random() * x);
        y2 = Math.floor(Math.random() * x);
    }
    var counter = -1;
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            counter += 1;
            if (rows == x1 && columns == y1) {
                $("#container").append("<div id="+counter+" class='grid' style='background-color:red'></div>");
                startid = counter;
            } else if (rows == x2 && columns == y2){
                endid = counter;
                $("#container").append("<div id="+counter+" class='grid' style='background-color:blue'></div>");
            } else {
                $("#container").append("<div id="+counter+" class='grid' style='background-color:white'></div>");
            }
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
};



$(document).ready(function() {
    createGrid(gridsize);


    $(".grid").click(function() {
        $(this).css("background-color", "black");
    });

    $(".newGrid").click(function() {
        refreshGrid();

        $(".grid").mousedown(function() {
            $(this).css("background-color", "black");
        });
    });
    $(".Pathfind").mousedown(function () {
        pathfind()
    })
});
