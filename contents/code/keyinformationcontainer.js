/**
  * a container object which holds all information about a key
  */
KeyInformationContainer = function(name, status, dataPropertyName, color, text)
{
	this.name = name;
	this.color = color;
	this.status = status;
	this.dataPropertyName = dataPropertyName;
	this.text = text;
}