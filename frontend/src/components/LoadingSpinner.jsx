
import { LoaderCircle } from "lucide-react";

function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <LoaderCircle size={30} />
            </div>

            <p>{text}</p>
        </div>
    );
}

export default LoadingSpinner;

