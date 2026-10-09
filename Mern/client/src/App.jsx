import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState('');

  const [course, setCourse] = useState('');

  const [age, setAge] = useState('');

  const [editingId, setEditingId] = useState(null);


  const fetchStudents = async () => {

    try {

      const response = await axios.get('http://localhost:5000/students');

      setStudents(response.data);

    } catch (error) {

      console.error('Error fetching students:', error);

    }

  };

  useEffect(() => {

    fetchStudents();

  }, []);
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        // UPDATE Request

        await axios.put(`http://localhost:5000/students/${editingId}`, {

          name,

          course,

          age,

        });

        setEditingId(null);

      } else {

        // CREATE Request

        await axios.post('http://localhost:5000/students', {

          name,

          course,

          age,

        });

      }
      setName('');

      setCourse('');

      setAge('');

      fetchStudents();

    } catch (error) {

      console.error('Error saving student:', error);

    }

  };

  const handleEdit = (student) => {

    setEditingId(student._id);

    setName(student.name);

    setCourse(student.course);

    setAge(student.age);

  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/students/${id}`);

      fetchStudents();

    } catch (error) {

      console.error('Error deleting student:', error);

    }

  };

  return (
<div style={{ padding: '20px', fontFamily: 'Arial' }}>
<h2>Student Management System</h2>

<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
<div>
<label>Name: </label>
<input

            type="text"

            value={name}

            onChange={(e) => setName(e.target.value)}

            required

          />
</div>
<div style={{ marginTop: '10px' }}>
<label>Course: </label>
<input

            type="text"

            value={course}

            onChange={(e) => setCourse(e.target.value)}

            required

          />
</div>
<div style={{ marginTop: '10px' }}>
<label>Age: </label>
<input

            type="number"

            value={age}

            onChange={(e) => setAge(e.target.value)}

            required

          />
</div>
<button type="submit" style={{ marginTop: '10px' }}>

          {editingId ? 'Update Student' : 'Add Student'}
</button>

        {editingId && (
<button

            type="button"

            onClick={() => {

              setEditingId(null);

              setName('');

              setCourse('');

              setAge('');

            }}

            style={{ marginLeft: '10px', marginTop: '10px' }}
>

            Cancel
</button>

        )}
</form>

      {/* Student List (READ Display) */}
<h3>Student List</h3>
<ul>

        {students.map((student) => (
<li key={student._id} style={{ marginBottom: '10px' }}>

            {student.name} - {student.course} - {student.age} years old{' '}
<button onClick={() => handleEdit(student)}>Edit</button>{' '}
<button onClick={() => handleDelete(student._id)}>Delete</button>
</li>

        ))}
</ul>
</div>

  );

}

export default App;