<script context="module">
	// This is so the page loads correctly when traveling back through browser history
	export async function load({ page }) {
		if (page.query.has('key') && page.query.has('hours')) {
			return {
				props: {
					hashedUrl: page.host + '/' + page.query.get('key'),
					hours: page.query.get('hours')
				}
			};
		} else {
			return { redirect: '/', status: 302 };
		}
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let hashedUrl = '';
	export let hours = 24;
	let selectHashedUrl = () => {};
	onMount(() => {
		selectHashedUrl = () => {
			const selection = window.getSelection();
			const urlElement = document.querySelector('#hashedUrl');
			selection.setBaseAndExtent(urlElement, 0, urlElement, 1);
		};
	});
</script>

<p class="my-4 mt-40">your link has been shortened to</p>
<h1 on:click={selectHashedUrl} id="hashedUrl" class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
	{hashedUrl}
</h1>
<p class="m-4 md:m-5 lg:m-8">
	for the next {hours} hours
</p>
