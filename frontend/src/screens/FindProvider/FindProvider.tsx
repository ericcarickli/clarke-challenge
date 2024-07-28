import { useState } from "react";
import axios from "axios";
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
                }
            }
        `;

        const variables = {
            minimumLimit: energyConsumption
        };

        try {
            const response = await axios.post('http://localhost:3000/graphql', {
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
                                    <span>Logo</span>
                                </div>
                                <div className={styles.textElementsContainer}>
                                    <span>{provider.name} - {provider.state}</span>
                                    <span>Limite mínimo: {provider.minimumLimit}</span>
                                    <span>Custo por kWh: {provider.kwhCost}</span>
                                    <span>Número total de clientes: {provider.totalClients}</span>
                                </div>
                            </div>
                            <span>{provider.totalClients}</span>
                        </div>
                    ))}
                </div>
            </div>
        </MainTemplate>
    );
}

export default FindProvider;