# KeyState Plasmoid

An accessibility Plasmoid that shows the status of various key on your keyboard (for example if "Caps Lock" is enabled or "Meta" is pressed).

## Layout

The Plasmoid currently provides three layouts:
  - A "key name" based layout, in this case part of the taskbar:<br>![KeyState Plasmoid with the "Text" layout in the taskbar](http://abload.de/img/text-layout-in-taskbajwy5h.png)
  - A "symbol" based layout (where every key has it's own symbol assigned) - works horizontally and vertically:<br>![KeyState Plasmoid with the "Horizontal Symbols" layout](http://abload.de/img/symbol-layout-24vy8d.png) ![KeyState Plasmoid with the "Vertical Symbols" layout](http://abload.de/img/symbol-layout-1pil1s.png)
  - A "rectangle" based layout (where every key shows a colored rectangle) - works horizontally and vertically:<br>![KeyState Plasmoid with the "Horizontal Rectangles" layout](http://abload.de/img/rectangle-layout-2bvx1v.png) ![KeyState Plasmoid with the "Vertical Rectangles" layout](http://abload.de/img/rectangle-layout-1jrapr.png)

### Installation

Download this git repository, then run:
```
plasmapkg2 -i <path/to/keystate-plasmoid>/package/
```

Updating it is very similar: update to the latest git version and run:
```
plasmapkg2 -u <path/to/keystate-plasmoid>/package/
```

### Questions + Answers

**Q:** Where does the plasmoid get it's data from?  
**A:** It gets it's data from the 'keystatus' DataEngine (which is shipped with Plasma)

**Q:** Ok, I've installed it but how do I uninstall it?  
**A:** ```plasmapkg2 -r eu.blumenstingl.martin.keystateplasmoid```

**Q:** Scroll Lock is not working for me (in X.Org)
**A:** This is a limitation of X.Org's default configuration. A workaround is available at [https://bugs.freedesktop.org/show_bug.cgi?id=94226]():
```
xmodmap -e "add mod3 = Scroll_Lock"
```

### Todo's

 - Maybe add a SVG layout that uses files shipped with the Plasma theme?
 - A better KConfig default value for the font

License
----

See `LICENSE` file.

Copyright (c) 2010-2016 Martin Blumenstingl
