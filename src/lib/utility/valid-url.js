const isValidUrl = (url) => {
	url = url.includes('://') ? url : 'http://' + url;
	try {
		new URL(url);
	} catch (_) {
		return false;
	}
	return true;
};

export default isValidUrl;
