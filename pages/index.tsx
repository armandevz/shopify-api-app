import DatePicker from '../components/StockRuleException';
import Form from '../components/StockRule';
import Head from 'next/head'
import React from 'react';
import { Banner, Card, DisplayText, Layout, Pagination } from '@shopify/polaris';
import Cron from '../components/Cron';
import CronLogTable from '../components/CronLogTable';

const Index = () => (
  <body>
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@shopify/polaris@6.6.0/dist/styles.css"
        />
      </Head>
      <div className="title">
        <DisplayText size="extraLarge">Back Copy Setting Page</DisplayText>
      </div>
      <Layout>
        <Layout.AnnotatedSection
          title="Stock Rule"
          description="It’s possible to change weight, price, inventory quantity for Back Copy. Changes can be done on every day of the week."
        >
          <Card sectioned>
            <Form />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <hr></hr>
      <Layout>
        <Layout.AnnotatedSection
          title="Stock Rule Exception"
          description="Changing the quantity is possible by choosing the day and the month."
        >
          <Card sectioned>
            <DatePicker />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <hr></hr>
      <Layout>
        <Layout.AnnotatedSection
          title="Cron settings"
          description="By active checkbox the Cron starts working. If the checkbox is switched off, the Cron stops working."
        >
          <Card sectioned>
            <Cron />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <hr></hr>
      <Layout>
        <Layout.AnnotatedSection
          title="Cron Log"
          description="Here are shown the last 20 reports on Cron program. False is displayed in the description in case of error."
        >
          <Card sectioned>
            <CronLogTable />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <Pagination
        hasPrevious
        onPrevious={() => {
          console.log('Previous');
        }}
        hasNext
        onNext={() => {
          console.log('Next');
        }}
      />
    </div>
  </body>
);

export default Index;