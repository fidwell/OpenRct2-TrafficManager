import * as Environment from "./environment";
import * as Log from "./utilities/logger";
import MainWindow from "./ui/mainWindow";

let windowInstance: MainWindow | null;

function openWindow(): void {
  // Show the current instance if one is active.
  if (windowInstance) {
    windowInstance.show();
    return;
  }

  const window = new MainWindow();

  window.onClose = (): void => {
    windowInstance = null;
  };

  window.show();
  windowInstance = window;
}

const main = (): void => {
  if (!Environment.isUiAvailable) {
    Log.warning("UI unavailable, plugin disabled.");
    return;
  }

  ui.registerMenuItem(Environment.pluginName, () => openWindow());
};

export default main;
