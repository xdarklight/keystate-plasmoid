/**
  * an object with a all key information in it
  */
KeyInformation = function()
{
	this.keyData = new Array();
	this.keys = new Array();
	this.dataPropertyNames = new Array();
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeys = function()
	{
		// clear all keys - this way we make sure that the
		// order of the keys is always the same
		this.keys = new Array();
		
		for (var i in global.keyNames)
		{
			var keyName = global.keyNames[i];
			
			// get the user's visibility setting for the key
			var isShown = global.configuration.keyConfiguration().isKeyShown(keyName);
			
			if (isShown)
			{
				// add the key to the list of enabled keys
				Array.addValue(this.keys, keyName);
			}
		}
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
		// only try to access the data array if it's really initialized
		if (data)
		{
			var property = this.getDataPropertyName(keyName);
			
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
		return this.keys.length;
	}
	
	/**
	  * gets the status of the key with the given name
	  */
	this.isPressed = function(keyName)
	{
		var status = this.resolveStatus(keyName, this.getData(keyName));
		
		// Make sure we don't (accidentally) return 'undefined'.
		return status == true;
	}
	
	/**
	  * gets the color of the key with the given name
	  */
	this.getColor = function(keyName)
	{
		var color = global.configuration.keyConfiguration().colorForKey(keyName);
		var pressed = this.isPressed(keyName);
		
		return this.resolveColor(pressed, color);
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
	  * updates the data of the key with the given name
	  */
	this.updateData = function(keyName, data)
	{
		// keep the data in our internal array
		this.keyData[keyName] = data;
	}
	
	/**
	  * updates the property name of the data object in which the 
	  * information about the key is stored
	  */
	this.updateDataPropertyName = function(keyName, valueObjectName)
	{
		this.dataPropertyNames[keyName] = valueObjectName;
	}
}