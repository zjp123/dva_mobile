import React from 'react'

export default class FunCom extends React.Component{

  componentWillReceiveProps(props){
    console.log(props, 'ppppp')
  }
  render(){
    const {hookActiveaa} = this.props
    return (
    <div>这是测试 hook {hookActiveaa}</div>
    )
  }
}