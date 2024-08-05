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

    const [loading, setLoading] = useState<boolean>(false);

    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [kwhCost, setKwhCost] = useState<string>('');
    const [minimumLimit, setMinimumLimit] = useState<string>('');
    const [totalClients, setTotalClients] = useState<string>('');
    const [clientRate, setClientRate] = useState<string>('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.url; // assuming the response contains the URL of the uploaded file
        } catch (error) {
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/graphql`, {
                query: mutation,
                variables: variables
            });

            setLoading(false);
            navigate('/');
            console.log('Response data:', response.data);
        } catch (error) {
            console.error('Error creating client rate:', error);
        }
    }

    return (
        <MainTemplate>
            <div>
                <div className={styles.formCotainer}>
                    <input 
                        type='file'
                        onChange={handleFileChange}
                    />
                    <div className={styles.inputContainer}> 
                        <Input
                            required
                            width="400px"
                            label="Nome"
                            value={name}
                            placeholder="Nome"
                            onChange={setName}
                        />
                        <Input
                            required
                            width="400px"
                            value={state}
                            onChange={setState}
                            label="Estado de origem"
                            placeholder="Estado de origem"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            required
                            width="400px"
                            value={kwhCost}
                            onChange={setKwhCost}
                            label="Custo por kwh"
                            placeholder="Custo por kwh"
                        />
                        <Input
                            required
                            type='number'
                            width="400px"
                            value={minimumLimit}
                            onChange={setMinimumLimit}
                            label="Limite mínimo de kwh"
                            placeholder="Limite mínimo de kwh"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            required
                            type='number'
                            width="400px"
                            value={totalClients}
                            onChange={setTotalClients}
                            label="Número total de clientes"
                            placeholder="Número total de clientes"
                        />
                        <Input
                            required
                            type='number'
                            width="400px"
                            value={clientRate}
                            onChange={setClientRate}
                            label="Avaliação média dos clientes"
                            placeholder="Avaliação média dos clientes"
                        />
                    </div>
                    <Button 
                        disabled={
                            name === '' || state === '' || kwhCost === '' ||
                            minimumLimit === '' || totalClients === '' || clientRate === '' || !file
                        }
                        onClick={handleOnSave}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </div>
        </MainTemplate>
    );
}

export default CreateProvider;