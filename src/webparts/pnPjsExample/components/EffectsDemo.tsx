import { useState, useEffect } from "react";
import * as React from 'react';

export function Counter() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      setTimeout(() => {
        console.log(`You clicked ${count} times`);
      }, 3000);
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }