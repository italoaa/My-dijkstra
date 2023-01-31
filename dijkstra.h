int visit_node(int n, int e, int before, int visited[5], int *final_path,
               int path[5], int *run, int *cost, int graph[5][5]);

int *add_node_to_path(int path[5], int i);
int *remove_node_from_path(int path[5]);
