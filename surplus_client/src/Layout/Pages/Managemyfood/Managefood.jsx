import { Helmet } from "react-helmet-async";
import Table from "./Table";

const Managefood = () => {
 

    return (
        <div className="max-w-7xl mx-auto my-16 min-h-screen">
            <Helmet>
                <title>
                    Communeat | Manageyourfood 
                </title>
            </Helmet>
            
            <Table></Table>
        </div>
    );
};

export default Managefood;