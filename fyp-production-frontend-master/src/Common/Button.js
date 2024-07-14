import React from "react";
import { Button } from "reactstrap";


const CustomButton = ({ loading, children, ...props }) => {
    const content = (
        loading ? "Loading" : children
    );
    return <Button {...props}>
        {content}
    </Button>
};

export default CustomButton;