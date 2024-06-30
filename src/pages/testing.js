import GraphCard from '../components/cards/clickableCard';
import React, { useState } from 'react';

const YourComponent = () => {
    const [message, setMessage] = useState({ message: "" });
    const [formData, setFormData] = useState({ field: "" });

    const handleDiseaseDetection = () => {
        console.log("I am Here");
        const newMessage = { message: "Your desired message here" };
        setMessage(newMessage);
        handleChatRequest(newMessage, formData); // Pass the new message and formData directly
    };

    const handleChatRequest = async (newMessage, formData) => {

        const requestData = {};
        if (newMessage && newMessage.message) {
            requestData.message = newMessage;
        }
        if (formData && formData.field) {
            requestData.formData = formData;
        }

        console.log("I am Here Too", requestData);
        try {
            // Your chat request logic here
        } catch (error) {
            console.error("Chat request failed", error);
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleChatRequest(message, formData); // Pass the current state message and formData
    };

    return (
        <>
            <GraphCard
                title="OUTBREAK"
                subtitle="ALERTS"
                onClick={handleDiseaseDetection}
                style={{ backgroundColor: 'rgba(102, 168, 97, 0.5)' }}
            />
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="text" 
                    name="field" 
                    value={formData.field} 
                    onChange={handleFormChange} 
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default YourComponent;