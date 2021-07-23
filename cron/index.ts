import * as schedule from 'node-schedule';
import Variants from '../controllers/shopify/Variants';
import { CONFIG } from '../config/config';

try {
  schedule.scheduleJob('*/04 * * * * *', async function () {
    await new Variants(CONFIG.productId).deleteCreateVariant();

    console.log(`The cron task completed at: ${new Date().toLocaleString()}`);
  });
} catch (e) {
  console.log(e, 'Something went wrong in the Cron task');
}


var checkbox = document.querySelector('[type="checkbox"]');
var button = document.querySelector('button');

// checkbox.addEventListener('change', function(event) {
//   alert(event.target.checked);
// });

// button.addEventListener('click', function() {
//   checkbox.checked = !checkbox.checked;
//   triggerEvent(checkbox, 'change');
// });

// function triggerEvent(element, eventName) {
//   var event = document.createEvent("HTMLEvents");
//   event.initEvent(eventName, false, true);
//   element.dispatchEvent(event);
// }