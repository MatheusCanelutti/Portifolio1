import {useState, useEffect} from 'react'

import Styles from './Message.module.css'

function Message({type, msg}){

    const [visible, setVisible] = useState(false);

    useEffect(() => {

    if(!msg)  {  // se for false termina, não exibe nada
        setVisible(false)
        return
    }

    setVisible(true) // for verdade exibe e mostra o timer

    const timer = setTimeout(() => {
        setVisible(false)
    }, 3000)

    return () => clearTimeout(timer);


    }, [msg])

    return(
      <>
      {visible &&(
        <div className={`${Styles.message} ${Styles[type]}`}>{msg}</div>
      )}
      
      </>
    )
}

export default Message;