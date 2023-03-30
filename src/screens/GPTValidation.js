import axios from 'axios';
import React, {useState} from 'react';
import { API_KEY } from "../API_KEY";


export default function GPTValidation() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        const prompt = message;
        const model = 'text-davinci-002';
        const maxTokens = 2048;


        axios.post('https://api.openai.com/v1/completions', {
            prompt: prompt,
            model: model,
            max_tokens: maxTokens,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then((response) => {
            console.log(response.data.choices[0].text);
            setMessages((prevMessages) => [...prevMessages, {text: response.data.choices[0].text, isBot: true}]);
            setMessage('');
        }).catch((error) => {
                console.log(error);
            }
        );
    };

    return (
        <div>
            <h1>Teste de GPT</h1>
            <input value={message} type="text" onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Enviar</button>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p className={'text-light'}>{message.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
