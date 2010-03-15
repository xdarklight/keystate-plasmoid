/**
  * an object with a list of all available keys in it
  */
KeyInformationList = function()
{
	this.statusInformation = new Array();
	this.colorInformation = new Array();
	this.keyInformation = new Array();
	this.keyCount = 0;
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeyInformation = function()
	{
		this.addRemoveKeyInformation(globals.constants.numLockObjectName(), globals.configuration.showNumLock());
		this.addRemoveKeyInformation(globals.constants.capsLockObjectName(), globals.configuration.showCapsLock());
	}
	
	/**
	  * adds a key information object with the given name to the list
	  */
	this.addKeyInformation = function(keyName)
	{
		// only add the key information if the key does not exist yet
		if (this.findIndex(keyName) == globals.constants.indexNotFound())
		{
			// create a new KeyInformation object with all information
			var keyInformation = new KeyInformation();
			keyInformation.setName(keyName);
			
			// add the object to the list
			this.keyInformation[this.keyCount] = keyInformation;
			
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
	this.removeKeyInformation = function(keyName)
	{
		var index = this.findIndex(keyName);
		
		// remove the key information from our array if it was found
		if (index > globals.constants.indexNotFound())
		{
			this.keyInformation.splice(index, 1);
			this.keyCount--;
		}
	}
	
	/**
	  * adds or removes key information depending on
	  * if it the key is enabled or not
	  */
	this.addRemoveKeyInformation = function(keyName, isEnabled)
	{
		if (isEnabled)
		{
			this.addKeyInformation(keyName);
		}
		else
		{
			this.removeKeyInformation(keyName);
		}
	}
	
	/**
	  * returns the color of a key depending on whether it's locked or not
	  *
	  * @param keyLocked decides if the key is locked or not
	  * @param keyColor the color if the key is locked, otherwise a neutral color is returned
	  */
	this.getColorByState = function(keyLocked, keyColor)
	{
		if (keyLocked)
		{
			return keyColor;
		}
		
		return globals.constants.fullyTransparentColor();
	}
	
	/**
	  * returns the number of key informations
	  */
	this.count = function()
	{
		return this.keyCount;
	}
	
	/**
	  * returns the key information at the given index
	  *
	  * @param index the index of the information
	  */
	this.get = function(index)
	{
		return this.keyInformation[index];
	}
	
	/**
	  * returns the KeyInformation object with the given name
	  */
	this.find = function(keyName)
	{
		var retVal = 0;
		
		for (var i = 0; i < this.count(); i++)
		{
			var keyInfo = this.get(i);
			
			// check if the key's name matches the given name
			if (keyInfo.name() == keyName)
			{
				retVal = keyInfo;
				break;
			}
		}
		
		return retVal;
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
			var keyInfo = this.keyInformation[i];
			
			// check if the key's name matches the given name
			if (keyName == keyInfo.name())
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
		return this.colorInformation[keyName];
	}
	
	/**
	  * updates the status of the key with the given name
	  */
	this.updateStatus = function(keyName, keyStatus)
	{
		var index = this.findIndex(keyName);
		
		if (index > globals.constants.indexNotFound())
		{
			var keyInfo = this.get(index);
			
			// update the status if we found the key info
			keyInfo.setStatus(keyStatus);
		}
		
		// keep the status in our internal array
		this.statusInformation[keyName] = keyStatus;
	}
	
	/**
	  * updates the color of the key with the given name
	  */
	this.updateColor = function(keyName, keyColor)
	{
		var index = this.findIndex(keyName);
		
		if (index > globals.constants.indexNotFound())
		{
			var keyInfo = this.get(index);
			
			// update the key color
			keyInfo.setColor(this.getColorByState(this.getStatus(keyName), keyColor));
		}
		
		this.colorInformation[keyName] = keyColor;
	}
}