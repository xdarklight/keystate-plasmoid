/**
  * an object which handles the general logic
  */
PlasmoidHandler = function()
{
	/**
	  * registers all events (and related things) with the plasmoid object
	  */
	this.registerPlasmoidEvents = function()
	{
		// tell the global plasmoid object that it should send
		// all of it's events to us
		plasmoid.configChanged = this.configChanged;
		plasmoid.sizeChanged = this.sizeChanged;
		plasmoid.paintInterface = this.paintInterface;
		plasmoid.dataUpdated = this.dataUpdated;
		
		// register all keys to the dataengine
		for (var i in global.keyNames)
		{
			var objectName = global.keyNames[i];
			
			// register the object name to the dataengine
			dataEngine(global.constants.engineName()).connectSource(objectName, plasmoid);
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
		
		// then update the icon
		plasmoid.update();
	}

	/**
	  * called when the size of the plasmoid changed
	  */
	this.sizeChanged = function()
	{
		// the plasmoid's size changed -> update the icon
		plasmoid.update();
	}

	/**
	  * called when the interface should be updated
	  *
	  * @param painter a QPainter with which you can paint the interface
	  */
	this.paintInterface = function(painter)
	{
		// say we're busy
		plasmoid.busy = true;
		
		// paint the icon
		global.layout.paintIcon(painter);
		
		// we're done
		plasmoid.busy = false;
	}

	
	/**
	  * called when the DataEngines are updated
	  *
	  * @param name the name of the data source
	  * @param data the DateEngine's data
	  */
	this.dataUpdated = function(name, data)
	{
		// get all information for the current key
		var keyContainer = global.keyInformation.getContainer(name);
		
		// get the status from the data array
		var newStatus = global.keyInformation.resolveStatus(name, data);
		
		// get the current status of the key
		var currentStatus = keyContainer.status
		
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
	// tell everyone we're busy
	plasmoid.busy = true;
	
	// all includes
	plasmoid.include("layout.js");
	plasmoid.include("constants.js");
	plasmoid.include("keyconfiguration.js");
	plasmoid.include("layoutconfiguration.js");
	plasmoid.include("configuration.js");
	plasmoid.include("keyinformationcontainer.js")
	plasmoid.include("keyinformation.js");
	plasmoid.include("localization.js");
	
	// fill our global.object with information
	global.configuration = new Configuration();
	global.constants = new Constants();
	global.keyInformation= new KeyInformation();
	global.layout = new Layout();
	global.localization = new Localization();
	
	// read the config file
	global.configuration.initialize();
	
	// initially update the key information list
	global.keyInformation.updateKeys();
	
	// initialize the localization information
	global.localization.initialize();
	
	// create a new plasmoid handler
	var plasmoidHandler = new PlasmoidHandler();
	
	// then register all events of the plasmoid object
	plasmoidHandler.registerPlasmoidEvents();
}