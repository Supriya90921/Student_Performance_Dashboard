import { useState } from "react";
import StudentCard from "./StudentCard";
import "./App.css";

const initialData = [
  {
    id: 1,
    name: "Raj",
    department: "Computer",
    semester: [
      {
        semester: "Sem 1",
        subjects: [
          { name: "Math", marks: 70 },
          { name: "Physics", marks: 82 },
          { name: "Programming", marks: 90 },
        ],
      },
      {
        semester: "Sem 2",
        subjects: [
          { name: "DBMS", marks: 85 },
          { name: "OS", marks: 78 },
          { name: "Java", marks: 88 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Simran",
    department: "IT",
    semester: [
      {
        semester: "Sem 1",
        subjects: [
          { name: "Math", marks: 60 },
          { name: "Physics", marks: 75 },
          { name: "Programming", marks: 95 },
        ],
      },
      {
        semester: "Sem 2",
        subjects: [
          { name: "DBMS", marks: 80 },
          { name: "OS", marks: 72 },
          { name: "Java", marks: 91 },
        ],
      },
    ],
  },
];

export default function App() {
  const [students, setStudents] = useState(initialData);
  const [filter, setFilter] = useState("ALL");

  // ---------- AVERAGE ----------
  const getAverage = (student) => {
    let total = 0;
    let count = 0;

    student.semester.forEach((sem) => {
      sem.subjects.forEach((sub) => {
        total += sub.marks;
        count++;
      });
    });

    return total / count;
  };

  // ---------- FILTER (SUBJECT LEVEL) ----------
  const filteredStudents = students.filter((student) => {
    const allSubjects = student.semester.flatMap(
      (sem) => sem.subjects
    );

    if (filter === "80") {
      return allSubjects.some((sub) => sub.marks > 80);
    }

    if (filter === "90") {
      return allSubjects.some((sub) => sub.marks > 90);
    }

    return true;
  });

  // ---------- +5 GRACE MARKS ----------
  const addGraceMarks = () => {
    const updated = students.map((s) => ({
      ...s,
      semester: s.semester.map((sem) => ({
        ...sem,
        subjects: sem.subjects.map((sub) => ({
          ...sub,
          marks: sub.marks + 5,
        })),
      })),
    }));

    setStudents(updated);
  };

  // ---------- TOP PERFORMER ----------
  let top = null;
  let max = 0;

  students.forEach((s) => {
    const avg = getAverage(s);
    if (avg > max) {
      max = avg;
      top = s;
    }
  });

  return (
    <div className="container">

      <h1>Student Dashboard</h1>

       {/* TOP PERFORMER */}
     <div className="top-performer">
     🎉 Top Performer
     <span>{top?.name} ({max.toFixed(1)})</span>
    </div>

      {/* FILTER */}
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All</option>
        <option value="80">Above 80</option>
        <option value="90">Above 90</option>
      </select>

      {/* +5 BUTTON */}
      <button onClick={addGraceMarks}>+5 Grace Marks</button>

     

      {/* STUDENTS */}
      {filteredStudents.map((student) => (
        <div key={student.id}>
          <StudentCard
            student={student}
            filter={filter}
          />

          <p>Average: {getAverage(student).toFixed(1)}</p>
        </div>
      ))}

    </div>
  );
}