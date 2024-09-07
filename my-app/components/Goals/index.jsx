'use client';
import React, { useState } from 'react';
import './style.css'; // Ensure this path is correct

function App() {
    const [goals, setGoals] = useState([]);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalAmount, setNewGoalAmount] = useState('');
    const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
    const [showAddFundsModal, setShowAddFundsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [addAmount, setAddAmount] = useState('');
    const [modalGoalId, setModalGoalId] = useState(null);
    const [modalGoalName, setModalGoalName] = useState('');

    const handleAddNewGoal = (e) => {
        e.preventDefault();
        const newGoal = {
            id: goals.length + 1,
            name: newGoalName,
            amount: newGoalAmount,
            currentAmount: 0
        };
        setGoals([...goals, newGoal]);
        setNewGoalName('');
        setNewGoalAmount('');
        setShowCreateGoalModal(false); // Close the modal on submit
    };

    const toggleCreateGoalModal = () => {
        setShowCreateGoalModal(!showCreateGoalModal);
    };

    const handleAddFunds = (e) => {
        e.preventDefault();
        const updatedGoals = goals.map(goal =>
            goal.id === modalGoalId ? { ...goal, currentAmount: parseFloat(goal.currentAmount) + parseFloat(addAmount) } : goal
        );
        setGoals(updatedGoals);
        setShowAddFundsModal(false);
        setAddAmount('');
    };

    const openAddFundsModal = (id, name) => {
        setModalGoalId(id);
        setModalGoalName(name);
        setShowAddFundsModal(true);
    };

    const handleDeleteGoal = () => {
        setGoals(goals.filter(goal => goal.id !== modalGoalId));
        setShowDeleteModal(false);
    };

    const openDeleteModal = (id, name) => {
        setModalGoalId(id);
        setModalGoalName(name);
        setShowDeleteModal(true);
    };

    const handleEditGoal = () => {
        const updatedGoals = goals.map(goal =>
            goal.id === editId ? { ...goal, name: newGoalName, amount: newGoalAmount } : goal
        );
        setGoals(updatedGoals);
        setEditId(null);
        setNewGoalName('');
        setNewGoalAmount('');
        setShowCreateGoalModal(false);
    };

    const openEditGoal = (goal) => {
        setEditId(goal.id);
        setNewGoalName(goal.name);
        setNewGoalAmount(goal.amount);
        setShowCreateGoalModal(true);
    };

    const CreateGoalModal = () => (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleCreateGoalModal}>&times;</span>
                <h2>{editId ? 'Edit Goal' : 'Create New Goal'}</h2>
                <form onSubmit={editId ? handleEditGoal : handleAddNewGoal}>
                    <input
                        type="text"
                        value={newGoalName}
                        onChange={(e) => setNewGoalName(e.target.value)}
                        placeholder="Goal Name"
                        required
                    />
                    <input
                        type="number"
                        value={newGoalAmount}
                        onChange={(e) => setNewGoalAmount(e.target.value)}
                        placeholder="Goal Amount"
                        required
                    />
                    <button type="submit">{editId ? 'Update Goal' : 'Add Goal'}</button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="container">
            <h1 className="header-title">Saving Goals</h1>
            <button className="create-goal-btn" onClick={toggleCreateGoalModal}>Create Goal</button>
            {showCreateGoalModal && <CreateGoalModal />}
            <ul className="goal-list">
                {goals.map(goal => (
                    <li key={goal.id}>
                        {goal.name} - ${goal.amount}
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${Math.min(100, (goal.currentAmount / goal.amount) * 100)}%` }}>
                                ${goal.currentAmount.toFixed(2)} / ${goal.amount}
                            </div>
                        </div>
                        <button onClick={() => openAddFundsModal(goal.id, goal.name)} className="add-funds-btn">Add Funds</button>
                        <button onClick={() => openEditGoal(goal)} className="edit-btn">Edit Goal</button>
                        <button onClick={() => openDeleteModal(goal.id, goal.name)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
            {showAddFundsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddFundsModal(false)}>&times;</span>
                        <h2>Add Funds for {modalGoalName}</h2>
                        <form onSubmit={handleAddFunds}>
                            <input
                                type="number"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                placeholder="Amount to Add"
                                autoFocus
                                required
                            />
                            <button type="submit">Add Funds</button>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                        <h2>Are you sure you want to delete {modalGoalName}?</h2>
                        <button onClick={handleDeleteGoal} className="modal-delete-btn">Delete</button>
                        <button onClick={() => setShowDeleteModal(false)} className="modal-cancel-btn">Cancel</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;