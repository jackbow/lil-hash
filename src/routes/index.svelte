<script>
	import Footer from '$lib/Footer.svelte';
	import { goto } from '$app/navigation';
	import isValidUrl from '$lib/valid-url.js';
	let inputUrl = '';
	let errorText = '';
	const hash = () => {
		if (!isValidUrl(inputUrl)) {
			errorText = 'invalid url';
			return;
		}
		fetch('/hash', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: encodeURI(inputUrl) })
		})
			.then((response) => response.json())
			.then((data) => {
				goto(`/hashed?key=${data.key}&hours=${data.hours}`);
			})
			.catch(() => {
				errorText = 'try again';
			});
	};
</script>

<main>
	<h1 class="mt-40 text-off-black text-7xl text-black lg:text-8xl font-averia dark:text-white">lil' hash</h1>
	<p class="text-off-black text-xl text-black lg:text-2xl font-averia dark:text-white">simple sharable url shortener</p>
	<input
		bind:value={inputUrl}
		class="shadow-inner rounded-md text-md w-3/5 md:w-1/2 lg:text-2xl p-2 md:p-3 lg:p-4 m-4 lg:my-10 text-center"
		on:keyup={(e) => e.key === 'Enter' && hash()}
		aria-label="enter a url to shorten"
	/>
	<button
		class="px-3 md:px-5 lg:px-8 py-2 md:py-3 lg:py-4 text-md lg:text-2xl rounded-md transition duration-500 bg-white shadow"
		class:bg-red-500={errorText}
		on:click={hash}
		aria-label="shorten url"
	>
		{errorText ? errorText : 'hash'}
	</button>
</main>
<Footer />

<style>
</style>
