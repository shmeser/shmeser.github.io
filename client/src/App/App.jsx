import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

    render() {
        return (
            <div>
                <DatePicker
                    dateFormat={'dd.MM.yyyy'}
                    selected={this.state.date}
                    onChange={this.handleChange}
                    disabledKeyboardNavigation
                />
                <button onClick={this.calcHandler}>Посчитать</button>
                <div className={"matrix"}>
                    <div className={"row"}>
                        <div>{this.getDigit(1)}</div>
                        <div>{this.getDigit(4)}</div>
                        <div>{this.getDigit(7)}</div>
                    </div>
                    <div className={"row"}>
                        <div>{this.getDigit(2)}</div>
                        <div>{this.getDigit(5)}</div>
                        <div>{this.getDigit(8)}</div>
                    </div>
                    <div className={"row"}>
                        <div>{this.getDigit(3)}</div>
                        <div>{this.getDigit(6)}</div>
                        <div>{this.getDigit(9)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
