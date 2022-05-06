import { useState, useEffect } from 'react';
import './App.scss';
import Music from './container/Music';
import Draggable from 'react-draggable';
import Typewriter from 'typewriter-effect';

import Club from './artifacts/contracts/Privateclub.sol/Privateclub.json';
import { ethers } from 'ethers';

//import soundOn from './img/soundOn.gif'
//import GiSoundOff from 'react-icons/gi'
import walletCoBtn from './img/walletco.png';
import payBtn from './img/pay.png';
import shareBtn from './img/share.png';
import getInBtn from './img/inside.png'
import continueBtn from './img/CONTINUE.png'




const clubAddress = '0x4c452505E5Eb671B0e53D7aFd1f8d292101900A3';


function App() {

  const [addressList, setAddressList] = useState();
  //const isConnected = Boolean(accounts[0]);
  const [mapAddress, setMapAddress] = useState();

  const [addy, setAddy] = useState('Connect your wallet');
  const [vip, setVip] = useState();
  const [pageToggled, isPageToggled] = useState(true)
  const [page2Toggled, isPage2Toggled] = useState(true)
  const [ethBalance, setEthBalance] = useState('')

  useEffect(() => {
    fetchVip();
    setTimeout(setAddy(window.ethereum.selectedAddress), 5000)
    
  }, [])

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    isVip();

  }

  async function fetchVip() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(clubAddress, Club.abi, provider);
      try {
        const data = await contract.getVipList();
        setAddressList(data);
        const contract_balance = await contract.getBalance();
        setEthBalance(`${contract_balance/1000000000000000000} rETH`)
        //setEthBalance(ethers.utils.formatEther(balance));

      }
      catch(err) {
        console.log(err);
      }
    }
  }

async function payoffReact() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(clubAddress, Club.abi, signer);
    
      try {
        
        const transaction = await contract.payoff({
          gasLimit: 100000,
          value: ethers.utils.parseEther("0.03")
        });
        await transaction.wait();
        fetchVip();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function withdrawReact() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(clubAddress, Club.abi, signer);
      
      try {      
      const transaction = await contract.withdraw();
      await transaction.wait();
      } catch (err) {
      console.log(err);
      }
    }
  }

  function isVip() {
    const test = addressList.map(e  => e.toLowerCase())
    if (test.some(e => e == addy) == true) {
      setVip(true);
    } else {
      setVip(false);
    }
  }

  function fetchAddress(){   
      const dataAddresss = addressList.map( (e,n) => 
        <p key={n}>{e}</p>
      )
      setMapAddress(dataAddresss);
  }

  

    function handleClick() {
        isPageToggled(false);
        
        
    }

    function handleClick2() {
      isPage2Toggled(false);
      fetchAddress();
      isVip();
      setAddy(window.ethereum.selectedAddress)
  }

  const randomAddress = ['0x7C015232Ff2902Ee6307061954a521CC1c49c6cb', '0x88093c89AC7CF5293cf7F5619B5804aF07C85949','0x475c5f6C772C7B0CfbfE5881dF568a539cF80dd5' , '0x64F6FA67124DD619467d4dac555B59c75A1F666D', '0x5591f4aE73E76c513d2CFD818F7f2090509dcD9E', '', '0x6025c7A5bBD031Ec1956ad7783867fc5e7bd1B35', '0xcD49f2958FA3E6A41903Ad19Da54697a169015C2']
  

  return (
    <div className="App">    
      <div className='nav'>
        {/* <img src={soundOn} alt="sound" className='sound-on' /> */}
        <Music />
        
        <button onClick={()=> requestAccount()} className='walletCo'>
        <img src={walletCoBtn} alt="walletCo"/>
        </button>

      </div>

        <div className={`welcome-page ${pageToggled? '' : 'invisible'}`}>
        <div className="welcome-text">
          <h2 className='title'>
            We are in 2070, Metamask is required to access any night club
          </h2>
          
          <p>Don't worry it's very simple!</p>

            <div className="text-desc">
              <img src={payBtn} alt="exemple-pay" />
              <p>Get in the VIP list for 0.03 rETH</p>
            </div>

            <div className="text-desc text-bug">
              <img src={shareBtn} alt="exemple-share" />
              <p>All the VIP listed will earn a portion of the contract balance, based on how many people are on the list</p>
            </div>

            <div className="text-desc">
              <img src={getInBtn} alt="ex-get-in" />
              <p>Once you're on the VIP list, clik here to be sucked through your screen and teleported into this dimension</p>
            </div>




          
          
          <button onClick={handleClick}>
          <img src={continueBtn} alt="continue" />
          </button>
          </div>
        </div>

        <div className={`welcome-page page2 ${page2Toggled? '' : 'invisible'}`}>
          <div className="welcome-text">
          <h2 className='title'>
            How to interact with the contract ?
          </h2>
          <p>1- <a href='https://metamask.io/download/'>Install metamask</a></p>
          <p>2- <a href="https://www.herongyang.com/Ethereum/MetaMask-Extension-Add-Ropsten-Test-Network.html">Set it to Ropsten network</a></p>
          <p>3- <a href="https://faucet.egorfine.com/">Get some test rETH</a></p>

            <p>Data may not load if you're not connected to the Ropsten network</p>
          <button onClick={handleClick2}>
              <img src={continueBtn} alt="continue" />
          </button>
          </div>

        </div>


      <Draggable handle=".status-bar">
      <div  className={`drag-cards ${page2Toggled? 'invisible' : ''}`}>
        <div className="status-bar">
          <div className="window-name">VIP LIST</div>
          <div className="close-btn">X</div>
        </div>
        <div className="Console">
        <p>{mapAddress}</p> 
        <p>
        <Typewriter
          options={{
            strings: ['Pay 0.03 rETH to be a VIP'],
            autoStart: true,
            loop: true,
          }}
        />
        </p>
        </div>
        <div className='card-footer'>
        <button onClick={()=> withdrawReact()}>
          <img src={shareBtn} alt="share" />
          </button>
          <p>{ethBalance} </p>
        </div>
      </div>
    </Draggable>

    
    <Draggable handle=".status-bar">
      <div  className={`drag-cards2 ${page2Toggled? 'invisible' : ''}` }>
        <div className="status-bar">
          <div className="window-name">Waiting List ... </div>
          <div className="close-btn">X</div>
        </div>
        <div className="Console">
        <span className='red'><p>{addy}</p></span>
         {
           randomAddress.map( (e,n) => 
           <p key={n}>{e}</p>
         )
         }
      
        </div>
        <div className='card-footer2'>
        <button onClick={vip? '' : () => payoffReact()} className={`${vip?'not-vip' : '' } `} >
                <img src={payBtn} alt="payoffBtn" />
            </button>

            <button className={`${vip?'' : 'not-vip' } `} >
                <img src={getInBtn} alt="getIn" />
              </button>
        </div>
      </div>
    </Draggable>

    
    
    </div>
  );
}

export default App;
