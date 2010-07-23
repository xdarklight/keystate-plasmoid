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

/**
  * adds an element with the given value to the array if there is 
  * no element with the given value yet
  */
Array.prototype.addValue = function(value)
{
	// only add the new value if it's not in the array yet
	if (this.findIndex(value) == global.constants.indexNotFound())
	{
		// add the object to the list
		this[this.length] = value;
	}
}