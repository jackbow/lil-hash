import random_phrase from '$lib/random-phrase/random-phrase.js';
import isValidUrl from '$lib/valid-url.js';

export async function post(request) {
	let { url } = request.body;
	// if missing protocol prepend http:// as default
	url = url.includes('://') ? url : 'http://' + url;
	if (!isValidUrl(url)) {
		return {
			status: 400,
			body: 'Error: Invalid URL'
		};
	}

	// config
	const N_TRIES = 5; // number of tries to find a free key before increasing key length
	const EXPIRATION_IN_HOURS = 24;
	const EXPIRATION_IN_SECONDS = EXPIRATION_IN_HOURS * 60 * 60; // time till link expires

	let nth_try = 0;
	let key = random_phrase(Math.floor(nth_try++ / N_TRIES));
	while ((await KV.get(key)) !== null) {
		key = random_phrase(Math.floor(nth_try++ / N_TRIES));
	}
	await KV.put(key, url, { expirationTtl: EXPIRATION_IN_SECONDS });
	return {
		body: { key, hours: EXPIRATION_IN_HOURS }
	};
}
