/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView, Flex } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import './listone.less'
// const data = {"code":"0","msg":"success",
//             "data":{"pageNum":869,"pageSize":534,"totalPages":328,"totalCount":514,
//             "items":[{
//               "companyName":"alibabba","orderTime":431,
//               "rewardAmount":600,"bizTypeName":"秒贴","rewardTypeName":"基础奖励"
//             }]}}
// const dataaa = {"code":"1","msg":"success",
//             "data":{"pageNum":869,"pageSize":534,"totalPages":328,"totalCount":514,
//             items:[{
//               "companyName":"ddd","orderTime":"2020/12/12",
//               "rewardAmount":800,"bizTypeName":"秒贴","rewardTypeName":"基础奖励"
//             },
//             {
//               "companyName":"skksdk","orderTime":"2020/12/12",
//               "rewardAmount":60000,"bizTypeName":"秒贴营销活动","rewardTypeName":"新用户首笔交易奖励"
//             }]}}

const datalenth = 5      

@connect(({ count, loading }) => ({
  loading,
  yieldValue: count.yieldValue,
  listViewValve: count.listViewValve,
  listViewVpage: count.listViewVpage
}))
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchList()
    this.dataSource = new ListView.DataSource({
      
      rowHasChanged: (row1, row2) => {
        // console.log(row1, row2, 'aaaaaaaaaaaaaa')
        return row1 !== row2
      },
      sectionHeaderHasChanged: (s1, s2) => {
        // console.log(s1, s2)
       return  s1 !== s2
      }
    });

    this.bizTypeName = [{
      name: '秒贴',
      value: '银票秒贴'
    },{
      name: '秒贴营销活动',
      value: '营销活动'
    }]
    
    this.rewardTypeName = [
      {
        name: '基础奖励',
        value: '老友汇佣金'
      },{
        name: '新用户首笔交易奖励',
        value: '老友汇新户奖励'
      },
      {
        name: '下级代理奖励',
        value: '老友汇下级佣金'
      },
      {
        name: '下级代理返上级新户首笔奖励',
        value: '老友汇新户奖励'
      },
      {
        name: '秒贴活动-签约奖励',
        value: '签约奖励'
      },
      {
        name: '秒贴活动-新交易奖励',
        value: '首笔交易奖励'
      }
    ]

    this.state = {
      isLoading: true,
      hasMore: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
    this.pageNum = 1
  }
  fetchList = async (payload) => {
    const {dispatch} = this.props
    const data = await dispatch({
      type:'count/listVserver',
      payload
    })
    return data

  }


  // componentDidMount() {
  //   // you can scroll to the specified position
  //   // setTimeout(() => this.lv.scrollTo(0, 120), 800);
  //   const {dispatch} = this.props
  //   const yeildTestVlaue = dispatch({
  //     type: 'count/testYieldVlaue'
  //   })
  //   console.log(yeildTestVlaue, 'yeildTestVlaueyeildTestVlaue')
  //   const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
  //   // simulate initial Ajax
  //   setTimeout(() => {
  //     // genData();
  //   // console.log(sectionIDs, rowIDs)
      
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(dataaa.data.items),
  //       isLoading: false,
  //       height: hei,
  //       hasMore: dataaa.data.items.length < datalenth ? true : false

  //     });
  //   }, 600);
  // }
   
  componentDidMount(){
    this.fetchList({pageNum: this.pageNum, pageSize: 10}).then(res=>{
      // console.log(loading, 'dva-loading')

      this.setState({
        isLoading: false,
        hasMore: this.pageNum < res.totalPages

      });
    })

  }
  getRewardName(type){
    for (const value of this.rewardTypeName) {
      if(value.name === type){
        return value.value
      }
      return '---'
    }

  }
  
  aa(type){
    return this.bizTypeName.filter((value)=>{
      // console.log(value)
      return value.name === type
    })
  }
  getBizTypeName(type){
    for (const value of this.bizTypeName) {
      if(value.name === type){
        return value.value
      }
      return '---'
    }

  }
  // componentWillReceiveProps(props){
  //   const { listViewValve} = props
  //   this.dataSource = listViewValve
  // }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
  
    // const data = 
    //         [
    //           {"companyName":"ddd","orderTime":666,"rewardAmount":800,"bizTypeName":"秒贴","rewardTypeName":"基础奖励"},
    //           {"companyName":"ddd7","orderTime":6667,"rewardAmount":8007,"bizTypeName":"秒贴7","rewardTypeName":"基础奖励7"},
    //           {"companyName":"ddd6","orderTime":6666,"rewardAmount6":8006,"bizTypeName":"秒贴6","rewardTypeName":"6基础奖励"},
    //         ]
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log('this.state.isLoading', this.props, this.state);
    
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.pageNum++
    // console.log('this.state.hasMore', this.state.hasMore);
    const {listViewVpage} = this.props
    // console.log('reach end', event);
    this.setState({ isLoading: true });
    this.fetchList({pageNum: this.pageNum, pageSize: 10}).then(res=>{
      console.log(res,this.pageNum, 'res')
      this.setState({ 
        isLoading: false,
        hasMore: this.pageNum < res.totalPages 
      });

    })
    // setTimeout(() => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(dataaa.data.items),
    //     isLoading: false,
    //     hasMore: dataaa.data.items.length < datalenth ? true : false

    //   });
    // }, 1000);
  }

  render() {
    const row = (data) => {
      // console.log(loading, 'loadingloadingloading')
      return (
        <div key={data.companyName} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '30px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          ></div>
          <div style={{ height:'120px', padding: '15px 0' }}>
            {/* <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" /> */}
            {/* <div className="rewardType">
              <span className="title" >{this.getRewardName(data.rewardTypeName)}</span>
              <span className="money">{`+${data.rewardAmount}`}</span>
            </div> */}
            <Flex justify="between">
              <span className="" >{this.getRewardName(data.rewardTypeName)}</span>
              <span className="">{`+${data.rewardAmount}`}</span>
            </Flex>
            {/* <Flex justify="between">
              
              <span>300</span>
              <span>300</span>
              <span>300</span>
            </Flex> */}
            <div className="bizTypeName">
                <p >{this.getBizTypeName(data.bizTypeName)}</p>
                <p >{data.companyName}</p>
                <p >{data.orderTime}</p>
            </div>
          </div>
        </div>
      );
    };
    // console.log(this.state.dataSource, 'dataSource')
    const {listViewValve} = this.props
    this.dataSource = this.dataSource.cloneWithRows(listViewValve)
    return (
      <ListView
        ref={el => this.lv = el}
        // useBodyScroll
        dataSource={this.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        // )}
        // renderBodyComponent={() => <MyBody />}
        renderRow={row}
        // renderSeparator={separator}
        style={{
          minHeight: '500px',
          overflow: 'auto',
        }}
        // pageSize={1}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}