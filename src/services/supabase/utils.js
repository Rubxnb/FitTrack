export const routineModel = (routine) => {
  const formattedDate = {};
  routine.forEach((r) => {
    const ExerciseID = r.ExerciseID;
    if(formattedDate[ExerciseID]) {
      formattedDate[ExerciseID].push(r);
    } else {
      formattedDate[ExerciseID] = [r];
    }
  });

  return formattedDate;
}
