import React from 'react'
import { connect } from "dva"; 


// export default function User() {
//     return <h1>Hello, 这是用户页面</h1>;
//   }

  class User extends React.PureComponent{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
       

    }
    render(){
        return (
            <div>
                <h1>Hello, 这是用户页面{this.props.zjp}</h1>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        zjp: state.zjp.user, //这里的example表示后面用this.props.example获取state（根节点）中exmpale命名空间（model的example.js中的state所有数据）的数据
    }
}

export default connect(mapStateToProps)(User)