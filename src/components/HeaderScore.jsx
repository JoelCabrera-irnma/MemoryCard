function HeaderShow({props, prop2}) {
   
    return(
        <>
            <div style={sty} > Score {props}</div>
            <div style={sty2} > Best Score {prop2}</div>
        </>
    )
}
const sty = {
    fontSize: '20px',
    color: "white"
}
const sty2 = {
    fontSize: '15px',
    color: "white"
}


export default HeaderShow