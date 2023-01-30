SRC = ./dijkstra.c
OBJ = ./dijkstra.o
EXE = ./dest/dijkstra

CC     = gcc
CFLAGS = -Wall -std=c99
CLIBS  =
CLINK  = -lm

# Compile

%.o: %.c
	$(CC) -c $(CFLAGS) $(CLIBS) $< -o $@

# Build

$(EXE): $(OBJ)
	$(CC) $(OBJ) -o $(EXE) $(CLINK)

# clean up and remove object code and executable: type 'make clean'
clean:
	/usr/local/bin/trash -f $(OBJ) $(EXE)

dijkstra.o: dijkstra.c dijkstra.h
