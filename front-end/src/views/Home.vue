<template>
  <div style="position: relative">
    <h2>Search Parks by State</h2>
    <div class="wrapper">
      <div class="search">
        <form class="pure-form" >
          <i class="fas fa-search"></i><input v-model="searchText"  placeholder="Enter a US State" />
        </form>
      </div>
    </div>
    <parkList :parks="parks" />
    <div style="position: absolute; bottom: 5px; left: 600px">
      <footer>
        <a href="https://github.com/gmsteck/creative3" target="_blank"
          >Github</a
        >
      </footer>
    </div>
  </div>
</template>

<script>
import parkList from "../components/parkList.vue";
export default {
  name: "Home",
  components: {
    parkList,
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    parks() {
      return this.$root.$data.nationalParks.filter(
        (park) =>
          park.State.toLowerCase().search(this.searchText.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
