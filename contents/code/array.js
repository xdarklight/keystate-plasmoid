/**
  * finds the index of the array element with the given value
  */
Array.findIndex = function(array, value)
{
	var index = global.constants.indexNotFound();
	
	// find the index of the key in the current array
	for (var i in array)
	{
		var currentValue = array[i];
		
		// check if the key's name matches the given value
		if (value == currentValue)
		{
			index = i;
			break;
		}
	}
	
	return index;
}

/**
  * adds an element with the given value to the array if there is 
  * no element with the given value yet
  */
Array.addValue = function(array, value)
{
	// only add the new value if it's not in the array yet
	if (Array.findIndex(array, value) == global.constants.indexNotFound())
	{
		// add the object to the list
		array[array.length] = value;
	}
}