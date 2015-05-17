import QtQuick 2.0

Component {
	SimpleItemDelegate {
		Rectangle {
			color: plasmoid.configuration[colorConfigKey]
		}
	}
}
