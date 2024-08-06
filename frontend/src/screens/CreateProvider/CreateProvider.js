import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './CreateProvider.module.scss';
import Input from "../../components/Input/Input";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
import Button from '../../components/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateProvider() {
    //nome, logo, estado de origem, custo por kWh, limite mínimo de kWh, número total de clientes e avaliação média dos clientes
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [kwhCost, setKwhCost] = useState('');
    const [minimumLimit, setMinimumLimit] = useState('');
    const [totalClients, setTotalClients] = useState('');
    const [clientRate, setClientRate] = useState('');
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            // const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
            const response = await axios.post(`${process.env.VITE_API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.url; // assuming the response contains the URL of the uploaded file
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };
    const handleOnSave = async () => {
        setLoading(true);
        let newLogoUrl = '';
        if (file) {
            newLogoUrl = await uploadFile(file);
        }
        const mutation = `
            mutation AddProvider(
                $clientRate: String!,
                $kwhCost: String!,
                $minimumLimit: String!,
                $name: String!,
                $state: String!,
                $totalClients: String!,
                $logoUrl: String!
            ) {
                addProvider(
                    clientRate: $clientRate,
                    kwhCost: $kwhCost,
                    minimumLimit: $minimumLimit,
                    name: $name,
                    state: $state,
                    totalClients: $totalClients,
                    logoUrl: $logoUrl
                ) {
                    clientRate
                    kwhCost
                    minimumLimit
                    name
                    state
                    totalClients
                    logoUrl
                }
            }
        `;
        const variables = {
            clientRate,
            kwhCost,
            minimumLimit,
            name,
            state,
            totalClients,
            logoUrl: newLogoUrl
        };
        try {
            const response = await axios.post(`${process.env.VITE_API_URL}/graphql`, {
                query: mutation,
                variables: variables
            });
            setLoading(false);
            navigate('/');
            console.log('Response data:', response.data);
        }
        catch (error) {
            console.error('Error creating client rate:', error);
        }
    };
    return (_jsx(MainTemplate, { children: _jsx("div", { children: _jsxs("div", { className: styles.formCotainer, children: [_jsx("input", { id: 'file', type: 'file', "data-testid": "file-input", onChange: handleFileChange }), _jsxs("div", { className: styles.inputContainer, children: [_jsx(Input, { id: 'name', required: true, width: "400px", label: "Nome", value: name, placeholder: "Nome", onChange: setName }), _jsx(Input, { id: 'state', required: true, width: "400px", value: state, onChange: setState, label: "Estado de origem", placeholder: "Estado de origem" })] }), _jsxs("div", { className: styles.inputContainer, children: [_jsx(Input, { required: true, id: 'kwhCost', width: "400px", value: kwhCost, onChange: setKwhCost, label: "Custo por kwh", placeholder: "Custo por kwh" }), _jsx(Input, { required: true, type: 'number', width: "400px", id: 'minimumLimit', value: minimumLimit, onChange: setMinimumLimit, label: "Limite m\u00EDnimo de kwh", placeholder: "Limite m\u00EDnimo de kwh" })] }), _jsxs("div", { className: styles.inputContainer, children: [_jsx(Input, { required: true, type: 'number', width: "400px", id: 'totalClients', value: totalClients, onChange: setTotalClients, label: "N\u00FAmero total de clientes", placeholder: "N\u00FAmero total de clientes" }), _jsx(Input, { required: true, type: 'number', width: "400px", id: 'clientRate', value: clientRate, onChange: setClientRate, label: "Avalia\u00E7\u00E3o m\u00E9dia dos clientes", placeholder: "Avalia\u00E7\u00E3o m\u00E9dia dos clientes" })] }), _jsx(Button, { disabled: name === '' || state === '' || kwhCost === '' ||
                            minimumLimit === '' || totalClients === '' || clientRate === '' || !file, onClick: handleOnSave, children: loading ? 'Salvando...' : 'Salvar' })] }) }) }));
}
export default CreateProvider;
