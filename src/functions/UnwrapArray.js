function UnwrapArray(array) {
	if (Array.isArray(array))
		return UnwrapArray(array[0]);
	return array;
}

export default UnwrapArray;
