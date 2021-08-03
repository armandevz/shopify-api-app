import React from "react";
import { axios } from "../config/utils/axios";
import { Card, DataTable, Page, Pagination } from '@shopify/polaris';

export default class CronLogTable extends React.Component {

  state = {
    data: null,
    currentPage: 1,
    hasPrevious: false,
    hasNext: false,
    loading: false
  };

  componentDidMount(): void {
    this.getData();
  }

  protected getData = async (): Promise<void> => {
    this.setState({ loading: true });
    const { currentPage } = this.state;
    const response = await axios
      .get(`/api/cronLog/${currentPage}`)
      .catch((err) => console.log("Error:", err));

    if (response && response.data) this.setState({ data: response.data.items, hasNext: response.data.has_more });
    this.setState({ loading: false });
  };

  protected onPrevious() {
    const { currentPage, loading } = this.state;
    if (!loading) {
      this.setState({ currentPage: currentPage - 1 }, () => this.getData());
    }
  }

  protected onNext() {
    const { currentPage, loading } = this.state;
    if (!loading) {
      this.setState({ currentPage: currentPage + 1 }, () => this.getData());
    }
  }

  public cronLogTable() {
    const { data, hasNext, currentPage } = this.state;
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
              rows={data.map(row => ([row.date, row.description]))}
            />
          </Card>
          <Pagination
            hasPrevious={currentPage > 1}
            onPrevious={() => this.onPrevious()}
            hasNext={hasNext}
            onNext={() => this.onNext()}
          />
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