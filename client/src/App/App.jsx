import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import desc from './desc.json';
const hoverList = {
    "desc":['1','5','9'],
    "asc":['3','5','7'],
    "row1":['1','4','7'],
    "row2":['2','5','8'],
    "row3":['3','6','9'],
    "col1":['1','2','3'],
    "col2":['4','5','6'],
    "col3":['7','8','9'],
    "1":['desc','col1','row1'],
    "2":['col1','row2'],
    "3":['asc','col1','row3'],
    "4":['col2','row1'],
    "5":['desc','asc','col2','row2'],
    "6":['col2','row3'],
    "7":['asc','col3','row1'],
    "8":['col3','row2'],
    "9":['desc','col3','row3'],
};
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            matrix: []
        }
    }

    handleChange = (date)=>{
        this.setState({date});
    }

    calcHandler = () =>{
        let matrix = [0,0,0,0,0,0,0,0,0,0];
        const date = this.state.date;
        const sumDigits = (arr)=> {
            let sum = 0;
            for(let i=0;i<arr.length;i++){
                let innerSum = 0, value=arr[i];
                while(value){
                    let digit = value % 10;
                    innerSum+=digit;
                    matrix[digit]++;
                    value = Math.floor(value/10);
                }
                sum+=innerSum;
            }
            return sum;
        }

        const d = date.getDate();
        const m = date.getMonth()+1;
        const y = date.getFullYear();
        const first = sumDigits([d, m, y]);
        const second = sumDigits([first]);
        sumDigits([second]);
        const third = first - 2*(d>9?Math.floor(d/10):d);
        const fourth = sumDigits([third]);
        sumDigits([fourth]);
        console.log(first);
        console.log(second);
        console.log(third);
        console.log(fourth);
        console.log(matrix);
        this.setState({matrix});

    }

    sendHandler = async ()=>{
        const {day, month, year} = this.state;
        console.log(day, month, year);
        const response = await fetch('http://localhost:1000/get_matrix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({day, month, year})
        });
        const {matrix} = await response.json();
        this.setState(()=>({matrix}));
        console.log(matrix);
    }

    getDigit = (n)=> {
        const matrix = this.state.matrix;
        const count = matrix[n];
        let digits = '';
        for(let i=0;i<count;i++){
            digits+=n;
        }
        return digits;
    }
    getDesc = (e) => {
        const n = e.target.id;
        const d = e.target.textContent;
        const description = desc[n][d];
        console.log(description);
    }

    highLighterOff(e) {
        const id = e.target.id;
        const targets = hoverList[id];
        for (let i = 0; i < targets.length; i++) {
            document.getElementById(targets[i]).style.border = '';
            document.getElementById(targets[i]).style.color = '';
        }

    }
    highLighterOn(e) {
        const id = e.target.id;
        const targets = hoverList[id];
        for (let i = 0; i < targets.length; i++) {
            document.getElementById(targets[i]).style.border = '1px solid #09c5e0';
            document.getElementById(targets[i]).style.color = '#09c5e0';
            document.getElementById(targets[i]).style.transition = '0.3s';
        }

    }

    render() {
        const digits = [
            this.getDigit(0),
            this.getDigit(1),
            this.getDigit(2),
            this.getDigit(3),
            this.getDigit(4),
            this.getDigit(5),
            this.getDigit(6),
            this.getDigit(7),
            this.getDigit(8),
            this.getDigit(9)];
        return (
            <div className={'container'}>
                <DatePicker
                    dateFormat={'dd.MM.yyyy'}
                    selected={this.state.date}
                    onChange={this.handleChange}
                    disabledKeyboardNavigation
                />
                <button onClick={this.calcHandler}>Посчитать</button>
                <div className={"matrix"}>
                    <div className="buttons btn-diag">
                        <button className={"btn btn-diag_desc"} id={'desc'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>\</button>
                        <button className={"btn btn-diag_asc"} id={'asc'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>/</button>
                    </div>
                    <div className="buttons buttons-row">
                        <button className={"btn btn-col_1"} id={'col1'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>1</button>
                        <button className={"btn btn-col_2"} id={'col2'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>2</button>
                        <button className={"btn btn-col_3"} id={'col3'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>3</button>
                    </div>
                    <div className="buttons buttons-col">
                        <button className={"btn btn-row_1"} id={'row1'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>1</button>
                        <button className={"btn btn-row_2"} id={'row2'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>2</button>
                        <button className={"btn btn-row_3"} id={'row3'} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>3</button>
                    </div>
                    <div className={"row"}>
                        <div id={'1'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[1]}</div>
                        <div id={'4'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[4]}</div>
                        <div id={'7'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[7]}</div>
                    </div>
                    <div className={"row"}>
                        <div id={'2'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[2]}</div>
                        <div id={'5'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[5]}</div>
                        <div id={'8'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[8]}</div>
                    </div>
                    <div className={"row"}>
                        <div id={'3'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[3]}</div>
                        <div id={'6'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[6]}</div>
                        <div id={'9'} onClick={this.getDesc} onMouseOver={this.highLighterOn} onMouseLeave={this.highLighterOff}>{digits[9]}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
