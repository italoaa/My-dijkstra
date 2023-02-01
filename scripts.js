// function that builds a grid in the "container"
function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
};

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
    createGrid(16);

    $(".grid").mouseover(function() {
        $(this).css("background-color", "grey");
    });

    $(".grid").mouseout(function() {
        $(this).css("background-color", "white");
    });
    $(".grid").click(function() {
        console.log($(this).css('background-color'))
        if ($(this).css('background-color') == "rgba(128, 128, 128)") {
            $(this).css("background-color", "black");
        } else if ($(this).css('background-color') == "rbg(0, 0, 0)") {
            $(this).css("background-color", "grey");
        }
    });

    $(".newGrid").click(function() {
        refreshGrid();

        $(".grid").mouseover(function() {
            $(this).css("background-color", "grey");
        });

        $(".grid").mouseout(function() {
            $(this).css("background-color", "white");
            });
    });
});
