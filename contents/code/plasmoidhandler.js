/**
  * an object which handles the general logic
  */
PlasmoidHandler = function()
{
	/**
	  * initializes the whole plasmoid
	  */
	this.initialize = function()
	{
		// tell everyone we're busy
		plasmoid.busy = true;
		
		// all includes
		plasmoid.include("layout.js");
		plasmoid.include("constants.js");
		plasmoid.include("keyconfiguration.js");
		plasmoid.include("configuration.js");
		plasmoid.include("keyinformationcontainer.js")
		plasmoid.include("keyinformation.js");
		
		// fill our globals object with information
		globals.configuration = new Configuration();
		globals.constants = new Constants();
		globals.keyInformation= new KeyInformation();
		globals.layout = new Layout();
		
		// read the config file
		globals.configuration.initialize();
		
		// initially update the key information list
		globals.keyInformation.updateKeys();
		
		// register all events of the plasmoid object
		this.registerPlasmoidEvents();
	}
	
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
		for (var i in globals.keyObjectNames)
		{
			var objectName = globals.keyObjectNames[i];
			
			// register the object name to the dataengine
			dataEngine(globals.constants.engineName()).connectSource(objectName, plasmoid);
		}
	}
	
	/**
	  * called when the configuration of the plasmoid changed
	  */
	this.configChanged = function()
	{
		// re-read the config file
		globals.configuration.initialize();
		
		// update our key information list
		globals.keyInformation.updateKeys();
		
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
		globals.layout.paintIcon(painter);
		
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
		var currentModifierIsLocked = Boolean(data.Locked);
		var currentModifierIsPressed = Boolean(data.Pressed);
		
		var keyContainer = globals.keyInformation.getContainer(name);
		
		// initialize currentStatus with the value of keyStatus
		// if the key value object name is unknown the plasmoid will
		// not get updated
		var currentStatus = keyContainer.status;
		
		// check which modifier was changed
		switch (keyContainer.valueObjectName)
		{
			case globals.constants.objectValueLockedName():
				currentStatus = currentModifierIsLocked;
				break;
			case globals.constants.objectValuePressedName():
				currentStatus = currentModifierIsPressed;
				break;
		}
		
		// only update if the data changed
		if (keyContainer.status != currentStatus)
		{
			// update the KeyInformation object
			globals.keyInformation.updateStatus(name, currentStatus);
			
			plasmoid.update();
		}
	}
}