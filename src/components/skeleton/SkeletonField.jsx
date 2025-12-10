import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonField = ({ loading, children, height = 38, width = "100%", variant = "input" }) => {
    if (loading) {
        if (variant === "circle") {
            return <Skeleton circle width={height} height={height} />;
        }

        if (variant === "pill") {
            return <Skeleton width={width} height={height} borderRadius={50} />;
        }

        return (
            <Skeleton
                height={height}
                width={width}
                baseColor="#f8f9fa"
                highlightColor="#e9ecef"
                borderRadius={6}
                style={{ display: "block" }}
            />
        );
    }

    return <div style={{ width, minHeight: height }}>{children}</div>;
};

export default SkeletonField;
