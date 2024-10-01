import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState({
        title: '',
        message: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/feedback', feedbackData);
            if (response.status === 201) {
                setSuccess('Feedback submitted successfully!');
                setFeedbackData({ title: '', message: '' }); // Clear form
            }
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || 'An error occurred while submitting feedback.'}`);
            } else if (err.request) {
                setError('Error: No response received from server.');
            } else {
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transition-transform transform hover:scale-105 duration-300">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Feedback Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={feedbackData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={feedbackData.message}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                            rows="4"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} transition duration-200`}
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-500">{error}</p>}
                {success && <p className="mt-4 text-green-500">{success}</p>}
            </div>
        </div>
    );
};

export default Feedback;
