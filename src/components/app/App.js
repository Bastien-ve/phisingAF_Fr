
import logo from '../../img/logo.png';
import outlookWebApp from '../../img/outlookWebApp.png';
import arrow from '../../img/arrow.png';
import {useState , useEffect} from 'react'
import * as PhishingAPI from "../../services/PhishingAPI";


function App() {
  const [username,setUsername]=useState('');
  const [errorMsg,setErrorMsg]=useState('');
  const [connectionCount,setConnectionCount]=useState(0);
  const [token,setToken]= useState('');

  const initialLoad = () => {
    console.log('initialLoad')
    const tempToken = window.localStorage.getItem("token")
    const count = window.localStorage.getItem("count")
    if (tempToken !== null){
      setToken(tempToken);
    }
    if (count !==  null ){
      setConnectionCount(count)
    }
  }
  useEffect(initialLoad, [])

  const handleUsernameChange = (event) =>{
    setUsername(event.target.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    //check data is ok 
    if (username.length<=0){
      setErrorMsg('vous devez rentrer une adresse de messagerie');
    }else{
      setErrorMsg('')
      //check mail is an asbl's mail 
      const regex =new RegExp('^[a-z]+@accueil-familial.be');
      if (!regex.test(username)){
        setErrorMsg('vous devez rentrer une adresse de messagerie correcte');
      }else{
    
    const user = {   
        name: username,
        mdp : "mdp",         
    }
    PhishingAPI.connection(user).then((data) =>{
      //catch token 
       //setToken(data.data.token)
       window.localStorage.setItem("token",data.data.token)
    
       //catch connectionCount
       setConnectionCount(data.data.count);
       //save connectionCount on localStorage
       window.localStorage.setItem("count",data.data.count)
       console.log(connectionCount)
      
    })
    //and save on localStorage
    setToken(window.localStorage.getItem("token"))   
  }}
  
  }
  const connectionForm = <div className='mouse'>
   
  <div className='sidebar '>
    <div className='owaLogoContainer'>
    <img className='owaLogo' src={logo} alt="logo" />
    </div>
  </div>
  
  <div className='logonContainer ' >
    <div className='logonDiv'>
    <div className='signInImageHeader'>
    <img className='mouseHeader' src={outlookWebApp} alt="outlookWebApp" />
    </div>
    <form  method="post"  autoComplete='off'>
      
      <div className=' signInInputLabel'>Adresse de messagerie :</div>
       <div >
         <input  type="text" id="name" name="name" 
           className='signInInputText' 
          onChange={handleUsernameChange}
          value={username}
          /><br></br>
       </div>
       
       <div className=' signInInputLabel'>Mot de passe :</div>
       <div  >
         <input type="password" id="mdp" name="mdp" 
         className='signInInputText'
         /><br></br>
       </div>
       <div>
         <input className='signInputText'   style={{display : 'none' }}/>
       </div>
       <div id="expltxt" className='signInExpl'>{errorMsg}</div>
       <div className='signInEnter' onClick={onSubmit}>
        <div className='signinbutton' role="button"></div>
          
            <img className='imgLnk' src={arrow}  alt="arrow"/>
             <span className='signInTxt' > se connecter </span> 
       
       </div>
    </form>
    </div>
  </div>
  </div>
const explain = <div>
<h2>Vous venez de vous faire pièger !!</h2>
<h3>Vous avez donner vos identifiants à un site malveillant</h3>
<h4>cette personne peut maintenant accéder à des données protégées </h4>
<p>Vous êtes déjà {connectionCount}</p>

</div>
    
    if (token !== ''){
      return (explain);
    }else{
       return (connectionForm);
    }
}

export default App;
