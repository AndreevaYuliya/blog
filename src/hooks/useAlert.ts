import { useState } from "react";

import { SeverityType } from "../types/Alert";

const useAlert = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<SeverityType>("success");

  const showAlert = (message: string, severity: SeverityType = "success") => {
    setMessage(message);
    setSeverity(severity);
  };

  const closeAlert = () => {
    setMessage(null);
  };

  return { message, severity, showAlert, closeAlert };
};

export default useAlert;

