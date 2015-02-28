import QtQuick 2.0

Rectangle {
	visible: isPressed && plasmoid.configuration[visibilityConfigKey]

	width: 40
	height: 20
}
