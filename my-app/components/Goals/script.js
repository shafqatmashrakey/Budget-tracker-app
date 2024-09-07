'use client';
import './style.css';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Pie = (props) => {
  const { color, width, progress } = props;
  const pi = 3.14159265359;
  const r = 400 / 2;
  const c = 2 * pi * r;
  const realProgress = c * progress;

  return (
    <div className="svg-container">
      <div className="svg-content">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <filter id="shadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            <feOffset dx="-5" dy="-4" />
          </filter>
          <circle
            className="animated"
            cx="250"
            cy="250"
            r="200"
            stroke=""
            fillOpacity="0"
            strokeWidth={width + 10}
            strokeDasharray={`${realProgress},${c}`}
            strokeDashoffset={c * progress}
          />
          <circle
            filter="url(#shadow)"
            className="animated shadow"
            cx="250"
            cy="250"
            r="200"
            stroke={color}
            fillOpacity="0"
            strokeWidth={width}
            strokeDasharray={`${realProgress},${c}`}
            strokeDashoffset={c * progress}
          />
          <circle
            className="animated fill"
            cx="250"
            cy="250"
            r="200"
            stroke={color}
            fillOpacity="0"
            strokeWidth={width}
            strokeDasharray={`${realProgress},${c}`}
            strokeDashoffset={c * progress}
          />
          <circle
            cx="250"
            cy="250"
            r="200"
            stroke={color}
            fillOpacity="0"
            strokeWidth="5"
            strokeDasharray={`${c},${c}`}
            strokeOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
};

const GoalCard = (props) => {
  const { goal, onFlip, onDelete, cancelEdit, saveGoal } = props;
  const [condition, setCondition] = useState(false);
  const [input1, setInput1] = useState(goal.name);
  const [input2, setInput2] = useState(goal.amount || 0);
  const [input3, setInput3] = useState(goal.progress);
  const [selectValue, setSelectValue] = useState(goal.category);

  const editGoal = (index) => {
    onFlip(index);
    setCondition(!condition);
    setInput1(goal.name);
    setInput2(goal.amount);
    setInput3(goal.progress);
    setSelectValue(goal.category);
  };

  const deleteGoalHandler = (index) => {
    onDelete(index);
    setCondition(!condition);
    setInput1(goal.name);
    setInput2(goal.amount);
    setInput3(goal.progress);
    setSelectValue(goal.category);
  };

  const cancelEditHandler = (index) => {
    onFlip(index);
    setCondition(!condition);
    setInput1(goal.name);
    setInput2(goal.amount);
    setInput3(goal.progress);
    setSelectValue(goal.category);
  };

  const saveGoalHandler = (index) => {
    onFlip(index);
    setCondition(!condition);
    goal.name = input1;
    goal.amount = Number(input2);
    goal.progress = Number(input3);
    goal.category = selectValue;
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectValue(e.target.value);
  };

  let message;
  let strokeColor;
  let status;
  let remaining;
  let percentRemaining;

  if (goal.progress / (goal.amount || 1) < 1) {
    strokeColor = "#01579B";
    status = "Remaining";
    remaining = (goal.amount - goal.progress).toLocaleString();
    percentRemaining = "(" + ((goal.amount - goal.progress) / (goal.amount || 1) * 100).toFixed(0) + "%)";
  } else {
    strokeColor = "#7dbf69";
    status = "Exceeded";
    remaining = Math.abs(goal.amount - goal.progress).toLocaleString();
    percentRemaining = "(" + Math.abs((goal.amount - goal.progress) / (goal.amount || 1) * 100).toFixed(0) + "%)";
  }

  return (
    <div className={condition ? "flipped card-container" : "card-container"}>
      <figure className="front">
        <div className="goal--top">
          <a href="#" className="edit" onClick={() => editGoal(goal.index)}>
            <i className="fa fa-pencil-square-o"></i>
          </a>
          <div className="goal__name">{goal.name}</div>
          <Application percent={goal.progress / (goal.amount || 1)} colorChart={strokeColor} />
          <div className="goal--top__container">
            <i className={`category fa fa-${goal.category}`} aria-hidden="true"></i>
            <div className="goal--progress">
              <span className="money">{goal.progress.toLocaleString()}</span>
            </div>
            <div className="goal--amount">
              of <span className="money">{goal.amount ? goal.amount.toLocaleString() : ''}</span>
            </div>
          </div>
        </div>
        <div className="goal--bottom">
          <div className="descriptor">
            {status}
            <span className="money right goal--remain">{remaining}</span>
            <span className="percent right">{percentRemaining}</span>
          </div>
          <Example name={goal.name} progress={goal.progress} onSave={() => console.log('Save progress')} />
        </div>
      </figure>
      <figure className="back">
        <a href="#" className="back-arrow" onClick={() => cancelEditHandler(goal.index)}>
          <i className="fa fa-angle-left"></i>
        </a>
        <h3 className="card-title">Goal Details</h3>
        <div className="input-container">
          <label name="name" className="descriptor">
            Name
          </label>
          <input
            type="text"
            placeholder="Goal Name"
            value={input1}
            onChange={(e) => handleInputChange(e, setInput1)}
          />
          <label name="amount" className="descriptor">
            Goal
          </label>
          <span className="edit-money">$</span>
          <input
            type="number"
            placeholder="Amount"
            value={input2}
            onChange={(e) => handleInputChange(e, setInput2)}
          />
          <label name="progress" className="descriptor">
            Progress
          </label>
          <span className="edit-money">$</span>{" "}
          <input
            type="number"
            placeholder="Progress"
            value={input3}
            onChange={(e) => handleInputChange(e, setInput3)}
          />{" "}
          <label name="icon" className="descriptor">
            Icon
          </label>
          <div className="dropdown-wrapper">
            <select value={selectValue} onChange={handleDropdownChange}>
              <option value="car">Car</option>
              <option value="plane">Plane</option>
              <option value="">None</option>
            </select>
          </div>
        </div>
        <input
          type="button"
          className="button"
          value="Save Changes"
          onClick={() => saveGoalHandler(goal.index)}
          />
          <a href="#" className="delete" onClick={() => deleteGoalHandler(goal.index)}>
            Delete Goal
          </a>
        </figure>
      </div>
    );
  };
  
  const Application = (props) => {
    const { percent, colorChart } = props;
  
    return (
      <div>
        <div className="box">
          <Pie color={colorChart} width={15} progress={percent} />
        </div>
      </div>
    );
  };
  
  const Example = (props) => {
    const { name, progress, onSave } = props;
    const [showModal, setShowModal] = useState(false);
    const [sum, setSum] = useState(progress);
  
    const openModal = () => {
      setShowModal(true);
      setSum(progress);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSave();
        setShowModal(false);
      }
    };
  
    const handleInputChange = (e) => {
      setSum(Number(progress) + Number(e.target.value));
    };
  
    const handleSubmit = () => {
      onSave();
      setShowModal(false);
    };
  
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={openModal} className="button">
          Add funds
        </Button>
  
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Funds for {name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Current progress:</label>
            <div className="data">${progress.toLocaleString()}</div>
            <label>Add amount:</label>
            <div className="data">
              <span className="pre-money">$</span>
              <input
                type="number"
                className="fund-container"
                defaultValue=""
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                autoFocus
              />
            </div>
            <p className="smallprint">Total Progress: <span className="pre-money">${sum.toLocaleString()}</span></p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
            <Button type="button" className="btn-primary" onClick={handleSubmit}>
              Update Progress
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  const GoalList = (props) => {
    const { data, onFlip, onDelete, cancelEdit, saveGoal } = props;
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
  
    const handleDragStart = (e, index) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.currentTarget);
    };
  
    const handleDragOver = (e, index) => {
      e.preventDefault();
      setDragOverIndex(index);
    };
  
    const handleDragEnd = () => {
      const newData = [...data];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(dragOverIndex, 0, draggedItem);
      props.onDataChange(newData);
      setDraggedIndex(null);
      setDragOverIndex(null);
    };
  
    return (
      <ul className="goal__list">
        {data.map((goal, index) => (
          <li
            key={goal.id}
            data-id={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <GoalCard
              goal={goal}
              onFlip={onFlip}
              onDelete={onDelete}
              cancelEdit={cancelEdit}
              saveGoal={saveGoal}
            />
          </li>
        ))}
      </ul>
    );
  };
  
  const App = () => {
    const [goals, setGoals] = useState([
      {
        id: 1,
        name: 'Vacation',
        description: 'A trip to the Bahamas',
        total: 2000,
        progress: 1200,
        color: '#2ecc71',
        percent: 0.6,
        category: 'plane',
        flipped: false,
        index: 0,
        amount: 2000,
      },
      {
        id: 2,
        name: 'New Car',
        description: 'A brand new Tesla Model S',
        total: 80000,
        progress: 32000,
        color: '#3498db',
        percent: 0.4,
        category: 'car',
        flipped: false,
        index: 1,
        amount: 80000,
      },
    ]);
  
    const onFlip = (index) => {
      setGoals((prevGoals) => {
        const newGoals = [...prevGoals];
        newGoals[index].flipped = !newGoals[index].flipped;
        return newGoals;
      });
    };
  
    const onDelete = (index) => {
      setGoals((prevGoals) => {
        const newGoals = [...prevGoals];
        newGoals.splice(index, 1);
        newGoals.forEach((goal, i) => (goal.index = i));
        return newGoals;
      });
    };
  
    const onDataChange = (newData) => {
      setGoals(newData.map((goal, index) => ({ ...goal, index })));
    };
  
    return (
      <div className="app-container">
        <h1>Goal Tracker</h1>
        <GoalList
          data={goals}
          onFlip={onFlip}
          onDelete={onDelete}
          cancelEdit={onFlip}
          saveGoal={onFlip}
          onDataChange={onDataChange}
        />
      </div>
    );
  };
  
  export default App;