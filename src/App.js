import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './views/login';
import Dashboard from './views/dashboard';
import Users from './views/users';
import Orders from './views/orders';
import OrderDetail from './views/order-detail';
import PageData from './data/pages.json'

function App() {
  const components = {
    Home: Dashboard,
    Users,
    Login,
    Orders
  };

  function getComponent(name) {
    const Component = components[name];
    if (Component)
      return (
        <Component />
      )
    return <Login />
  }

  return (
    <div className="App">
      <Routes>
        {PageData.pages.map((page) =>
          <Route path={page.path} key={page.path} element={
            getComponent(page.name)
          } />
        )}
        <Route path="/order" element={<Orders />} />
        <Route path="/order/:Id" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
