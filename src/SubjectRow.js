function SubjectRow({ subject, maxMarks }) {
  return (
    <div className={`subject-row ${subject.marks === maxMarks ? "top" : ""}`}>
      <span>{subject.name}</span>
      <span>{subject.marks}</span>
    </div>
  );
}

export default SubjectRow;