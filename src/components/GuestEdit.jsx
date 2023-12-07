import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GuestDetails from "./GuestDetails";

const API_URL = "http://localhost:5005/api/guests";
const DEFAULT_GUEST_FORM_VALUES = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phoneNumber: "",
    notes: "",
    attending: "",
};

function GuestEdit() {
    const [guest, setGuest] = useState({ ...DEFAULT_GUEST_FORM_VALUES });
    const [loading, setLoading] = useState(true);
    const { guestId } = useParams();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { ...guest };

        setLoading(true);

        axios
            .put(`${API_URL}/${guest._id}`, requestBody)
            .then(() => {
                navigate(`/GuestDetails/${guest._id}`);
            })
            .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
        const { name, value, type, checked, options, multiple } = e.target;

        let inputValue = type === "checkbox" ? checked : value;

        if (multiple && options) {
            inputValue = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    inputValue.push(options[i].value);
                }
            }
        }
        setGuest((prevGuest) => ({
            ...prevGuest,
            [name]: inputValue,
        }));
    };

    useEffect(() => {
        const getGuest = () => {
            axios
                .get(`${API_URL}/${guestId}`)
                .then((response) => {
                    const guestData = response.data;
                    setGuest(guestData);
                })
                .catch((error) => console.log(error));
        };

        getGuest();
        setLoading(false);
    }, [guestId]);

    return (
        <div>
            <h3>Edit guest</h3>
            <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <input type="text" name="firstName" value={guest.firstName} onChange={handleChange} />

                <label>Last Name: </label>
                <input type="text" name="lastName" value={guest.lastName} onChange={handleChange} />

                <label>Age: </label>
                <select name="age" value={guest.age} onChange={handleChange}>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                    <option value="Baby">Baby</option>
                </select>

                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={guest.email}
                    onChange={handleChange}
                />
                
                <label>Phone Number: </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={guest.phoneNumber}
                    onChange={handleChange}
                />
                
                <label>Notes: </label>
                <textarea
                    name="notes"
                    value={guest.notes}
                    onChange={handleChange}
                ></textarea>
                
                <label>Attending: </label>
                <select
                    name="attending"
                    value={guest.attending}
                    onChange={handleChange}
                >
                    <option value="Attending">Attending</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                </select>
                <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out">Save</button>
            </form>
        </div>
    );
};

export default GuestEdit;
