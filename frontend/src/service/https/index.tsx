import { BookingInterface } from "../../interfaces/IBooking";
import { ClassesInterface } from "../../interfaces/IClass";
import { ClassTypesInterface } from "../../interfaces/IClassType";

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

async function GetClasses() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/classes`, requestOptions);
}

async function GetClassById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/class/${id}`, requestOptions);
}

async function CreateClass(data: ClassesInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/classes`, requestOptions);
}

async function UpdateClass(data: ClassesInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/classes`, requestOptions);
}

async function DeleteClassByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/classes/${id}`, requestOptions);
}

// ---------------------------------------------ClassType---------------------------------------------------

async function GetClassTypes() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/classtypes`, requestOptions);
}

async function GetClassTypeById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/classtype/${id}`, requestOptions);
}

async function CreateClassType(data: ClassTypesInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/classtypes`, requestOptions);
}

async function UpdateClassType(data: ClassTypesInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/classtypes`, requestOptions);
}

async function DeleteClassTypesByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/classtypes/${id}`, requestOptions);
}

// ----------------------------------------------------------------Trainer--------------------------------
async function GetTrainers() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/trainers`, requestOptions);
}

async function GetTrainerById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/trainer/${id}`, requestOptions);
}

async function CreateTrainer(data: ClassTypesInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/trainers`, requestOptions);
}

async function UpdateTrainer(data: ClassTypesInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/trainers`, requestOptions);
}

async function DeleteTrainerByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/trainers/${id}`, requestOptions);
}
// -------------------------------------------------Admin--------------- --------------------------------
async function GetAdmins() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/admins`, requestOptions);
}

//--------------------------------------------------Booking---------------------------------------------------
async function GetBooking() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/classes`, requestOptions);
}

async function GetBookingId(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/class/${id}`, requestOptions);
}

async function CreateBooking(data: BookingInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/bookings`, requestOptions);
}

async function UpdateBooking(data: BookingInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/classes`, requestOptions);
}

async function DeleteBookingID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/classes/${id}`, requestOptions);
}

export { GetClasses, GetClassById, CreateClass, UpdateClass, DeleteClassByID, GetClassTypes, CreateClassType, GetClassTypeById, UpdateClassType, DeleteClassTypesByID, GetTrainers, GetTrainerById, CreateTrainer, UpdateTrainer, DeleteTrainerByID, GetAdmins, GetBooking, GetBookingId, CreateBooking, UpdateBooking, DeleteBookingID };