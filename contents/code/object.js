/**
  * tests if the current object's value is numeric or not
  */
Object.prototype.isNumeric = function()
{
	// use a simple regex to determine whether the object
	// is numeric or not
	return (!/\D/.test(this));
}