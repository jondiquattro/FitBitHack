import { settingsStorage } from "settings";
import * as messaging from "messaging";

messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
}

