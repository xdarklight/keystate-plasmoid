/**
  * an object with a all key information in it
  */
KeyInformation = function()
{
	this.keyData = new Array();
	this.colorInformation = new Array();
	this.keys = new Array();
	this.dataPropertyNames = new Array();
	this.keyCount = 0;
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeys = function()
	{
		for (var i in global.keyNames)
		{
			var objectName = global.keyNames[i];
			
			// update the key with the object name
			this.updateKey(objectName);
		}
	}
	
	/**
	  * adds a key information object with the given name to the list
	  */
	this.addKeyInformation = function(keyName)
	{
		// only add the key information if the key does not exist yet
		if (this.findIndex(keyName) == global.constants.indexNotFound())
		{
			// add the object to the list
			this.keys[this.keyCount] = keyName;
			
			// increment our counter
			this.keyCount++;
		}
	}
	
	/**
	  * removes key information object with the given name from the list
	  */
	this.removeKey = function(keyName)
	{
		var index = this.findIndex(keyName);
		
		// remove the key information from our array if it was found
		if (index > global.constants.indexNotFound())
		{
			// remove one element at the given index from the array
			this.keys.splice(index, 1);
			
			// then fix our key count
			this.keyCount--;
		}
	}
	
	/**
	  * adds or removes key information depending on
	  * if it the key is enabled or not
	  */
	this.updateKey = function(keyName)
	{
		// get the user's settings for the key
		var isEnabled = global.configuration.keyConfiguration().isKeyShown(keyName);
		var keyColor = global.configuration.keyConfiguration().getKeyColor(keyName);
		
		if (isEnabled)
		{
			this.addKeyInformation(keyName);
		}
		else
		{
			this.removeKey(keyName);
		}
		
		// update the key color
		this.updateColor(keyName, keyColor);
	}
	
	/**
	  * returns the color of a key depending on whether it's locked or not
	  *
	  * @param keyLocked decides if the key is locked or not
	  * @param keyColor the color if the key is locked, otherwise a neutral color is returned
	  */
	this.resolveColor = function(keyEnabled, keyColor)
	{
		var color = global.constants.fullyTransparentColor();
		
		// check if the key is enabled (pressed/locked/etc)
		if (keyEnabled)
		{
			// then we need to use the key's color
			// otherwise the color is "transparent"
			color = keyColor;
		}
		
		return color;
	}
	
	/**
	  * returns the status of the key with the given name and the given data
	  */
	this.resolveStatus = function(keyName, data)
	{
		var property = this.getDataPropertyName(keyName);
		
		// only try to access the data array if it's really initialized
		if (data)
		{
			// return the value from the data array with the 
			// property as index
			return data[property];
		}
	}
	
	/**
	  * returns the number of key informations
	  */
	this.count = function()
	{
		return this.keyCount;
	}
	
	/**
	  * finds the index of the key with the given name
	  * if no key with the given name was found global.constants.indexNotFound()
	  * is returned
	  */
	this.findIndex = function(keyName)
	{
		var index = global.constants.indexNotFound();
		
		// find the index of the key in the keyInformation array
		for (var i = 0; i < this.count(); i++)
		{
			var name = this.keys[i];
			
			// check if the key's name matches the given name
			if (keyName == name)
			{
				index = i;
				break;
			}
		}
		
		return index;
	}
	
	/**
	  * gets the status of the key with the given name
	  */
	this.getStatus = function(keyName)
	{
		var status = this.resolveStatus(keyName, this.getData(keyName));
		
		// conver to boolean to make sure 'undefined' is covered
		return Boolean(status);
	}
	
	/**
	  * gets the color of the key with the given name
	  */
	this.getColor = function(keyName)
	{
		var color = this.colorInformation[keyName];
		var status = this.getStatus(keyName);
		
		return this.resolveColor(status, color);
	}
	
	/**
	  * gets the key name at the given index
	  */
	this.getName = function(index)
	{
		return this.keys[index];
	}
	
	/**
	  * gets the property name of the data object in which the information about the key is stored
	  */
	this.getDataPropertyName = function(keyName)
	{
		return this.dataPropertyNames[keyName];
	}
	
	/**
	  * gets the key data for the key with the given name
	  */
	this.getData = function(keyName)
	{
		return this.keyData[keyName];
	}
	
	/**
	  * gets the KeyInformationContainer for the given object (which can be
	  * either the key's index or the key's name/object name)
	  */
	this.getContainer = function(object)
	{
		var name = object;
		
		// check if the object is numeric
		if (!/\D/.test(object))
		{
			// the given object is numeric -> we got an index
			name = this.getName(object);
		}
		
		// create (and return) a new instance of the container
		return KeyInformationContainer.createContainer(name);
	}
	
	/**
	  * updates the data of the key with the given name
	  */
	this.updateData = function(keyName, data)
	{
		// keep the data in our internal array
		this.keyData[keyName] = data;
	}
	
	/**
	  * updates the color of the key with the given name
	  */
	this.updateColor = function(keyName, keyColor)
	{
		this.colorInformation[keyName] = keyColor;
	}
	
	/**
	  * updates the property name of the data object in which the information about the key is stored
	  */
	this.updateDataPropertyName = function(keyName, valueObjectName)
	{
		this.dataPropertyNames[keyName] = valueObjectName;
	}
}