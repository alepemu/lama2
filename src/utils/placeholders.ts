const noteInputText = {
  note: {
    manual: "e.g. Note to remember...",
    ai: "e.g. Definition of closure...",
  },
  list: {
    manual: "e.g. List of tasks...",
    ai: "e.g. Steps to boil an egg...",
  },
};

const missingNote = {
  typeId: 0,
  title: "Error",
  text: "Missing note and/or data",
};

const backgroundColor = {
  default: ["#57534e", "#44403c"],
  blue: ["#4d5e7f", "#3e4e6f"],
  cyan: ["#115e59", "#134e4a"],
  orange: ["#7f5e4d", "#6f4e3e"],
};

export { noteInputText, missingNote, backgroundColor };
