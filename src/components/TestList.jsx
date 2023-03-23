import { Card, List, Radio } from 'antd';
import React from 'react';

const TestComponent = ({ fileData }) => {
    if (fileData) {
        return fileData.map((anyTest, i) => {
            while (i < 20) {
                if (anyTest.question === '') {
                    return null;
                } else {
                    return (
                        <div key={i} style={{ width: '90vw', marginBottom: '20px', margin: '0 auto' }}>
                            <Card>
                                <h2>
                                    {i + 1}.<b>{anyTest.question}</b>
                                </h2>
                                <Radio.Group style={{ width: '100%' }}>
                                    {anyTest.answers.map((answer) => {
                                        return (
                                            <Card key={answer.id}>
                                                <Radio key={answer.id} value={answer.id}>
                                                    {answer.answerText}
                                                </Radio>
                                            </Card>
                                        );
                                    })}
                                </Radio.Group>
                            </Card>
                        </div>
                    );
                }
            }
        });
    } else {
        return <div style={{ width: '90vw', marginBottom: '20px', margin: '0 auto' }}>Пусто</div>;
    }
};

export default TestComponent;
