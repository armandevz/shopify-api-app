import React from "react";
import { axios } from "../config/utils/axios";
import { Button, TextField } from '@shopify/polaris';

class StockRule extends React.Component {

  state = { data: null };

  protected getData = async (): Promise<void> => {
    const response = await axios
      .get("/api/stockRules/")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) this.setState({ data: response.data });
  };

  componentDidMount(): void {
    this.getData();
  }

  public handleChange = (value: string, id: string, index: number) => {
    const { data } = this.state;

    if (!data) return;

    const newData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [id]: value };
      }
      return row;
    });

    this.setState({ data: newData });
  };

  addData = async (e) => {
    e.preventDefault();
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

  protected getDayOfWeekName(number: number): string {
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

  public render(): React.ReactNode {
    const { data } = this.state;

    if (!data) {
      return null;
    }

    return (
      <>
        <form onSubmit={this.addData}>
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
                    <TextField
                      label=''
                      name="day_of_week"
                      value={this.getDayOfWeekName(value.day_of_week)}
                      disabled
                    />
                  </td>
                  <td>
                    <TextField
                      label=''
                      type="number"
                      name="weight"
                      placeholder={value.weight}
                      onChange={(newValue) => this.handleChange(newValue, 'weight', index)}
                      value={this.state.data[index].weight}
                    />
                  </td>
                  <td>
                    <TextField
                      label=''
                      type="number"
                      name="price"
                      placeholder={value.price}
                      onChange={(newValue) => this.handleChange(newValue, 'price', index)}
                      value={this.state.data[index].price}
                    />
                  </td>
                  <td>
                    <TextField
                      label=''
                      type="number"
                      name="inventory_quantity"
                      placeholder={value.inventory_quantity}
                      onChange={(newValue) => this.handleChange(newValue, 'inventory_quantity', index)}
                      value={this.state.data[index].inventory_quantity}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="space">
            <Button primary submit={true}>Save</Button>
          </div>
        </form>
      </>
    );
  }
}

export default StockRule;