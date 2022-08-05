import * as Environment from "../environment";
import * as Log from "../utilities/logger";
import ParkRide from "../objects/parkRide";
import Transformer from "../transformer";
import UiConstants from "./uiConstants";

export default class MainWindow {
  onUpdate?: () => void;

  onClose?: () => void;

  private window?: Window;

  private ridesInPark: ParkRide[];
  private selectedRide: ParkRide;

  private createWindow(): Window {
    this.ridesInPark = ParkRide.getAllRides();
    if (this.ridesInPark.length > 0) {
      this.selectedRide = this.ridesInPark[0];
    }

    const ridesList: DropdownWidget = {
      type: "dropdown",
      x: UiConstants.margin,
      y: UiConstants.toolbarHeight + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight,
      tooltip: "List of rides in the park",
      items: this.ridesInPark.map(r => Environment.isDevelopment ? `[${r.rideId}] ${r.name}` : r.name),
      onChange: (i) => {
        if (this.ridesInPark.length >= i) {
          this.selectedRide = this.ridesInPark[i];
        }
      }
    };

    const goButton: ButtonWidget = {
      type: "button",
      x: UiConstants.margin,
      y: ridesList.y + ridesList.height,
      width: UiConstants.fullWidthWidget(),
      height: 100,
      text: "Go",
      onClick: () => {
        Transformer.go(this.selectedRide);
      }
    };

    const window = ui.openWindow({
      classification: Environment.namespace,
      title: `${Environment.pluginName} (v${Environment.pluginVersion})`,
      width: UiConstants.windowWidth,
      height: goButton.y + goButton.height + UiConstants.margin,
      widgets: [
        ridesList,
        goButton
      ],
      onUpdate: () => {
        if (this.onUpdate) {
          this.onUpdate();
        }
      },
      onClose: () => {
        if (this.onClose) {
          this.onClose();
        }
      }
    });

    return window;
  }

  show(): void {
    if (this.window) {
      this.window.bringToFront();
    } else {
      this.window = this.createWindow();
    }
  }

  static close(): void {
    ui.closeWindows(Environment.namespace);
  }
}
