import React, { useEffect, useState } from 'react';
import TestItem from '../../components/TestItem';
import { Axios } from '../../http.js';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Result, Select, Space, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import TestSettings from './TestSettings';

const TestPage = () => {
    const [testInfo, setTestInfo] = useState(null);

    const onChange = (info) => {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            console.log(`${info.file.name} file uploaded successfully.`);
            // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
            // message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const uploadImage = (e) => {
        const { file } = e;
        const formData = new FormData();
        formData.append('File', file);
        formData.append('EventId', Math.random());
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };
        Axios.post('/test/read', formData, config).then((res) => {
            if (res.status === 200) {
                console.log('Успех', 'Файл загружен успешно');
            }
        });
    };

    const parseFile = async () => {
        let file = document.getElementById('file').files[0];
        const formData = new FormData();
        formData.set('file', file);
        for (var [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await Axios.post('/test/read', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
        // let reader = new FileReader();
        // reader.readAsText(file);
        // reader.onload = () => {
        //     let splitedQuestions = reader.result.split('<question>');
        //     let filteredData = [];
        //     splitedQuestions.forEach((anyQuestion, i) => {
        //         if (anyQuestion.split('<variant>')[0] !== '') {
        //             let allAnswers = anyQuestion.split('<variant>');
        //             allAnswers.shift();
        //             let filteredAnswers = allAnswers.map((answer, i) => {
        //                 return { id: i, answerText: answer, isCorrect: i === 0 ? true : false };
        //             });
        //             filteredData.push({
        //                 id: i,
        //                 question: anyQuestion.split('<variant>')[0],
        //                 answers: filteredAnswers,
        //                 correctAnswerId: filteredAnswers[0].id,
        //                 choosedAnswerId: null,
        //             });
        //         }
        //     });
        //     setTestInfo(filteredData);
        // };
    };

    return (
        <div style={{ height: '100vh', display: 'grid', alignItems: 'center' }}>
            {testInfo ? <TestItem testInfo={testInfo} /> : <TestSettings setTestInfo={setTestInfo} />}
        </div>
    );
};

export default TestPage;
