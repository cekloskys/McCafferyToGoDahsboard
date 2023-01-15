import { Layout, Image } from 'antd';
import AppRoutes from './components/Routes';
import SideMenu from './components/SideMenu';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <Image 
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0L-vPzftWY6iInunERlvMbyMglcVJwUsHO7Apca2KgQ6xRojodmEP0S4vB4ZrkMdiH4&usqp=CAU'
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
  );
}

export default App;
