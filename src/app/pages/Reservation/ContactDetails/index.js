import React, {useCallback, useState} from "react";

function ContactDetails({ currentStep }) {
    const [password, setPassword] = useState('');

    const handleChange = useCallback(() => {
        setPassword(
            '0244996826ly'
        )
    }, []);

    return (
        (currentStep === 3) &&
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={password} // Prop: The email input data
                onChange={handleChange} // Prop: Puts data into state
            />
        </div>
    )
}

export default ContactDetails