import React, {Component, useState} from 'react'
import { Tabs, WhiteSpace, Badge, Button, Modal, Toast } from 'antd-mobile';
import Listone from './listone'
import Listwo from './listtwo'
import List_body from './list_body'
import FunCom from './funcomtest'
import { Link } from 'dva/router'

const alert = Modal.alert;

const tabs = [
  { title: '奖励金', sub: '1' },
  { title: '提现', sub: '2' },
];



function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  const [hookActive, setHookActive] = useState(0);
  const handleClick = ()=>{
    setCount(1)
    setHookActive(()=>{
      return 1
    })
    console.log(hookActive, 'hookActive')
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <FunCom hookActiveaa={hookActive}/>
      <button onClick={handleClick}>
        点我
      </button>
    </div>
  );
}


export default class Tapcom extends Component{
  constructor(props){
    super(props)
    this.state={
      modal1: false,
      tap: 0
    }
  }
  handleClick = (e) => {
    this.setState({
      modal1: !this.state.modal1
    })
    
  }
  onClose = key => () => {
    
  }
  componentWillUnmount(){
    alert(123)
    console.log('路由切换导致组件卸载了')
  }
  componentDidMount(){

    this.dom = document.getElementsByClassName('am-tabs-default-bar-underline')
 
    console.log(this.props, '页面重新加载了')
    // Tabs.DefaultTabBar.goToTab(1)
    // const {history} = this.props
    // history.push('')
    // this.setState({
    //   tap: 1
    // })
    // console.log(this.state, 'state')
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  
  okhandle = () => {
    // console.log(this, 'ok'); 
    this.setState({
      modal1: false,
      tap: 1
    });

    // Tabs.page = 1
  }
  onTabClick = (tap, index)=>{
    this.setState({
      tap: index,
      
    });
    if(index==1){
      this.dom[0].style.left = '100px'
    }
    
    
  }
  onTapChange= (tap, index)=>{
    console.log(this)

    if(index==1){
      this.dom[0].style.left = '100px'
    }
  }

  render(){
    console.log(this.state.tap, 'pppp')

    return (
      <div>
        <Link to="/formms">qusjjsjs</Link>
        <Example />
        <Button onClick={this.handleClick}>申请提现</Button>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[{ text: 'Ok', onPress: this.okhandle }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          // goToTab={this.goToTab}
          // afterClose={() => { alert('afterClose'); }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
          </div>
        </Modal>
        {/* <Button
          onClick={() =>
            alert('<div>Delete', 'Are you sure???<span>gggg</span></div>', [
              { text: 'Cancel', onPress: () => console.log('cancel') },
              {
                text: 'Ok',
                onPress: () =>
                  new Promise((resolve) => {
                    Toast.info('onPress Promise', 1);
                    setTimeout(resolve, 1000);
                  }),
              },
            ])
          }
        >
          申请提现
        </Button> */}
        <Tabs 
          tabs={tabs}
          swipeable={false}
          animated={true}
          prefixCls="cttzjp"
          page={this.state.tap}
          distanceToChangeTab={0}
          initialPage={0}
          tabBarUnderlineStyle={true}
          tabBarTextStyle={{color: '#999'}}
          tabBarActiveTextColor='#FAB319'
          onChange={this.onTapChange}
          onTabClick={ this.onTabClick }
          renderTab={tab => <span style={{}}>{tab.title}</span>}
          // renderTabBar={(props) => <Tabs.DefaultTabBar className="zjpTap" {...props} />}

          

        >
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}> */}
          {/* </div> */}
          <div className="mzxone" >
            {/* <Listone /> */}
            <Listwo zjp="plkk"/>
            {/* 1111 */}

          </div>
          <div className="mzxtwo" >
            {/* <Listwo zjp="plkk"/> */}
            <Listone />
            {/* aaaaaaa */}

            {/* <List_body /> */}

          </div>

        </Tabs>
        <WhiteSpace />
        
        
      </div>
    )
  }


}