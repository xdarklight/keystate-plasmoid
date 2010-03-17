/**
  * the key configuration object which handles all 
  * key related configuration (colors, show key settings, etc)
  */
KeyConfiguration = function()
{
	this.objectNameConfigMapping = new Array();
	this.colorSettings = new Array();
	this.shownKeySettings = new Array();
	
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
	  * initializes the key configuration
	  */
	this.initialize = function()
	{
		// initialize all keys
		this.objectNameConfigMapping[globals.constants.numLockObjectName()] = numLockConfigName;
		this.objectNameConfigMapping[globals.constants.capsLockObjectName()] = capsLockConfigName;
		this.objectNameConfigMapping[globals.constants.shiftPressedObjectName()] = shiftPressedConfigName;
		this.objectNameConfigMapping[globals.constants.controlPressedObjectName()] = controlPressedConfigName;
		this.objectNameConfigMapping[globals.constants.altPressedObjectName()] = altPressedConfigName;
		this.objectNameConfigMapping[globals.constants.altgrPressedObjectName()] = altgrPressedConfigName;
		this.objectNameConfigMapping[globals.constants.metaPressedObjectName()] = metaPressedConfigName;
		this.objectNameConfigMapping[globals.constants.superPressedObjectName()] = superPressedConfigName;
		this.objectNameConfigMapping[globals.constants.hyperPressedObjectName()] = hyperPressedConfigName;
		
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