import SemesterBlock from "./SemesterBlock";

export default function StudentCard({ student, filter }) {
  return (
    <div className="student-card">
      <h2>{student.name} ({student.department})</h2>

      {student.semester.map((sem, i) => (
        <SemesterBlock
          key={i}
          sem={sem}
          filter={filter}   
        />
      ))}
    </div>
  );
}