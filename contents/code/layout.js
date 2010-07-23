/**
  * the generic layout object which is responsible
  * for drawing the correct layout (selected by the user)
  */
Layout = function()
{
	this.layout = null;
	
	/**
	  * creates an instance of the selected layout
	  */
	this.createSelectedLayout = function()
	{
		var layout = null;
		var layoutName = global.configuration.layoutConfiguration().selectedLayoutName();
		
		// include the base layout
		plasmoid.include("baselayout.js");
		
		// handle the layout selection
		switch (layoutName)
		{
			case global.constants.rectangleLayoutName():
				// include the layout code
				plasmoid.include("rectanglelayout.js");
				
				// initialize the layout
				layout = new RectangleLayout();
				
				break;
			case global.constants.textLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("textlayout.js");
				
				// initialize the layout
				layout = new TextLayout();
				
				break;
				
			case global.constants.symbolLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("symbollayout.js");
				
				// initialize the layout
				layout = new SymbolLayout();
				
				break;
		}
		
		// store the instance of the layout internally
		this.layout = layout;
	}
	
	/**
	  * updates the preferred size of the plasmoid
	  */
	this.updatePreferredSize = function()
	{
		// check if the user wants us to have a perferred size
		if (global.configuration.layoutConfiguration().preferredSizeEnabled())
		{
			var width = global.configuration.layoutConfiguration().preferredWidth();
			var height = global.configuration.layoutConfiguration().preferredHeight();
			
			// set the preferred size
			plasmoid.setPreferredSize(width, height);
			
			// then resize the plasmoid
			plasmoid.resize(width, height);
		}
	}
	
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  */
	this.paintIcon = function(painter)
	{
		// paint the layout
		this.layout.paint(painter);
	}
}