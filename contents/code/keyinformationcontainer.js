/**
  * a container object which holds all information about a key
  */
KeyInformationContainer = function(name, status, valueObjectName, color, text)
{
	this.name = name;
	this.color = color;
	this.status = status;
	this.valueObjectName = valueObjectName;
	this.text = text;
}