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
	  * adds the key to the global key object names array, to the internal
	  * object name config mapping and to the key value names array
	  */
	this.addKey = function(objectName, configName, valueObjectName)
	{
		// check if the key with the given objectName is already in the global key array
		if (global.keyNames.findIndex(objectName) == global.constants.indexNotFound())
		{
			// if not: add it
			global.keyNames.addValue(objectName);
		}
		
		this.objectNameConfigMapping[objectName] = configName;
		
		global.keyInformation.updateDataPropertyName(objectName, valueObjectName);
	}
	
	/**
	  * initializes the key configuration
	  */
	this.initialize = function()
	{
		// initialize all keys
		this.addKey(global.constants.numLockObjectName(), numLockConfigName, global.constants.dataLockedPropertyName());
		this.addKey(global.constants.capsLockObjectName(), capsLockConfigName, global.constants.dataLockedPropertyName());
		this.addKey(global.constants.shiftPressedObjectName(), shiftPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.controlPressedObjectName(), controlPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.altPressedObjectName(), altPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.altgrPressedObjectName(), altgrPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.metaPressedObjectName(), metaPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.superPressedObjectName(), superPressedConfigName, global.constants.dataPressedPropertyName());
		this.addKey(global.constants.hyperPressedObjectName(), hyperPressedConfigName, global.constants.dataPressedPropertyName());
		
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