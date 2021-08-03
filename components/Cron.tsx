import React, { useCallback, useState } from "react";
import { Button, Checkbox, Form } from "@shopify/polaris";
import { axios } from "../config/utils/axios";

export default class Cron extends React.Component {
  state = { checked: false };

  protected getData = async () => {
    const response = await axios
      .get("/api/cronRule/")
      .catch((err) => console.log("Error:", err));

    if (response && response.data) this.setState({ checked: response.data });
  };

  async componentDidMount() {
    this.getData();
  }

  public handleChange = (value: boolean) => {
    this.setState({ checked: value });
  };

  addData = async (e) => {
    const { checked } = this.state;

    e.preventDefault();

    await axios
      .put("/api/cronRule/", { key: 'cronEnabled', value: checked })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  render() {
    const { checked } = this.state;
    return (
      <Form onSubmit={this.addData}>
        <Checkbox
          label="Enabled"
          checked={checked}
          onChange={(value) => this.handleChange(value)}
        />
        <div className="cronButton">
        <Button primary submit={true}>Save</Button>
        </div>
      </Form>
    );
  }
}