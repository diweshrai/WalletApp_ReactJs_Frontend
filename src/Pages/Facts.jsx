import React, { useState } from 'react'

const Facts = () => {
    const [checkboxes, setCheckboxes] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
      });
    
      const handleCheckboxChange = (name) => {
        setCheckboxes({
          ...checkboxes,
          [name]: !checkboxes[name],
        });
      };
    
      const handleInputChange = (name, value) => {
        setCheckboxes({
          ...checkboxes,
          [name]: value,
        });
      };
    
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Checkbox</th>
              <th>Input</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(checkboxes).map((name) => (
              <tr key={name}>
                <td>{name.charAt(0).toUpperCase() + name.slice(1)}</td>
                <td>
                  <input
                    type="checkbox"
                    name={name}
                    checked={checkboxes[name]}
                    onChange={() => handleCheckboxChange(name)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={name}
                    value={checkboxes[name] || ''}
                    onChange={(e) => handleInputChange(name, e.target.value)}
                 
                 style={{border:'solid'}}
                 
                 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

export default Facts
