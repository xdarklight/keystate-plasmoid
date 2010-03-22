/**
  * tests if the current object's value is numeric or not
  */
Number.prototype.isNumeric = function()
{
	// a number is always numeric
	return true;
}

/**
  * converts a number to an integer
  */
Number.prototype.toInt = function()
{
	return parseInt(this);
}