// function that builds a grid in the "container"
function createGrid(x) {
    var x1 = Math.floor(Math.random() * x);
    var y1 = Math.floor(Math.random() * x);
    var x2 = Math.floor(Math.random() * x);
    var y2 = Math.floor(Math.random() * x);
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            if (rows == x1 && columns == y1) {
                $("#container").append("<div id='start' class='grid' style='background-color:red'></div>");
            } else if (rows == x2 && columns == y2){
                $("#container").append("<div id='end' class='grid' style='background-color:blue'></div>");
            } else {
                $("#container").append("<div id='normal' class='grid'></div>");
            }
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
    gridToArray(x)
};

function gridToArray(n){
    // this function takes the grid and makes it an array
    var counter = -1;
    var grid = [];
    $("#container").find('div').each(function () {
        // Counter tells the id of the node
        counter += 1;

        // Init connections
        var connections = [];

        var totalNodes = n*n;

        for (var node = 0; node < (totalNodes - 1); node++) {
            if ((node == (counter-1)) || (node == (counter+1)) || (node == (counter+n)) || (node == (counter-n))){
                connections.push(1);
            } else {
                connections.push(0);
            }
        }
        grid.push(connections);
    })
    console.log(grid);
}

// function that clears the grid
function clearGrid(){
    $(".grid").remove();
};

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    var z = prompt("How many nodes per side?");
    clearGrid();
    createGrid(z);
};

// create a 16x16 grid when the page loads
// creates a hover effect that changes the color of a square to black when the mouse passes over it, leaving a (pixel) trail through the grid
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
    createGrid(5);


    $(".grid").click(function() {
        $(this).css("background-color", "black");
    });

    $(".newGrid").click(function() {
        refreshGrid();

        $(".grid").mousedown(function() {
            $(this).css("background-color", "black");
        });
    });
});
