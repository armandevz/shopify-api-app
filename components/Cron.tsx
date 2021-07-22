import React, { useCallback, useState } from "react";
import { Checkbox } from "@shopify/polaris";


const Cron = () => {

            const [checked, setChecked] = useState(false);
            const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
          
            return (
              <Checkbox
                label="Basic checkbox"
                checked={checked}
                onChange={handleChange}
              />
            );
          }

export default Cron;



// var checkbox = document.querySelector('[type="checkbox"]');
// var button = document.querySelector('button');

// checkbox.addEventListener('change', function(event) {
//   alert(event.target.checked);
// });

// // Programmatically change the `checked` property:'
// button.addEventListener('click', function() {
//   checkbox.checked = !checkbox.checked;
//   triggerEvent(checkbox, 'change');
// });

// function triggerEvent(element, eventName) {
//   var event = document.createEvent("HTMLEvents");
//   event.initEvent(eventName, false, true);
//   element.dispatchEvent(event);
// }