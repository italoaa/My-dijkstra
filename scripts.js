// Necesary variables
var startid = 0;
var endid = 0;
var cost = 10000000;
var path = [];
var final_path = [];
var run = 0;
var gridsize = 5;

var visited = [];
var success = false;
// Get all nodes
var totalNodes = gridsize*gridsize;



function pathfind() {
    grid = gridToArray(gridsize);
    my_pathfind(startid,endid,grid)
}

function color_path() {
    if (final_path.length == 0){
        // path is empty
        return false;
    }
    for (var i = 0;i < totalNodes;i++) {
        // if the path has that node color it
        if (final_path.includes(i)) {
            // to grey
            var count = final_path.indexOf(i) + 1;
            var intensity = ''+count+count
            var color = '#FF'+intensity+'00'+ intensity;
            $('#'+i).css('background-color',color)
        } else {
            // back to white
            $('#'+i).css('background-color','white')
        }
    }
}

function my_pathfind(start,end,grid){
    // setting up the visited nodes
    for (var i = 0;i < totalNodes;i++) {
        visited[i]=0
    }
    visited[start] = 1;
    path.push(start);
    visit_node(start,end,start,grid);
    if (success) {
        color_path();
    }
}

function visit_node(current,end,before,grid){
    if (current != end){
        // Loop over nodes
        for (var node = 0; node < totalNodes ; node++) {
            // Find the distance to that node
            var distance = grid[current][node];
            // Check if distance is not 0 meaning its connected
            // Check it is not allready visited
            if ((distance != 0) && (visited[node] == 0)){
                // add the distance to the run
                run += distance;
                // add node to visited
                visited[node] = 1;
                // add node to path
                path.push(node);

                // visit this node
                visit_node(node,end,current,grid)
            }
        }
        // Finished branching to all nodes
        // Unvisit this node to go back
        visited[current] = 0;

        // Remove this node from the path
        path.pop();

        // Delete the distance from the run of the before node to this one
        run -= grid[before][current]
    } else {
        // Reached the end
        // Check the cost
        if (cost > run){
            // update the cost and final path
            cost = run;

            final_path = []
            for (var j=0;j < path.length;j++) {
                final_path[j] = path[j]
            }
        }
        // Even if it is not the best run return to previous node
        // to keep looking for more paths

        // delete distance to go back to the previous node
        run -= grid[before][current]
        // unvisit node
        visited[current] = 0;

        // remove from path
        path.pop();

        success = true;
    }
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


        if ($('#'+counter).css('background-color') == "rgb(0, 0, 0)") {
            // It is a wall
            for (var node = 0;node < (totalNodes - 1);node++) {
                connections.push(0);
            }
            grid.push(connections);
        } else {
            // Not a wall
            for (var node = 0; node < totalNodes; node++) {
                if ((node == (counter-1)) || (node == (counter+1)) || (node == (counter+n)) || (node == (counter-n))){
                    if ($('#'+node).css('background-color') == "rgb(0, 0, 0)") {
                        connections.push(0);
                    } else {
                        // Make sure the node is not next to a wall
                        if ((counter%gridsize == 0) && (node == (counter-1))) {
                            connections.push(0);
                        } else if ((counter%gridsize == (gridsize-1)) && (node == (counter+1))){
                            connections.push(0);
                        } else {
                            connections.push(1);
                        }
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
    startid = 0;
    endid = 0;
    cost = 10000000;
    path = [];
    final_path = [];
    run = 0;
    visited = [];
    success = false;
};

function refreshGrid(){
    var z = 0;
    while (z < 3){
        z = prompt("How many nodes per side? Must be 3 or more");
    }
    clearGrid();
    createGrid(z);
    gridsize = z;
    totalNodes = gridsize*gridsize;
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
