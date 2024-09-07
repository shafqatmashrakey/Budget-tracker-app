'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './styles.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("mkndvzyq");

  if (state.succeeded) {
      return <p>Message recieved! We will get back to you soon!</p>;
  }

  return (
    <div>
      <div className="py-6 font-bold bg-stone-400 text-center"></div>
    <form className="py-6" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />
      
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      
      <label htmlFor="phone">Phone Number:</label>
      <input
        id="phone"
        type="tel" 
        name="phone"
      />
      <ValidationError 
        prefix="Phone Number" 
        field="phone"
        errors={state.errors}
      />
      
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
    </div>
  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;
