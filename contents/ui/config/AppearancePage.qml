import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls
import QtQuick.Layouts 1.0 as QtLayouts
import "../components" as KeyStateComponents

Item {
	width: childrenRect.width
	height: childrenRect.height

	property alias cfg_RectangleLayout: radioButtonRectangleLayout.checked
	property alias cfg_TextLayout: radioButtonTextLayout.checked
	property alias cfg_SymbolLayout: radioButtonSymbolLayout.checked
	property alias cfg_HorizontalOrientation : radioButtonHorizontalOrientation.checked
	property alias cfg_VerticalOrientation : radioButtonVerticalOrientation.checked
	property alias cfg_Font : fontSelector.font

	QtLayouts.ColumnLayout {
		spacing: 10

		QtControls.GroupBox {
			title: i18n("Layout")
			flat: true
			QtLayouts.Layout.fillWidth: true

			QtLayouts.ColumnLayout {
				QtControls.ExclusiveGroup {
					id: layoutGroup
				}

				QtControls.RadioButton {
					id: radioButtonRectangleLayout
					exclusiveGroup: layoutGroup
					text: i18n("Rectangle")
				}

				QtControls.RadioButton {
					id: radioButtonTextLayout
					exclusiveGroup: layoutGroup
					text: i18n("Text")
				}

				QtControls.RadioButton {
					id: radioButtonSymbolLayout
					exclusiveGroup: layoutGroup
					text: i18n("Symbol")
				}
			}
		}

		QtControls.GroupBox {
			title: i18n("Orientation")
			flat: true
			QtLayouts.Layout.fillWidth: true

			QtLayouts.ColumnLayout {
				QtControls.ExclusiveGroup {
					id: orientationGroup
				}

				QtControls.RadioButton {
					id: radioButtonHorizontalOrientation
					exclusiveGroup: orientationGroup
					text: i18n("Horizontal")
				}

				QtControls.RadioButton {
					id: radioButtonVerticalOrientation
					exclusiveGroup: orientationGroup
					text: i18n("Vertical")
				}
			}
		}

		QtControls.GroupBox {
			title: i18n("Font")
			flat: true
			QtLayouts.Layout.fillWidth: true

			QtLayouts.ColumnLayout {
				KeyStateComponents.FontSelector {
					id: fontSelector

					width: 200
				}
			}
		}
	}
}
