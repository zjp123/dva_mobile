

const model = {
  namespace: 'tixian',
  state: {
    helibao:0,
    
  },
  reducers:{
    setHelibao(state, payload){
      console.log(payload, 'setHelibaosetHelibaosetHelibao')
      return {
        ...state,
        helibao:payload.payload
      }
    }
  },

}

export default model