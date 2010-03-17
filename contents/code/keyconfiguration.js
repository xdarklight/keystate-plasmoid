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
	  * adds the key to the global key object names array and to the internal
	  * object name config mapping
	  */
	this.addKey = function(objectName, configName)
	{
		// if the global key object names array is not initialized we'll add 
		// the current object name to it
		if (!this.globalKeyObjectNamesInitialized)
		{
			globals.keyObjectNames[globals.keyObjectNames.length] = objectName;
		}
		
		this.objectNameConfigMapping[objectName] = configName;
	}
	
	/**
	  * initializes the key configuration
	  */
	this.initialize = function()
	{
		// initialize all keys
		this.addKey(globals.constants.numLockObjectName(), numLockConfigName);
		this.addKey(globals.constants.capsLockObjectName(), capsLockConfigName);
		this.addKey(globals.constants.shiftPressedObjectName(), shiftPressedConfigName);
		this.addKey(globals.constants.controlPressedObjectName(), controlPressedConfigName);
		this.addKey(globals.constants.altPressedObjectName(), altPressedConfigName);
		this.addKey(globals.constants.altgrPressedObjectName(), altgrPressedConfigName);
		this.addKey(globals.constants.metaPressedObjectName(), metaPressedConfigName);
		this.addKey(globals.constants.superPressedObjectName(), superPressedConfigName);
		this.addKey(globals.constants.hyperPressedObjectName(), hyperPressedConfigName);
		
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