import questions from "../questions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Score from "./Score";
import Question from "./Question";
import Options from "./Options";

function Quiz() {
	let [current, setCurrent] = useState(0);
    let [score, setScore] = useState(0);
	let [answered, setAnswer] = useState(new Array(questions.length).fill(0));
	const history = useHistory();

	let clickHandler = (answer) => {
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
	
	return (
		<div className="container">
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
