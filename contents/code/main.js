// tell everyone we're busy
plasmoid.busy = true;

// mandatory includes
plasmoid.include("global.js");

// create a new global.object (which is globally available)
Global.initialize();