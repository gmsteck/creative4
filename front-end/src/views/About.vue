<template>
  <div class="about">
    <video id="background-video" autoplay loop muted :src="video"></video>
    <div class="text-wrapper">
      <h1 class="txt">About the Trip Planner</h1>
      <br />
      <h2 class="txt">Your Toolkit for the Great Outdoors</h2>
      <p class="txt">
        There are a total of 57 national parks in US states and territories in
        this site's list. <br />
        This page can be used as a guide to browse through different parks to
        add to your travel itinerary, <br />
        or to select which parks you still plan to visit in the future. So what
        are you waiting for? Choose your parks and go out and explore this
        beautiful country!
      </p>

      <br />
      <p class="txt">Created by Gavin Steck and Mitchell Saatkamp</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      video: require("/public/videos/vid1.mp4"),
      vid1: require("/public/videos/vid1.mp4"),
      vid2: require("/public/videos/vid2.mp4"),
      vid3: require("/public/videos/vid3.mp4"),
      vid4: require("/public/videos/vid4.mp4"),
      vid5: require("/public/videos/vid5.mp4"),
      vid6: require("/public/videos/vid6.mp4"),
    };
  },
  methods: {
    changeVideo() {
      this.value = Math.floor(Math.random() * 6);
      if (this.value === 0) {
        this.video = this.vid1;
      }
      if (this.value === 1) {
        this.video = this.vid2;
      }
      if (this.value === 2) {
        this.video = this.vid3;
      }
      if (this.value === 3) {
        this.video = this.vid4;
      }
      if (this.value === 4) {
        this.video = this.vid5;
      }
      if (this.value === 5) {
        this.video = this.vid6;
      }
    },
  },
  created() {
    this.changeVideo();
  },
};
</script>

<style>
#background-video {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  object-fit: cover;
  position: fixed;
  opacity: 0.8;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.text-wrapper {
  background-color: #1e2023;
  border-radius: 1%;
}

.txt {
  display: flex;
  justify-content: center;
  color: white;
}
</style>
