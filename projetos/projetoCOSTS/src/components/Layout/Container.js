import Styles from './Container.module.css'

function Container(props){

    return(
      <div className= {`${Styles.container}  ${Styles[props.customClass]}` }>{props.children}</div>  /*vai pegar todos elementos 
       filhos que o container está envolvendo no app.js*/
    )

}

export default Container