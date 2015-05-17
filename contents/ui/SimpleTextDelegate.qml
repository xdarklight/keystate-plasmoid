import QtQuick 2.0
import org.kde.plasma.components 2.0 as PlasmaComponents

Item {
	property string displayText;

	width: theme.mSize(textLabel.font).width * displayText.length
	height: textLabel.height

	PlasmaComponents.Label {
		id: textLabel

		font: plasmoid.configuration["Font"]
		color: plasmoid.configuration[colorConfigKey]

		text: displayText
	}
}
