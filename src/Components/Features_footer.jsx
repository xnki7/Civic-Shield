import React from 'react'
import Styles from './Features_footer.module.css';
import Card from './Card' 

const Features_footer = () => {
  return (
    <div className={Styles.featureFooter} >
        {/* <button className={Styles.featureBtn} >Announcements</button>
        <button className={Styles.featureBtn} >Lodge an FIR </button>
        <button className={Styles.featureBtn} >Mint an NFT </button> */}
        <Card name={'Announcements'} />
        <Card name={'Lodge an FIR'} />
        <Card name={'Mint an NFT'} />
        
    </div>
  )
}

export default Features_footer