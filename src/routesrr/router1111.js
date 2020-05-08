// import { Router, Route, Switch, IndexRoute } from 'dva/router';
// // import Home from '../pages/home.js'
// import User from '../pages/user.js'
// import React from 'react'
// import App from '../index'
import Header from '../layout/header'
import Footer from '../layout/footer'
import Loading from '../pages/special/loading'
import NotFound from '../pages/special/404'


import React from 'react';
import { Route, Switch, routerRedux, Redirect} from 'dva/router';
// import { Route, Switch, routerRedux } from 'dva';
// import { router } from 'dva';
// const {Route, Switch, routerRedux} = router
// import {dynamic} from 'dva'
import dynamic from 'dva/dynamic';


const { ConnectedRouter } = routerRedux
// import User from '../pages/user/user'



function RouterConfig({ history, app }) {
  const routes = [
    {
      path: "/user",
      // layout: '',
      component: () => import('../pages/user/user.js'),
      models: () => [
        import('../pages/user/model.js'),
          ],
      name: 'User'
    },
    {
      path: "/",
      // layout: '',
      component: () => import('../pages/mobile/mobile.js'),
      models: () => [
        import('../pages/mobile/model.js'),
          ],
      name: 'Mobile'
    },
    {
      path: "/listv",
      // layout: '',
      component: () => import('../pages/listview/listv'),
      
      name: 'listv'
    },
    {
      path: "/hooks",
      // layout: '',
      component: () => import('../pages/hooks/hooks'),
      
      name: 'hooks'
    },
    {
      path: "/showaction",
      // layout: '',
      component: () => import('../pages/showaction/showaction'),
      
      name: 'showaction'
    },
    {
      path: "/pulltofresh",
      // layout: '',
      component: () => import('../pages/pulltofresh/pulltofresh'),
      
      name: 'pulltofresh'
    },
    {
      path: "/dva",
      // layout: '',
      component: () => import('../pages/dva_shengming/smzhouqi'),
      
      name: 'dva'
    },
    {
      path: "/swipeaction",
      // layout: '',
      component: () => import('../pages/swipeaction/swipeaction'),
      
      name: 'swipeaction'
    },
    {
      path: "/steps",
      // layout: '',
      component: () => import('../pages/steps/steps'),
      
      name: 'steps'
    },
    {
      path: "/tixian",
      models: () => [
        import('../pages/tixian/model'),
          ],
      // layout: '',
      component: () => import('../pages/tixian/index'),
      
      name: 'tixian'
    },
    {
      path: "/tapcom",
      // layout: '',
      component: () => import('../pages/tapCom/tapcom'),
      
      name: 'tapcom'
    },
    {
      path: '/*',
      component: () => import('../pages/special/404'),
      
      name: 'Not'
    }
  ];
  // const UserPageComponent = dynamic({
  //   app,
  //       models: () => [
  //           import('../pages/user/model'),
  //         ],
  //         component: () => import('../pages/user/user'),
  // });
 
  return (
    <ConnectedRouter history={history} app={app}>
      <Switch>
        <React.Fragment>
          <Header />
          {
            routes.map(({ path, name, models, component , ...arg}) => {
              const Component = dynamic({ app,models,component  })
              return (
                <Route path={path} key={name} exact 
                render={(props) => <Component {...props}/>} />
              )
            })
         
          }
          
            {/* <Route path='/user' key='user' exact component={User} /> */}
          <Footer />

        </React.Fragment>
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig;


