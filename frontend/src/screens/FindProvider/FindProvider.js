import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import Logo from '../../assets/energy-1.png';
import styles from './FindProvider.module.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";
function FindProvider() {
    const [loading, setLoading] = useState(false);
    const [energyConsumption, setEnergyConsumption] = useState('');
    const [providers, setProviders] = useState([]); // State to hold fetched providers
    const handleOnSend = async () => {
        setLoading(true);
        const query = `
            query ProvidersByMinimumLimit($minimumLimit: String!) {
                providersByMinimumLimit(minimumLimit: $minimumLimit) {
                    id
                    name
                    state
                    kwhCost
                    minimumLimit
                    totalClients
                    clientRate
                    logoUrl
                }
            }
        `;
        const variables = {
            minimumLimit: energyConsumption
        };
        try {
            // const response = await axios.post(`${import.meta.env.VITE_API_URL}/graphql`, {
            const response = await axios.post(`${process.env.VITE_API_URL}/graphql`, {
                query: query,
                variables: variables
            });
            setProviders(response.data.data.providersByMinimumLimit);
            setLoading(false);
        }
        catch (error) {
            console.error('Error fetching providers:', error);
        }
    };
    return (_jsx(MainTemplate, { children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.checkConsuptionContainer, children: [_jsx(Input, { type: 'number', width: "400px", placeholder: "3000kWh", id: 'energyConsumption', value: energyConsumption, onChange: setEnergyConsumption, label: "Consumo mensal de energia (kWh)" }), _jsx(Button, { onClick: handleOnSend, disabled: energyConsumption === '', children: loading ? 'Enviando...' : 'Enviar' })] }), _jsx("div", { className: styles.results, children: providers && providers.length > 0 && providers.map((provider, index) => (_jsxs("div", { className: styles.providerItemContainer, children: [_jsxs("div", { className: styles.providerSubContainer, children: [_jsx("div", { className: styles.logoContainer, children: _jsx("img", { className: styles.logo, src: provider.logoUrl || Logo, alt: "Logo" }) }), _jsxs("div", { className: styles.textElementsContainer, children: [_jsx(ProviderDetail, { title: provider.name, value: provider.state }), _jsx(ProviderDetail, { title: 'Limite m\u00EDnimo:', value: provider.minimumLimit }), _jsx(ProviderDetail, { title: 'Custo por kWh:', value: provider.kwhCost }), _jsx(ProviderDetail, { title: 'N\u00FAmero total de clientes:', value: provider.totalClients })] })] }), _jsx(ProviderDetail, { title: 'Nota:', value: provider.clientRate })] }, index))) })] }) }));
}
export default FindProvider;
function ProviderDetail({ title, value }) {
    return (_jsxs("div", { className: styles.providerDetailContainer, children: [_jsx("span", { className: styles.title, children: title }), _jsx("span", { className: styles.value, children: value })] }));
}
