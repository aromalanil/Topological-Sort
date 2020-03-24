/**
 * A Javascript Program to perform Topological Sort
 * 
 * @author Aromal Anil <contact@aromalanil.me>
 */


const rl = require('readline-sync');

//Class to representing Graph
class Graph {

    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;

        //A Map with key as vertex and value as Adjacent List
        this.AdjacentList = new Map();
    }

    // Add a new vertex
    addVertex(v) {
        this.AdjacentList.set(v, []);
    }

    // Add Edge v -> w
    addEdge(v, w) {

        //Adding w to Adjacency list of v
        this.AdjacentList.get(v).push(w);

    }

    topologicalSortHelper(vertex, visited, s) {

        //Adding the vertex to visited list
        visited.add(vertex);

        //Calling topologicalSortHelper for each unvisited adjacent vertices
        this.AdjacentList.get(vertex).forEach(n => {
            if (!visited.has(n)) {
                this.topologicalSortHelper(n, visited, s);
            }
        });

        //After completing all adjacent vertices add current vertex to stack
        s.push(vertex);
    }

    topologicalSort() {
        let s = [];
        let visited = new Set();

        //Calling topologicalSortHelper for each unvisited vertices in graph
        this.AdjacentList.forEach((list, vertex) => {
            if (!visited.has(vertex)) {
                this.topologicalSortHelper(vertex, visited, s);
            }
        });


        //After completing topological sort print content of stack
        while (s.length) {
            console.log(s.pop());
        }
    }
}

//Creating new Graph
let order = rl.question("Enter no of vertices : ");
let g = new Graph(parseInt(order));


//Adding Vertices
for (let i = 0; i < order; i++) {
    let vertex = rl.question(`Enter the vertex no ${i + 1} : `);
    g.addVertex(vertex);
}

//Adding Edges
let noOfEdges = rl.question("Enter no of edges : ");
for (let i = 0; i < noOfEdges; i++) {
    let firstVertex = rl.question(`Enter the first vertex of edge ${i + 1} : `);
    let secondVertex = rl.question(`Enter the second vertex of edge ${i + 1} : `);
    g.addEdge(firstVertex, secondVertex);
}

g.topologicalSort();
