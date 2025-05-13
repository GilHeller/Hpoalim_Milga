import CoolRedBar from "../components/ProgressBar/ProgressBar";
import RedRectangle from "../components/Rect/Rect";
import "./StatusPage.css";

export const StatusPage = () => {
    return (
        <>
            <h1>היעד שלי: 100,000 ש"ח</h1>

            <div className="rectContainer">
                <RedRectangle>
                    <h3>הטבות</h3>
                    <h2>5</h2>
                </RedRectangle>
                <RedRectangle>
                    <h3>נשאר לשלם</h3>
                    <h2>30,000</h2>
                </RedRectangle>
                <RedRectangle>
                    <h3>שילמתי</h3>
                    <h2>70,000</h2>
                </RedRectangle>
            </div>

            <CoolRedBar percentage={70} label="Progress"></CoolRedBar>
        </>
    );
};
