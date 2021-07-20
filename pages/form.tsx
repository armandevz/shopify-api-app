import React from "react";
import { axios } from "../config/utils/axios";
import styles from '../styles/Form.module.css'

import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button, FormLayout, TextField} from '@shopify/polaris';

class Form extends React.Component {
  
  state = { data: null };

  getData = async (): Promise<void> => {
    const response = await axios
      .get("/api/stockRules/")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) this.setState({ data: response.data });
  };  

  componentDidMount() {
    this.getData();
  }

  handleChange = (e, index: number) => {
    const { value, name } = e.target;
    const { data } = this.state;

    if (!data) return;

    const newData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: parseInt(value, 10) };
      }

      return row;
    });

    this.setState({ data: newData });
  };

  addData = async (e) => {
    e.preventDefault();
    // console.log(this.state.formData);
    await axios
      .put("/api/stockRules/", this.state.data)
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  renderTable() {
    const { data } = this.state;

    if (!data) {
      return null;
    }
  }

  getDayOfWeekName(number: number): string {
    switch (number) {
      case 1:
        default:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4: 
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6: 
        return 'Saturday';
      case 7:
        return 'Sunday';        
    }
  }

  render(): React.ReactNode {
    const { data } = this.state;

    if (!data) {
      return null;
    }

    return (
      <div className={styles.container}>
        {/* <DatePickerUi /> */}
        <form id="formData" onSubmit={this.addData}>
          <table>
            <tr>
              <th>Day of week</th> 
              <th>Weight</th>
              <th>Price</th>
              <th>Inventory quantity</th>
            </tr>
            {data.map((value, index) => {
              return (
                <tr className="formRule" key={index}>
                  <td>
                    <input
                      name="day_of_week"
                      value={this.getDayOfWeekName(value.day_of_week)}
                      disabled
                    ></input>
                  </td>
                  <td>
                    <input
                      required
                      type="number"
                      name="weight"
                      placeholder="1"
                      onChange={(e) => this.handleChange(e, index)}
                      value={value.weight}
                    />
                  </td>
                  <td>
                    <input
                      required
                      type="number"
                      name="price"
                      placeholder="2.50"
                      onChange={(e) => this.handleChange(e, index)}
                      value={value.price}
                    />
                  </td>
                  <td>
                  <input
                      // required
                      type="number"
                      name="inventory_quantity"
                      placeholder="200"
                      onChange={(e) => this.handleChange(e, index)}
                      value={value.inventory_quantity}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          {/* <Button primary type="submit">Save theme</Button> */}
          <button className="polarisButton" type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default Form;