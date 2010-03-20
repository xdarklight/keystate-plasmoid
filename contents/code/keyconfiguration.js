/**
  * the key configuration object which handles all 
  * key related configuration (colors, show key settings, etc)
  */
KeyConfiguration = function()
{
	this.objectNameConfigMapping = new Array();
	this.colorSettings = new Array();
	this.shownKeySettings = new Array();
	
	this.globalKeyObjectNamesInitialized = false;
	
	// internal constants
	numLockConfigName = "NumLock";
	capsLockConfigName = "CapsLock";
	shiftPressedConfigName = "ShiftPressed";
	controlPressedConfigName = "ControlPressed";
	altPressedConfigName = "AltPressed";
	altgrPressedConfigName = "AltGrPressed";
	metaPressedConfigName = "MetaPressed";
	superPressedConfigName = "SuperPressed";
	hyperPressedConfigName = "HyperPressed";
	
	configurationColorSuffix = "Color";
	configurationShownKeyPrefix = "Show";
	
	/**
	  * reads and parses the config file
	  */
	this.readParseConfiguration = function()
	{
		for (var objectName in this.objectNameConfigMapping)
		{
			// get the base config name
			var baseConfigName = this.objectNameConfigMapping[objectName];
			
			// build the config keys
			var colorConfigurationName = baseConfigName + configurationColorSuffix;
			var shownKeyConfigurationName = configurationShownKeyPrefix + baseConfigName;
			
			// read the config values
			var colorConfigValue = plasmoid.readConfig(colorConfigurationName);
			var showKeyConfigValue = plasmoid.readConfig(shownKeyConfigurationName);
			
			// then parse the values
			var color = new QColor(colorConfigValue);
			var showKey = Boolean(showKeyConfigValue);
			
			// store the values
			this.colorSettings[objectName] = color;
			this.shownKeySettings[objectName] = showKey;
		}
	}
	
	/**
	  * adds the key to the global key object names array, to the internal
	  * object name config mapping and to the key value names array
	  */
	this.addKey = function(objectName, configName, valueObjectName)
	{
		// if the global key object names array is not initialized we'll add 
		// the current object name to it
		if (!this.globalKeyObjectNamesInitialized)
		{
			globals.keyObjectNames[globals.keyObjectNames.length] = objectName;
		}
		
		this.objectNameConfigMapping[objectName] = configName;
		
		globals.keyInformation.updateDataPropertyName(objectName, valueObjectName);
	}
	
	/**
	  * initializes the key configuration
	  */
	this.initialize = function()
	{
		// initialize all keys
		this.addKey(globals.constants.numLockObjectName(), numLockConfigName, globals.constants.dataLockedPropertyName());
		this.addKey(globals.constants.capsLockObjectName(), capsLockConfigName, globals.constants.dataLockedPropertyName());
		this.addKey(globals.constants.shiftPressedObjectName(), shiftPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.controlPressedObjectName(), controlPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.altPressedObjectName(), altPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.altgrPressedObjectName(), altgrPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.metaPressedObjectName(), metaPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.superPressedObjectName(), superPressedConfigName, globals.constants.dataPressedPropertyName());
		this.addKey(globals.constants.hyperPressedObjectName(), hyperPressedConfigName, globals.constants.dataPressedPropertyName());
		
		// set a flag that the global key object names array is now initialized
		this.globalKeyObjectNamesInitialized = true;
		
		// read and parse the config file
		this.readParseConfiguration();
	}
	
	/**
	  * determines if a key is shown or not
	  */
	this.isKeyShown = function(objectName)
	{
		return Boolean(this.shownKeySettings[objectName]);
	}
	
	/**
	  * returns the color for the key with the given object name
	  */
	this.getKeyColor = function(objectName)
	{
		return this.colorSettings[objectName];
	}
}