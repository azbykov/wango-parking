// client/src/pages/StartParkingPage.tsx
import React from 'react'

export default function StartParkingPage() {
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
                    <form>
                        <div className="form-row">
                            <div className="form-group col-lg-4">
                                <select className="form-control wide">
                                    <option>Choose city</option>
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <select className="form-control wide">
                                    <option>Choose parking area</option>
                                </select>
                            </div>

                            <div className="form-group col-lg-4">
                                <button type="submit" className="btn btn-danger w-100">
                                    PAY WITH WANGO
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
