import React, { Component } from 'react';
import {
  List, InputItem, Button, Toast,
} from 'antd-mobile';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import DocumentMeta from 'react-document-meta';
// import classnames from 'classnames';
// import SmsButton from '../../../../../common/components/SmsButton';
// import { basename } from '../../../routes/config';

// import { getLocationParams, formatAmount } from '../../../../../utils/perfect';

// import PropTypes from 'prop-types';
// import Button from '../../../../../components/Button';
// import Layout from '../Layout';
import style from './tixian.less';

const { Item } = List;

@connect(({ zpmUserAccount }) => ({
  userInfo: zpmUserAccount.userInfo,
  balanceInfo: zpmUserAccount.balanceInfo,
  boundCardList: zpmUserAccount.boundCardList,
}))
class Withdrawal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    balanceInfo: PropTypes.object.isRequired,
    boundCardList: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.meta = {
      title: '智付-提现',
    };
    const { accountId, accountType, token } = getLocationParams() || {};
    this.accountId = accountId;
    this.accountType = accountType;
    this.token = token;
    this.money = React.createRef();
    this.iphone = React.createRef();
    this.account = React.createRef();
    this.yanzhengma = React.createRef();
    this.state = {
      selectValue: null,
      isClick: false, // 是否激活错误提示
      ismoneyActive: false, // 如果修改输入框值，激活错误提示
      iscodeActive: false, // 如果修改输入框值，激活错误提示
      tixianedu: 0,
      errlist: [
        { type: 'money', value: null },
        { type: 'yanzheng', value: null },
        { type: 'accont', value: null },
      ],

    };
  }

  componentDidMount() {
    this.fetchUserInfo();
    this.fetchBalance();
    this.fetchCardInfo();
  }

  fetchBalance = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'zpmUserAccount/fetchBalance',
      payload: {
        token: this.token,
        accountId: this.accountId,
      },
    });
  }

  fetchCardInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'zpmUserAccount/fetchBoundCards',
      payload: {
        token: this.token,
        accountId: this.accountId,
      },
    });
  }

  fetchUserInfo = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'zpmUserAccount/fetchUserInfo',
      payload: {
        token: this.token,
      },
    });
  };

  onSelectChange = (e) => {
    const { errlist } = this.state;
    const newArr = errlist.filter(v => v.type !== 'accont');
    this.setState({
      selectValue: e.target.value,
      errlist: [
        ...newArr,
        { type: 'accont', value: e.target.value },
      ],
    });
  };

  tixianHandleClick=() => {
    const { selectValue, errlist, tixianedu } = this.state;
    // const money = this.money.current.state.value;
    const { dispatch, history } = this.props;
    // console.log(this.account, 'account')

    // const account = this.account.current.value
    const yanzhengma = this.yanzhengma.current.state.value;
    const isHaveErr = errlist.some(item => item.value === null || item.value === '' || item.value === 0);
    if (isHaveErr) {
      const arr = [
        { type: 'money', value: tixianedu },
        { type: 'yanzheng', value: yanzhengma },
        { type: 'accont', value: selectValue },
      ];

      this.setState({
        isClick: true,
        errlist: [...arr],
      });
      return;
    }

    const paramas = {
      amount: tixianedu,
      verifyCode: yanzhengma,
      inAccountId: selectValue,
      outAccountId: this.accountId,
    };
    dispatch({
      type: 'zpmUserAccount/withdrawal',
      payload: paramas,
    }).then(() => {
      // Message.success('发起提现成功！');
      Toast.success('发起提现成功！', 1);
      history.push(`${basename}/ucenter?token=${this.token}`);
    }).catch(() => {
      Toast.fail('发起提现失败！', 1);
    });
  };

  moneyChangeHandle = (value) => {
    // console.log('bbb')
    const { errlist } = this.state;
    console.log(value, 'moneyChangeHandlemoneyChangeHandle');
    const newArr = errlist.filter(v => v.type !== 'money');
    // const money = this.money.current.state.value;
    this.setState({
      tixianedu: value,
      ismoneyActive: true,
      errlist: [
        ...newArr,
        { type: 'money', value },

      ],
    });
  };

  codeChangeHandle = (value) => {
    // const code = this.yanzhengcode.current.state.value;
    const { errlist } = this.state;
    const newArr = errlist.filter(v => v.type !== 'yanzheng');
    // console.log('aaaaaa')
    this.setState({
      iscodeActive: true,
      errlist: [
        ...newArr,
        { type: 'yanzheng', value },
      ],
    });
  };

  typefilter(type) {
    const { errlist } = this.state;
    for (let index = 0; index < errlist.length; index++) {
      if (errlist[index].type === type) {
        return errlist[index].value === null || errlist[index].value === '' || errlist[index].value === 0;
      }
    }
  }

  render() {
    const {
      selectValue, isClick, tixianedu, ismoneyActive, iscodeActive,
    } = this.state;
    const {
      userInfo, boundCardList, balanceInfo, dispatch,
    } = this.props;
    const { available } = balanceInfo || {};

    const { mobile } = userInfo || {};
    const oldProps = {
      checkType: 'ZPM_WITHDRAW',
    };
    const rate = 4;
    // console.log(tixianedu, 'this.money.current');
    const money = Number(tixianedu);
    const finalAmount = (money - rate).toFixed(2);
    const disabled = !boundCardList || boundCardList.length < 1
      || (this.accountType === 'HELIPAY' && finalAmount < 0)
      || available < money;
    // console.log(this.state, 'sjdjsjjjsdj');
    // console.log(money, 'this.money.current.state.value');
    return (
          <div id="listWrap">
            <List className={style['withdrawal-list']}>
              <div>
                <Item className={style.hei} arrow="horizontal">
                  <select ref={this.account} className={selectValue ? '' : style.listColor} defaultValue={null} onChange={this.onSelectChange}>
                    <option value={null}>请选择账户</option>
                    {/* <option value={null}>请选择账户</option>
                    <option value="1">Html select element</option>
                    <option value="2">Unable to select</option>
                    <option value="3">option 3</option> */}
                    {/* {this.formatCardOptions(boundCardList)} */}
                    {boundCardList.map(options => (
                      <option key={options.id} value={options.id}>
                        {options.bankName}
                       （
                        {options.accountNo}
                        ）
                      </option>
                    ))}
                  </select>
                </Item>
                <div className={style.iconstyleCard} />

              </div>
              {
                  (isClick && this.typefilter('accont')) ? (<p className={style.errtip} style={{ color: 'red' }}>请选择账户</p >) : null
              }

              <div className={classnames(style.hei, style.pos)}>
                <InputItem
                  moneyKeyboardAlign="left"
                  ref={this.money}
                  placeholder="请输入提现金额"
                  type="number"
                  onChange={this.moneyChangeHandle}
                />
                <div className={style.iconstyleMoney} />
                <span className={style.dingwei} style={{ paddingRight: '10px', color: '#1890FF', fontSize: '16px' }}>全部提现</span>

              </div>
              {
                  ((isClick || ismoneyActive) && this.typefilter('money')) ? (<p className={style.errtip} style={{ color: 'red' }}>请输入提现金额</p >) : null
              }
              {
                  this.accountType === 'YILLION'
                    ? null
                    : (
                      <p className={style.helibaoDrawal}>
                        提现手续费：￥4
                        <span>
                          实际到账：￥
                          {finalAmount > 0 ? formatAmount(finalAmount) : 0}
                        </span>
                      </p >
                    )
              }
              <div className={classnames(style.hei, style.pos)}>
                <InputItem
                  ref={this.iphone}
                  value={mobile}
                  type="phone"
                  editable={false}
                />
                <span
                  className={style.dingwei}
                  style={{ paddingRight: '10px', color: '#1890FF', fontSize: '16px' }}
                >
                  <SmsButton
                    needMobile={false}
                    dispatch={dispatch}
                    extraProps={oldProps}
                    actionType="zpmUserAccount/fetchOldPhoneCode"
                  />
                </span>
                {/* <span className={style.dingwei}
                style={{ paddingRight: '10px', color: '#1890FF', fontSize: '16px'
                }}>获取验证码</span> */}
                <div className={style.iconstylePhone} />

              </div>
              <div className={classnames(style.hei, style.pos)}>
                <InputItem
                  className={style.hei}
                  ref={this.yanzhengma}
                  placeholder="请输入验证码"
                  type="number"
                  onChange={this.codeChangeHandle}
                />
                <div className={style.iconstyleCode} />

              </div>
              {
                  ((isClick || iscodeActive) && this.typefilter('yanzheng')) ? (<p className={style.errtip} style={{ color: 'red' }}>请输入验证码</p >) : null
              }

            </List>
            <Button
              onClick={this.tixianHandleClick}
              disabled={disabled}
              style={{ marginTop: '50px' }}
              type="primary"
              size="large"
            >
              确定提现
            </Button>
          </div>
    );
  }
}

export default Withdrawal;