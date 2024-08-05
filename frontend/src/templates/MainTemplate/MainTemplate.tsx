import { ReactNode } from "react";
import styles from './MainTemplate.module.scss';
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/energy-1.png'; 

interface MainTemplateProps {
    children: ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
    const navigate = useNavigate();

    const handleCreateProvider = () => {
        navigate('/create-provider');
    }

    return(
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <button className={styles.noStyledButton} onClick={() => navigate('/')}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                </button>
                <Button onClick={handleCreateProvider}>
                    Criar Fornecedor
                </Button>
            </header>
            <div className={styles.bodyContainer}>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MainTemplate;