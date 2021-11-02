function Main() {

    const [expr, setExpr] = React.useState("");
    const [ans, setAns] = React.useState(0);
    
    const displayHandle = (symbol) => {
        setExpr((prevV) => {
            if (
              /[+*-/]/.test(symbol) &&
              /[+*-/]/.test(prevV[prevV.length - 1])
            ) {
              let newV;
              if (/[-]/.test(symbol)) {
                newV = prevV.slice(0, prevV.length) + symbol;
              } else {
                let count = 0;
                for (let i = 0; i < prevV.length; i++) {
                  if (isNaN(+prevV[i])) {
                    count++;
                  } else {
                    count = 0;
                  }
                }
                newV = prevV.slice(0, prevV.length - count) + symbol;
              }
              setExpr(newV);
            } else {
              if (prevV) {
                prevV = prevV + "";
                let valArr = prevV.split(/[+/*-]/g);
                let lastNum = valArr[valArr.length - 1];
                if (!isNaN(lastNum) && /[.]/.test(lastNum) && symbol === ".") {
                  symbol = "";
                }
              }
              setExpr(
                (prevV + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
              );
            }
        });

        setAns((prevV) =>
            (prevV + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
    };

    const calculate = () => {
        setAns(eval(expr));
        setExpr(eval(expr));
    }

    const allClear = () => {
        setExpr("");
        setAns(0);
    };

    const clear = () => {
        setExpr((prevV) => {
            setAns(0);
            console.log(prevV);
            prevV = prevV + "";
            return prevV
              .split("")
              .slice(0, prevV.length - 1)
              .join("");
        });
    };

    return(
        <div className="container">
            <div className="button-layout">
                <div className="cdisplay">
                    <input className="input" type="text" value={expr} placeholder="0" disabled/>
                    <div id="display" className="finalans">{ans}</div>
                </div>
                <div onClick={allClear} id="clear" className="cbutton AC clears">AC</div>
                <div onClick={clear} className="cbutton C clears">C</div>
                <div onClick={() => displayHandle("/")} id="divide" className="cbutton div oper">/</div>
                <div onClick={() => displayHandle("*")} id="multiply" className="cbutton times oper">x</div>
                <div onClick={() => displayHandle("7")} id="seven" className="cbutton seven numbers">7</div>
                <div onClick={() => displayHandle("8")} id="eight" className="cbutton eight numbers">8</div>
                <div onClick={() => displayHandle("9")} id="nine" className="cbutton nine numbers">9</div>
                <div onClick={() => displayHandle("-")} id="subtract" className="cbutton minus oper">-</div> 
                <div onClick={() => displayHandle("4")} id="four" className="cbutton four numbers">4</div>
                <div onClick={() => displayHandle("5")} id="five" className="cbutton five numbers">5</div>
                <div onClick={() => displayHandle("6")} id="six" className="cbutton six numbers">6</div>
                <div onClick={() => displayHandle("+")} id="add" className="cbutton plus oper">+</div>
                <div onClick={() => displayHandle("1")} id="one" className="cbutton one numbers">1</div>
                <div onClick={() => displayHandle("2")} id="two" className="cbutton two numbers">2</div>
                <div onClick={() => displayHandle("3")} id="three" className="cbutton three numbers">3</div>
                <div onClick={calculate} id="equals" className="cbutton equal equals">=</div>
                <div onClick={() => displayHandle("0")} id="zero" className="cbutton zero numbers">0</div>
                <div onClick={() => displayHandle(".")} id="decimal" className="cbutton dot numbers">.</div>
            </div>
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById("root"));