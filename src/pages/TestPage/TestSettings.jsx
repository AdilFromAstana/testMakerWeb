import React, { useEffect, useState } from 'react';
import { Axios } from '../../http.js';
import { Button, Result, Select } from 'antd';
import Title from 'antd/es/typography/Title';

const TestSettings = ({ setTestInfo }) => {
    const [subjectList, setSubjectList] = useState([]);
    const [availableQuestionCount, setAvailableQuestionCount] = useState(0);
    const questionCountList = [15, 20, 25, 40];
    const [testSettings, setTestSettings] = useState({ questionCount: null, subjectId: 0, timeLimit: 0 });

    const getQuestionCount = (e) => {
        Axios.get(`/test/getQuestionCount?subjectId=${e}`).then(({ data }) => {
            setAvailableQuestionCount(data);
        });
        setTestSettings({ ...testSettings, questionCount: null, subjectId: e });
    };

    useEffect(() => {
        Axios.get('/test/getSubjectList').then((data) => {
            setSubjectList(data.data);
        });
    }, []);

    const getTest = () => {
        Axios.post('/test/createTest', testSettings).then(({ data, status }) => {
            if (status === 200) {
                setTestInfo({ test: data.test, questionCount: data.test.length, testId: data.testId });
            }
        });
    };

    // 12:00 AM on May 15, 2022
    const date = new Date();

    date.setMinutes(date.getMinutes() + 30);

    // 2:30 AM on May 15, 2022
    console.log(date); // 2022-05-15T02:30:00.000Z

    const isButtonDisabled = testSettings.questionCount > 0 && testSettings.subjectId > 0;

    return (
        <div>
            <Result
                title={<Title>Подберите настройки для теста!</Title>}
                extra={
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '50px' }}>
                            <div
                                style={{
                                    width: 200,
                                }}
                            >
                                <Title level={4}>Выберите предмет</Title>
                                <Select
                                    onChange={getQuestionCount}
                                    placeholder="Список предметов"
                                    style={{
                                        width: 200,
                                    }}
                                    options={subjectList?.map((subject) => {
                                        return {
                                            value: subject.id,
                                            label: subject.subjectText,
                                        };
                                    })}
                                />
                            </div>
                            <div
                                style={{
                                    width: 250,
                                }}
                            >
                                <Title level={4}>Выберите кол. вопросов</Title>
                                <Select
                                    style={{
                                        width: 250,
                                    }}
                                    placeholder="Список кол. вопросов"
                                    onChange={(e) => setTestSettings({ ...testSettings, questionCount: e })}
                                    value={testSettings.questionCount}
                                    options={questionCountList?.map((questionCount) => {
                                        return {
                                            value: questionCount,
                                            label: `${questionCount} вопросов`,
                                            disabled: questionCount > availableQuestionCount,
                                        };
                                    })}
                                />
                            </div>
                            <div
                                style={{
                                    width: 200,
                                }}
                            >
                                <Title level={4}>Время на тест</Title>
                                <Select
                                    defaultValue="lucy"
                                    style={{
                                        width: 200,
                                    }}
                                    options={[
                                        {
                                            value: 'jack',
                                            label: '15 мин',
                                        },
                                        {
                                            value: 'lucy',
                                            label: '20 мин',
                                        },
                                        {
                                            value: 'Yiminghe',
                                            label: '30 мин',
                                        },
                                        {
                                            value: 'disabled',
                                            label: '40 мин',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <Button size="large" type="primary" onClick={getTest} disabled={!isButtonDisabled}>
                            Начать тест!
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default TestSettings;
