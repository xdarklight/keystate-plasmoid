/**
  * an object with a all key information in it
  */
KeyInformation = function()
{
	this.statusInformation = new Array();
	this.colorInformation = new Array();
	this.keys = new Array();
	this.keyCount = 0;
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeys = function()
	{
		this.addRemoveKey(globals.constants.numLockObjectName(), globals.configuration.showNumLock());
		this.addRemoveKey(globals.constants.capsLockObjectName(), globals.configuration.showCapsLock());
	}
	
	/**
	  * adds a key information object with the given name to the list
	  */
	this.addKeyInformation = function(keyName)
	{
		// only add the key information if the key does not exist yet
		if (this.findIndex(keyName) == globals.constants.indexNotFound())
		{
			// add the object to the list
			this.keys[this.keyCount] = keyName;
			
			// increment our counter
			this.keyCount++;
			
			// update the status and the color of the key
			this.updateStatus(keyName, this.getStatus(keyName));
			this.updateColor(keyName, this.getColor(keyName));
		}
	}
	
	/**
	  * removes key information object with the given name from the list
	  */
	this.removeKey = function(keyName)
	{
		var index = this.findIndex(keyName);
		
		// remove the key information from our array if it was found
		if (index > globals.constants.indexNotFound())
		{
			this.keys.splice(index, 1);
			this.keyCount--;
		}
	}
	
	/**
	  * adds or removes key information depending on
	  * if it the key is enabled or not
	  */
	this.addRemoveKey = function(keyName, isEnabled)
	{
		if (isEnabled)
		{
			this.addKeyInformation(keyName);
		}
		else
		{
			this.removeKey(keyName);
		}
	}
	
	/**
	  * returns the color of a key depending on whether it's locked or not
	  *
	  * @param keyLocked decides if the key is locked or not
	  * @param keyColor the color if the key is locked, otherwise a neutral color is returned
	  */
	this.getColorByStatus = function(keyLocked, keyColor)
	{
		var color = globals.constants.fullyTransparentColor();
		
		if (keyLocked)
		{
			color = keyColor;
		}
		
		return color;
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
	  * if no key with the given name was found globals.constants.indexNotFound()
	  * is returned
	  */
	this.findIndex = function(keyName)
	{
		var index = globals.constants.indexNotFound();
		
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
		return Boolean(this.statusInformation[keyName]);
	}
	
	/**
	  * gets the color of the key with the given name
	  */
	this.getColor = function(keyName)
	{
		var color = this.colorInformation[keyName];
		var status = this.getStatus(keyName);
		
		return this.getColorByStatus(status, color);
	}
	
	/**
	  * gets the key name at the given index
	  */
	this.getName = function(index)
	{
		return this.keys[index];
	}
	
	/**
	  * updates the status of the key with the given name
	  */
	this.updateStatus = function(keyName, keyStatus)
	{
		// keep the status in our internal array
		this.statusInformation[keyName] = keyStatus;
	}
	
	/**
	  * updates the color of the key with the given name
	  */
	this.updateColor = function(keyName, keyColor)
	{
		this.colorInformation[keyName] = keyColor;
	}
}