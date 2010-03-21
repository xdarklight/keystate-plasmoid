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
		
		// we're bigger now
		this.length++;
	}
}

/**
  * removes the element with the given value from the array
  */
Array.prototype.removeValue = function(value)
{
	var index = this.findIndex(value);
	
	// remove the value from our array only if it was found
	if (index > global.constants.indexNotFound())
	{
		// remove our element at the given index from the array
		this.splice(index, 1);
		
		// we're smaller now
		this.length--;
	}
}