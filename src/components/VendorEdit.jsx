import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import VendorDetails from "./VendorDetails";

const API_URL = "http://localhost:5005/api/vendors";
const DEFAULT_VENDOR_FORM_VALUES = {
    name: "",
    location: "",
    URL: "",
    description: "",
    typeOfService: "",
    email: "",
    phoneNumber: "",
};

function VendorEdit() {
    const [vendor, setVendor] = useState({ ...DEFAULT_VENDOR_FORM_VALUES });
    const [loading, setLoading] = useState(true);
    const { vendorId } = useParams();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { ...vendor };

        setLoading(true);

        axios
            .put(`${API_URL}/${vendor._id}`, requestBody)
            .then(() => {
                navigate(`/VendorDetails/${vendor._id}`);
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
        setVendor((prevVendor) => ({
            ...prevVendor,
            [name]: inputValue,
        }));
    };

    useEffect(() => {
        const getVendor = () => {
            axios
                .get(`${API_URL}/${vendorId}`)
                .then((response) => {
                    const vendorData = response.data;
                    setVendor(vendorData);
                })
                .catch((error) => console.log(error));
        };

        getVendor();
        setLoading(false);
    }, [vendorId]);

    return (
        <div>
            <h3>Edit vendor</h3>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" value={vendor.name} onChange={handleChange} />

                <label>Location: </label>
                <input type="text" name="location" value={vendor.location} onChange={handleChange} />

                <label>URL: </label>
                <input type="text" name="URL" value={vendor.URL} onChange={handleChange} />

                <label>Description: </label>
                <input type="text" name="description" value={vendor.description} onChange={handleChange} />
                
                <label>TypeOfService: </label>
                <select name="typeOfService" value={vendor.typeOfService} onChange={handleChange}>
                    <option value="Decoration">Decoration</option>
                    <option value="Photographer">Photographer</option>
                    <option value="Music">Music</option>
                    <option value="Food">Food</option>
                    <option value="Beauty & Health">Beauty & Health</option>
                    <option value="Officials">Officials</option>
                    <option value="Location">Location</option>
                    <option value="Dress & Accessories">Dress & Accessories</option>
                    <option value="Invitations">Invitations</option>
                    <option value="Gifts">Gifts</option>
                </select>
                

                <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out">Save</button>
            </form>
        </div>
    );
};

export default VendorEdit;
