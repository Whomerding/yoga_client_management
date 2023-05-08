import "./Footer.css";

const Footer = ({studio}) => {
  return (
    <footer className="footer">
      <ul style={{display: "flex", flexDirection: "column"}}>
      <li>{studio.studio_name} {studio.address}</li>
      <li>{studio.phone_number}</li>
      <li>{studio.email}</li>
      </ul>
    </footer>
  );
};

export default Footer;
