import { Button, Card, Dropdown, Progress, Radio } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { Axios } from '../http';

const TestItem = ({ testInfo }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [studentsAnswers, setStudentsAnswers] = useState([]);

    const [testResult, setTestResult] = useState(null);

    const [isTestFinished, setIsTestFinished] = useState(false);

    if (testInfo) {
        const items = [
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ];

        const { test, questionCount, testId } = testInfo;

        const progressInPercent = (100 / questionCount) * studentsAnswers.length;

        const isLastQuestion = currentQuestion === questionCount - 1;

        const chooseAnswer = (variant) => {
            let data = studentsAnswers.find((question) => question.questionId === test[currentQuestion].id);
            if (data) {
                const changedArray = studentsAnswers.map((el) => {
                    if (el.questionId === test[currentQuestion].id) {
                        return {
                            ...el,
                            answerId: variant.id,
                            isCorrect: variant.isCorrect,
                        };
                    } else {
                        return el;
                    }
                });
                setStudentsAnswers(changedArray);
            } else {
                let choosed = {
                    questionId: test[currentQuestion].id,
                    isCorrect: variant.isCorrect,
                    answerId: variant.id,
                };
                setStudentsAnswers([...studentsAnswers, choosed]);
            }
        };

        const isAllAnswered = studentsAnswers.length === questionCount;

        const finishTest = async () => {
            let correctAnswersCount = studentsAnswers.filter((x) => x.isCorrect).length;
            let correctAnswersInPercent = ((100 / questionCount) * correctAnswersCount).toFixed(2);
            setIsTestFinished(true);
            setTestResult({ correctAnswersInPercent, correctAnswersCount });
            const hashTestData = studentsAnswers
                .map((el) => {
                    return `${el.questionId}:${el.answerId}`;
                })
                .join('-');
            await Axios.post('/test/saveResult', {
                testId: testId,
                hashStudentAnswers: hashTestData,
                resultInPercent: correctAnswersInPercent,
            });
        };

        const choosedAnswer = studentsAnswers
            ? studentsAnswers.find((question) => test[currentQuestion].id === question.questionId)
                ? studentsAnswers.find((question) => question.questionId === test[currentQuestion].id).answerId
                : null
            : null;

        if (testInfo && isTestFinished) {
            return (
                <div style={{ width: '90vw', display: 'flex', justifyContent: 'space-between', height: '80vh' }}>
                    <div
                        style={{
                            width: '75vw',
                            marginBottom: '20px',
                            margin: '0 auto',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Card>
                            <h2>
                                <b>{test[currentQuestion].questionText}</b>
                            </h2>
                            <Radio.Group style={{ width: '100%' }} value={choosedAnswer}>
                                {test[currentQuestion].variants.map((variant) => {
                                    return (
                                        <Card
                                            style={{ cursor: 'pointer' }}
                                            key={variant.id}
                                            onClick={() => chooseAnswer(variant)}
                                        >
                                            <Radio key={variant.id} value={variant.id}>
                                                {variant.answerText}
                                            </Radio>
                                        </Card>
                                    );
                                })}
                            </Radio.Group>
                        </Card>
                        <div>
                            <Button
                                size="large"
                                disabled={currentQuestion === 0}
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            >
                                Назад
                            </Button>
                            <Button
                                size="large"
                                disabled={isLastQuestion}
                                onClick={() => {
                                    return isLastQuestion ? null : setCurrentQuestion(currentQuestion + 1);
                                }}
                            >
                                Следующий
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div>Ваш результат!</div>
                        <Progress
                            type="circle"
                            percent={testResult.correctAnswersInPercent}
                            strokeColor={
                                testResult.correctAnswersInPercent > 90
                                    ? 'green'
                                    : testResult.correctAnswersInPercent > 70
                                    ? 'blue'
                                    : testResult.correctAnswersInPercent > 50
                                    ? 'yellow'
                                    : 'red'
                            }
                        />
                    </div>
                </div>
            );
        }

        if (testInfo) {
            return (
                <div
                    style={{
                        width: '90vw',
                        margin: '0 auto',
                        height: '90vh',
                        display: 'grid',
                        gridTemplateRows: '25% 1fr 15%',
                    }}
                >
                    <Title level={window.screen.width > 992 ? 3 : 5}>{test[currentQuestion].questionText}</Title>

                    <Radio.Group style={{ width: '100%' }} value={choosedAnswer}>
                        {test[currentQuestion].variants.map((variant) => {
                            return (
                                <Card
                                    style={{ cursor: 'pointer' }}
                                    key={variant.id}
                                    onClick={() => chooseAnswer(variant)}
                                >
                                    <Radio key={variant.id} value={variant.id}>
                                        {variant.answerText}
                                    </Radio>
                                </Card>
                            );
                        })}
                    </Radio.Group>
                    <div>
                        <Progress percent={progressInPercent.toFixed(2)} />
                        <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
                            <div style={{ width: '300px' }}>
                                <Button
                                    size="large"
                                    style={{ width: '150px' }}
                                    disabled={currentQuestion === 0}
                                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                >
                                    Назад
                                </Button>
                                <Button
                                    style={{ width: '150px' }}
                                    size="large"
                                    disabled={isLastQuestion}
                                    onClick={() => {
                                        return isLastQuestion ? null : setCurrentQuestion(currentQuestion + 1);
                                    }}
                                >
                                    Следующий
                                </Button>
                            </div>
                            <Button
                                style={{ width: '150px', justifySelf: 'end' }}
                                size="large"
                                type="primary"
                                disabled={studentsAnswers ? !isAllAnswered : true}
                                onClick={finishTest}
                            >
                                Завершить
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
};

export default TestItem;
