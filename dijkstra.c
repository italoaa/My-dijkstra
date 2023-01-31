#include "dijkstra.h"
#include "stdio.h"

// Present the graph
// Each list is the length connecting that node to another
// In the case of graph[0][2] = 2 means that node "0" is connected by a length
// of "2" to node "2"
int graph[5][5] = {{0, 0, 2, 1, 0},
                   {0, 0, 1, 1, 2},
                   {2, 1, 0, 0, 3},
                   {1, 1, 0, 0, 0},
                   {0, 2, 3, 0, 0}};

int main(int argc, char *argv[]) {
  int cost = 100000;

  // Each index if 1 marks as visited
  int visited[5] = {0, 1, 0, 0, 0};

  // Consider -1 as null
  int path[5] = {1, -1, -1, -1, -1};
  int final_path[5];
  int run = 0;

  // Visit the first node and spider from there
  int success =
      visit_node(1, 0, 1, visited, final_path, path, &run, &cost, graph);

  // Check if it was successfull
  if (success) {

    // Print results
    printf("Found the shortest path as: {");
    for (int i = 0; i < 5; i++) {
      if (final_path[i] != -1) {
        printf("%d ", final_path[i]);
      }
    }
    printf("}\nWith a cost of %d", cost);
  }
  return 0;
}

int visit_node(int n, int e, int before, int visited[5], int *final_path,
               int path[5], int *run, int *cost, int graph[5][5]) {
  if (n != e) {
    // Go through all nodes
    for (int i = 0; i < 5; i++) {
      /* printf("checking branching Node %d from root %d\n", i, n); */
      int distance = graph[n][i];
      // Check that the start is connected to that particular node
      // and
      // check that we have not been there before
      if (distance != 0 && visited[i] == 0) {

        // If yes we have found the next valid node

        // add the distance to this node
        *run += distance;

        // Update the list of before visited nodes with current one
        visited[i] = 1;

        path = add_node_to_path(path, i);

        // Visit this valid node
        visit_node(i, e, n, visited, final_path, path, run, cost, graph);
      }
    }
    // No connecting nodes are valid

    // Unvisit this node
    visited[n] = 0;

    // Remove this node from the path
    path = remove_node_from_path(path);

    // Remove this distance from the run
    *run -= graph[before][n];

  } else {
    // Found the last node

    // Check if this run is the best
    if (*cost > *run) {
      // Update the cost if so
      *cost = *run;

      // Copy the path of the run to the final_path
      for (int j = 0; j < 5; j++) {
        final_path[j] = path[j];
      }

      // Remove the distance from the run
      *run -= graph[before][n];
    }
    // Unvisit this node
    visited[n] = 0;

    // Remove node from path
    path = remove_node_from_path(path);
    return 0;
  }
}

int *add_node_to_path(int path[5], int i) {
  // replaces the first "-1" with the element
  for (int j = 0; j < 5; j++) {
    if (path[j] == -1) {
      path[j] = i;
      return path;
    }
  }
}

int *remove_node_from_path(int path[5]) {
  // removes the last non "-1" element
  for (int j = 0; j < 5; j++) {
    if (path[j] == -1 || j == 4) {
      path[j - 1] = -1;
      return path;
    }
  }
}
