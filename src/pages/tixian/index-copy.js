import { List, InputItem, Button, Toast } from 'antd-mobile';
import React from 'react';
import './tixian-copy.less'
import ErrorInputExample from  './errinput'

const Item = List.Item;
const Brief = Item.Brief;

class Tixian extends React.Component {
  
  constructor(props){
    super(props)
    this.money = React.createRef()
    this.iphone = React.createRef()
    this.yanzhengcode = React.createRef()
    this.account = React.createRef()
    
  }
  state = {
    disabled: false,
    selectValue:null,
    isClick: false,
    aaaa:'156***999998',
    ctthasError: false,
    cttvalue: '',
    errlist : [
      {type:'money', value:null},
      {type:'yanzheng', value:null},
      {type:'accont', value:null},
    ]
    
  }
  
  onSelectChange = (e) => {
    const newArr = this.state.errlist.filter(v=>{
      return v.type!=='accont'
    })
    this.setState({
      selectValue: e.target.value,
      errlist : [
        ...newArr,
        {type:'accont', value:e.target.value}
      ]
    })
  }
  tixianHandleClick=()=>{
    const {selectValue} = this.state
    const money = this.money.current.state.value
    // console.log(this.account, 'account')

    // const account = this.account.current.value
    const yanzhengcode = this.yanzhengcode.current.state.value
    const isHaveErr = this.state.errlist.some((v)=>{
      return v.value===null || v.value==='' || v.value===0
    })
    if(isHaveErr){
      const arr = [
        {type:'money', value:money},
        {type:'yanzheng', value:yanzhengcode},
        {type:'accont', value:selectValue},
      ]
  
      this.setState({
        isClick: true,
        errlist : [...arr]
      })
      return ;
    }
    
    
    console.log(this.money.current.state.value, 'money')
    console.log(this.yanzhengcode.current.state.value, 'yanzhengcode')
  }
  moneyBlur = (value) => {
    // console.log('bbb')
    const newArr = this.state.errlist.filter(v=>{
      return v.type!=='money'
    })
    setTimeout(()=>{},0)

    // const money = this.money.current.state.value
    console.log(newArr, value,  'newArrnewArrnewArr')

    this.setState({
      errlist:[
        ...newArr,
        {type:'money', value},
 
      ]
    })
  }
  yanzhengBlur= (value) => {
    // const code = this.yanzhengcode.current.state.value
    const newArr = this.state.errlist.filter(v=>{
      return v.type!=='yanzheng'
    })
    // console.log('aaaaaa')
    this.setState({
      errlist:[
        ...newArr,
        {type:'yanzheng', value},
      ]
    })
  }
  typefilter(type){
    const {errlist} = this.state
    for (const err of errlist) {
      if(err.type === type){
        return err.value===null || err.value==='' || err.value===0
      }
      
    }

  }
  cttonErrorClick = () => {
    if (this.state.ctthasError) {
      Toast.info('Please enter 11 digits');
    }
  }
  cttChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        ctthasError: true,
      });
    } else {
      this.setState({
        ctthasError: false,
      });
    }
    this.setState({
      cttvalue: value,
    });
  }
  moneyKeyDown(e){
    console.log(e.target.value, 'moneyKeyDownmoneyKeyDown')
  }
  render() {
    const {isClick, selectValue, aaaa} = this.state
    const isshow = isClick
    console.log(this.state, 'this.stateeeee')
    // console.log(this.state, 'this.rporprprprp')
    const {errlist} = this.state
    return (<div>
      
      <List className="my-list">
        <div>
          <Item className="hei" arrow="horizontal">
            <select 
            className={this.state.selectValue ? '' : 'listColor'} 
            defaultValue={null}
            ref={this.account}  
            onChange={this.onSelectChange}>
              <option value={null}>请选择账户</option>
              <option value="1">Html select element</option>
              <option value="2">Unable to select</option>
              <option value="3">option 3</option>
            </select>
            
          </Item>
          <div className="iconstyle"  />
        </div>
        {
            (isshow&&this.typefilter('accont'))?(<p className="errtip" style={{ color:'red'}}>请选择账户</p>):null
        }


        <div className="hei pos">
          <InputItem moneyKeyboardAlign="left" 
                     onChange={this.moneyBlur}
                     ref={this.money}  
                    //  onKeyDown={this.moneyKeyDown}
                     placeholder="请输入提现金额" 
                     type="number" />
          <div className="iconstyle"  />
          <span className='dingwei' style={{paddingRight:'10px', color: '#1890FF'}}>全部提现</span> 

        </div>
        {
            (isshow&&this.typefilter('money'))?(<p className="errtip" style={{color:'red'}}>请输入提现金额</p>):null
        }
        <p style={{textAlign:'right', paddingRight: '10px'}}>提现手续费：¥4 <span style={{marginLeft:'20px'}}>实际到账：¥199996</span></p>
        <div className="hei pos">
          <InputItem 
            ref={this.iphone} 
            value={aaaa}  
            // type="phone" 
            editable={false}
            disabled
          />
          <span className='dingwei' style={{paddingRight:'10px', color: '#1890FF'}}>获取验证码</span>
          <div className="iconstyle"  />

        </div>
        <div className="hei pos">
          <InputItem className="hei" 
                     onChange={this.yanzhengBlur}
                     ref={this.yanzhengcode} 
                     placeholder="请输入验证码"   
                     type="number" />
          <div className="iconstyle"  />     
        </div>
        {
            (isshow&&this.typefilter('yanzheng'))?(<p className="errtip" style={{color:'red'}}>请输入验证码</p>):null
        }
        {/* <div className="hei pos">
          <InputItem className="hei" 
                     type="nubmer"
                     placeholder="input your phone"
                     error={this.state.ctthasError}
                      onErrorClick={this.cttonErrorClick}
                      onChange={this.cttChange}
                      value={this.state.cttvalue}   
                      />
          <div className="iconstyle"  />     
        </div> */}
        <ErrorInputExample />

      </List>
      <Button onClick={this.tixianHandleClick} style={{marginTop: '50px'}} type="primary" size="large">确定提现</Button>
    </div>);
  }
}

export default Tixian