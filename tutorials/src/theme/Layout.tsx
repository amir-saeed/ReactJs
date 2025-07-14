import Container from "@mui/material/Container"
// import Footer from "../components/Footer"
// import Header from "../components/Header"
// import { Box } from "../material-ui"
// import Debug from "../components/Debug"
import FetchAPI from "../components/Fetch/FetchAPI";
import AxiosEample from "../components/Fetch/AxiosExample";
import ReactQueryEntry from "../components/Fetch/react-query/ReactQueryEntry";
import SWRExample from "../components/Fetch/SWRExample";
import OptimisticUpdates from "../components/Fetch/OptimisticUpdates";
import ApolloExample from "../components/Fetch/ApolloClient";
import Practice from "../components/Practice";

const Layout = () => {
   
    return (
        <Container maxWidth="xl">
            <main>
                {/* <FetchAPI /> */}
                {/* <AxiosEample /> */}
                {/* <ReactQueryEntry /> */}
                {/* <SWRExample /> */}
                {/* <OptimisticUpdates /> */}
                {/* <ApolloExample /> */}
                <Practice />
            </main>
        </Container>
    )
}

export default Layout