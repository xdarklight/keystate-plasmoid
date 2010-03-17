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
		var dataChanged = false;
		var currentModifierIsLocked = Boolean(data.Locked);
		var currentModifierIsPressed = Boolean(data.Pressed);
		var keyStatus = globals.keyInformation.getStatus(name);
		
		var currentStatus = null;
		var currentColor = null;
		
		// check which modifier was changed
		switch (name)
		{
			case globals.constants.capsLockObjectName():
			case globals.constants.numLockObjectName():
				// check the locked modifiers
				if (keyStatus != currentModifierIsLocked)
				{
					currentStatus = currentModifierIsLocked;
					dataChanged = true;
				}
				
				break;
			case globals.constants.shiftPressedObjectName():
			case globals.constants.controlPressedObjectName():
			case globals.constants.altPressedObjectName():
			case globals.constants.altgrPressedObjectName():
			case globals.constants.metaPressedObjectName():
			case globals.constants.superPressedObjectName():
			case globals.constants.hyperPressedObjectName():
				// check if the key is pressed
				if (keyStatus != currentModifierIsPressed)
				{
					currentStatus = currentModifierIsPressed;
					dataChanged = true;
				}
				
				break;
			default:
				// well... this shouldn't have happened :(
				// but anyway: dataChanged is false: we will not update
				break;
		}
		
		// only update if the data changed
		if (dataChanged)
		{
			// update the KeyInformation object
			globals.keyInformation.updateStatus(name, currentStatus);
			
			plasmoid.update();
		}
	}
}