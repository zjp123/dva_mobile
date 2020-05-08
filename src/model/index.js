import {propmissTest, testYeildVlaue, listVserver} from '../service/server'


const model = {
    namespace: 'count',
    state: {
      zjp:'ctt',
      testData:[],
      yieldValue:[],
      listViewValve:[],
      listViewVpage:null,
      defarr: [
        {
          "companyName":"psksdmkmf","orderTime":30888,
          "rewardAmount":800,"bizTypeName":"秒贴","rewardTypeName":"基础奖励"
        },
        {
          "companyName":"ggghhhhwwwr","orderTime":"2020/12/12",
          "rewardAmount":60000,"bizTypeName":"秒贴营销活动","rewardTypeName":"基础奖励"
        }
      ]
    },
    reducers: {
      add  (state) {console.log(state,'kkkkk'); return Object.assign({},state, {zjp: state.zjp + 'pppp'}) },
      minus(count) { return count - 1 },
      yeildtest(state, {payload = {}}) {

        return {
          ...state,
          yieldValue:[...state.yieldValue, ...payload],
        }
      },
      listVvalureducer(state, {payload = {}}) {
        console.log(payload, 'listVvalureducer')
        return {
          ...state,
          listViewValve:state.listViewValve.length === 0 ? 
             [...state.listViewValve, ...payload.items] :
             [...state.listViewValve, ...payload.items, ...state.defarr],
          listViewVpage:payload.totalPages
        }
      }
    },
    effects:{
      *propmissTest(action, {put,call}){
        return yield call(propmissTest)
      },
      async propmissTest2(action, {put,call}){
        const res = await Promise.all([propmissTest(), propmissTest()]);
        console.log(res);
        return res;
      },
      *testYieldVlaue(action, {put,call}){
        const { data } = yield call(testYeildVlaue)
        console.log(data.data, 'testYieldVlaue.testYieldVlaue')
        
        yield put({type: 'yeildtest', payload: data.data})
        return data
      },
      *listVserver({payload = {}}, {put,call}){
        const { data } = yield call(listVserver, payload)
        
        console.log(data.data, 'listVserverlistVserver-listVserver')
        
        yield put({type: 'listVvalureducer', payload: data.data})
        return data.data
      }
      
    }
  }

  // {"code":"1","msg":"success",
  //           "data":{"pageNum":869,"pageSize":534,"totalPages":328,"totalCount":514,
  //           items:[{
  //             "companyName":"ddd","orderTime":"2020/12/12",
  //             "rewardAmount":800,"bizTypeName":"秒贴","rewardTypeName":"基础奖励"
  //           },
  //           {
  //             "companyName":"skksdk","orderTime":"2020/12/12",
  //             "rewardAmount":60000,"bizTypeName":"秒贴营销活动","rewardTypeName":"新用户首笔交易奖励"
  //           }]}}

//   {
//     "code":200,
//     "message":"ok",
//     "data":[{"name":"zhangsan"}, {"name":"lisi"}]
// }

export default model