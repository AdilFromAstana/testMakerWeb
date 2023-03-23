import React, { useEffect, useState } from 'react';
import TestList from '../components/TestList';
import { Button } from 'antd';
import TestItem from '../components/TestItem';
import { Axios } from '../http.js';

const TestPage = () => {
    const [testInfo, setTestInfo] = useState(null);

    const parseFile = () => {
        let file = document.getElementById('file').files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            let splitedQuestions = reader.result.split('<question>');
            let filteredData = [];
            splitedQuestions.forEach((anyQuestion, i) => {
                if (anyQuestion.split('<variant>')[0] !== '') {
                    let allAnswers = anyQuestion.split('<variant>');
                    allAnswers.shift();
                    let filteredAnswers = allAnswers.map((answer, i) => {
                        return { id: i, answerText: answer, isCorrect: i === 0 ? true : false };
                    });
                    filteredData.push({
                        id: i,
                        question: anyQuestion.split('<variant>')[0],
                        answers: filteredAnswers,
                        correctAnswerId: filteredAnswers[0].id,
                        choosedAnswerId: null,
                    });
                }
            });
            setTestInfo(filteredData);
        };
    };

    const getTest = () => {
        Axios.get('/test/getTest').then(({ data, status }) => {
            if (status === 200) {
                setTestInfo({ test: data.test, questionCount: data.test.length, testId: data.testId });
            }
        });
    };

    useEffect(() => {
        getTest();
    }, []);

    return (
        <div>
            <input type="file" id="file" onChange={(e) => console.log(e.target.value)} />
            <Button onClick={parseFile}>Читать</Button>
            <TestItem testInfo={testInfo} />
            {/* <TestList fileData={fileData} /> */}
        </div>
    );
};

export default TestPage;
