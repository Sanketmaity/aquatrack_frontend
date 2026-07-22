import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { validateActivationToken } from "../../services/propertyAdminService";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../../services/propertyAdminService";

export default function PropertyAdminActivation() {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        async function validate() {

            try {

                const response =
                    await validateActivationToken(token);

                setUser(response.data);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Invalid activation link."
                );

            } finally {

                setLoading(false);

            }

        }

        if (token) {

            validate();

        } else {

            setLoading(false);

            setError("Activation token is missing.");

        }

    }, [token]);

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Validating activation link...
            </div>
        );

    }

    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );

    }

    async function handleSubmit() {

    if (!password || !confirmPassword) {

        alert("Please fill all fields.");

        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    try {

        setSubmitting(true);

        await setPassword({

            token,
            password,
            confirmPassword,

        });

        alert("Account activated successfully.");

        navigate("/login");

    } catch (error) {

        alert(

            error.response?.data?.message ||

            "Failed to activate account."

        );

    } finally {

        setSubmitting(false);

    }

}

   return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-slate-800">

                Create Password

            </h2>

            <p className="mt-2 text-slate-500">

                Welcome <strong>{user.firstName}</strong>

            </p>

            <div className="mt-8 space-y-5">

                <div>

                    <label className="mb-2 block font-medium">

                        Password

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-600
                        "

                    />

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Confirm Password

                    </label>

                    <input

                        type="password"

                        value={confirmPassword}

                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }

                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            focus:border-blue-600
                        "

                    />

                </div>

                <button

    onClick={handleSubmit}

    disabled={submitting}

    className="
        w-full
        rounded-xl
        bg-blue-600
        py-3
        font-semibold
        text-white
        hover:bg-blue-700
        disabled:opacity-60
    "

>

    {submitting

        ? "Activating..."

        : "Activate Account"

    }

</button>

            </div>

        </div>

    </div>

);

}