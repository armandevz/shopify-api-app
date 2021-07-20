import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button} from '@shopify/polaris';


// const SpButton = (props) => {
//     return (
//         <AppProvider i18n={enTranslations}>
//         <Button onClick={props.clickHandler}>{props.name}</Button>
//         </AppProvider>
//     )
// }

const SpButton = (
    <AppProvider i18n={enTranslations}>
      <Button onClick={() => alert('Button clicked!')}>Example button</Button>
    </AppProvider>
  );

export default SpButton;