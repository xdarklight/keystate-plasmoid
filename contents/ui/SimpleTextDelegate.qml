import QtQuick 2.0
import org.kde.plasma.components 2.0 as PlasmaComponents

SimpleItemDelegate {
	property string displayText;

	id: rectangleKeyWrapper

	PlasmaComponents.Label {
		anchors.centerIn: parent
		anchors.fill: parent

		visible: rectangleKeyWrapper.visible

		font: plasmoid.configuration["Font"]
		color: plasmoid.configuration[colorConfigKey]

		text: displayText
	}
}
