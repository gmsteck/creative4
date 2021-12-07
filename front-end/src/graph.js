import { PriorityQueue } from "./priorityQueue.js";

export class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
    this.edges[node2].push({ node: node1, weight: weight });
  }

  display() {
    let graph = "";
    this.nodes.forEach((node) => {
      graph +=
        node + "->" + this.edges[node].map((n) => n.node).join(", ") + "\n";
    });
    console.log(graph);
  }
  primsMST(startState) {
    // Initialize graph that'll contain the MST
    const MST = new Graph();
    if (this.nodes.length === 0) {
      return MST;
    }
    let s = this.nodes[0];
    // Select first node as starting node
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i] == startState) {
        s = this.nodes[i];
      }
    }

    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueue(this.nodes.length * this.nodes.length);
    let explored = new Set();
    explored.add(s);
    MST.addNode(s);

    // Add all edges from this starting node to the PQ taking weights as priority
    this.edges[s].forEach((edge) => {
      edgeQueue.enqueue([s, edge.node], edge.weight);
    });

    // Take the smallest edge and add that to the new graph
    let currentMinEdge = edgeQueue.dequeue();
    while (!edgeQueue.isEmpty()) {
      // COntinue removing edges till we get an edge with an unexplored node
      while (!edgeQueue.isEmpty() && explored.has(currentMinEdge.element[1])) {
        currentMinEdge = edgeQueue.dequeue();
      }
      let nextNode = currentMinEdge.element[1];

      // Check again as queue might get empty without giving back unexplored element
      if (!explored.has(nextNode)) {
        MST.addNode(nextNode);
        MST.addEdge(
          currentMinEdge.element[0],
          nextNode,
          currentMinEdge.priority
        );
        // Again add all edges to the PQ
        this.edges[nextNode].forEach((edge) => {
          edgeQueue.enqueue([nextNode, edge.node], edge.weight);
        });

        // Mark this node as explored explored.add(nextNode);
        explored.add(nextNode);
        s = nextNode;
      }
    }
    return MST;
  }
}
