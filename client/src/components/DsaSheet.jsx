import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function DsaSheet() {
    const [topics, setTopics] = useState([]);
    const [problems, setProblems] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState('');
    const name = localStorage.getItem('name');

    useEffect(() => {
        api.get('/topics').then(res => {
            setTopics(res.data);
            if (res.data.length > 0) {
                const firstTopicId = res.data[0]._id;
                setSelectedTopicId(firstTopicId);
                fetchProblems(firstTopicId);
            }
        });
        api.get('/topics/progress').then(res => setCompleted(res.data)); // updated route
    }, []);

    const fetchProblems = async (topicId) => {
        const res = await api.get(`/topics/problems/${topicId}`);
        setProblems(res.data);
    };

    const handleTopicChange = (e) => {
        const topicId = e.target.value;
        setSelectedTopicId(topicId);
        fetchProblems(topicId);
    };

    const toggle = async (problemId) => {
        await api.post('/topics/toggle', { problemId }); // updated route
        setCompleted(prev =>
            prev.includes(problemId) ? prev.filter(id => id !== problemId) : [...prev, problemId]
        );
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        window.location.reload();
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-left">DSA Sheet</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'white' }}>Hi {name}</span>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </div>
            </nav>

            <div className="container" style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Select Topic: </label>
                    <select
                        value={selectedTopicId}
                        onChange={handleTopicChange}
                        style={{ padding: '6px', fontSize: '16px' }}
                    >
                        {topics.map(topic => (
                            <option key={topic._id} value={topic._id}>
                                {topic.title} ({topic.level})
                            </option>
                        ))}
                    </select>
                </div>

                <table className="problem-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th></th> {/* Checkbox column */}
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>YouTube</th>
                            <th>LeetCode</th>
                            <th>Article</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map(problem => (
                            <tr key={problem._id} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ textAlign: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={completed.includes(problem._id)}
                                        onChange={() => toggle(problem._id)}
                                    />
                                </td>
                                <td>{problem.title}</td>
                                <td className={`difficulty ${problem.level.toLowerCase()}`}>
                                    {problem.level}
                                </td>
                                <td>
                                    <a href={problem.youtube} target="_blank" rel="noreferrer">YouTube</a>
                                </td>
                                <td>
                                    <a href={problem.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
                                </td>
                                <td>
                                    <a href={problem.article} target="_blank" rel="noreferrer">Article</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
