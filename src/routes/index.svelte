<script>
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';
	import isValidUrl from '$lib/utility/valid-url.js';
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
	<h1 class="mt-40 text-7xl lg:text-8xl">lil' hash</h1>
	<p>simple sharable url shortener</p>
	<div class="font-sans text-off-black text-md lg:text-2xl">
		<input
			bind:value={inputUrl}
			class="shadow-inner dark:bg-gray-300 rounded-md w-3/5 md:w-1/2 p-2 md:p-3 lg:p-4 m-4 lg:my-10 text-center"
			on:keydown={(e) => e.key === 'Enter' && hash()}
			aria-label="enter a url to shorten"
		/>
		<button
			class="hover:bg-white dark:bg-gray-300 px-3 md:px-5 lg:px-8 py-2 md:py-3 lg:py-4 rounded-md transition duration-500 bg-white shadow"
			class:bg-red-500={errorText}
			on:click={hash}
			aria-label="shorten url"
		>
			{errorText ? errorText : 'hash'}
		</button>
	</div>
</main>
<Footer />

<style>
</style>
