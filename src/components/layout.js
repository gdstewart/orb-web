import Navbar from "../components/navbar";

const Layout = props => (
    <div className="layout">
        <Navbar />
        <div className="spacer" />
        {props.children}
    </div>
);

export default Layout;