<template>
  <div>
    <p class="none" v-if="this.$root.$data.parkList.length === 0">
      No Parks in Itinerary
    </p>
    <ItineraryList :parks="parks" />
    <div v-show="this.$root.$data.parkList.length > 1">
      <h2>
        Enter a starting park to calculate the shortest route between all the
        parks on your list!
      </h2>
      <div class="wrapper">
        <div class="search">
          <div class="pure-form">
            <i class="fas fa-search"></i
            ><input
              v-model="searchText"
              placeholder="Enter the park you want to start from (case sensitive!)"
            />
          </div>
        </div>
      </div>
      <form @submit.prevent="createTree">
        <button type="submit">
          Find shortest path through the national parks
        </button>
      </form>
      <div v-if="this.parkOrder.length > 1">
        <div v-for="park in parkOrder" :key="park">
          <p>{{ park }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItineraryList from "../components/ItineraryList.vue";
import { Graph } from "../graph.js";
export default {
  name: "",
  components: {
    ItineraryList,
  },
  data() {
    return {
      country: "",
      parkOrder: [],
      startState: "",
      searchText: "",
    };
  },
  computed: {
    parks() {
      return this.$root.$data.parkList;
    },
  },
  methods: {
    distance(lat1, lat2, lon1, lon2) {
      // The math module contains a function
      // named toRadians which converts from
      // degrees to radians.
      lon1 = (lon1 * Math.PI) / 180;
      lon2 = (lon2 * Math.PI) / 180;
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;

      // Haversine formula
      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));

      // Radius of earth in kilometers. Use 3956
      // for miles
      let r = 6371;

      // calculate the result
      return c * r;
    },
    createTree() {
      console.log("function has been called");
      console.log(this.$root.$data.parkList);
      this.startState = this.searchText;
      let g = new Graph();
      for (let i = 0; i < this.$root.$data.parkList.length; i++) {
        if (this.$root.$data.parkList[i].title == this.startState) {
          g.addNode(this.$root.$data.parkList[i].title);
        }
      }
      for (let i = 0; i < this.$root.$data.parkList.length; i++) {
        if (this.$root.$data.parkList[i].title != this.startState) {
          g.addNode(this.$root.$data.parkList[i].title);
        }
      }
      for (let i = 0; i < this.$root.$data.parkList.length; i++) {
        for (let j = 0; j < this.$root.$data.parkList.length; j++) {
          if (
            this.$root.$data.parkList[i].title !=
            this.$root.$data.parkList[j].title
          ) {
            g.addEdge(
              this.$root.$data.parkList[i].title,
              this.$root.$data.parkList[j].title,
              this.distance(
                this.$root.$data.parkList[i].latitude,
                this.$root.$data.parkList[j].latitude,
                this.$root.$data.parkList[i].longitude,
                this.$root.$data.parkList[j].longitude
              )
            );
          }
        }
      }
      console.log("prim's algorithm is called");
      this.parkOrder = g.primsMST(this.startState).nodes;
      console.log(this.parkOrder);
      console.log("prim's algorithm is succeeds");
    },
  },
};
</script>

<style>
.none {
  text-align: center;
  font-size: 32px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
button {
  height: 50px;
  background: rgb(68, 68, 68);
  color: white;
  border: none;
  border-radius: 2%;
}

button:hover {
  height: 50px;
  background: rgb(48, 48, 48);
  color: white;
  border: none;
  border-radius: 2%;
}

button:active {
  height: 50px;
  background: #000;
  color: white;
  border: none;
  -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1;
}
</style>
