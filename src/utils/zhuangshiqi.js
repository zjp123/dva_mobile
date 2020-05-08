function typeDec(target){
     
    return class dd extends target{
          constructor(props){
              super(props)
            //   console.log('aa', super.props)
            //   console.log('bb', target.typeHandle)
            //   let pathname = super.props.location.pathname
            //   console.log(pathname)
            //   console.log('pathnamebb:', pathname)
            //   if(pathname.length==1){
            //       pathname = pathname
            //   }else{
            //       pathname = pathname.slice(1)

            //   }
            //   super.props.typeHandle(pathname)
            console.log('装饰器执行了。。。')
          }
    }
      
      
    
}

export default typeDec