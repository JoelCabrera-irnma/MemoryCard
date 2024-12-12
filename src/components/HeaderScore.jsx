function HeaderShow({props, prop2}) {
   
    return(
        <div className="box-score">
            <div style={sty} > Score {props}</div>
            <div style={sty2} > Best Score {prop2}</div>
        </div>
    )
}
const sty = {
    fontSize: '20px',
    color: "black"
}
const sty2 = {
    fontSize: '15px',
    color: "black"
}


export default HeaderShow