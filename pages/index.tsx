import Title from '../components/Title';
import DatePicker from '../components/DatePicker';
import Form from './form';
import Head from 'next/head'

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
      <h2>Stock Rules</h2>
      <div className="wrapper">
        <Form />
        <div className="description">Some description</div>
      </div>
      <h2>Stock Rules Exceptions</h2>
      <div className="wrapper">
        <DatePicker />
        <div>
          <div className="description">Some text</div>
        </div>
      </div>
    </div>
  </body>
);

export default Index;
