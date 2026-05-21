import SubjectRow from "./SubjectRow";

export default function SemesterBlock({ sem, filter }) {

  const maxMarks = Math.max(
    ...sem.subjects.map((s) => s.marks)
  );

  const filteredSubjects = sem.subjects.filter((sub) => {
    if (filter === "80") return sub.marks > 80;
    if (filter === "90") return sub.marks > 90;
    return true;
  });

  if (filteredSubjects.length === 0) return null;

  return (
    <div className="semester-block">
      <h3>{sem.semester}</h3>

      {filteredSubjects.map((sub, i) => (
        <SubjectRow
          key={i}
          subject={sub}
          maxMarks={maxMarks}
        />
      ))}
    </div>
  );
}