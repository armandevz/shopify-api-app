import Title from '../components/Title';
import DatePicker from '../components/DatePicker';
import Form from '../components/Form';
import Head from 'next/head'
import React from 'react';
import { DisplayText } from '@shopify/polaris';
import Cron from '../components/Cron';

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
        <Title />
      </div>
      <div className="subtitle">
      <DisplayText size="large">Stock Rules</DisplayText>
      </div>
        <Form />
        <div className="subtitle">
        <DisplayText size="large">Stock Rules Exceptions</DisplayText>
        </div>
        <DatePicker />
        <div className="subtitle">
        <DisplayText size="large">Cron settings</DisplayText>
        </div>
        <Cron />
    </div>
  </body>
);

export default Index;
