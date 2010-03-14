/**
  * an object with a list of all available keys in it
  */
KeyInformationList = function()
{
	this.keyInformation = new Array();
	this.keyCount = 0;
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeyInformation = function()
	{
		// reset the list of KeyInformation objects and the counter
		this.keyInformation = new Array();
		this.keyCount = 0;
		
		// add the num lock key
		var keyName = globals.constants.numLockObjectName();
		var keyStatus = globals.numLockEnabled;
		var keyColor = this.getColor(keyStatus, globals.configuration.numLockColor());
		
		this.addKeyInformation(keyName, keyStatus, keyColor);
		
		// add the caps lock key
		var keyName = globals.constants.capsLockObjectName();
		var keyStatus = globals.capsLockEnabled;
		var keyColor = this.getColor(keyStatus, globals.configuration.capsLockColor());
		
		this.addKeyInformation(keyName, keyStatus, keyColor);
	}
	
	/**
	  * adds a key information object to the list
	  */
	this.addKeyInformation = function(keyName, keyStatus, keyColor)
	{
		// create a new KeyInformation object with all information
		var keyInformation = new KeyInformation();
		keyInformation.setName(keyName);
		keyInformation.setStatus(keyStatus);
		keyInformation.setColor(keyColor);
		
		// add the object to the list
		this.keyInformation[this.keyCount] = keyInformation;
		
		// increment our counter
		this.keyCount++;
	}
	
	/**
	  * returns the color of a key depending on whether it's locked or not
	  *
	  * @param keyLocked decides if the key is locked or not
	  * @param keyColor the color if the key is locked, otherwise a neutral color is returned
	  */
	this.getColor = function(keyLocked, keyColor)
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
}