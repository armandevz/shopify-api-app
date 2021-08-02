import React from "react";
import { axios } from "../config/utils/axios";
import { Card, DataTable, Page } from '@shopify/polaris';

export default class CronLogTable extends React.Component {

    state = { data: null };

    componentDidMount(): void {
        this.getData();
      }

    protected getData = async (): Promise<void> => {
      const response = await axios
        .get("/api/cronLog/")
        .catch((err) => console.log("Error:", err));
  
      if (response && response.data) this.setState({ data: response.data });
    };

    public cronLogTable() {
        const { data } = this.state;
        if (!data) {
          return null;
        }

        return (
            <>
                <Page>
                    <Card>
                        <DataTable
                            columnContentTypes={[
                                'numeric',
                                'text',
                            ]}
                            headings={[
                                'Date',
                                'Description',
                            ]}
                            rows={data.map(row=> ([row.date, row.description]))}
                        />
                    </Card>
                </Page>
            </>
        );
    }

      public render(): React.ReactNode {
        return (
          <div>
            {this.cronLogTable()}
          </div>
        );
      }
}