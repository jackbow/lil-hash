<script>
import axios from "axios";
const HOURS = 24;
const SERVER = "https://lilhash.com"
let inputUrl = ""
let hashedUrl = ""
let error = false
$: hashed = hashedUrl.length > 0;
const hash = () => {
  // eslint-disable-next-line
  axios.post(`${SERVER}/hash?url=${encodeURIComponent(inputUrl)}&hours=${HOURS}`)
    .then((response) => {
      const protocol_index = SERVER.indexOf("://");
      hashedUrl = SERVER.slice(protocol_index + 3) + "/" + response.data.key;
      error = false;
    })
    .catch(() => {
      error = true;
    });
}

</script>

{#if !hashed}
<h1 class="text-8xl font-averia mt-40 dark:text-white">lil' hash</h1>
<p class="text-2xl font-averia dark:text-white">
  simple sharable url shortener
</p>
<input
  bind:value={inputUrl}
  class="shadow-inner rounded-md text-2xl p-4 m-4 w-1/2 text-center my-10"
  on:keyup={(e) => e.key==='Enter' && hash()}
/>
<button
  class="bg-white shadow px-8 py-4 text-2xl rounded-md transition duration-500"
  class:bg-red-500={error}
  on:click={hash}
>
  { error ? "try again" : "hash" }
</button>
{:else}
<p class="truncate mx-96 text-4xl font-averia mt-40 dark:text-white">
  { inputUrl }
</p>
<p class="text-2xl my-4 font-averia dark:text-white">
  has been shortened to
</p>
<p class="text-8xl font-averia dark:text-white">
  { hashedUrl }
</p>
<p class="text-2xl my-8 font-averia dark:text-white">
  for the next 24 hours
</p>
{/if}

<style>
.font-averia {
  font-family: "Averia Serif";
  font-weight: 300;
}
</style>
