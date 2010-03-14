/**
  * the generic layout object which is responsible
  * for drawing the correct layout (selected by the user)
  */
Layout = function()
{
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  * @param numLocked decides if the num key is locked or not
	  * @param capsLocked decides if the caps key is locked or not
	  */
	this.paintIcon = function(painter)
	{
		var layout = null;
		
		// handle the current layout
		switch (globals.configuration.layoutName())
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
		}
		
		// paint the layout
		layout.paint(painter);
	}
}