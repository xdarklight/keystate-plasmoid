/**
  * tests if the current object's value is numeric or not
  */
Number.prototype.isNumeric = function()
{
	// a number is always numeric
	return true;
}

/**
  * Returns the minimum of value1 and value2.
  */
Number.qMin = function(value1, value2)
{
	if (value1 > value2)
	{
		return value2;
	}
	
	return value1;
}

/**
  * Returns the maximum of value1 and value2.
  */
Number.qMax = function(value1, value2)
{
	if (value1 > value2)
	{
		return value1;
	}
	
	return value2;
}

/**
  * Returns value bounded by min and max. This is equivalent to qMax(min, qMin(value, max)).
  */
Number.qBound = function(min, value, max)
{
	return Number.qMax(min, Number.qMin(value, max));
}