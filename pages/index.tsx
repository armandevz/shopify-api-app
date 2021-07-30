import DatePicker from '../components/StockRuleException';
import Form from '../components/StockRule';
import Head from 'next/head'
import React from 'react';
import { DisplayText, Pagination } from '@shopify/polaris';
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
      <div className="subtitle">
        <DisplayText size="large">Stock Rules</DisplayText>
      </div>
      <Form />
      <div className="stockRulesExceptions">
        <div className="subtitle">
          <DisplayText size="large">Stock Rules Exceptions</DisplayText>
        </div>
        <DatePicker />
      </div>
      <div className="subtitle">
        <DisplayText size="large">Cron settings</DisplayText>
      </div>
      <Cron />
      <CronLogTable />
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