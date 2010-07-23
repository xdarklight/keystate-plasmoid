/**
  * removes all spaces from a string
  */
String.prototype.removeSpaces = function()
{
	return this.split(' ').join('');
}