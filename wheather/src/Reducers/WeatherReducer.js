export default function lanReducer(currentStates, action) {
  switch (action.type) {
    case "langue": {
      if (currentStates.langue == "ar") {
        return { ...currentStates, timelanguage: "en", langue: "en", arabe: false };
      } else {
        return { ...currentStates, timelanguage: "ar-dz", langue: "ar", arabe: true };
      }
    }
    default: {
      return { langue: "ar", timelanguage: "ar-dz", arabe: true };
    }
  }
}

