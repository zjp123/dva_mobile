import React from 'react'
import dva from 'dva';
import dynamic from 'dva/dynamic';
import {Router} from 'dva/router';
import createLoading from 'dva-loading';
// import { ConfigProvider } from 'antd';
// import zh_CN from 'antd/es/locale/zh_CN';
const createHistory = require("history").createBrowserHistory
// import router from './routes/index'
import model from './model/index'
import './pages/index.css'
// import createRoutes from './routes/index';
import routes from './routesrr/router1111';
// import config from './config';


// const { Router } = router;

import TestError from './index'
// 1. Initialize
const app = dva({
    history: createHistory({
      basename: ''
      
    }),
});
// console.log('routessss', routes)
app.use(createLoading());

// 2. Model
app.model(model);//  注册全局model

// dynamic.setDefaultLoadingComponent(() => config.router.loading);

//   3. View
//   const App = connect((props) => ({
//     props
//   }))(function(props) {
//     return (
//       <Apps {...props}/>
//     );
//   });
  
  
  // 4. Router
  app.router(routes);
  // -> 初始化路由

// console.log('首页。。。。。', createRoutes(app))

// app.router(({ history, app }) => (
//   <ConfigProvider locale={zh_CN}>
//     <Router history={history}>{createRoutes(app)}</Router>
//   </ConfigProvider>
// ));

// app.router(() => <App />);
  
  // 5. Start
  app.start('#root');