function MakeURL(text) {
	if (text === null)
		return text;
	
	let url = text.normalize('NFD');

	url = url.replaceAll(/[\u0300-\u036f]/g, '');
	url = url.replaceAll(' ', '-');
	url = url.replaceAll('&', 'and');

	return url.toLowerCase();
}

export default MakeURL;
