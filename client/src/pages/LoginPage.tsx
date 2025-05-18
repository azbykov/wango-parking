import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [form, setForm] = useState({
        email: '',
        carPlate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(form.email, form.carPlate);
        if (success) {
            navigate('/');
        } else {
            toast.error('Login failed');
        }
    };

    return (
        <section className="slider_section">
            <div className="container">
                <div className="detail-box">
                    <h1>Login</h1>
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
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
