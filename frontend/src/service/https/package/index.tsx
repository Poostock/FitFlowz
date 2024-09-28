import { PackageInterface } from "../../../interfaces/IPackage";

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

async function GetPackages() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/packages`, requestOptions);
}

async function GetPackageById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/package/${id}`, requestOptions);
}

async function CreatePackage(data: PackageInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/packages`, requestOptions);
}

async function UpdatePackage(data: PackageInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/packages`, requestOptions);
}

async function DeletePackageByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/packages/${id}`, requestOptions);
}

async function DeletePackageByName(name: string | undefined) {
    if (name === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/packages/${name}`, requestOptions);
}

export { GetPackages, GetPackageById, CreatePackage, UpdatePackage, DeletePackageByID,DeletePackageByName };
