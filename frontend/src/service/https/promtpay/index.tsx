import { PromtPayInterface } from "../../../interfaces/IPromtpay";

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

async function GetPayments() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/payments`, requestOptions);
}

async function GetPromptpays() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/promtpays`, requestOptions);
}

async function GetPromptpayById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/promtpay/${id}`, requestOptions);
}

async function CreatePromtpay(data: PromtPayInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/promtpays`, requestOptions);
}

async function UpdatePromptpay(data: PromtPayInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/promtpays`, requestOptions);
}

async function DeletePromptpayByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/promtpays/${id}`, requestOptions);
}

export { GetPayments, GetPromptpays, GetPromptpayById, CreatePromtpay, UpdatePromptpay, DeletePromptpayByID };
