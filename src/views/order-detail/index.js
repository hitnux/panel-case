import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel, StepContent, Button, Typography, Snackbar, Alert } from '@mui/material';
import { formatDate, formatCurrency } from '../../utils/format';
import { findOrder } from '../../store/reducers/orders';
import Layout from '../../components/layout';
import steps from '../../static/steps'
import './index.scss';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const { Id } = useParams();

    dispatch(findOrder(Id));

    const order = useSelector((state) => state.orders.currentOrder);
    const [activeStep, setActiveStep] = useState(steps.findIndex(s => s.name === order.state));
    const [alert, setAlert] = useState(false);

    const handleNext = () => {
        if (false) {
            /* fake user.role control */
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setAlert(true);
        }
    };

    return (
        <Layout>
            <div className="order-detail">
                <div className="order-detail__step">
                    <h5>Sipariş Durumu</h5>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel>{step.label}</StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                {index < steps.length - 1 &&
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Siparişi Tamamla
                                                    </Button>
                                                }
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
                <ul>
                    <li className="info-box">
                        <div className="info-box__title">Sipariş Bilgileri</div>
                        <div className="order-info">
                            <p>
                                <b>Sipariş Id:</b> <span>{Id}</span>
                            </p>
                            <p>
                                <b>Tarih:</b> <span>{formatDate(order.date)}</span>
                            </p>
                            <div>
                                <b>Sipariş İçeriği:</b>
                                <div>
                                    {order.products.map((prd, i) =>
                                        <div key={`prd${i}`}>{prd}</div>
                                    )}
                                </div>
                            </div>
                            <p>
                                <b>Sipariş Notu:</b> <span>{order.note}</span>
                            </p>
                            <p>
                                <b>Tutar: </b> <span>{formatCurrency(order.total)}</span>
                            </p>
                        </div>
                    </li>
                    <li className="info-box">
                        <div className="info-box__title">Müşteri Bilgileri</div>
                        <div className="customer-info">
                            <p>
                                <b>Ad Soyad:</b> <span>{`${order.user.name} ${order.user.surname}`}</span>
                            </p>
                            <p>
                                <b>Adres:</b> <span>{order.user.address}</span>
                            </p>

                        </div>
                    </li>
                </ul>
            </div>
            <Snackbar open={alert} autoHideDuration={3000} onClose={() => { setAlert(false) }} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
                <Alert onClose={() => { setAlert(false) }} severity="error" sx={{ width: '100%' }}>
                    Sipariş tamamlama işlemi yalnızca kuryeler tarafından gerçekleştirilebilir
                </Alert>
            </Snackbar>
        </Layout>
    )
}
export default OrderDetail;
