import { useEffect } from 'react';
import { useCityStore } from '../store/cityStore';
import { useParkingStore } from '../store/parkingStore';

export default function StartParkingPage() {
    const {
        cities,
        areas,
        selectedCity,
        selectedArea,
        fetchCities,
        fetchAreas,
        setCity,
        setArea
    } = useCityStore();

    const {
        activeSession,
        loading,
        startParking,
        stopParking
    } = useParkingStore();

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    useEffect(() => {
        if (selectedCity) {
            fetchAreas(selectedCity);
        }
    }, [selectedCity, fetchAreas]);

    const handleStart = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedArea || activeSession) {
            return;
        }
        localStorage.setItem('selectedArea', selectedArea);
        await startParking();
    };

    const handleStop = async () => {
        await stopParking();
    };

    return (
        <section className="slider_section">
            <div className="container">
                <div className="detail-box">
                    <h1>Park your car</h1>
                    <p>
                        After choosing the city please choose the parking area and hit "Pay with Wango" button.
                    </p>
                </div>

                <div className="find_container">
                    {activeSession ? (
                        <div className="text-center">
                            <p className="mb-3">
                                Parking in <strong>{activeSession.area.name}</strong>, <strong>{activeSession.area.city.name}</strong>
                            </p>
                            <button onClick={handleStop} className="btn btn-danger w-100" disabled={loading}>
                                {loading ? 'Stopping...' : 'Stop Parking'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleStart}>
                            <div className="form-row">
                                <div className="form-group col-lg-4">
                                    <select
                                        className="form-control wide"
                                        value={selectedCity}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="">Choose city</option>
                                        {cities.map(city => (
                                            <option key={city._id} value={city._id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-lg-4">
                                    <select
                                        className="form-control wide"
                                        value={selectedArea}
                                        onChange={(e) => setArea(e.target.value)}
                                        disabled={!selectedCity}
                                    >
                                        <option value="">Choose parking area</option>
                                        {areas.map(area => (
                                            <option key={area._id} value={area._id}>{area.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-lg-4">
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                        disabled={loading || !!activeSession}
                                    >
                                        {loading ? 'Starting...' : 'Pay with Wango'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
