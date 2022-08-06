import { Alert } from '@mui/material';

const AlertModal = ({ children, state, onChange, time = 3000 }) => {
    setTimeout(() => {
        onChange();
    }, time);

    return (
        <>
            {state &&
                <div className='alert-modal'>
                    <Alert variant="filled" severity="error">
                        {children}
                    </Alert>
                </div>
            }
        </>
    )
}
export default AlertModal;