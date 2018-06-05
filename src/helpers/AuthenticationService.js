class AuthenticationService{
  constructor(){
    if(!AuthenticationService.instance){
      this.authState = null
      this.registeredCallbacks = []
      AuthenticationService.instance = this
      return AuthenticationService.instance
    }
    else {
      return AuthenticationService.instance
    }
  }
  setAuthState(val){
    this.authState = val
    this.registeredCallbacks.forEach(cb => cb(this.authState))
  }
  getAuthState(){
    return this.authState
  }
  registerEvent(cb){
    this.registeredCallbacks.push(cb)
  }
  deRegisterEvent(cb){
    this.registeredCallbacks = this.registeredCallbacks.filter(ele => ele !== cb)
  }
}

export default new AuthenticationService()
