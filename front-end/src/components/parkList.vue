<template>
  <div>
    <div class="list">
      <div class="park" v-for="park in parks" :key="park.Name">
        <div>
          <div class="image">
            <img :src="'/images/' + park.Image" />
          </div>
          <h1>{{ park.Name }}</h1>
          <p>{{ park.State }}</p>
          <p>{{ park.Size }} acres</p>
        </div>
        <div class="add">
          <button class="auto" @click="add(park)">Add to Itinerary</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkList",
  props: {
    parks: Array,
  },
  methods: {
    add(park) {
      if (this.$root.$data.parkList.includes(park));
      else {
        this.$root.$data.parkList.push(park);
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
  border-radius: 10%;
}

button:hover {
  height: 50px;
  background: rgb(48, 48, 48);
  color: white;
  border: none;
  border-radius: 10%;
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
