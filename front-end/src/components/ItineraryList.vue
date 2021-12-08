<template>
  <div>
    <div class="list">
      <div class="park" v-for="park in parks" :key="park.Name">
        <div>
          <div class="image">
            <img :src="park.path" />
          </div>
          <h1>{{ park.title }}</h1>
          <p>{{ park.location }}</p>
          <p>{{ park.size }} acres</p>
        </div>
        <div>
          <p>{{park.notes}}</p>
          <br>
          <textarea v-model="notes[park._id]" placeholder="itinerary notes" class="edit"></textarea>
          <br>
          <button @click="editNotes(park)">Update Park Notes</button>
          <br><br><br>
        </div>
        <div class="add">
          <button class="auto" @click="deletePark(park)">
            Remove from Itinerary
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: "ItineraryList",
  data() {
    return {
    parks: [],
    notes: []
    }
  },
  created() {
    this.getItems()
  },

  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/parks");
        this.parks = response.data;
        let parkSet = [...new Set(this.parks)]
        this.parks = Array.from(parkSet)
        this.$root.$data.parkList = this.parks;
        return this.parks
      } catch (error) {
        console.log(error);
      }
    },
    async deletePark(park) {
      try {
        await axios.delete("/api/parks/" + park._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editNotes(park) {
      try {
        await axios.put("/api/parks/" + park._id, {
          notes: this.notes[park._id]
        });
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.image {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}

img {
  width: auto;
  height: 100%;
  margin-left: -50px;
}

.list {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 60px;
  margin-top: 60px;
}

.park {
  margin: 20px;
}

button {
  height: 50px;
  background: rgb(68, 68, 68);
  color: white;
  border: none;
  border-radius: 5%;
}

button:hover {
  height: 50px;
  background: rgb(48, 48, 48);
  color: white;
  border: none;
  border-radius: 5%;
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

.auto {
  margin-left: auto;
}
</style>
