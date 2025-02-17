import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Analytics.css';

const Analytics = () => {
    const [type, setType] = useState('monthly');
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState({ totalIncome: 0, totalExpense: 0, netProfit: 0 });

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('https://school-project-n93b.onrender.com/api/analytics/financial', {
                params: { type, month, year }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching analytics", error);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [type, month, year]);

    return (
        <div className="analytics-container">
            <h2>Financial Analytics</h2>
            <div className="toggle-buttons">
                <button className={type === 'monthly' ? 'active' : ''} onClick={() => setType('monthly')}>Monthly</button>
                <button className={type === 'yearly' ? 'active' : ''} onClick={() => setType('yearly')}>Yearly</button>
            </div>

            <div className="filters">
                {type === 'monthly' && (
                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                            <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                )}
                <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <div className="analytics-results">
                <p><strong>Total Income:</strong> ₹{data.totalIncome}</p>
                <p><strong>Total Expenses:</strong> ₹{data.totalExpense}</p>
                <p><strong>Net Profit:</strong> ₹{data.netProfit}</p>
            </div>
        </div>
    );
};

export default Analytics;
