import { useEffect } from 'react';
import { useParkingStore } from '../store/parkingStore';

export default function ParkingHistoryPage() {
    const { allSessions, fetchAllSessions, stopParking, loading } = useParkingStore();

    useEffect(() => {
        fetchAllSessions();
    }, [fetchAllSessions]);

    const handleStop = async () => {
        await stopParking();
        fetchAllSessions();
    };

    return (
        <section className="slider_section">
            <div className="container">
                <div className="detail-box">
                    <h1>Parking History</h1>
                </div>

                <div className="find_container">
                    {allSessions.length === 0 ? (
                        <p>No parking sessions found.</p>
                    ) : (
                        <div className="list-group">
                            {allSessions.map(session => (
                                <div
                                    key={session._id}
                                    className="list-group-item mb-2 p-3 d-flex justify-content-between align-items-center bg-white text-dark rounded"
                                >
                                    <div>{session.area.city.name}</div>
                                    <div>{session.area.name}</div>
                                    <div>{new Date(session.startTime).toLocaleTimeString()}</div>
                                    <div>
                                        {session.endTime
                                            ? new Date(session.endTime).toLocaleTimeString()
                                            : <button onClick={handleStop} className="btn btn-danger btn-sm" disabled={loading}>
                                                {loading ? 'Stopping...' : 'Stop'}
                                            </button>}
                                    </div>
                                    <div>{session.price ? `$${session.price}` : '-'}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
