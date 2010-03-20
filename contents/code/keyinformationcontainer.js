/**
  * a container object which holds all information about a key
  */
KeyInformationContainer = function()
{
	this.name;
	this.color;
	this.status;
	this.dataPropertyName;
	this.text;
	this.data;
}

/**
  * a static method which creates a new instance of a KeyInformationContainer
  * and fills it with data (using the key whose name is given)
  */
KeyInformationContainer.createContainer = function(name)
{
	var container = new KeyInformationContainer();
	
	// get all information
	var color = globals.keyInformation.getColor(name);
	var status = globals.keyInformation.getStatus(name);
	var dataPropertyName = globals.keyInformation.getDataPropertyName(name);
	var text = globals.localization.getText(name);
	var data = globals.keyInformation.getData(name);
	
	// fill the container with data
	container.name = name;
	container.color = color;
	container.status = status;
	container.dataPropertyName = dataPropertyName;
	container.text = text;
	container.data = data;
	
	return container;
}