import { useEffect, useState } from "react";
import { getAllRegistrations } from "../services/propertyRegistrationService";

export default function AdminRegistrations() {

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {

    loadRegistrations();

  }, []);

  async function loadRegistrations() {

    try {

      const response = await getAllRegistrations();

      console.log(response);

      setRegistrations(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Property Registration Requests
      </h1>

      <pre>
        {JSON.stringify(registrations, null, 2)}
      </pre>

    </div>
  );
}