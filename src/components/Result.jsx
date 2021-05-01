import questions from '../questions'; 
import { useLocation } from "react-router-dom";

function Result(prop) {
    let location = useLocation();
    let answers = location.state.answered;
    let score = location.state.score;
    let result = [
        <div className="row">
            <div className="r1">Question</div>
            <div className="r2">Correct Answer</div>
            <div className="r3">Your Answer</div>
        </div>
    ];

    questions.forEach((item, index) => {
        let correctAns = item.options[item.result];
        let yourAns = item.options[answers[index]];
        let getClass = () => correctAns === yourAns ? 'correct' : 'wrong';
        result.push(
            <div className="row">
                <div className="r1">{item.ques}</div>
                <div className="r2">{correctAns}</div>
                <div className={`r3 ${getClass()}`}>{yourAns}</div>
            </div>
        );
    });

    return (
        <div className="result">
            <h1>Your final score is {score}.</h1>
            <div className="result-table">{result}</div> 
        </div>   
    );
}

export default Result;