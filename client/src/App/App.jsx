import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import desc from './desc.json';
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
    getDesc = (n,f) => {
        console.log(n,f);
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
                    <div className={"row"}>
                        <div onClick={this.getDesc(1,digits[1])}>{digits[1]}</div>
                        <div onClick={this.getDesc(4,digits[4])}>{digits[4]}</div>
                        <div onClick={this.getDesc(7,digits[7])}>{digits[7]}</div>
                    </div>
                    <div className={"row"}>
                        <div onClick={this.getDesc(2,digits[2])}>{digits[2]}</div>
                        <div onClick={this.getDesc(5,digits[5])}>{digits[5]}</div>
                        <div onClick={this.getDesc(8,digits[8])}>{digits[8]}</div>
                    </div>
                    <div className={"row"}>
                        <div onClick={this.getDesc(3,digits[3])}>{digits[3]}</div>
                        <div onClick={this.getDesc(6,digits[6])}>{digits[6]}</div>
                        <div onClick={this.getDesc(9,digits[9])}>{digits[9]}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
