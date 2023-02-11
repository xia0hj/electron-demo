const App = ():JSX.Element => {

  const testClick = ()=>{
    window.nativeApi.test();
  }
  
  return <button onClick={testClick}>click</button>
}
export default App;