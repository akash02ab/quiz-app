import questions from "../questions";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Score from "./Score";
import Question from "./Question";
import Options from "./Options";
let clicked = false;

function Quiz() {
	let [current, setCurrent] = useState(0);
    let [score, setScore] = useState(0);
	let [width, setWidth] = useState(100);
	let [answered, setAnswer] = useState(Array(questions.length).fill(-2));
	const history = useHistory();

	let clickHandler = (answer) => {
		clicked = true;
		let answerCopy = [...answered];
		let scoreCopy = score;

		answerCopy[current] = answer;
        setAnswer(answerCopy);

		if(answer === questions[current].result) {
			scoreCopy += 10;
			setScore(scoreCopy);
		}

		if(current === questions.length - 1) {
			setTimeout(() => {
				history.push(
					{pathname: '/result',
					state: { score: scoreCopy, answered: answerCopy }
				});
				return;
			}, 2000);
		}
		setTimeout(() => {
			setCurrent(current + 1);
		}, 2000);
	}

	useEffect(() => {
		setWidth(100);
		let progressWidth = setInterval(() => {
			setWidth((p) => {
                if(p - 0.1 < 0){
					if(!clicked) {
						clickHandler(-1);
					}
                    clearInterval(progressWidth);
                }
                return p - 0.1;
            });
		});

        clicked = false;
	// eslint-disable-next-line
	}, [current]);

	return (
		<div className="container">
			<div className="progress-bar" style={{width: width + '%'}}></div>
			<Score score={score}/>
			<Question question={questions[current].ques} />
			<Options
				options={questions[current].options}
				answer={questions[current].result}
				clickHandler={clickHandler}
			/>
		</div>
	);
}

export default Quiz;
