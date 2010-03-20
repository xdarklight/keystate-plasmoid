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
	this.instantiateSelectedLayout = function()
	{
		var layout = null;
		var layoutName = globals.configuration.layoutConfiguration().getSelectedLayoutName();
		
		// handle the layout selection
		switch (layoutName)
		{
			case globals.constants.horizontalLayoutName():
				// include the layout code
				plasmoid.include("horizontallayout.js");
				
				// get the layout
				layout = new HorizontalLayout();
				
				break;
			case globals.constants.verticalLayoutName():
				// include the layout code
				plasmoid.include("verticallayout.js");
				
				// get the layout
				layout = new VerticalLayout();
				
				break;
			case globals.constants.textLayoutName():
				// include the layout code
				plasmoid.include("textlayout.js");
				
				// get the layout
				layout = new TextLayout();
				
				break;
			
			case globals.constants.singleLayoutName():
				// include the layout code
				plasmoid.include("singlelayout.js");
				
				// get the layout
				layout = new SingleLayout();
				
				break;
		}
		
		// store the instance of the layout internally
		this.layout = layout;
	}
	
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  * @param numLocked decides if the num key is locked or not
	  * @param capsLocked decides if the caps key is locked or not
	  */
	this.paintIcon = function(painter)
	{
		// paint the layout
		this.layout.paint(painter);
	}
}