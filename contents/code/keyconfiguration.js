/**
  * the key configuration object which handles all 
  * key related configuration (colors, show key settings, etc)
  */
KeyConfiguration = function()
{
	this.objectNameConfigMapping = new Array();
	this.colorSettings = new Array();
	this.shownKeySettings = new Array();
	
	configurationColorSuffix = "Color";
	configurationShownKeyPrefix = "Show";
	
	/**
	  * reads and parses the config file
	  */
	this.parseConfiguration = function()
	{
		for (var objectName in this.objectNameConfigMapping)
		{
			// get the base config name
			var baseConfigName = this.objectNameConfigMapping[objectName];
			
			// build the config keys
			var colorConfigurationName = baseConfigName + configurationColorSuffix;
			var shownKeyConfigurationName = configurationShownKeyPrefix + baseConfigName;
			
			// read the config values
			var color = plasmoid.readConfig(colorConfigurationName);
			var showKey = plasmoid.readConfig(shownKeyConfigurationName);
			
			// store the values
			this.colorSettings[objectName] = QColor(color);
			this.shownKeySettings[objectName] = Boolean(showKey);
		}
	}
	
	/**
	  * adds the key to the global key object names array, to the internal
	  * object name config mapping and to the key value names array
	  */
	this.addKey = function(objectName, propertyName)
	{
		Array.addValue(global.keyNames, objectName);
		
		// add the name of the config entry to the mapping
		this.objectNameConfigMapping[objectName] = objectName.removeSpaces();
		
		// 'Locked' keys have the 'locked' suffix in their name already
		// for all other properties we have to append the property name
		if (propertyName != global.constants.dataLockedPropertyName())
		{
			this.objectNameConfigMapping[objectName] += propertyName;
		}
		
		global.keyInformation.updateDataPropertyName(objectName, propertyName);
	}
	
	/**
	  * initializes the key configuration
	  */
	this.initialize = function()
	{
		// initialize all keys
		this.addKey(global.constants.numLockObjectName(), global.constants.dataLockedPropertyName());
		this.addKey(global.constants.capsLockObjectName(), global.constants.dataLockedPropertyName());
		this.addKey(global.constants.shiftPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.controlPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.metaPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.superPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.hyperPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.altPressedObjectName(), global.constants.dataPressedPropertyName());
		this.addKey(global.constants.altgrPressedObjectName(), global.constants.dataPressedPropertyName());
		
		// read and parse the config file
		this.parseConfiguration();
	}
	
	/**
	  * determines if a key is shown or not
	  *
	  * @param keyName the name of the key
	  */
	this.keyIsShown = function(keyName)
	{
		return Boolean(this.shownKeySettings[keyName]);
	}
	
	/**
	  * returns the color for the key with the given object name
	  *
	  * @param keyName the name of the key
	  */
	this.colorForKey = function(keyName)
	{
		return this.colorSettings[keyName];
	}
}