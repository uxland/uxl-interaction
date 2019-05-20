import {ConfirmDemo} from "./confirm-demo";
import {NotifyDemo} from "./notify-demo";
const confirmDemo = new ConfirmDemo();
const notifyDemo = new NotifyDemo();
document.body.appendChild(confirmDemo as any);
document.body.appendChild(notifyDemo as any);
