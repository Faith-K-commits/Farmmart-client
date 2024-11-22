import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, setRole, setLoading, setError, setSuccess, clearMessages } from '../components/UserSlice';

const CustomerRegister = () => {
    const dispatch = useDispatch();
    const { name, email, password, role, loading, error, success } = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(clearMessages()); // Clear any previous messages before submitting

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });
            const result = await response.json();
            if (response.ok) {
                dispatch(setSuccess(true));
                dispatch(setError(null));
            } else {
                dispatch(setError(result.error || 'Registration failed'));
            }
        } catch (err) {
            dispatch(setError('An error occurred'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => dispatch(setName(e.target.value))} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} required />
            <button type="submit" disabled={loading}>Register as Customer</button>
            {error && <p>{error}</p>}
            {success && <p>Registration Successful!</p>}
        </form>
    );
};

export default CustomerRegister;
