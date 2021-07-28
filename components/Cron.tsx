import React, { useCallback, useState } from "react";
import { Checkbox } from "@shopify/polaris";
import { axios } from "../config/utils/axios";

const Cron = () => {

            const [checked, setChecked] = useState(false);
            const handleChange = (newChecked) => {setChecked(newChecked);
              cron()
            };

            const cron = function() {
              axios
              .put("/api/cronRule/", {
                key: 'cronEnabled',
                value: checked
              })
              .catch((err) => {
                console.log("Error: ", err);
              });

              console.log('check', checked)
            }
            
            return (
              <Checkbox
                label="Basic checkbox"
                checked={checked}
                onChange={handleChange}
              />
            );
          }

export default Cron;