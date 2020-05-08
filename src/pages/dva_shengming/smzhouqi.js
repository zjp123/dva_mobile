import React from 'react'
import {connect} from 'dva'

@connect(({count, dispatch})=>({
  yieldValue: count.yieldValue,
  dispatch,
  count
}))
class SmZhouqi extends React.Component{

  constructor(props){
    super(props)
    this.fetchList()
    this.state = {
      list: []
    }
  }
  fetchList = async (payload) => {
    const {dispatch} = this.props
    const data = await dispatch({
      type:'count/testYieldVlaue'
    })
    return data

  }
  // fetchList (){
  //   const {dispatch} = this.props
  //   return dispatch({
  //     type:'count/testYieldVlaue'
  //   })
 
  // }
  // componentDidMount(){
  //   this.fetchList().then(res=>{
  //     const {data} = res
  //     console.log(res, 'resssss')
  //     this.setState({
  //       list: [...data]
  //     })
  //   })
    
  // }
  render(){
    console.log(this.props, 'render')
    return(
      <div>
        lallalalal{JSON.stringify(this.props.yieldValue)}
      </div>
    )
  }
}


export default SmZhouqi
