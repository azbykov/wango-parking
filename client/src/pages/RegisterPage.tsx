import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthStore } from '../store/authStore';
import axios from '../api/api-request';

export default function RegisterPage() {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const [form, setForm] = useState({
        email: '',
        fullName: '',
        address: '',
        carPlate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/register', form);
            const success = await login(form.email, form.carPlate);
            if (success) {
                navigate('/');
            } else {
                toast.error('Login after register failed');
            }
        } catch (err) {
            toast.error('Registration failed');
            console.error(err);
        }
    }

    return (
        <section className="slider_section">
            <div className="container">
                <div className="detail-box">
                    <h1>Register</h1>
                </div>

                <div className="find_container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-lg-6">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <input
                                    type="text"
                                    name="carPlate"
                                    className="form-control"
                                    placeholder="Car Plate"
                                    value={form.carPlate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-12">
                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
