/**
  * an object which handles the general logic
  */
PlasmoidHandler = function()
{
	isInitialized = false;
	
	/**
	  * registers all events (and related things) with the plasmoid object
	  */
	this.registerPlasmoidEvents = function()
	{
		// tell the global plasmoid object that it should route
		// all events to the PlasmoidHandler
		plasmoid.configChanged = this.configChanged;
		plasmoid.sizeChanged = this.sizeChanged;
		plasmoid.paintInterface = this.paintInterface;
		plasmoid.dataUpdated = this.dataUpdated;
		
		// register all keys to the dataengine
		for (var i in global.keyNames)
		{
			var objectName = global.keyNames[i];
			
			// register the object name to the keystate DataEngine
			dataEngine("keystate").connectSource(objectName, plasmoid);
		}
	}
	
	/**
	  * called when the configuration of the plasmoid changed
	  */
	this.configChanged = function()
	{
		// re-read the config file
		global.configuration.initialize();
		
		// update our key information list
		global.keyInformation.updateKeys();
		
		// We have to set our state to initialized
		// so painting works.
		isInitialized = true;
		
		// then update the icon
		plasmoid.update();
	}

	/**
	  * called when the size of the plasmoid changed
	  */
	this.sizeChanged = function()
	{
		// HACK: We cannot call configChanged here unless
		// we're initialized. We will only get the default
		// config values if we do so. Additionally the plasmoid
		// will remember that we received the config and will
		// ignore our configChanged call in paintInterface.
		if (isInitialized)
		{
			// Simply call the config changed callback.
			// This will take care of everything, including
			// re-initializing the layout and re-painting
			// (with the new size).
			plasmoid.configChanged();
		}
	}

	/**
	  * called when the interface should be updated
	  *
	  * @param painter a QPainter with which you can paint the interface
	  */
	this.paintInterface = function(painter)
	{
		// HACK: We cannot initialize the config from a random
		// context. We need to be called by the plasmoid itself,
		// otherwise the config will return the default values.
		if (isInitialized)
		{
			// We can paint the icon since we're already initialized.
			global.layout.paintIcon(painter);
		}
		else
		{
			// First read the config. This will enable the plasmoid.
			plasmoid.configChanged();
		}
	}
	
	/**
	  * called when the DataEngines are updated
	  *
	  * @param name the name of the data source
	  * @param data the DateEngine's data
	  */
	this.dataUpdated = function(name, data)
	{
		// get the status from the data array
		var newStatus = global.keyInformation.resolveStatus(name, data);
		
		// get the current status of the key
		var currentStatus = global.keyInformation.isPressed(name);
		
		// only update if the data changed
		if (currentStatus != newStatus)
		{
			// update the KeyInformation object
			global.keyInformation.updateData(name, data);
			
			plasmoid.update();
		}
	}
}

/**
  * initializes the whole plasmoid
  */
PlasmoidHandler.initialize = function()
{
	// create our Global object
	global = new Global();
	
	// fill our global object with information
	global.configuration = new Configuration();
	global.constants = new Constants();
	global.keyInformation= new KeyInformation();
	global.layout = new Layout();
	
	// read the key configuration
	global.configuration.keyConfiguration().initialize();
	
	// initially update the key information list
	global.keyInformation.updateKeys();
	
	// create a new plasmoid handler
	var plasmoidHandler = new PlasmoidHandler();
	
	// then register all events of the plasmoid object
	plasmoidHandler.registerPlasmoidEvents();
	
	// our plasmoid should not have a background
	plasmoid.backgroundHints = NoBackground;
}