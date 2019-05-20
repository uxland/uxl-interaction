import {ConfirmDemo} from "./confirm-demo/confirm-demo";
import {NotifyDemo} from "./notify-demo/notify-demo";

const confirmDemo = new ConfirmDemo();
const notifyDemo = new NotifyDemo();

document.body.appendChild(confirmDemo as any);
document.body.appendChild(notifyDemo as any);
