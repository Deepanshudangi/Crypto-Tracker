import React, {useState, useEffect} from 'react';
import CryptoContext from './crypto-context';
import { onAuthStateChanged } from "firebase/auth"; //from fb 
import { auth, db } from "../firebase";
import axios from "axios";
import { CoinList } from "../config/api";
import { onSnapshot, doc } from "firebase/firestore";


const CryptoProvider = (props) => {
    
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user?.uid); 
          var unsubscribe = onSnapshot(coinRef, (coin) => { 
            if (coin.exists()) {
              
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
    }, [user]);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => { 
          if (user) setUser(user);
          else setUser(null);
        });
        
    }, []);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        //console.log(data);
    
        setCoins(data);
        setLoading(false);
    };


    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");

        fetchCoins();
    }, [currency]);
    

    return (
        <div>
            <CryptoContext.Provider value = {{
                currency, symbol, coins, loading, alert, user, watchlist, setAlert, setCurrency
            }}> 
                {props.children}
            </CryptoContext.Provider>        
        </div>
    )
}

export default CryptoProvider
