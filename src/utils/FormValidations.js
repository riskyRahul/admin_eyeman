import { emailRegex, nameRegex } from ".";

export const validateField = (field, value) => {
  if (field === "name") {
    if (!value.trim()) return "Name is required";
    if (!nameRegex.test(value)) return "Name must contain only letters";
    return "";
  }
  if (field === "description") {
    if (!value.trim()) return "Description is required";
    // if (!nameRegex.test(value)) return "Company Name must contain only letters";
    return "";
  }
//   if (field === "email") {
//     if (!value.trim()) return "Email is required";
//     if (!emailRegex.test(value)) return "Enter a valid email address";
//     return "";
//   }
//   if (field === "category") {
//     if (!value.trim()) return "Category is required";
//     // if (!nameRegex.test(value)) return "Category must contain only letters";
//     return "";
//   }
//   if (field === "applicant") {
//     if (!value.trim()) return "Applicant is required";
//     // if (!nameRegex.test(value)) return "Applicant must contain only letters";
//     return "";
//   }
//   if (field === "intake") {
//     if (!value.trim()) return "Intake is required";
//     // if (!nameRegex.test(value)) return "Intake must contain only letters";
//     return "";
//   }
//   if (field === "caseName") {
//     if (!value.trim()) return "Case Name is required";
//     if (!nameRegex.test(value)) return "Case Name must contain only letters";
//     return "";
//   }
  return "";
};
