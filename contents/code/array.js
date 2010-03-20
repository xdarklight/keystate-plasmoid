/**
  * finds the index of the array element with the given value
  */
Array.prototype.findIndex = function(value)
{
	var index = global.constants.indexNotFound();
	
	// find the index of the key in the current array
	for (var i in this)
	{
		var currentValue = this[i];
		
		// check if the key's name matches the given value
		if (value == currentValue)
		{
			index = i;
			break;
		}
	}
	
	return index;
}