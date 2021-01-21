<template>
  <span v-show="!hashed">
    <h1 class="text-8xl font-averia mt-40 dark:text-white">lil' hash</h1>
    <p class="text-2xl font-averia dark:text-white">
      simple sharable url shortener
    </p>
    <input
      v-model.trim="inputUrl"
      class="shadow-inner rounded-md text-2xl p-4 m-4 w-1/2 text-center my-10"
      @keyup.enter="hash"
    />
    <button
      class="bg-white shadow px-8 py-4 text-2xl rounded-md transition duration-500"
      :class="{ 'bg-red-500': error }"
      @click="hash"
    >
      {{ error ? "try again" : "hash" }}
    </button>
  </span>
  <span v-show="hashed">
    <p class="truncate mx-96 text-4xl font-averia mt-40 dark:text-white">
      {{ inputUrl }}
    </p>
    <p class="text-2xl my-4 font-averia dark:text-white">
      has been shortened to
    </p>
    <p class="text-8xl font-averia dark:text-white">
      {{ hashedUrl }}
    </p>
    <p class="text-2xl my-8 font-averia dark:text-white">
      for the next 24 hours
    </p>
  </span>
</template>

<script>
import axios from "axios";
const HOURS = 24;
export default {
  data() {
    return {
      inputUrl: "",
      hashedUrl: "",
      error: false,
      server: import.meta.env.VITE_SERVER_URL || "http://localhost:8000",
    };
  },
  computed: {
    hashed() {
      return this.hashedUrl.length > 0;
    },
  },
  methods: {
    hash() {
      console.log("hashing...");
      // eslint-disable-next-line
      axios.post(`${this.server}/hash?url=${encodeURIComponent(this.inputUrl)}&hours=${HOURS}`)
        .then((response) => {
          console.log("hashed!");
          console.log();
          const protocol_index = this.server.indexOf("://");
          this.hashedUrl =
            this.server.slice(protocol_index + 3) + "/" + response.data.key;
          this.error = false;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
};
</script>

<style>
.font-averia {
  font-family: "Averia Serif";
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  @apply bg-yellow-300 dark:bg-gray-900;
}
</style>
