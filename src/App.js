import { Layout, Image } from 'antd';
import AppRoutes from './components/Routes';
import RestaurantContextProvider from "./contexts/RestaurantContext";
import SideMenu from './components/SideMenu';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsconfig);

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <RestaurantContextProvider>
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <Image 
          src='https://mccafferytogo-storage-5683849b183036-staging.s3.amazonaws.com/public/images/logo.png?AWSAccessKeyId=ASIAYYC324YX43B7XXGW&Expires=1674844409&Signature=J9WB3uNLak01wRn%2Fgf2DVafHzbI%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDgXDoabXer1%2FIamJb3a4%2FFT%2BfWErVk70nIKAP3YRGN%2BAIhAK6kXBy2JhIt67eOrwpL%2BY%2FMYC7LftgJx8bTDg5CdLE1KsQECEwQABoMNjAxNDg4MDI1MTM1Igxqwzp2mUh79tFwQVEqoQSn60QdABD1VNFLGRjp4FKHLizbPJFbI7XIzsmD5QenbBWLYzkWTEn8MP713VmA%2Fyah%2BwKjd7ZQSW00UH4R%2FETTq52UKdEF2NdM%2BqzsEzHgfm2raCSfnJIDusxoq33Bg%2Bs%2BhX1wNHkZ0lYPgtroBSoNVdoSKqCbThKSVTS5v17IK3lwWem5yzJ8tdYXWTgv7Z35EySA%2F41d%2FEqhBd%2Fw%2Fwr26Ewx2XTXYzJWeqsPQts1ztb011nFUng7og8Pq2xLW8b9%2FwGCi%2FEjG%2Bx2ezmBnO%2BeaALX%2F3Giyg%2Fjsd3f3uRKw%2Bz3rfXmQ4rmR14wKHJLxutG4kTNbb0qQVBVkQmYG4UCSCpsvZbu%2Bk34lsDd5eucT6hJsxmb8ZY%2BU3OlGl4f2r1fvn8W0Z0mdo3ksmLKolm3PnIVqQEJAl1j3jCvYNFJKZ0oEvxBnOgh1G4qj669%2F5%2FmTLieUrUs%2FLpRmqaZ%2Fy4iD5isN0BCnUoV%2BWg53xwMkDBqBVXg4rH0Qou6ZRf7jdt2vqc51jGT5hTHqOGgyzm5XcwgshNHhL%2BiM44Hjb7UCO%2B3kkbmBlSQGITBthHalbDHQoNdQikFLIubLenpXLphXvy7nnl2EnOHDxxRzd26emwz7XjRR5kcz%2FWQ%2F8ieYoKVw2UjdlBhsCMsrEw2TafGG1U5xuDYnH6f4xT9Laf7gmrtibzHL7qVm4Q89pHH%2FguNn7iSChXLgjHHeagJ5hsCaTDGr9CeBjqEArMHurUpgCY%2FUy58Mjd2RzoheJo%2B4i7ErtoLfEXYmwlJRDGyYwkl6dmBTg0kVpv3asUXj0XDepLgq9rtfSZhCRSqiHmjtWpBvzc9WgeqZUsJjZtxV3ILvl2rSBYjqEwbcS8sWPbeBcuYPbeYuZvfWvKTrFi7e2kj1g28%2Bu%2BxYinMZhB6pXUWFjJGzByw7oU%2BuBaEHAjdoD%2BH93qk16eRA5RFLn79UJU5WCPAUfEDbk4kfpCWWjE8whSUnJCahPHQ2CVMUX%2B9PYRuBJWj0RfcCwGn5eLtlIE%2BubhRj8kSTjOEW21MzpQIh4aD52JcsAZKRoYTBkdR4H2Xx7hgYlPWhyE0sLDj'
          preview={false}
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{textAlign: 'center'}}>
          McCaffery ToGo Dashboard
        </Footer>
      </Layout>
    </Layout>
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App);
