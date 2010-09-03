// include the prototypes which extend existing classes
plasmoid.include("array.js");
plasmoid.include("number.js");
plasmoid.include("string.js");

// include everything else
plasmoid.include("global.js");
plasmoid.include("plasmoidhandler.js");
plasmoid.include("layout.js");
plasmoid.include("constants.js");
plasmoid.include("keyconfiguration.js");
plasmoid.include("layoutconfiguration.js");
plasmoid.include("configuration.js");
plasmoid.include("keyinformation.js");

// initialize thes plasmoid handler (which initializes the whole plasmoid)
PlasmoidHandler.initialize();