import { AdminsInterface } from "../../../interfaces/IAdmin";

const apiUrl = "http://localhost:3036";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

async function GetAdmins() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/admins`, requestOptions);
}

async function GetAdminById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/admin/${id}`, requestOptions);
}

async function CreateAdmin(data: AdminsInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/admins`, requestOptions);
}

async function UpdateAdmin(data: AdminsInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/admins`, requestOptions);
}

async function DeleteAdminByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/admins/${id}`, requestOptions);
}

async function CheckSubscription(memberId: number | undefined) {
    // If the memberId is undefined, return false
    if (memberId === undefined) return false;

    const requestOptions = {
        method: "POST",
    };

    // Change the endpoint to match your subscription check API
    return await fetchData(`${apiUrl}/members/${memberId}/subscribe`, requestOptions);
}

export { GetAdmins, GetAdminById, CreateAdmin, UpdateAdmin, DeleteAdminByID, CheckSubscription };
