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
          description="You can change weight, price, inventory quantity for the item. Changes are possible for any day of the week."
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
          description="You can change quantity choosing the day and the month."
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
          description="If checkbox is on, Cron starts working. If checkbox is off, Cron stops working."
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
          description="Here are shown the last 30 reports on Cron program: date, time and description. 
          There are two options in the description: successes if Cron is working and false if some problems appear."
        >
          <Card sectioned>
            <CronLogTable />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <div style={{ height: '100px' }}>
        <Pagination
          hasPrevious
          previousKeys={[74]}
          previousTooltip="j"
          onPrevious={() => {
            console.log('Previous');
          }}
          hasNext
          nextKeys={[75]}
          nextTooltip="k"
          onNext={() => {
            console.log('Next');
          }}
        />
      </div>
    </div>
  </body>
);

export default Index;