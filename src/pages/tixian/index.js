import { List, InputItem, Button, Toast, Picker } from 'antd-mobile';
import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import './tixian.less'

const Item = List.Item;
const Brief = Item.Brief;

// @createForm({
  
//   onFieldsChange(props, fields) {
//     console.log('onFieldsChange', props);
//     props.dispatch({
//       type:'tixian/setHelibao',
//       payload: 800
//     })
//   },
// })
// @connect(({tixian}) => {
//   return {
//     helibao: tixian.helibao
//   };
// })
class Tixian extends React.Component {
  
  constructor(props){
    super(props)
    this.accmoney = 1000
    this.zhanghu = React.createRef()
    this.state = {
      money:0,
      helibao:0,
      district:[
        {
          label: '2013',
          value: '2013',
        },
        {
          label: '2014',
          value: '2014',
        }
      
      ]
    }
    
  }
  tixianHandleClick = () => {
    const {validateFields, getFieldValue} = this.props.form
    validateFields((err, value)=>{
      console.log(err, value, 'validateFieldsvalidateFieldsvalidateFields')
    })
  }
  pickerChange= (v) => {
    console.log(v, 'pickerChange')
  }
  pickerOk =(v) => {
    console.log(v, 'pickerOk')

  }
  onPickerChangeHandle=(v) => {
    console.log(v, 'pickeonPickerChangeHandlerOk')

  }
  validatordiy = (rule, value, callback) => {
    console.log(value, 'valuevalue')
    if(value > 1000 ){
      callback('不能大于')
    }
    callback()

  }
  alltixian = () => {
    // this.accmoney
    // console.log(this.zhanghu.current, 'ref curennntntn')
    // this.zhanghu.current.state.value = 99
    // this.zhanghu.current.updater.enqueueForceUpdate(99)
    // console.log(this.props, 'this.propspspspp')
    this.props.form.setFieldsValue({
      money: 100
    })
  }
  hamdleFieldsChange =(value) => {
    console.log(value, 'hamdleFieldsChangehamdleFieldsChange')
  }
  handleMoneyChange = (value)=>{
    // console.log(value, 'handleMoneyChangehandleMoneyChange')
  }
  
  
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div className="listWrap">
      
      <List className="my-list">
        <div>
          <Picker 
            className="forss"
            data={this.state.district} 
            extra=' '
            cols={1} 
            onChange={this.pickerChange}
            onPickerChange={this.onPickerChangeHandle}
            onOk={this.pickerOk}
            {...getFieldProps('account', {
                // initialValue: 99,
                rules: [{required: true, message: '请选择账户 ' }]
            })} 
          >  
            <List.Item arrow="horizontal">请选择收款方账户</List.Item>

          </Picker>

          {getFieldError('account')&&(
            <div className="accountError">
              <span className="tipicon">!</span>
              <span>请选择收款方账户</span>
            </div>
          )}
          {/* <span className="iconstyle"  /> */}

        </div>
        <div className="hei pos">
          <InputItem 
            {...getFieldProps('money', {
              // initialValue: 99,
              rules: [
                {required: true, message: '请输入提现金额 ' },
                {
                  validator:(rule, value, callback ) => 
                  {
                    return this.validatordiy(rule, value, callback)
                  }
                }
              ]
            })} 
            // vlaue={this.state.money}
            // onFieldsChange={this.hamdleFieldsChange}
            // onChange={this.handleMoneyChange}
            ref={this.zhanghu}
            placeholder="请输入提现金额" 
            type="number" 
          />
          {getFieldError('money')&&(
            <div className="accountError">
              <span className="tipicon">!</span>
              <span>{getFieldError('money')}</span>
            </div>
          )}
          {/* <div className="iconstyle"  /> */}
          <span onClick={this.alltixian} className='dingwei' style={{paddingRight:'10px', color: '#1890FF'}}>全部提现</span> 
          <div>合理包：{this.props.helibao}</div>
        </div>
      </List>
      <Button onClick={this.tixianHandleClick} style={{marginTop: '50px'}} type="primary" size="large">确定提现</Button>
    </div>);
  }
}


export default connect(({tixian}) => {
  return {
    helibao: tixian.helibao
  };
})(createForm({
  
  onFieldsChange(props, {money}) {
    console.log('onFieldsChange', money);
    props.dispatch({
      type:'tixian/setHelibao',
      payload: money.value
    })
  },
})(Tixian));
// const TixianWrapper = ;

// export default Tixian
// export default NewTixian