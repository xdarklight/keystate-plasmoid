/**
  * an object with a all key information in it
  */
KeyInformation = function()
{
	this.statusInformation = new Array();
	this.colorInformation = new Array();
	this.keys = new Array();
	this.dataPropertyNames = new Array();
	this.keyCount = 0;
	
	/**
	  * updates the list of key information objects
	  */
	this.updateKeys = function()
	{
		for (var i in globals.keyObjectNames)
		{
			var objectName = globals.keyObjectNames[i];
			
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
		var isEnabled = globals.configuration.keyConfiguration().isKeyShown(keyName);
		var keyColor = globals.configuration.keyConfiguration().getKeyColor(keyName);
		
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
	this.getColorByStatus = function(keyEnabled, keyColor)
	{
		var color = globals.constants.fullyTransparentColor();
		
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
	  * returns the localized text for the given key name
	  */
	this.getText = function(keyName)
	{
		var text = "";
		
		switch (keyName)
		{
			case globals.constants.numLockObjectName():
				// Num Lock
				text = i18n(globals.constants.numLockedText());
				break;
			case globals.constants.capsLockObjectName():
				/// Caps Lock
				text = i18n(globals.constants.capsLockedText());
				break;
			case globals.constants.shiftPressedObjectName():
				// Shift pressed
				text = i18n(globals.constants.shiftPressedText());
				break;
			case globals.constants.controlPressedObjectName():
				// CTRL pressed
				text = i18n(globals.constants.controlPressedText());
				break;
			case globals.constants.altPressedObjectName():
				// ALT pressed
				text = i18n(globals.constants.altPressedText());
				break;
			case globals.constants.altgrPressedObjectName():
				// AltGr pressed
				text = i18n(globals.constants.altgrPressedText());
				break;
			case globals.constants.metaPressedObjectName():
				// meta pressed
				text = i18n(globals.constants.metaPressedText());
				break;
			case globals.constants.superPressedObjectName():
				// super pressed
				text = i18n(globals.constants.superPressedText());
				break;
			case globals.constants.hyperPressedObjectName():
				// hyper pressed
				text = i18n(globals.constants.hyperPressedText());
				break;
		}
		
		return text;
	}
	
	/**
	  * gets the status of the key with the given name
	  */
	this.getStatus = function(keyName)
	{
		// conver to boolean to make sure 'undefined' is covered
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
	  * gets the property name of the data object in which the information about the key is stored
	  */
	this.getDataPropertyName = function(keyName)
	{
		return this.dataPropertyNames[keyName];
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
		
		// get all information
		var status = this.getStatus(name);
		var dataPropertyName = this.getDataPropertyName(name);
		var color = this.getColor(name);
		var text = this.getText(name);
		
		return new KeyInformationContainer(name, status, dataPropertyName, color, text);
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
	
	/**
	  * updates the property name of the data object in which the information about the key is stored
	  */
	this.updateDataPropertyName = function(keyName, valueObjectName)
	{
		this.dataPropertyNames[keyName] = valueObjectName;
	}
}