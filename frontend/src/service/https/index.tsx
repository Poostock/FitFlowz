import { SignInInterface } from "../../interfaces/ISignIn";

const apiUrl = "http://localhost:3036";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Return `true` for a `204 No Content` response, otherwise return JSON
        if (response.status === 204) {
            return true;
        }

        // Handle other cases where the response contains JSON
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow the error
    }
};

async function SignIn(data: SignInInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    try {
        const result = await fetchData(`${apiUrl}/login`, requestOptions);
        return result;
    } catch (error) {
        console.error("SignIn failed:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

async function CountMembers() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/members/count`, requestOptions);
}

async function CountClasses() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/classes/count`, requestOptions);
}

async function CountStaffs() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/staffs/count`, requestOptions);
}



export { SignIn, CountMembers, CountClasses, CountStaffs };
