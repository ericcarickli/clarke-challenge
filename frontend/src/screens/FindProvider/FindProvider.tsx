import { useState } from "react";
import axios from "axios";
import Logo from '../../assets/energy-1.png'; 
import styles from './FindProvider.module.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import MainTemplate from "../../templates/MainTemplate/MainTemplate";

interface IProvider {
    id: string;
    name: string;
    state: string;
    kwhCost: string;
    minimumLimit: string;
    totalClients: string;
    clientRate: string;
    logoUrl: string;
}

function FindProvider() {
    const [loading, setLoading] = useState<boolean>(false);
    const [energyConsumption, setEnergyConsumption] = useState<string>('');
    const [providers, setProviders] = useState<IProvider[]>([]); // State to hold fetched providers

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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/graphql`, {
                query: query,
                variables: variables
            });

            setProviders(response.data.data.providersByMinimumLimit);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    }

    return (
        <MainTemplate>
            <div className={styles.container}>
                <div className={styles.checkConsuptionContainer}>
                    <Input
                        type='number'
                        width="400px"
                        placeholder="3000kWh"
                        label="Consumo mensal de energia (kWh)"
                        value={energyConsumption}
                        onChange={setEnergyConsumption}
                    />
                    <Button onClick={handleOnSend}>{loading ? 'Enviando...' : 'Enviar'}</Button>
                </div>
                <div className={styles.results}>
                    {providers && providers.length > 0 && providers.map((provider, index) => (
                        <div key={index} className={styles.providerItemContainer}>
                            <div className={styles.providerSubContainer}>
                                <div className={styles.logoContainer}>
                                    <img className={styles.logo} src={provider.logoUrl || Logo} alt="Logo" />
                                </div>
                                <div className={styles.textElementsContainer}>
                                    <ProviderDetail title={provider.name} value={provider.state}/>
                                    <ProviderDetail title='Limite mínimo:' value={provider.minimumLimit}/>
                                    <ProviderDetail title='Custo por kWh:' value={provider.kwhCost}/>
                                    <ProviderDetail title='Número total de clientes:' value={provider.totalClients}/>
                                </div>
                            </div>
                            <ProviderDetail title='Nota:' value={provider.clientRate}/>
                        </div>
                    ))}
                </div>
            </div>
        </MainTemplate>
    );
}

export default FindProvider;

interface ProviderDetailProps {
    title: string;
    value: string;
}

function ProviderDetail({ title, value }: ProviderDetailProps) {
    return (
        <div className={styles.providerDetailContainer}>
            <span className={styles.title}>{title}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}