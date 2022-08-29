import React from 'react';
import { Avatar, Button, Drawer } from '@mui/material';
import { signOut } from 'firebase/auth';
import { AiFillDelete } from 'react-icons/ai'

import { useCryptoContext } from '../../context/CryptoContext';
import { auth, db } from '../../firebase/firebase';
import { useAppSelector } from '../../store/hooks';
import { addedCoinsSelector } from '../../store/watchList/watchList';
import styles from './sidebar.module.scss'
import { RoundNumber } from '../../utils/RoundNumber';
import { doc, setDoc } from 'firebase/firestore';
import { CoinType } from '../../types/types';

type Anchor = 'right';
const anchor = 'right'

const sx = {
  avatar: {
    height: 38,
    width: 38,
    marginLeft: 5,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D"
  },
}

export const UserSidebar = () => {
  const user = useAppSelector(state => state.user.user)
  const watchList = useAppSelector(state => state.watchList.watchList)
  const addedCoins = useAppSelector(addedCoinsSelector)
  console.log(addedCoins)
  const {setAlert, symbol} = useCryptoContext()

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successfull !",
      });
  
      toggleDrawer(anchor, false);
    }
    catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      setAlert({
        open: true,
        message: message,
        type: 'error'
      })
    }
  };

  const removeFromWatchlist = async(coin: CoinType) => {
    if (user) {
      try {
        const coinRef = doc(db, "watchlist", user.uid)
        await setDoc(coinRef, 
          { coins: watchList.filter((wish) => wish !== coin?.id)},
          { merge: true }
        )
        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        });
      }
      catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        setAlert({
          open: true,
          message: message,
          type: 'error'
        })
      }
    }
  }

  return (
    <div>
      <Avatar 
        onClick={toggleDrawer(anchor, true)}
        sx={sx.avatar}
        src={user?.photoUrl}
        alt={user?.displayName}
      />
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <div className={styles.sidebar__content}>
          <div className={styles.sidebar__profile}>
            <Avatar
              sx={{ width: 76, height: 76, background: '#EEBC1D' }}
              src={user?.photoUrl}
              alt={user?.displayName}
            />
            <span className={styles.sidebar__name} >{user?.displayName}</span>
            <div className={styles.sidebar__list}>
              <span className={styles['sidebar__list-title']}>
                Watchlist
              </span>
              {addedCoins.map(coin => 
                <div key={coin.id} className={styles.sidebar__coin}>
                  <span>{coin.name}</span>
                  <span style={{ display: "flex", gap: 8 }}>
                    {symbol}{" "}
                    {RoundNumber(coin.current_price.toFixed(2))}
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      fontSize="16"
                      onClick={() => removeFromWatchlist(coin)}
                    />
                  </span>
                </div>  
              )}
            </div>
            <Button
              variant="contained"
              sx={sx.logout}
              onClick={logOut}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
