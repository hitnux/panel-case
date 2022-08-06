import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Box, Stepper, Step, StepLabel, StepContent, Button, Typography } from '@mui/material';
import Layout from "../../components/layout";
import AlertModal from '../../components/alert'
import './index.scss';

const steps = [
    {
        name: 'New',
        label: 'Yeni Sipariş',
        description: 'Sipariş hazırlanıyor.'
    },
    {
        name: 'Process',
        label: 'Kurye Yolda',
        description: 'Kurye siparişi teslim etmek için yola çıktı.'
    },
    {
        name: 'Completed',
        label: 'Tamamlandı',
        description: 'Sipariş başarıyla teslim edildi.'
    }
];

const OrderDetail = () => {
    const orders = useSelector((state) => state.orders.value)
    const { Id } = useParams();
    const order = orders.find(o => o.id === parseInt(Id));
    const [activeStep, setActiveStep] = React.useState(steps.findIndex(s => s.name === order.state));
    const [alert, setAlert] = React.useState(false);

    const handleNext = () => {
        if (false) {
            /* fake user.role control */
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setAlert(true);
        }
    };
    const alertChange = () => {
        setAlert(false);
    }
    return (
        <Layout>
            <div className='order-detail'>
                <div className='order-detail__step'>
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
                    <li className='info-box'>
                        <div className='info-box__title'>Sipariş Bilgileri</div>
                        <div className='order-info'>
                            <p>
                                <b>Sipariş Id:</b> <span>{Id}</span>
                            </p>
                            <p>
                                <b>Tarih:</b> <span>{new Date(order.date).toLocaleDateString("tr-TR")}</span>
                            </p>
                            <p>
                                <b>Sipariş Notu:</b> <span>{order.note}</span>
                            </p>
                            <p>
                                <b>Tutar: </b> <span>{`${order.total.toFixed(2).replace('.', ',')} TL`}</span>
                            </p>
                        </div>
                    </li>
                    <li className='info-box'>
                        <div className='info-box__title'>Müşteri Bilgileri</div>
                        <div className='customer-info'>
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
            {alert &&
                <AlertModal state={alert} onChange={alertChange}>Sipariş tamamlama işlemi yalnızca kuryeler tarafından gerçekleştirilebilir</AlertModal>
            }
        </Layout>
    )
}
export default OrderDetail;