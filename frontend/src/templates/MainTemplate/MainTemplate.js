import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './MainTemplate.module.scss';
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/energy-1.png';
function MainTemplate({ children }) {
    const navigate = useNavigate();
    const handleCreateProvider = () => {
        navigate('/create-provider');
    };
    return (_jsxs("div", { className: styles.mainContainer, children: [_jsxs("header", { className: styles.header, children: [_jsx("button", { className: styles.noStyledButton, onClick: () => navigate('/'), children: _jsx("img", { className: styles.logo, src: Logo, alt: "Logo" }) }), _jsx(Button, { onClick: handleCreateProvider, children: "Criar Fornecedor" })] }), _jsx("div", { className: styles.bodyContainer, children: _jsx("div", { className: styles.body, children: children }) })] }));
}
export default MainTemplate;
