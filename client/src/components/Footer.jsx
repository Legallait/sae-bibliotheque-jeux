import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footerContainer}>
            {/* Conteneur principal */}
            <div style={styles.footerContent}>
                {/* Section : À propos de nous */}
                <div style={styles.column}>
                    <h3 style={styles.header}>À propos de nous</h3>
                    <ul style={styles.linkList}>
                        <li><a href="/team" style={styles.link}>L'équipe</a></li>
                        <li><a href="/establishment" style={styles.link}>L'établissement</a></li>
                    </ul>
                </div>

                {/* Section : À propos du projet */}
                <div style={styles.column}>
                    <h3 style={styles.header}>À propos du projet</h3>
                    <ul style={styles.linkList}>
                        <li><a href="/project" style={styles.link}>Le projet</a></li>
                        <li><a href="/mentorship" style={styles.link}>L'encadrement</a></li>
                        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Dépôt GitHub</a></li>
                    </ul>
                </div>

                {/* Section : Confidentialité */}
                <div style={styles.column}>
                    <h3 style={styles.header}>Confidentialité</h3>
                    <ul style={styles.linkList}>
                        <li><a href="/terms" style={styles.link}>Termes & conditions</a></li>
                        <li><a href="/privacy-policy" style={styles.link}>Politique & confidentialité</a></li>
                    </ul>
                </div>

                {/* Section : Contact */}
                <div style={styles.column}>
                    <h3 style={styles.header}>Contact</h3>
                    <ul style={styles.linkList}>
                        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.link}>GitHub</a></li>
                        <li><a href="mailto:contact@example.com" style={styles.link}>Adresse mail</a></li>
                        <li><a href="/discord" style={styles.link}>Discord</a></li>
                    </ul>
                </div>
            </div>

            {/* Ligne séparatrice */}
            <hr style={styles.separator} />

            {/* Bas de page */}
            <div style={styles.footerBottom}>
                <p style={styles.bottomText}>Tous droits réservés © 2024</p>
            </div>
        </footer>
    );
};

const styles = {
    footerContainer: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        color: '#333',
        padding: '40px 20px',
        marginTop: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    footerContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: '100px',
        paddingInline: '12%',
    },
    column: {
        flex: '1',
        minWidth: '180px',
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontSize: '14px',
        lineHeight: '1.8',
        transition: 'color 0.3s',
        cursor: 'pointer',
    },
    linkHover: {
        color: '#222',
    },
    separator: {
        border: 'none',
        borderTop: '1px solid #CCC',
        margin: '20px auto',
        width: '90%',
    },
    footerBottom: {
        textAlign: 'center',
    },
    bottomText: {
        fontSize: '14px',
        fontWeight: 'medium',
        color: '#666',
    },
};

export default Footer;