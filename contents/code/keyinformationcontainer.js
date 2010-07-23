/**
  * a container object which holds all information about a key
  */
KeyInformationContainer = function()
{
	this.name;
	this.status;
	this.dataPropertyName;
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
	var status = global.keyInformation.getStatus(name);
	var dataPropertyName = global.keyInformation.getDataPropertyName(name);
	var data = global.keyInformation.getData(name);
	
	// fill the container with data
	container.name = name;
	container.status = status;
	container.dataPropertyName = dataPropertyName;
	container.data = data;
	
	return container;
}