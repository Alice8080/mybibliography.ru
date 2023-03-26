import './footer.scss';

const Footer = () => {
    const currentYear = (new Date()).getFullYear();

    return (
    <footer className="footer">
        <p className="footer__text">© My Bibliography 2021-{currentYear}</p>
    </footer>
    );
}

export default Footer;