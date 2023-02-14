import { Layout, Image } from 'antd';
import AppRoutes from './components/Routes';
import RestaurantContextProvider from "./contexts/RestaurantContext";
import SideMenu from './components/SideMenu';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import logo from './assets/logo.png';
Amplify.configure(awsconfig);

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <RestaurantContextProvider>
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <Image 
        src={logo}
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
