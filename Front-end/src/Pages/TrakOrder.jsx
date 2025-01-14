import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bell } from 'lucide-react';

const TrackOrder = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/${id}`)
            .then((response) => {
                setOrderData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching order data:', error);
            });
    }, [id]);

    const statusEnum = [
        { value: "en-preparation", label: "En préparation", formelDescription: "En préparation - Votre commande est en cours de préparation", informelDescription: "En préparation - rta7 db N3lmok b la commande dyalk" },
        { value: "prêt", label: "Prêt", formelDescription: "Prêt - Votre commande est prête à être récupérée.", informelDescription: "Prêt - Doz Takhed La commande dyalk" },
        { value: "livré", label: "Livré", formelDescription: "Livré - Bon appetit", informelDescription: "Livré - Bseeha" },
        { value: "annulé", label: "Annulé", formelDescription: "Annulé - Votre commande a été annulée", informelDescription: "Annulé - Machi Mochkil 3awed Rje3 " }
    ];

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            setShowPermissionModal(true); // Show the modal if permission is not granted
        }
    }, []);

    const handlePermissionRequest = async () => {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission); // Update the state with the new permission value
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.warn('Notification permission denied.');
        }
        setShowPermissionModal(false); // Close the modal after requesting permission
    };

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/order-status/${id}/track-order`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setOrderData(data.order);
            const status = statusEnum.find(status => status.value === data.order.status);
            if (status) {
                let toastClass = '';
                switch (status.value) {
                    case 'en-preparation':
                        toastClass = 'text-gray-500';
                        break;
                    case 'prêt':
                        toastClass = 'text-yellow-500';
                        break;
                    case 'livré':
                        toastClass = 'text-green-500';
                        break;
                    case 'annulé':
                        toastClass = 'text-red-500';
                        break;
                    default:
                        toastClass = 'bg-gray-500 text-white';
                }

                toast(status.formelDescription, {
                   className: `${toastClass} rounded-lg p-4`,
                });

                if (Notification.permission === 'granted') {
                    new Notification('Statut de la commande', {
                        body: status.formelDescription,
                    });
                }
            }
        };

        eventSource.onerror = (error) => {
            console.error('Échec de EventSource :', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [id, statusEnum]);

    const GetStyleOfStatus = (status) => {
        switch (status) {
            case 'en-preparation':
                return 'bg-gray-200 text-gray-800';
            case 'prêt':
                return 'bg-yellow-200 text-yellow-800';
            case 'livré':
                return 'bg-green-200 text-green-800';
            case 'annulé':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Permission Modal */}
            {showPermissionModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Autoriser les notifications</h2>
                        <p className="mb-4">Nous aimerions vous envoyer des notifications pour les mises à jour de votre commande.</p>
                        <div className="flex justify-end">
                            <button
                                onClick={handlePermissionRequest}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Autoriser
                            </button>
                            <button
                                onClick={() => setShowPermissionModal(false)}
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Permission Button */}
            {notificationPermission !== 'granted' && !showPermissionModal && (
                <div className="fixed bottom-4 right-4">
                    <button
                        onClick={handlePermissionRequest}
                        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-lg flex items-center justify-center"
                        title="Autoriser les notifications"
                    >
                        <Bell className="w-6 h-6" />
                    </button>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="fixed w-full p-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />

            {orderData ? (
                <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                    {orderData.qrCode && (
                        <div className="flex flex-col items-center justify-center mt-6 mb-4 border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold mb-2">Numero de commande :{orderData.id}</h2>
                            <img src={orderData.qrCode} alt="Code QR" className="w-60 h-60" />
                        </div>
                    )}
                    <div className="mb-6 text-center">
                        <p>
                            <strong>Statut : </strong>
                            <span className={`p-2 rounded-3xl min-w-[90px] inline-block ${GetStyleOfStatus(orderData.status)}`}>{orderData.status}</span>
                        </p>
                        <p className='mt-4'><strong>Prix Total :</strong> {orderData.totalPrice} DH</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
                        <div className="border border-gray-200 rounded-lg p-4">
                            {orderData.products.map((product, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                    <div className="flex-1">
                                        <p className="font-medium">{product.product.name}</p>
                                        <p className="text-sm text-gray-600">Quantité : {product.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{product.price} DH</p>
                                        <p className="text-sm text-gray-600">Total : {product.totalPrice} DH</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[80vh]">
                    <p className="text-gray-600">En attente de nouvelles commandes...</p>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;